"use client";

import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/serviceContent";

export default function LightFAQ({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-right mb-10">
          <p className="text-l-accent text-xs font-black tracking-[0.2em] uppercase mb-2">שאלות נפוצות</p>
          <h2 className="text-3xl sm:text-4xl font-black">מה שואלים אותי הכי הרבה</h2>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <details key={item.question} className="light-card group px-5 py-1">
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-bold text-l-text">
                {item.question}
                <ChevronDown size={18} className="text-l-text-muted transition-transform group-open:rotate-180 flex-shrink-0" />
              </summary>
              <p className="text-l-text-2 text-sm leading-relaxed pb-4">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
