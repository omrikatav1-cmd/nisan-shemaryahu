import {
  BRAND_NAME,
  BASE_CITY,
  CARD_URL,
  OWNER_PHONE_INTL,
} from "@/lib/siteConfig";

// vCard is fully static per build — no request data involved.
export const dynamic = "force-static";

// vCard 3.0 TEXT values must escape backslash, comma and semicolon (RFC 2426 §5).
function esc(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function GET() {
  // Built from lib/siteConfig.ts constants so the card can never drift from
  // the site when the phone (business WhatsApp) or domain changes.
  const vcf = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc("שמריהו")};${esc("ניסן")};;;`,
    `FN:${esc(BRAND_NAME)}`,
    `TITLE:${esc("מנעולן · אינסטלטור · הנדימן")}`,
    `TEL;TYPE=CELL,VOICE:+${OWNER_PHONE_INTL}`,
    `URL:${CARD_URL}`,
    `ADR;TYPE=WORK:;;;${esc(BASE_CITY)};;;${esc("ישראל")}`,
    `NOTE:${esc("מנעולן מוסמך באישור משטרה, אינסטלטור והנדימן. אור יהודה והסביבה, זמין 24/6.")}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(vcf, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      // ASCII-only filename — Hebrew filenames break some Content-Disposition parsers.
      "Content-Disposition": 'attachment; filename="nisan-shemaryahu.vcf"',
    },
  });
}
