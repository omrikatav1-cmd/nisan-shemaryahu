"use client";

import { motion, type Variants } from "framer-motion";
import { Layers, GitBranch, ArrowUpLeft } from "lucide-react";
import ScanLine from "@/components/ui/ScanLine";
import PulseRings from "@/components/ui/PulseRings";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const services = [
  {
    id: "thermal",
    bento: "bento-1",
    badge: "מצלמה תרמית FLIR",
    badgeColor: "#22C55E",
    accentColor: "#3B82F6",
    title: "איתור נזילות",
    subtitle: "בלי לשבור קיר",
    description:
      "עם מצלמה תרמית מוצאים בדיוק איפה הנזילה – לפני שפותחים קירות. חוסך לך כסף ועוגמת נפש. דוח מסודר לחברת הביטוח אם צריך.",
    price: "1,400₪ – 1,850₪",
    priceLabel: "אבחון",
    iconType: "scan",
  },
  {
    id: "installation",
    bento: "bento-2",
    badge: "Grohe / Geberit",
    badgeColor: "#D4AF37",
    accentColor: "#D4AF37",
    title: "התקנות",
    subtitle: "כל הפרטים חשובים",
    description:
      "ניאגרות סמויות, מקלחות, כיורים ואסלות. עבודה מסודרת עם ציוד איכותי שמחזיק לאורך זמן.",
    price: null,
    priceLabel: null,
    iconType: "layers",
  },
  {
    id: "infra",
    bento: "bento-3",
    badge: "SP / PEX",
    badgeColor: "#3B82F6",
    accentColor: "#3B82F6",
    title: "החלפת צנרת",
    subtitle: "פתרון לטווח ארוך",
    description:
      "צנרת ישנה? מחליפים בשיטות מוכחות – PEX ו-SP. פחות תקלות, יותר שקט לשנים קדימה. אחריות בכתב.",
    price: null,
    priceLabel: null,
    iconType: "pipe",
  },
  {
    id: "emergency",
    bento: "bento-4",
    badge: "24/7",
    badgeColor: "#EF4444",
    accentColor: "#EF4444",
    title: "חירום? אנחנו בדרך",
    subtitle: "אור יהודה והסביבה",
    description:
      'פיצוץ צינור, סתימה, נזילה שלא מפסיקה – עונים ומגיעים מהר. זמינות מלאה 24/7 ברדיוס 20 ק"מ.',
    price: null,
    priceLabel: null,
    iconType: "pulse",
  },
];

function ServiceIcon({ type, color }: { type: string; color: string }) {
  if (type === "scan")   return <ScanLine color={color} width={48} height={48} />;
  if (type === "pulse")  return <PulseRings color={color} size={48} />;
  if (type === "layers") return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
      <Layers size={22} style={{ color }} />
    </div>
  );
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
      <GitBranch size={22} style={{ color }} />
    </div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function ResponseTimer({ color }: { color: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 mt-3"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
    >
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ background: color }}
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <span className="text-xs font-bold" style={{ color }}>≤ 60 דקות מענה</span>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6">
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
            מה אני עושה
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            שירותי <span className="text-gold">אינסטלציה</span>
          </h2>
        </motion.div>

        {/* Scroll-reveal tagline */}
        <div className="text-center mb-14">
          <ScrollRevealText
            text="עבודה נקייה, חומרים איכותיים, ואחריות בכתב. כל פעם."
            className="text-xl sm:text-2xl font-black max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-heading)" } as React.CSSProperties}
            colorFrom="#1a2d44"
            colorTo="#CBD5E1"
          />
        </div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="bento-grid"
        >
          {services.map((svc) => (
            <motion.div
              key={svc.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`${svc.bento} glass-bright rounded-2xl p-6 sm:p-8 relative overflow-hidden group cursor-default noise`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 30%, ${svc.accentColor}20, transparent 65%)` }}
              />

              {/* Top accent line */}
              <motion.div
                className="absolute top-0 inset-x-0 h-[1.5px]"
                style={{ background: `linear-gradient(90deg, transparent, ${svc.accentColor}70, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              />

              <div className="relative z-10 h-full flex flex-col">
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-5">
                  <ServiceIcon type={svc.iconType} color={svc.accentColor} />
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full border"
                    style={{ color: svc.badgeColor, background: `${svc.badgeColor}12`, borderColor: `${svc.badgeColor}35` }}
                  >
                    {svc.badge}
                  </span>
                </div>

                {/* Titles */}
                <h3
                  className="text-xl sm:text-2xl font-black text-white mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm font-semibold mb-3" style={{ color: svc.accentColor }}>
                  {svc.subtitle}
                </p>

                <p className="text-[#94A3B8] text-sm leading-relaxed flex-1">{svc.description}</p>

                {svc.id === "emergency" && <ResponseTimer color={svc.accentColor} />}

                {/* Price / CTA */}
                <div className="mt-6 pt-4 border-t border-white/6 flex items-center justify-between">
                  {svc.price ? (
                    <div>
                      <p className="text-[#64748B] text-xs mb-0.5">{svc.priceLabel}</p>
                      <p className="text-[#D4AF37] font-black text-lg">{svc.price}</p>
                    </div>
                  ) : (
                    <p className="text-[#64748B] text-xs">לפי גודל עבודה</p>
                  )}
                  <motion.a
                    href="#diagnostic"
                    whileHover={{ scale: 1.12, rotate: -8 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer"
                    style={{ background: `${svc.accentColor}18`, border: `1px solid ${svc.accentColor}30`, color: svc.accentColor }}
                    aria-label={`הצעת מחיר עבור ${svc.title}`}
                  >
                    <ArrowUpLeft size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
