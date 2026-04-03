"use client";

import { motion } from "framer-motion";

interface Props {
  color?: string;
  size?: number;
  rings?: number;
}

export default function PulseRings({ color = "#EF4444", size = 56, rings = 3 }: Props) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {Array.from({ length: rings }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            border: `1.5px solid ${color}`,
          }}
          initial={{ scale: 0.7, opacity: 0.6 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{
            duration: 2,
            delay: i * 0.65,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      {/* Center dot */}
      <motion.div
        className="relative z-10 rounded-full"
        style={{
          width: size * 0.55,
          height: size * 0.55,
          background: `${color}22`,
          border: `1px solid ${color}55`,
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
