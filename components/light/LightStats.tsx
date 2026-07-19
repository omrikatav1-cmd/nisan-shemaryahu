"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Bio-Israel-style count-up: purely numeric values ("1,000+", "11") animate
// 0→target on first view; non-numeric values ("24/6", "עד שעתיים") render as-is.
function CountUpValue({ value }: { value: string }) {
  const match = value.match(/^([\d,]+)(\+?)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (target === null || !inView) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1200);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div ref={ref} dir="ltr" className="text-3xl sm:text-4xl font-black text-white mb-1">
      {target === null ? value : `${n.toLocaleString("en-US")}${suffix}`}
    </div>
  );
}

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
            <CountUpValue value={s.value} />
            <div className="text-xs sm:text-sm font-semibold text-white/70">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
