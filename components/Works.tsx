"use client";

import { motion, type Variants } from "framer-motion";
import { Thermometer, Wrench, PipetteIcon, AlertTriangle, Construction, CheckCircle2 } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ThermalGrid({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => {
          const heat = Math.sin((row + col) * 0.7) * 0.5 + 0.5;
          const r = Math.round(30 + heat * 200);
          const g = Math.round(20 + (1 - heat) * 80);
          const b = Math.round(180 - heat * 150);
          return (
            <rect
              key={`${row}-${col}`}
              x={col * 20}
              y={row * 20}
              width="20"
              height="20"
              fill={`rgb(${r},${g},${b})`}
              opacity={0.7}
            />
          );
        })
      )}
      <rect x="60" y="40" width="80" height="120" fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 3" opacity="0.9" />
      <circle cx="100" cy="100" r="8" fill={color} opacity="0.8" />
      <line x1="100" y1="80" x2="100" y2="120" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="80" y1="100" x2="120" y2="100" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function PipeIllustration({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full opacity-40 group-hover:opacity-60 transition-opacity">
      <path d="M20 80 H80 V40 H120 V80 H180" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="80" cy="80" r="6" fill={color} opacity="0.6" />
      <circle cx="120" cy="40" r="6" fill={color} opacity="0.6" />
      <circle cx="80" cy="40" r="6" fill={color} opacity="0.6" />
      <circle cx="120" cy="80" r="6" fill={color} opacity="0.6" />
      <path d="M30 120 H90 V100" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M170 120 H110 V100" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

const works = [
  {
    id: 1,
    title: "איתור נזילה תרמית",
    sub: "דירה, תל אביב",
    tag: "הדמיה FLIR",
    tagColor: "#3B82F6",
    gradient: "from-[#0a1f3d] to-[#153254]",
    size: "tall",
    icon: Thermometer,
    visual: "thermal",
    stats: [
      { label: "זמן אבחון", value: "45 דק׳" },
      { label: "חיסכון", value: "~12,000₪" },
    ],
    result: "אותרה נזילה מאחורי קיר המטבח ללא פירוק",
  },
  {
    id: 2,
    title: "ניאגרה סמויה Geberit",
    sub: "פנטהאוז, רמת גן",
    tag: "יוקרה",
    tagColor: "#D4AF37",
    gradient: "from-[#261a05] to-[#3a2a0c]",
    size: "normal",
    icon: Construction,
    visual: "icon",
    result: "התקנה מושלמת עם אחריות 5 שנים",
  },
  {
    id: 3,
    title: "שיקום צנרת PEX",
    sub: "בניין, גבעתיים",
    tag: "תשתית",
    tagColor: "#22C55E",
    gradient: "from-[#072314] to-[#0f3520]",
    size: "normal",
    icon: PipetteIcon,
    visual: "pipes",
    result: "החלפת 120 מ׳ צנרת ישנה ב-3 ימים",
  },
  {
    id: 4,
    title: "פיצוץ צינור חירום",
    sub: "אור יהודה",
    tag: "חירום 24/7",
    tagColor: "#EF4444",
    gradient: "from-[#270808] to-[#3b1010]",
    size: "wide",
    icon: AlertTriangle,
    visual: "icon",
    stats: [
      { label: "זמן הגעה", value: "32 דק׳" },
      { label: "זמן תיקון", value: "1.5 שעות" },
    ],
    result: "הצפה נעצרה, צינור הוחלף באותו הלילה",
  },
  {
    id: 5,
    title: "מערכת ביוב מלאה",
    sub: "בית פרטי, בת ים",
    tag: "תשתית",
    tagColor: "#22C55E",
    gradient: "from-[#0e1c38] to-[#182e58]",
    size: "normal",
    icon: Wrench,
    visual: "pipes",
    result: "שדרוג מלא של מערכת הביוב",
  },
];

const card: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export default function Works() {
  return (
    <section id="works" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-6"
        >
          <p className="text-[#3B82F6] text-xs font-black tracking-[0.25em] uppercase mb-3">
            גלריה
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            עבודות <span className="text-gold">נבחרות</span>
          </h2>
        </motion.div>

        {/* Scroll-reveal tagline */}
        <div className="text-center mb-14">
          <ScrollRevealText
            text="עבודה שמדברת בעד עצמה. תוצאות אמיתיות, לקוחות מרוצים."
            className="text-[#94A3B8] text-lg max-w-md mx-auto"
            colorFrom="#2d3f55"
            colorTo="#94A3B8"
          />
        </div>

        {/* Masonry grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]"
        >
          {works.map((w) => {
            const Icon = w.icon;
            return (
              <motion.div
                key={w.id}
                variants={card}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className={[
                  "glass-bright rounded-2xl overflow-hidden group cursor-pointer relative noise",
                  w.size === "tall" ? "row-span-2" : "",
                  w.size === "wide" ? "col-span-2" : "",
                ].join(" ")}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${w.gradient}`} />

                {/* Visual illustration */}
                <div className="absolute inset-0 overflow-hidden">
                  {w.visual === "thermal" && (
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                      <ThermalGrid color={w.tagColor} />
                    </div>
                  )}
                  {w.visual === "pipes" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PipeIllustration color={w.tagColor} />
                    </div>
                  )}
                  {w.visual === "icon" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <Icon size={120} className="text-white" strokeWidth={0.5} />
                    </div>
                  )}
                </div>

                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* Hover overlay with result */}
                <motion.div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 p-5">
                  <div className="text-center">
                    <CheckCircle2 size={24} className="text-[#22C55E] mx-auto mb-2" />
                    <p className="text-white text-sm font-bold leading-snug">{w.result}</p>
                    {w.stats && (
                      <div className="flex gap-4 justify-center mt-3">
                        {w.stats.map((s) => (
                          <div key={s.label} className="text-center">
                            <p className="text-xs text-[#64748B]">{s.label}</p>
                            <p className="text-sm font-black" style={{ color: w.tagColor }}>{s.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Icon badge top-left */}
                <div className="absolute top-3 left-3 z-10">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-sm"
                    style={{
                      background: `${w.tagColor}20`,
                      border: `1px solid ${w.tagColor}30`,
                    }}
                  >
                    <Icon size={16} style={{ color: w.tagColor }} />
                  </div>
                </div>

                {/* Label */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-10">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">
                        {w.title}
                      </p>
                      <p className="text-[#94A3B8] text-xs mt-0.5">{w.sub}</p>
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{
                        color: w.tagColor,
                        background: `${w.tagColor}20`,
                        border: `1px solid ${w.tagColor}35`,
                      }}
                    >
                      {w.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://wa.me/972509911241?text=היי ניסן, אני מעוניין לראות עוד עבודות שלך"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white text-sm transition-all cursor-pointer border border-white/8 hover:border-white/22 rounded-xl px-6 py-3 hover:bg-white/4"
          >
            ראה עוד עבודות בוואטסאפ ←
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
