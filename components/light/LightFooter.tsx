import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { BRAND_NAME, OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";
import type { ServiceConfig } from "@/lib/serviceContent";
import { CITIES, cityUrl } from "@/lib/cities";
import { SERVICE_LOGO } from "@/lib/theme";

// Sealed funnel footer: links only to this service's own city pages.
// No links to the other two trades.
export default function LightFooter({ service }: { service: ServiceConfig }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-l-border bg-l-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-right">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <Image src={SERVICE_LOGO[service.key]} alt="" width={34} height={34} className="rounded-full flex-shrink-0" />
            <h3 className="font-black text-lg">{BRAND_NAME}</h3>
          </div>
          <p className="text-l-text-muted text-sm mb-4">{service.navLabel} מקצועי{service.key === "locksmith" ? " ומוסמך" : ""} — אור יהודה והסביבה.</p>
          <a href={OWNER_PHONE_HREF} className="inline-flex items-center gap-2 bg-l-primary/8 border border-l-primary/20 text-l-primary font-bold text-sm px-4 py-2 rounded-xl">
            <Phone size={14} /><span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
          </a>
        </div>
        <div className="sm:col-span-2">
          <h4 className="font-bold text-sm mb-4">{service.navLabel} באזורי השירות</h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-end">
            {CITIES.map((c) => (
              <Link key={c.slug} href={cityUrl(service.slug, c)} className="text-l-text-muted hover:text-l-primary text-sm transition-colors">
                {service.navLabel} {c.prefixed}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-l-border py-4 text-center text-l-text-muted text-xs">
        &copy; {year} {BRAND_NAME} · {service.navLabel} · כל הזכויות שמורות ·{" "}
        <Link href="/accessibility" className="underline hover:text-l-primary">הצהרת נגישות</Link>
      </div>
    </footer>
  );
}
