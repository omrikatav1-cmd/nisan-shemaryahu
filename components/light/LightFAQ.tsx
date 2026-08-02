"use client";

import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/serviceContent";
import LightSectionHeader from "@/components/light/LightSectionHeader";
import { CONTENT_LAST_UPDATED } from "@/lib/siteConfig";

export default function LightFAQ({ items, heading = "מה שואלים אותי הכי הרבה" }: { items: FaqItem[]; heading?: string }) {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <LightSectionHeader eyebrow="שאלות נפוצות" title={heading} />

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

        <p className="text-xs text-l-text-muted mt-6 text-center">עודכן לאחרונה: {CONTENT_LAST_UPDATED}</p>
      </div>
    </section>
  );
}
