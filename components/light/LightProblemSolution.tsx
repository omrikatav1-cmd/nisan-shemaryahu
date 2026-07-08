"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import type { ProblemSolution, ServiceIcon } from "@/lib/serviceContent";
import { SERVICE_ICONS } from "@/lib/serviceIcons";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";

export default function LightProblemSolution({ problem, icon }: { problem: ProblemSolution; icon: ServiceIcon }) {
  const Icon = SERVICE_ICONS[icon];

  return (
    <section className="py-20 px-4 sm:px-6 bg-l-surface">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-right"
        >
          <p className="text-l-accent text-xs font-black tracking-[0.2em] uppercase mb-2">{problem.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-black leading-[1.1] mb-4">
            {problem.headline}
            <br />
            <span style={{ color: "var(--color-l-accent)" }}>{problem.headlineAccent}</span>
          </h2>
          <p className="text-l-text-2 leading-relaxed mb-6 max-w-lg mr-0 ml-auto">{problem.body}</p>
          <a
            href={OWNER_PHONE_HREF}
            className="inline-flex items-center gap-2 bg-l-primary hover:bg-l-primary-dim text-white font-black px-6 py-3.5 rounded-xl transition-colors shadow-[0_8px_24px_rgba(20,57,94,0.25)]"
          >
            <Phone size={16} />
            <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden noise"
          style={{
            background: "linear-gradient(135deg, var(--color-l-primary) 0%, var(--color-l-primary-dim) 60%, var(--color-l-accent-dim) 130%)",
            boxShadow: "0 20px 50px rgba(20,57,94,0.28)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={104} className="text-white/25" strokeWidth={1.25} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
