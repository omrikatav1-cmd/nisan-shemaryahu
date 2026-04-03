"use client";

import { motion } from "framer-motion";

interface Props {
  from?: string;
  to?: string;
  accentColor?: string;
}

export default function SectionDivider({
  accentColor = "#3B82F6",
}: Props) {
  return (
    <div className="relative h-px w-full overflow-visible pointer-events-none">
      {/* Main line */}
      <motion.div
        className="absolute inset-x-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentColor}40 30%, ${accentColor}80 50%, ${accentColor}40 70%, transparent 100%)`,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Glow blur */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[-10px] w-48 h-5"
        style={{ background: `${accentColor}20`, filter: "blur(12px)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      {/* Center diamond */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
        style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
    </div>
  );
}
