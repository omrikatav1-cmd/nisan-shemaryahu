"use client";

import { motion } from "framer-motion";

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

/** Thermal-imaging scan beam that sweeps top→bottom on loop */
export default function ScanLine({ color = "#3B82F6", width = 56, height = 56 }: Props) {
  return (
    <div
      className="relative rounded-xl overflow-hidden flex items-center justify-center"
      style={{
        width,
        height,
        background: `${color}12`,
        border: `1px solid ${color}30`,
      }}
      aria-hidden="true"
    >
      {/* Grid dots */}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 opacity-25">
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * (width / 3.5) + width / 7}
              cy={row * (height / 3.5) + height / 7}
              r="1.2"
              fill={color}
            />
          ))
        )}
      </svg>

      {/* Sweep beam */}
      <motion.div
        className="absolute inset-x-0 h-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 8px 2px ${color}80`,
        }}
        initial={{ top: "8%" }}
        animate={{ top: ["8%", "88%", "8%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Thermometer icon */}
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" className="relative z-10">
        <path
          d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
