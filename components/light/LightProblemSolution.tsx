"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import type { ProblemSolution, ServiceKey } from "@/lib/serviceContent";
import { SERVICE_PHOTO } from "@/lib/theme";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";

export default function LightProblemSolution({ problem, serviceKey }: { problem: ProblemSolution; serviceKey: ServiceKey }) {

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
          <span className="inline-flex items-center gap-2 bg-l-accent-dim/10 border border-l-accent-dim/30 text-l-accent-dim text-xs font-black px-4 py-1.5 rounded-full mb-3">{problem.eyebrow}</span>
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
          className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 20px 50px rgba(20,57,94,0.28)" }}
        >
          <Image src={SERVICE_PHOTO[serviceKey]} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
