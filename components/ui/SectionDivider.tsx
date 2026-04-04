"use client";

import { motion } from "framer-motion";

interface Props {
  accentColor?: string;
  flip?: boolean;
}

export default function SectionDivider({
  accentColor = "#3B82F6",
  flip = false,
}: Props) {
  const clipPath = flip
    ? "polygon(0 0, 100% 60%, 100% 100%, 0 100%)"
    : "polygon(0 0, 100% 0, 100% 100%, 0 40%)";

  return (
    <div className="relative h-16 sm:h-24 w-full overflow-visible pointer-events-none">
      {/* Angled shape */}
      <div
        className="absolute inset-0"
        style={{
          clipPath,
          background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 60%)`,
        }}
      />

      {/* Glowing accent line along the diagonal */}
      <motion.div
        className="absolute inset-x-0 h-px"
        style={{
          top: flip ? "30%" : "70%",
          background: `linear-gradient(90deg, transparent 5%, ${accentColor}50 35%, ${accentColor}90 50%, ${accentColor}50 65%, transparent 95%)`,
          transform: flip ? "rotate(-1.5deg)" : "rotate(1.5deg)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Glow bloom */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-64 h-8"
        style={{
          top: flip ? "20%" : "60%",
          background: `radial-gradient(ellipse, ${accentColor}18 0%, transparent 70%)`,
          filter: "blur(16px)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  );
}
