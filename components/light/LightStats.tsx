"use client";

import { motion } from "framer-motion";

export default function LightStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section
      className="relative overflow-hidden py-14 px-4 sm:px-6"
      style={{ background: "linear-gradient(115deg, var(--color-l-primary) 0%, var(--color-l-primary-dim) 55%, #0A1E33 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{ background: "repeating-linear-gradient(-45deg, transparent, transparent 90px, rgba(255,255,255,0.03) 90px, rgba(255,255,255,0.03) 91px)" }}
      />
      <div className="relative max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div dir="ltr" className="text-3xl sm:text-4xl font-black text-white mb-1">{s.value}</div>
            <div className="text-xs sm:text-sm font-semibold text-white/70">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
