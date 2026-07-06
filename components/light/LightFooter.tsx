import { Phone } from "lucide-react";
import { BRAND_NAME, OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF, SERVICE_AREA_CITIES } from "@/lib/siteConfig";
import { SERVICE_LIST } from "@/lib/serviceContent";

export default function LightFooter({ activeSlug }: { activeSlug: string }) {
  const year = new Date().getFullYear();
  const otherServices = SERVICE_LIST.filter((s) => s.slug !== activeSlug);

  return (
    <footer className="border-t border-l-border bg-l-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <h3 className="font-black text-lg mb-2">{BRAND_NAME}</h3>
          <p className="text-l-text-muted text-sm mb-4">הנדימן, אינסטלטור ומנעולן — אור יהודה והסביבה.</p>
          <a href={OWNER_PHONE_HREF} className="inline-flex items-center gap-2 bg-l-primary/8 border border-l-primary/20 text-l-primary font-bold text-sm px-4 py-2 rounded-xl">
            <Phone size={14} />
            <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
          </a>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">שירותים נוספים</h4>
          <ul className="flex flex-col gap-2">
            {otherServices.map((s) => (
              <li key={s.slug}><a href={`/${s.slug}`} className="text-l-text-muted hover:text-l-primary text-sm transition-colors">{s.navLabel}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">אזור שירות</h4>
          <p className="text-l-text-muted text-sm leading-relaxed">{SERVICE_AREA_CITIES.join(", ")}</p>
        </div>
      </div>
      <div className="border-t border-l-border py-4 text-center text-l-text-muted text-xs">
        &copy; {year} {BRAND_NAME} · כל הזכויות שמורות
      </div>
    </footer>
  );
}
