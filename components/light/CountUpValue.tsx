"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Purely numeric values ("1,000+", "11") animate 0→target on first view;
// non-numeric values ("24/6", "מוסמך") render as-is. Shared by LightStats
// (page-body counter section) and the hero mini stats row.
export default function CountUpValue({ value, className }: { value: string; className?: string }) {
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
    <div ref={ref} dir="ltr" className={className}>
      {target === null ? value : `${n.toLocaleString("en-US")}${suffix}`}
    </div>
  );
}
