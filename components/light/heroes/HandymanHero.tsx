"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Check } from "lucide-react";
import type { ServiceConfig } from "@/lib/serviceContent";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Handyman hero — CHECKLIST framing. The visual centerpiece is a live
// to-do list of home tasks getting ticked off, warm amber/wood panel.
const CHECKLIST = ["החלפת ברז", "תליית מדף / תמונה", "צביעת קיר", "תיקון גבס", "הרכבת רהיט"];

export default function HandymanHero({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
  const headline = cityName ? `רשימת תיקונים ב${cityName}?` : service.heroHeadline;

  return (
    <section className="relative overflow-hidden bg-l-bg">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-0 items-stretch">
        <div className="px-4 sm:px-6 py-14 lg:py-20 text-right flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex self-end items-center gap-2 bg-l-accent/12 border border-l-accent/35 text-l-accent text-xs font-bold px-4 py-2 rounded-full mb-6"
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
              className="flex items-center justify-center gap-2 bg-l-primary hover:bg-l-primary-dim text-white font-black px-7 py-4 rounded-xl transition-colors shadow-[0_10px_30px_rgba(20,57,94,0.28)]">
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
                <Check size={12} className="text-l-accent" /> {b}
              </span>
            ))}
          </div>
        </div>

        {/* Visual panel — warm gradient + a checklist ticking off */}
        <div className="relative min-h-[260px] lg:min-h-full overflow-hidden flex items-center justify-center px-8 py-10"
          style={{ background: "linear-gradient(135deg, var(--color-l-primary), var(--color-l-primary-dim))" }}>
          <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl p-5">
            <p className="text-l-text-muted text-xs font-bold mb-3 text-right">מה שצריך לתקן בבית</p>
            <ul className="flex flex-col gap-2.5" dir="rtl">
              {CHECKLIST.map((task, i) => (
                <motion.li key={task}
                  initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.12 }}
                  className="flex items-center gap-2.5 text-sm font-semibold text-l-text">
                  <span className="w-5 h-5 rounded-md bg-l-accent flex items-center justify-center flex-shrink-0">
                    <Check size={13} className="text-white" strokeWidth={3} />
                  </span>
                  {task}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
