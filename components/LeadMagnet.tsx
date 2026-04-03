"use client";

import { motion } from "framer-motion";
import { Tag, ArrowLeft } from "lucide-react";

const PROMO_TEXT = "בדיקת נזילות תרמית ב-1,400₪ בלבד – כולל דוח לביטוח!";

export default function LeadMagnet() {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 via-[#1E293B] to-[#3B82F6]/10"
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-full bg-[#D4AF37]/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-full bg-[#3B82F6]/5 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8">
            {/* Icon */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
              <Tag size={24} className="text-[#D4AF37]" />
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-right">
              <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1">
                מבצע השקה
              </p>
              <h3
                className="text-xl sm:text-2xl font-black text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {PROMO_TEXT}
              </h3>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="flex-shrink-0 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8960F] text-[#0F172A] font-black text-sm px-6 py-3 rounded-[0.625rem] transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer whitespace-nowrap"
            >
              <span>צרו קשר לפרטים</span>
              <ArrowLeft size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
