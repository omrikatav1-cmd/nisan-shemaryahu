"use client";

import { motion } from "framer-motion";

interface Props {
  size?: number;
  color?: string;
  delay?: number;
}

export default function AnimatedCheckmark({ size = 88, color = "#22C55E", delay = 0 }: Props) {
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer glow ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="48"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.2"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1.3, opacity: 0 }}
        transition={{ duration: 1.2, delay: delay + 0.8, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Middle glow ring */}
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.25"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 0 }}
        transition={{ duration: 1.0, delay: delay + 1.0, repeat: Infinity, repeatDelay: 1.5 }}
      />

      {/* Background fill */}
      <motion.circle
        cx="50"
        cy="50"
        r="44"
        fill={`${color}12`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.1, ease }}
      />

      {/* Main circle stroke – draws itself */}
      <motion.circle
        cx="50"
        cy="50"
        r="44"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
        animate={{ pathLength: 1, opacity: 1, rotate: -90 }}
        transition={{ duration: 0.65, delay: delay, ease }}
        style={{ originX: "50px", originY: "50px" }}
      />

      {/* Checkmark path */}
      <motion.path
        d="M 27 50 L 43 67 L 73 33"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: delay + 0.55, ease }}
      />
    </svg>
  );
}
