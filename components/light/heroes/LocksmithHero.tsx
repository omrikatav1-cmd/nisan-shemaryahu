"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, KeyRound, ShieldCheck, Clock } from "lucide-react";
import type { ServiceConfig } from "@/lib/serviceContent";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Locksmith hero — EMERGENCY framing. Phone is the dominant action,
// "available now" pulse, steel+alarm-red panel with a lock motif.
export default function LocksmithHero({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
  const headline = cityName ? `ננעלת בחוץ ב${cityName}?` : service.heroHeadline;

  return (
    <section className="relative overflow-hidden bg-l-bg">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-0 items-stretch">
        {/* Text column (right in RTL) */}
        <div className="px-4 sm:px-6 py-14 lg:py-20 text-right flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 self-end bg-l-accent/12 border border-l-accent/35 text-l-accent text-xs font-black px-4 py-2 rounded-full mb-6"
          >
            <motion.span className="w-2 h-2 rounded-full bg-l-accent"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            {service.heroEyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-4"
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

          {/* Phone dominant, WhatsApp secondary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="flex flex-col sm:flex-row gap-3 justify-end"
          >
            <a href={OWNER_PHONE_HREF}
              className="flex items-center justify-center gap-2 bg-l-accent hover:bg-l-accent-dim text-white font-black text-lg px-7 py-4 rounded-xl transition-colors shadow-[0_10px_30px_rgba(192,57,43,0.35)]">
              <Phone size={20} />
              <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
            </a>
            <a href={getSosWhatsAppUrl(service.whatsappIssueLabel)} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-l-surface border border-l-border-bright hover:border-l-primary text-l-primary font-black px-6 py-4 rounded-xl transition-colors">
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

        {/* Visual panel (left in RTL) — steel gradient + lock motif */}
        <div className="relative min-h-[240px] lg:min-h-full overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--color-l-primary), var(--color-l-primary-dim))" }}>
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(circle at 30% 30%, #fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <KeyRound size={150} className="text-white/90" strokeWidth={1.3} />
              <div className="absolute -bottom-3 -left-3 w-14 h-14 rounded-2xl bg-l-accent flex items-center justify-center shadow-lg">
                <ShieldCheck size={26} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
