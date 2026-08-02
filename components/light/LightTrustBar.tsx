"use client";

import { ShieldCheck } from "lucide-react";

export default function LightTrustBar({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <section className="py-6 border-y border-l-border bg-l-surface overflow-hidden relative">
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-l-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-l-surface to-transparent z-10 pointer-events-none" />
      <div className="marquee-wrap">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-2 mx-8 whitespace-nowrap flex-shrink-0">
              <ShieldCheck size={15} className="text-l-primary" />
              <span className="text-sm font-semibold text-l-text-2">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
