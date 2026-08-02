import Link from "next/link";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF, BRAND_NAME } from "@/lib/siteConfig";

const FUNNELS = [
  { href: "/locksmith", label: "מנעולן" },
  { href: "/plumbing", label: "אינסטלטור" },
  { href: "/handyman", label: "הנדימן" },
];

export default function NotFound() {
  return (
    <main id="main-content" dir="rtl" className="light-page flex flex-col items-center justify-center text-center px-6 py-24">
      <p className="text-l-primary font-black text-6xl sm:text-7xl mb-3">404</p>
      <h1 className="text-2xl sm:text-3xl font-black mb-3">הדף לא נמצא</h1>
      <p className="text-l-text-2 max-w-md mb-8">
        אולי הקישור השתנה — אבל {BRAND_NAME} כאן. בחרו את השירות שאתם צריכים, או פשוט התקשרו.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {FUNNELS.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="light-card px-6 py-3 font-bold text-sm hover:text-l-primary transition-colors"
          >
            {f.label}
          </Link>
        ))}
      </div>

      <a
        href={OWNER_PHONE_HREF}
        className="inline-flex items-center gap-2 bg-l-primary hover:bg-l-primary-dim text-white font-black px-8 py-4 rounded-[0.625rem] transition-colors min-h-[52px]"
      >
        חייגו עכשיו · <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
      </a>
    </main>
  );
}
