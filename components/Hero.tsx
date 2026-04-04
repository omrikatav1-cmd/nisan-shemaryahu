"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Phone, Thermometer, Shield, Clock } from "lucide-react";
import { useRef } from "react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stats = [
  { icon: Thermometer, value: "FLIR",    label: "מצלמה תרמית" },
  { icon: Shield,      value: "אחריות", label: "בכתב" },
  { icon: Clock,       value: "24/7",   label: "זמינות חירום" },
];

function Orb({ className, delay = 0, duration = 9 }: { className: string; delay?: number; duration?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.14, 1], opacity: [0.6, 1, 0.6], x: [0, 20, -14, 0], y: [0, -14, 8, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity   = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6"
    >
      {/* ─── Background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.030]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.7) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Gradient mesh -- off-center orbs for depth */}
        <Orb className="absolute top-[15%] right-[10%] w-[700px] h-[700px] rounded-full bg-[#3B82F6]/6 blur-[160px]" delay={0} duration={9} />
        <Orb className="absolute bottom-[20%] left-[15%] w-[450px] h-[450px] rounded-full bg-[#D4AF37]/5 blur-[130px]" delay={2.5} duration={11} />
        <Orb className="absolute top-[60%] right-[5%] w-[280px] h-[280px] rounded-full bg-[#3B82F6]/4 blur-[100px]" delay={1.5} duration={7} />
        {/* Diagonal accent stripe */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background: "repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(59,130,246,0.3) 80px, rgba(59,130,246,0.3) 81px)",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent" />
      </div>

      {/* ─── Content -- asymmetric: right-aligned on desktop ──── */}
      <motion.div
        style={{ y: headlineY, opacity }}
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        <div className="max-w-3xl mr-0 ml-auto sm:mr-0 lg:mr-0 text-right">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-xs font-bold text-[#D4AF37] mb-10 border border-[#D4AF37]/25"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            זמין 24/7 | אור יהודה והסביבה
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.8 }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] mb-12"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-white">ניסן שמריהו –</span>
            <br />
            <span className="text-gold">כשמקצועיות</span>
            <br />
            <span className="text-gold">פוגשת שקט.</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mb-14"
          >
            <ScrollRevealText
              text="מוצאים את הנזילה, מתקנים אותה, ומסיימים בלי לפוצץ לך את הבית. נזילות, סתימות, צנרת ישנה – הכל בידיים טובות."
              className="text-2xl sm:text-3xl font-black leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-heading)" } as React.CSSProperties}
              colorFrom="#1e3451"
              colorTo="#F1F5F9"
              pageScroll={[60, 450]}
            />
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <motion.a
              href="#diagnostic"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-black text-base px-8 py-4 rounded-xl transition-colors duration-200 hover:shadow-[0_8px_32px_rgba(59,130,246,0.45)] cursor-pointer"
            >
              קבל הצעת מחיר חינם
              <motion.span
                className="inline-block"
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowLeft size={18} />
              </motion.span>
            </motion.a>
            <motion.a
              href="tel:0509911241"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 glass-bright text-white font-bold text-base px-8 py-4 rounded-xl hover:border-white/25 transition-all duration-200 cursor-pointer"
            >
              <Phone size={17} />
              <span dir="ltr">050-9911241</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Stats -- offset to the left to break symmetry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="flex flex-wrap gap-4 justify-start"
        >
          {stats.map(({ icon: Icon, value, label }, idx) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.68 + idx * 0.08, ease: EASE }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="glass rounded-xl px-6 py-3.5 flex items-center gap-3 min-w-[130px] cursor-default"
            >
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                <Icon size={17} className="text-[#3B82F6]" />
              </div>
              <div className="text-right">
                <p className="text-white font-black text-sm leading-none mb-0.5">{value}</p>
                <p className="text-[#64748B] text-xs">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
