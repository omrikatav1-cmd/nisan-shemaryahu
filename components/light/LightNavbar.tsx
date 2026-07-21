"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, MessageCircle } from "lucide-react";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF, BRAND_NAME } from "@/lib/siteConfig";
import type { ServiceConfig } from "@/lib/serviceContent";
import { CITIES, cityUrl } from "@/lib/cities";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";
import { SERVICE_LOGO } from "@/lib/theme";

// Sealed funnel: this nav only ever links within the current service —
// its main page and its own city pages. Never to the other two trades.
export default function LightNavbar({ service }: { service: ServiceConfig }) {
  const [open, setOpen] = useState(false);
  const topCities = CITIES.slice(0, 5);

  return (
    <header className="sticky top-0 z-50 bg-l-surface/95 backdrop-blur border-b border-l-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href={`/${service.slug}`} className="flex items-center gap-2.5" aria-label={`${BRAND_NAME} — ${service.navLabel}`}>
          <Image src={SERVICE_LOGO[service.key]} alt="" width={38} height={38} className="rounded-full flex-shrink-0" priority />
          <span className="flex flex-col leading-tight">
            <span className="font-black text-l-text text-lg" style={{ fontFamily: "var(--font-heading)" }}>{BRAND_NAME}</span>
            <span className="text-[10px] text-l-accent-dim tracking-[0.15em] font-bold">{service.navLabel} · אור יהודה והסביבה</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5" aria-label="אזורי שירות">
          {topCities.map((c) => (
            <Link key={c.slug} href={cityUrl(service.slug, c)} className="text-sm text-l-text-2 hover:text-l-primary font-medium transition-colors">
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={OWNER_PHONE_HREF} className="flex items-center gap-1.5 text-sm font-semibold text-l-text-2 hover:text-l-primary transition-colors">
            <Phone size={14} /><span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
          </a>
          <a href={getSosWhatsAppUrl(service.whatsappIssueLabel)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-l-accent-dim hover:opacity-90 text-white text-sm font-black px-4 py-2 rounded-xl transition-colors">
            <MessageCircle size={15} /> וואטסאפ
          </a>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 text-l-text-2"
          aria-label={open ? "סגור תפריט" : "פתח תפריט"} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }} className="md:hidden overflow-hidden border-t border-l-border">
            <div className="px-4 py-4 flex flex-col gap-3">
              {topCities.map((c) => (
                <Link key={c.slug} href={cityUrl(service.slug, c)} onClick={() => setOpen(false)} className="text-l-text-2 font-medium py-1">
                  {service.navLabel} {c.prefixed}
                </Link>
              ))}
              <a href={OWNER_PHONE_HREF} className="flex items-center gap-2 text-l-text-2 text-sm">
                <Phone size={14} /><span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
              </a>
              <a href={getSosWhatsAppUrl(service.whatsappIssueLabel)} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-l-accent-dim text-white text-sm font-black px-4 py-3 rounded-xl">
                <MessageCircle size={15} /> וואטסאפ עכשיו
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
