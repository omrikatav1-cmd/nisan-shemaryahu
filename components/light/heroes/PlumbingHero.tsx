"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Droplets, Clock } from "lucide-react";
import type { ServiceConfig } from "@/lib/serviceContent";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Plumbing hero — PRICE-ANCHOR framing. A floating price card ("קריאה 350₪
// מתקזזת") is the visual centerpiece, aqua panel with a droplet motif.
export default function PlumbingHero({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
  const headline = cityName ? `נזילה או סתימה ב${cityName}?` : service.heroHeadline;

  return (
    <section className="relative overflow-hidden bg-l-bg">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-0 items-stretch">
        <div className="px-4 sm:px-6 py-14 lg:py-20 text-right flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex self-end items-center gap-2 bg-l-primary/8 border border-l-primary/25 text-l-primary text-xs font-bold px-4 py-2 rounded-full mb-6"
          >
            {service.heroEyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06] mb-4"
          >
            {headline}
            <br />
            <span className="text-l-accent">{service.heroHeadlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="text-lg text-l-text-2 mb-7 max-w-md mr-0 ml-auto"
          >
            {service.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="flex flex-col sm:flex-row gap-3 justify-end"
          >
            <a href={OWNER_PHONE_HREF}
              className="flex items-center justify-center gap-2 bg-l-primary hover:bg-l-primary-dim text-white font-black px-7 py-4 rounded-xl transition-colors shadow-[0_10px_30px_rgba(14,76,107,0.3)]">
              <Phone size={18} /> <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
            </a>
            <a href={getSosWhatsAppUrl(service.whatsappIssueLabel)} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-l-accent hover:bg-l-accent-dim text-white font-black px-6 py-4 rounded-xl transition-colors">
              <MessageCircle size={18} /> וואטסאפ
            </a>
          </motion.div>

          <div className="flex flex-wrap gap-2 justify-end mt-6">
            {service.heroBadges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 bg-l-surface border border-l-border text-l-text-2 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Clock size={12} className="text-l-accent" /> {b}
              </span>
            ))}
          </div>
        </div>

        {/* Visual panel — aqua gradient + droplet motif + floating price card */}
        <div className="relative min-h-[260px] lg:min-h-full overflow-hidden flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--color-l-primary), var(--color-l-accent))" }}>
          <Droplets size={170} className="absolute text-white/10" strokeWidth={1} />
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="relative bg-white rounded-2xl shadow-2xl px-8 py-6 text-center">
            <p className="text-l-text-muted text-sm font-semibold mb-1">קריאת אבחון</p>
            <p className="text-5xl font-black text-l-primary leading-none mb-1">350<span className="text-2xl">₪</span></p>
            <p className="text-l-accent font-black text-sm">מתקזזת מהעבודה</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
