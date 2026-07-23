// Single source of truth for business facts (NAP, hours, service area).
// Keep in sync with docs/nisan-full-brief.html §01/§03 if these ever change.

import { CITIES, cityUrl, type City } from "@/lib/cities";

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

// Canonical public URL per dedicated site (the 3 separate Vercel projects).
// Used where one deployment needs to link ACROSS sites (e.g. the /card
// business card). Update each entry when its real .co.il domain is bought,
// then regenerate public/card-qr.svg (see scripts note in app/card/page.tsx).
export const SERVICE_SITE_URLS = {
  locksmith: "https://nisan-shemaryahu.vercel.app",
  plumbing: "https://nisan-plumbing.vercel.app",
  handyman: "https://nisan-handyman.vercel.app",
} as const;

// The one shareable business-card URL (lives on the locksmith/brand site).
export const CARD_URL = `${SERVICE_SITE_URLS.locksmith}/card`;

// Hebrew route slug per service — mirrors next.config.ts SERVICE_SLUGS and
// SERVICES[key].slug. Kept here (not imported from serviceContent) to avoid a
// circular import: serviceContent imports from this file.
const SERVICE_HEBREW_SLUG: Record<"locksmith" | "plumbing" | "handyman", string> = {
  locksmith: "מנעולן",
  plumbing: "אינסטלטור",
  handyman: "הנדימן",
};

// Canonical URL for a service funnel (city optional). Consolidates the
// duplication: every page is reachable on all 3 domains AND under both the
// Hebrew (rewrite) and English (folder) slug. This points each to the ONE
// Hebrew URL on its own service's domain. The bare service funnel canonicalizes
// to the site root, since a dedicated deployment renders that funnel at `/` —
// so `/` and `/מנעולן` share one canonical instead of splitting authority.
export function canonicalFor(
  service: "locksmith" | "plumbing" | "handyman",
  city?: City,
): string {
  const base = SERVICE_SITE_URLS[service];
  if (!city) return base;
  return `${base}${cityUrl(SERVICE_HEBREW_SLUG[service], city)}`;
}

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

// ISO date for the sitemap <lastmod>. Kept as a fixed constant (not new Date())
// so every build emits a stable value — bump when page content materially changes.
export const SITE_LAST_MODIFIED = "2026-07-23";

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

// What is NOT true yet — enforced sitewide so no page/component claims these
// by accident. See brief §01 "דגלים לפני עלייה לאוויר".
export const COMPLIANCE = {
  plumbingCertified: false, // license arrives in ~2 months (§4.1) — never show "מוסמך" next to plumbing until this flips
  locksmithCertified: true, // confirmed + police-approved (§4.2) — safe to display
  writtenWarranty: false, // explicitly none (§5.2) — never claim "אחריות בכתב"
  reserveDutyBusiness: false, // explicitly "don't mention" (§5.4)
};
