"use client";

import { motion } from "framer-motion";
import { Tag, ArrowLeft } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const PROMO_TEXT = "בדיקת נזילות תרמית ב-1,400₪ בלבד – כולל דוח לביטוח!";

export default function LeadMagnet() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 via-[#1E293B] to-[#3B82F6]/10"
        >
          {/* Diagonal accent stripe */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              background: "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(212,175,55,0.4) 60px, rgba(212,175,55,0.4) 61px)",
            }}
          />

          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-full bg-[#D4AF37]/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-full bg-[#3B82F6]/5 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-7 sm:p-10">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
              className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
            >
              <Tag size={24} className="text-[#D4AF37]" />
            </motion.div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-right">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1.5"
              >
                מבצע השקה
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="text-xl sm:text-2xl font-black text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {PROMO_TEXT}
              </motion.h3>
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8960F] text-[#0F172A] font-black text-sm px-6 py-3 rounded-[0.625rem] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(212,175,55,0.35)] cursor-pointer whitespace-nowrap"
            >
              <span>צרו קשר לפרטים</span>
              <ArrowLeft size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
