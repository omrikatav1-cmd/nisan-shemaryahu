// Single source of truth for business facts (NAP, hours, service area).
// Keep in sync with docs/nisan-full-brief.html §01/§03 if these ever change.

import { CITIES } from "@/lib/cities";

export const BRAND_NAME = "ניסן שמריהו";

// Single source of truth for the canonical site URL. Overridable per-deployment
// via the SITE_URL env var (each of the 3 dedicated Vercel projects sets its own) —
// falls back to the combined-hub default for local dev. Change the fallback here
// only when that project's real domain is bought — schema.ts, sitemap.ts,
// robots.ts, layout.tsx all import it.
export const SITE_URL = process.env.SITE_URL || "https://nisan-shemaryahu.vercel.app";

// When set, this deployment is dedicated to ONE trade — its root `/` renders
// that service's own funnel directly instead of the 3-trade hub, and its
// sitemap only lists that service's own pages. Each of the 3 separate Vercel
// projects (nisan-shemaryahu/nisan-plumbing/nisan-handyman) sets its own value.
// Unset = combined hub behavior (local dev default).
export const SITE_SERVICE = process.env.SITE_SERVICE as
  | "locksmith"
  | "plumbing"
  | "handyman"
  | undefined;

// TODO: replace with the business WhatsApp number once opened (brief §1.4) —
// campaigns should point at that number, not the personal one.
export const OWNER_PHONE_INTL = "972509911241"; // 050-9911241
export const OWNER_PHONE_DISPLAY = "050-9911241";
export const OWNER_PHONE_HREF = "tel:0509911241";

export const BUSINESS_ADDRESS = {
  street: "יוסף חיים 15",
  city: "אור יהודה",
};

export const BASE_CITY = "אור יהודה";

// Shown on FAQ sections — signals content freshness to AI crawlers (ChatGPT/Perplexity citations).
export const CONTENT_LAST_UPDATED = "20 ביולי 2026";

// 15km air-radius from Or Yehuda, per brief §2.1. Explicitly excludes Tel Aviv (§2.2).
// Derived from lib/cities.ts's CITIES so this list can never drift from the
// cities that actually have a landing page — it used to be a separate
// hand-maintained array that named 3 cities with no page and omitted 4 that had one.
export const SERVICE_AREA_CITIES = CITIES.map((c) => c.name);

// No arrival-time or insurance claims anywhere on the site (Nisan/Omri,
// 19.7.2026 — explicit, applies to all 3 funnels). Each service shows its
// own real differentiator instead (see ServiceConfig.statHighlight).
export const STATS_BASE = [
  { value: "1,000+", label: "לקוחות מרוצים" },
  { value: "24/6", label: "זמינות לפניות" },
];

export const HOURS = {
  regular: "08:00–18:00",
  sos: "18:00–00:00 (תעריף SOS)",
  sosLate: "00:00–08:00 (תעריף SOS מיוחד)",
  availability: "24/6", // not 24/7 — one rest day per week, per brief §1.8
};

// What is NOT true yet — enforced sitewide so no page/component claims these
// by accident. See brief §01 "דגלים לפני עלייה לאוויר".
export const COMPLIANCE = {
  plumbingCertified: false, // license arrives in ~2 months (§4.1) — never show "מוסמך" next to plumbing until this flips
  locksmithCertified: true, // confirmed + police-approved (§4.2) — safe to display
  writtenWarranty: false, // explicitly none (§5.2) — never claim "אחריות בכתב"
  reserveDutyBusiness: false, // explicitly "don't mention" (§5.4)
};
