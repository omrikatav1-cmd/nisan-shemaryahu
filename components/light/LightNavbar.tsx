"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, MessageCircle } from "lucide-react";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF, BRAND_NAME } from "@/lib/siteConfig";
import { SERVICE_LIST } from "@/lib/serviceContent";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";

export default function LightNavbar({ activeSlug, whatsappLabel }: { activeSlug: string; whatsappLabel: string }) {
  const [open, setOpen] = useState(false);
  const otherServices = SERVICE_LIST.filter((s) => s.slug !== activeSlug);

  return (
    <header className="sticky top-0 z-50 bg-l-surface/95 backdrop-blur border-b border-l-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight" aria-label={`${BRAND_NAME} — ראשי`}>
          <span className="font-black text-l-text text-lg" style={{ fontFamily: "var(--font-heading)" }}>{BRAND_NAME}</span>
          <span className="text-[10px] text-l-text-muted tracking-[0.15em] font-medium">אור יהודה והסביבה</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="שירותים נוספים">
          {otherServices.map((s) => (
            <a key={s.slug} href={`/${s.slug}`} className="text-sm text-l-text-2 hover:text-l-primary font-medium transition-colors">
              {s.navLabel}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={OWNER_PHONE_HREF} className="flex items-center gap-1.5 text-sm font-semibold text-l-text-2 hover:text-l-primary transition-colors">
            <Phone size={14} />
            <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
          </a>
          <a
            href={getSosWhatsAppUrl(whatsappLabel)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-l-accent hover:bg-l-accent-dim text-white text-sm font-black px-4 py-2 rounded-xl transition-colors shadow-[0_4px_16px_rgba(201,122,43,0.3)]"
          >
            <MessageCircle size={15} />
            וואטסאפ עכשיו
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-l-text-2"
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-l-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {otherServices.map((s) => (
                <a key={s.slug} href={`/${s.slug}`} className="text-l-text-2 font-medium py-1">{s.navLabel}</a>
              ))}
              <a href={OWNER_PHONE_HREF} className="flex items-center gap-2 text-l-text-2 text-sm">
                <Phone size={14} /><span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
              </a>
              <a
                href={getSosWhatsAppUrl(whatsappLabel)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-l-accent text-white text-sm font-black px-4 py-3 rounded-xl"
              >
                <MessageCircle size={15} /> וואטסאפ עכשיו
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
