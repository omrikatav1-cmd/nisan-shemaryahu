"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, FileText, Thermometer, Star, Wrench } from "lucide-react";

const TRUST_ITEMS = [
  { icon: ShieldCheck, text: "מוסמך משרד העבודה" },
  { icon: Award,       text: "אחריות בכתב לכל עבודה" },
  { icon: FileText,    text: "דוח לחברת הביטוח" },
  { icon: Thermometer, text: "מצלמה תרמית FLIR" },
  { icon: Star,        text: "ידיים של זהב" },
  { icon: Wrench,      text: "Grohe & Geberit" },
];

const DOUBLED = [...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS];

export default function TrustBar() {
  return (
    <section className="py-14 overflow-hidden relative">
      {/* Angled top line */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(59,130,246,0.35) 50%, transparent 95%)",
          transform: "rotate(-0.5deg)",
        }}
      />
      {/* Angled bottom line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.25) 50%, transparent 95%)",
          transform: "rotate(0.5deg)",
        }}
      />

      {/* Fade edges */}
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0  w-28 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="marquee-wrap"
      >
        <div className="marquee-track">
          {DOUBLED.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 mx-8 whitespace-nowrap flex-shrink-0">
                <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/12 border border-[#3B82F6]/20 flex items-center justify-center shadow-[0_2px_8px_rgba(59,130,246,0.12)]">
                  <Icon size={13} className="text-[#3B82F6]" />
                </div>
                <span className="text-sm font-semibold text-[#CBD5E1]">{item.text}</span>
                <span className="text-[#D4AF37]/40 text-xs mx-1">&diams;</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
