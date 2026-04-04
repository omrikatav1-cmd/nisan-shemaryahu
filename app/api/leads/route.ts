import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getWhatsAppUrl } from "@/lib/whatsapp";

// --- Rate Limiting ---

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 2 minutes
const CLEANUP_INTERVAL_MS = 120_000;
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, CLEANUP_INTERVAL_MS);

function isRateLimited(ip: string): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfterSeconds: 0 };
  }

  entry.count += 1;

  if (entry.count > RATE_LIMIT_MAX) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { limited: true, retryAfterSeconds };
  }

  return { limited: false, retryAfterSeconds: 0 };
}

// --- Validation & Sanitization ---

const ISRAELI_PHONE_REGEX = /^(05[0-9]\d{7}|(\+972)5[0-9]\d{7})$/;

function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

function sanitize(input: string): string {
  return stripHtmlTags(input.trim());
}

function isValidIsraeliPhone(phone: string): boolean {
  const normalized = phone.replace(/[-\s]/g, "");
  return ISRAELI_PHONE_REGEX.test(normalized);
}

// --- Error Responses ---

type ErrorType = "validation_error" | "rate_limit" | "server_error";

type ErrorResponse = {
  error: true;
  type: ErrorType;
  message: string;
};

function errorResponse(type: ErrorType, message: string, status: number, headers?: Record<string, string>) {
  const body: ErrorResponse = { error: true, type, message };
  return NextResponse.json(body, { status, headers });
}

// --- Route Handler ---

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { limited, retryAfterSeconds } = isRateLimited(ip);

    if (limited) {
      return errorResponse(
        "rate_limit",
        "יותר מדי בקשות. נסה שוב בעוד דקה.",
        429,
        { "Retry-After": String(retryAfterSeconds) }
      );
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return errorResponse("validation_error", "גוף הבקשה אינו תקין.", 400);
    }

    const { name: rawName, phone: rawPhone, issue: rawIssue } = body as Record<string, unknown>;

    if (typeof rawName !== "string" || typeof rawPhone !== "string" || typeof rawIssue !== "string") {
      return errorResponse("validation_error", "שדות חסרים: שם, טלפון ותיאור הבעיה הם שדות חובה.", 400);
    }

    const name = sanitize(rawName);
    const phone = sanitize(rawPhone);
    const issue = sanitize(rawIssue);

    if (!name || !phone || !issue) {
      return errorResponse("validation_error", "שדות חסרים: שם, טלפון ותיאור הבעיה הם שדות חובה.", 400);
    }

    if (!isValidIsraeliPhone(phone)) {
      return errorResponse(
        "validation_error",
        "מספר טלפון לא תקין. יש להזין מספר ישראלי (למשל 050-1234567 או +972501234567).",
        400
      );
    }

    const { data, error } = await getSupabase()
      .from("leads")
      .insert([{ name, phone, issue, status: "new" }])
      .select()
      .single();

    if (error) {
      // Log structured error server-side only
    if (process.env.NODE_ENV === "development") console.error("Supabase error:", error);
      return errorResponse("server_error", "שגיאה בשמירת הפנייה. נסה שוב.", 500);
    }

    const whatsappUrl = getWhatsAppUrl(name, issue);

    return NextResponse.json({
      success: true,
      whatsappUrl,
    });
  } catch (err: unknown) {
    if (process.env.NODE_ENV === "development") console.error("API error:", err);
    return errorResponse("server_error", "שגיאה פנימית.", 500);
  }
}
