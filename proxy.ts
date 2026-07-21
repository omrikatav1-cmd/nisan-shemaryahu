import { NextRequest, NextResponse } from "next/server";

// Password-gates /leads (internal lead dashboard, has customer PII).
// Fails closed: if the password isn't configured, the route stays blocked
// rather than falling open.

// Per-IP failed-attempt lockout — same in-memory pattern as app/api/leads/route.ts's
// isRateLimited (accepted tradeoff at this traffic scale; doesn't survive
// across serverless instances, but this is a single-operator internal tool,
// not a public endpoint under real attack volume).
type AttemptEntry = { count: number; resetAt: number };
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, AttemptEntry>();

function isLocked(ip: string): { locked: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) return { locked: false, retryAfterSeconds: 0 };
  if (entry.count >= MAX_ATTEMPTS) {
    return { locked: true, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { locked: false, retryAfterSeconds: 0 };
}

function recordFailure(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

// Constant-time string comparison — Edge runtime has no Node `crypto`, so this
// compares full length first (padding the shorter side) then XORs every
// character rather than short-circuiting on the first mismatch.
function timingSafeStringEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export default function proxy(request: NextRequest) {
  const password = process.env.LEADS_DASHBOARD_PASSWORD;
  if (!password) {
    return new NextResponse("לוח הלידים לא מוגדר. יש להגדיר LEADS_DASHBOARD_PASSWORD.", { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { locked, retryAfterSeconds } = isLocked(ip);
  if (locked) {
    return new NextResponse("יותר מדי ניסיונות. נסה שוב בעוד דקה.", {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    });
  }

  const expected = `Basic ${btoa(`nisan:${password}`)}`;
  const provided = request.headers.get("authorization") ?? "";
  if (timingSafeStringEqual(provided, expected)) {
    return NextResponse.next();
  }

  recordFailure(ip);
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="leads"' },
  });
}

export const config = { matcher: "/leads/:path*" };
