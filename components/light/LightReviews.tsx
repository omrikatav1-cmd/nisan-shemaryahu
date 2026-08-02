"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Review } from "@/lib/serviceContent";
import LightSectionHeader from "@/components/light/LightSectionHeader";

// Renders nothing until real reviews exist — we never fabricate review cards.
export default function LightReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 bg-l-surface">
      <div className="max-w-6xl mx-auto">
        <LightSectionHeader eyebrow="חוות דעת מלקוחות" title="מה אומרים עליי" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="light-card p-6 text-right">
              <div className="flex justify-end gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} className={s < r.rating ? "text-l-accent fill-l-accent" : "text-l-border-bright"} />
                ))}
              </div>
              <p className="text-l-text-2 text-sm leading-relaxed mb-4">{r.text}</p>
              <p className="font-black text-sm text-l-text">
                {r.name}{r.city ? ` · ${r.city}` : ""}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
