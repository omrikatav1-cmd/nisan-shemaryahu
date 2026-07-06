import { NextRequest, NextResponse } from "next/server";

// Password-gates /leads (internal lead dashboard, has customer PII).
// Fails closed: if the password isn't configured, the route stays blocked
// rather than falling open.
export default function proxy(request: NextRequest) {
  const password = process.env.LEADS_DASHBOARD_PASSWORD;
  if (!password) {
    return new NextResponse("לוח הלידים לא מוגדר. יש להגדיר LEADS_DASHBOARD_PASSWORD.", { status: 503 });
  }

  const expected = `Basic ${btoa(`nisan:${password}`)}`;
  if (request.headers.get("authorization") === expected) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="leads"' },
  });
}

export const config = { matcher: "/leads/:path*" };
