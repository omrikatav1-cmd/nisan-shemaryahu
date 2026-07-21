import { BRAND_NAME } from "@/lib/siteConfig";
import type { ServiceConfig, ServiceKey } from "@/lib/serviceContent";
import type { City } from "@/lib/cities";

// Genuine local paragraph per service+city (Bio Israel's "local depth" section —
// the heart of local SEO). Uses real neighborhood names, not filler.
const ANGLE: Record<ServiceKey, string> = {
  locksmith: "דלת שנטרקה, מנעול שנתקע או צילינדר שצריך להחליף — ניסן מגיע עם כל הציוד, פותח בלי לשבור ומחליף מנעולים באתר.",
  plumbing: "נזילה שמתפשטת, סתימה שלא נפתחת או תקלת צנרת — ניסן מאבחן במקום ומטפל, בלי לנחש ובלי לחכות שבוע לתיאום.",
  handyman: "מהחלפת ברז ותליית מדף ועד צביעה, גבס והרכבות — ניסן עובר על כל הרשימה ומסיים באותו ביקור.",
};

export default function LightLocalIntro({ service, city }: { service: ServiceConfig; city: City }) {
  const hoods = city.neighborhoods;
  // Lists every real neighborhood (not just the first 2-4) — "מ-A, B ו-C" for
  // any count, so no city's data silently drops a name based on array length.
  const hoodText =
    hoods.length >= 2 ? `מ${hoods.slice(0, -1).join(", ")} ו${hoods[hoods.length - 1]}` : "";

  return (
    <section className="py-16 px-4 sm:px-6 bg-l-surface">
      <div className="max-w-3xl mx-auto text-right">
        <h2 className="text-2xl sm:text-3xl font-black mb-4">
          {service.navLabel} {city.prefixed} — שירות מקומי אמין
        </h2>
        <p className="text-l-text-2 leading-relaxed text-lg">
          {BRAND_NAME} נותן שירותי {service.navLabel} בכל רחבי {city.name}
          {hoodText ? ` — ${hoodText}` : ""}. {ANGLE[service.key]}{" "}
          {service.key === "handyman"
            ? `תיאום ביקור ${city.prefixed} בדרך כלל תוך יום-יומיים, והמחיר נקבע לפי גודל העבודה — בלי הפתעות בסוף.`
            : `מחיר סגור וברור מראש בטלפון, לפני שיוצאים אליכם ${city.prefixed} — בלי הפתעות בסוף.`}
        </p>
      </div>
    </section>
  );
}
