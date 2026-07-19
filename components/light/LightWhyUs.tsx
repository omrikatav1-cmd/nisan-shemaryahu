"use client";

import { motion } from "framer-motion";
import type { WhyUsItem } from "@/lib/serviceContent";
import { SERVICE_ICONS } from "@/lib/serviceIcons";
import LightSectionHeader from "@/components/light/LightSectionHeader";

export default function LightWhyUs({ items }: { items: WhyUsItem[] }) {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <LightSectionHeader eyebrow="למה ניסן" title="היתרונות שלי" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, i) => {
            const Icon = SERVICE_ICONS[item.icon];
            const accent = i % 2 === 1;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="light-card p-6 flex items-start gap-4"
              >
                <div
                  className={`w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center ${
                    accent ? "bg-l-accent/10 border border-l-accent/25" : "bg-l-primary/8 border border-l-primary/20"
                  }`}
                >
                  <Icon size={20} className={accent ? "text-l-accent" : "text-l-primary"} />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1">{item.title}</h3>
                  <p className="text-l-text-2 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
