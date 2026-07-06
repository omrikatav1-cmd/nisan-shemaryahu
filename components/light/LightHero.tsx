"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Clock } from "lucide-react";
import type { ServiceConfig } from "@/lib/serviceContent";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function LightHero({ service }: { service: ServiceConfig }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6">
      {/* Depth: soft off-center radial tint + diagonal accent, not a flat fill */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-l-primary/6 blur-[110px]" />
        <div className="absolute top-1/3 right-[-10%] w-[320px] h-[320px] rounded-full bg-l-accent/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{ background: "repeating-linear-gradient(-45deg, transparent, transparent 90px, rgba(20,57,94,0.025) 90px, rgba(20,57,94,0.025) 91px)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-2xl text-right mr-0 ml-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 bg-l-primary/8 border border-l-primary/25 text-l-primary text-xs font-bold px-4 py-2 rounded-full mb-6"
          >
            {service.heroEyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] mb-5"
          >
            {service.heroHeadline}
            <br />
            <span style={{ color: "var(--color-l-accent)" }}>{service.heroHeadlineAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="text-lg text-l-text-2 mb-8 max-w-xl mr-0 ml-auto"
          >
            {service.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="flex flex-wrap gap-3 mb-8 justify-end"
          >
            <a
              href={OWNER_PHONE_HREF}
              className="flex items-center gap-2 bg-l-primary hover:bg-l-primary-dim text-white font-black px-6 py-4 rounded-xl transition-colors shadow-[0_8px_24px_rgba(20,57,94,0.25)]"
            >
              <Phone size={18} />
              <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
            </a>
            <a
              href={getSosWhatsAppUrl(service.whatsappIssueLabel)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-l-accent hover:bg-l-accent-dim text-white font-black px-6 py-4 rounded-xl transition-colors shadow-[0_8px_24px_rgba(201,122,43,0.3)]"
            >
              <MessageCircle size={18} />
              וואטסאפ עכשיו
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-2 justify-end"
          >
            {service.heroBadges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 bg-l-surface border border-l-border text-l-text-2 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Clock size={12} className="text-l-accent" />
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
