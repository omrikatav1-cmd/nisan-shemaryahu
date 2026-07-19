import { BRAND_NAME } from "@/lib/siteConfig";
import type { ServiceConfig, ServiceKey } from "@/lib/serviceContent";
import type { City } from "@/lib/cities";

// Genuine local paragraph per service+city (Bio Israel's "local depth" section —
// the heart of local SEO). Uses real neighborhood names, not filler.
const ANGLE: Record<ServiceKey, string> = {
  locksmith: "דלת שנטרקה, מנעול שנתקע או צילינדר שצריך להחליף — ניסן מגיע מהר עם כל הציוד, פותח בלי לשבור ומחליף מנעולים באתר.",
  plumbing: "נזילה שמתפשטת, סתימה שלא נפתחת או תקלת צנרת — ניסן מאבחן במקום ומטפל, בלי לנחש ובלי לחכות שבוע לתיאום.",
  handyman: "מהחלפת ברז ותליית מדף ועד צביעה, גבס והרכבות — ניסן עובר על כל הרשימה ומסיים באותו ביקור.",
};

export default function LightLocalIntro({ service, city }: { service: ServiceConfig; city: City }) {
  const hoods = city.neighborhoods;
  const hoodText =
    hoods.length >= 2
      ? `מ${hoods[0]} ו${hoods[1]}${hoods.length >= 4 ? ` ועד ${hoods[2]} ו${hoods[3]}` : ""}`
      : "";

  return (
    <section className="py-16 px-4 sm:px-6 bg-l-surface">
      <div className="max-w-3xl mx-auto text-right">
        <h2 className="text-2xl sm:text-3xl font-black mb-4">
          {service.navLabel} {city.prefixed} — שירות מקומי מהיר
        </h2>
        <p className="text-l-text-2 leading-relaxed text-lg">
          {BRAND_NAME} נותן שירותי {service.navLabel} בכל רחבי {city.name}
          {hoodText ? ` — ${hoodText}` : ""}. {ANGLE[service.key]}{" "}
          {service.key === "handyman"
            ? `תיאום ביקור ${city.prefixed} בדרך כלל תוך יום-יומיים, והמחיר נקבע לפי גודל העבודה — בלי הפתעות בסוף.`
            : `מגיע ${city.prefixed} עד שעתיים מרגע הפנייה, עם מחיר סגור וברור מראש בטלפון — בלי הפתעות בסוף.`}
        </p>
      </div>
    </section>
  );
}
