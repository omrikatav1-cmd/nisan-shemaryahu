"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import type { ServiceConfig } from "@/lib/serviceContent";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";
import CountUpValue from "@/components/light/CountUpValue";

export const HERO_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Full-bleed hero shell — bio-israel structure: one real photo fills the
// whole section (Pexels, licensed free-for-commercial-use — see
// public/images/hero-*.jpg), a dark gradient scrim sits over it for text
// contrast, content sits on top in white.
export function HeroShell({
  image,
  gradient,
  glow,
  children,
}: {
  image: string;
  gradient: string;
  glow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="hero-dark relative overflow-hidden noise">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: glow }}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32 text-right">
        {children}
      </div>
    </section>
  );
}

export function HeroBadge({ children, pulse }: { children: React.ReactNode; pulse?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: HERO_EASE }}
      className="inline-flex items-center gap-2 self-end bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-black px-4 py-2 rounded-full mb-6"
    >
      {pulse && (
        <motion.span className="w-2 h-2 rounded-full bg-l-accent"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
      )}
      {children}
    </motion.div>
  );
}

export function HeroHeadline({ headline, accent }: { headline: string; accent: string }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: HERO_EASE }}
      className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] mb-4 text-white"
    >
      {headline}
      <br />
      <span className="text-l-accent">{accent}</span>
    </motion.h1>
  );
}

export function HeroSub({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2, ease: HERO_EASE }}
      className="text-lg text-white/75 mb-7 max-w-lg mr-0 ml-auto"
    >
      {children}
    </motion.p>
  );
}

export function HeroCTAButtons({ service, phoneDominant }: { service: ServiceConfig; phoneDominant?: boolean }) {
  const phoneClass = phoneDominant
    ? "bg-l-accent hover:bg-l-accent-dim text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
    : "bg-white hover:bg-white/90 text-l-primary-dim";
  const waClass = phoneDominant
    ? "bg-white/10 backdrop-blur border border-white/25 hover:border-white/50 text-white"
    : "bg-l-accent hover:bg-l-accent-dim text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: HERO_EASE }}
      className="flex flex-col sm:flex-row gap-3 justify-end"
    >
      <a href={OWNER_PHONE_HREF} className={`flex items-center justify-center gap-2 font-black text-lg px-7 py-4 rounded-xl transition-colors ${phoneClass}`}>
        <Phone size={20} />
        <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
      </a>
      <a href={getSosWhatsAppUrl(service.whatsappIssueLabel)} target="_blank" rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 font-black px-6 py-4 rounded-xl transition-colors ${waClass}`}>
        <MessageCircle size={18} /> וואטסאפ
      </a>
    </motion.div>
  );
}

export function HeroBadgePills({ badges }: { badges: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 justify-end mt-6">
      {badges.map((b) => (
        <span key={b} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full">
          {b}
        </span>
      ))}
    </div>
  );
}

export function HeroStatsRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="flex justify-end gap-6 sm:gap-8 mt-9 pt-6 border-t border-white/15"
    >
      {stats.slice(0, 3).map((s) => (
        <div key={s.label} className="text-center">
          <CountUpValue value={s.value} className="text-xl sm:text-2xl font-black text-white" />
          <div className="text-[11px] sm:text-xs text-white/60 font-semibold mt-0.5">{s.label}</div>
        </div>
      ))}
    </motion.div>
  );
}
