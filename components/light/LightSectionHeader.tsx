"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Bio-Israel-style section header: pill badge → title → subtitle, revealed in
// a stagger as the section scrolls into view. One source for every section.
export default function LightSectionHeader({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}) {
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay, ease: EASE },
  });

  return (
    <div className={center ? "text-center mb-10" : "text-right mb-10 max-w-xl mr-0 ml-auto"}>
      <motion.span
        {...reveal(0)}
        className="inline-flex items-center gap-2 bg-l-accent/10 border border-l-accent/30 text-l-accent text-xs font-black px-4 py-1.5 rounded-full mb-3"
      >
        {eyebrow}
      </motion.span>
      <motion.h2 {...reveal(0.1)} className="text-3xl sm:text-4xl font-black">
        {title}
      </motion.h2>
      {sub && (
        <motion.p {...reveal(0.2)} className="text-l-text-2 mt-3">
          {sub}
        </motion.p>
      )}
    </div>
  );
}
