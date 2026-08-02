"use client";

import { motion } from "framer-motion";
import type { ServiceItem } from "@/lib/serviceContent";
import { SERVICE_ICONS } from "@/lib/serviceIcons";
import LightSectionHeader from "@/components/light/LightSectionHeader";

export default function LightServices({ items, offer }: { items: ServiceItem[]; offer: string }) {
  return (
    <section id="services" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <LightSectionHeader eyebrow="מה אני עושה" title="השירותים" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, i) => {
            const Icon = SERVICE_ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="light-card p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-l-primary/8 border border-l-primary/20 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-l-primary" />
                </div>
                <h3 className="font-black text-lg mb-1.5">{item.title}</h3>
                <p className="text-l-text-2 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 bg-l-primary/6 border border-l-primary/20 rounded-xl px-6 py-4 text-l-primary font-semibold text-sm text-center">
          {offer}
        </div>
      </div>
    </section>
  );
}
