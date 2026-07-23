"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Contact,
  Share2,
  Check,
  MapPin,
  Clock,
  ShieldCheck,
  DoorOpen,
  Droplets,
  Hammer,
  ArrowLeft,
} from "lucide-react";
import {
  BRAND_NAME,
  CARD_URL,
  COMPLIANCE,
  OWNER_PHONE_DISPLAY,
  OWNER_PHONE_HREF,
  OWNER_PHONE_INTL,
  SERVICE_AREA_CITIES,
  SERVICE_SITE_URLS,
} from "@/lib/siteConfig";

const WHATSAPP_URL = `https://wa.me/${OWNER_PHONE_INTL}`;
const VCF_URL = "/card/contact.vcf";
// Brand/hub site = the locksmith deployment (its root renders the locksmith funnel).
const FULL_SITE_URL = SERVICE_SITE_URLS.locksmith;

const TRADES = [
  {
    icon: DoorOpen,
    label: "מנעולנות",
    // מוסמך shown only while the certification is actually in hand.
    detail: COMPLIANCE.locksmithCertified ? "מוסמך · אישור משטרה" : "פריצה, צילינדרים ומנעולים",
    url: SERVICE_SITE_URLS.locksmith,
  },
  {
    icon: Droplets,
    // No "מוסמך" next to plumbing until COMPLIANCE.plumbingCertified flips.
    label: "אינסטלציה",
    detail: "סתימות, נזילות ודודים",
    url: SERVICE_SITE_URLS.plumbing,
  },
  {
    icon: Hammer,
    label: "הנדימן",
    detail: "תיקונים, הרכבות והתקנות",
    url: SERVICE_SITE_URLS.handyman,
  },
];

// Faint downward-chevron texture for the header band (matches the reference card).
const CHEVRON_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 8l20 12L40 8' fill='none' stroke='%23ffffff' stroke-opacity='0.05' stroke-width='2'/%3E%3Cpath d='M0 24l20 12 20-12' fill='none' stroke='%23ffffff' stroke-opacity='0.05' stroke-width='2'/%3E%3C/svg%3E\")";

const reveal = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export default function BusinessCard() {
  const [copied, setCopied] = useState(false);

  async function share() {
    const data = {
      title: BRAND_NAME,
      text: "ניסן שמריהו — מנעולן, אינסטלטור והנדימן באור יהודה והסביבה",
      url: CARD_URL,
    };
    if (navigator.share) {
      await navigator.share(data).catch(() => {}); // user cancelled — not an error
      return;
    }
    await navigator.clipboard.writeText(CARD_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <main
      id="main-content"
      dir="rtl"
      className="light-page min-h-screen px-4 pt-6 pb-28 sm:pb-14"
    >
      <div className="max-w-md mx-auto">
        {/* Header band — brand navy, chevron texture, rounded */}
        <motion.header
          {...reveal}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="hero-dark relative overflow-hidden rounded-3xl text-center px-6 pt-9 pb-8"
          style={{
            background:
              "radial-gradient(130% 100% at 80% 0%, var(--color-l-primary), var(--color-l-primary-dim))",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: CHEVRON_BG, backgroundSize: "40px 40px" }}
          />
          <div className="relative">
            {/* Monogram — swap for Nisan's real portrait once shot (brief §13). */}
            <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white/12 border-4 border-white/85 flex items-center justify-center text-white font-black text-3xl shadow-lg">
              נ״ש
            </div>
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              <ShieldCheck size={14} aria-hidden="true" />
              מנעולן מוסמך · אישור משטרה
            </span>
            <h1 className="text-white text-3xl font-black mb-1">{BRAND_NAME}</h1>
            <p className="text-white/85 font-bold text-lg">מנעולן · אינסטלטור · הנדימן</p>
            <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 mt-4 text-white/75 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" /> אור יהודה והסביבה
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" /> זמין לפניות 24/6
              </span>
            </div>
          </div>
        </motion.header>

        {/* Primary actions — 3 big icon tiles (call / whatsapp / save) */}
        <motion.section
          {...reveal}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          aria-label="יצירת קשר"
          className="grid grid-cols-3 gap-3 mt-4"
        >
          <a
            href={OWNER_PHONE_HREF}
            className="light-card flex flex-col items-center gap-2 py-4 group"
          >
            <span className="w-12 h-12 rounded-full bg-l-primary text-white flex items-center justify-center group-hover:bg-l-primary-dim transition-colors">
              <Phone size={20} aria-hidden="true" />
            </span>
            <span className="font-bold text-sm text-l-text">חיוג ישיר</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="light-card flex flex-col items-center gap-2 py-4 group"
          >
            <span className="w-12 h-12 rounded-full bg-l-accent text-white flex items-center justify-center group-hover:bg-l-accent-dim transition-colors">
              <MessageCircle size={20} aria-hidden="true" />
            </span>
            <span className="font-bold text-sm text-l-text">וואטסאפ</span>
          </a>
          <a
            href={VCF_URL}
            download
            className="light-card flex flex-col items-center gap-2 py-4 group"
          >
            <span className="w-12 h-12 rounded-full bg-l-primary/10 text-l-primary flex items-center justify-center group-hover:bg-l-primary group-hover:text-white transition-colors">
              <Contact size={20} aria-hidden="true" />
            </span>
            <span className="font-bold text-sm text-l-text text-center leading-tight">שמירה לאנשי קשר</span>
          </a>
        </motion.section>
        <p className="text-center text-l-text-2 text-sm mt-3" dir="ltr">
          {OWNER_PHONE_DISPLAY}
        </p>

        {/* Trades — the three funnels */}
        <motion.section
          {...reveal}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          aria-label="תחומי שירות"
          className="mt-5 space-y-3"
        >
          {TRADES.map((t) => (
            <a
              key={t.label}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="light-card flex items-center gap-4 px-5 py-4 group"
            >
              <span className="w-11 h-11 shrink-0 rounded-xl bg-l-primary/10 text-l-primary flex items-center justify-center">
                <t.icon size={22} aria-hidden="true" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-black text-l-text">{t.label}</span>
                <span className="block text-sm text-l-text-2">{t.detail}</span>
              </span>
              <ArrowLeft
                size={18}
                aria-hidden="true"
                className="shrink-0 text-l-text-muted group-hover:text-l-primary transition-colors"
              />
            </a>
          ))}
        </motion.section>

        {/* Full site + share */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-3 mt-5"
        >
          <a
            href={FULL_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-l-primary hover:bg-l-primary-dim text-white font-black px-5 py-4 rounded-2xl cta-glow-primary min-h-[54px]"
          >
            לאתר המלא
            <ArrowLeft size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={share}
            aria-label="שיתוף הכרטיס"
            className="w-14 shrink-0 flex items-center justify-center light-card text-l-primary hover:text-l-primary-dim"
          >
            {copied ? <Check size={20} aria-hidden="true" /> : <Share2 size={20} aria-hidden="true" />}
          </button>
        </motion.div>
        {copied && (
          <p className="text-center text-l-text-2 text-xs mt-2">הקישור הועתק</p>
        )}

        {/* Service area + QR */}
        <motion.section
          {...reveal}
          transition={{ duration: 0.45, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          aria-label="אזור שירות"
          className="light-card mt-5 px-5 py-6 text-center"
        >
          <h2 className="font-black text-lg mb-2">אזור שירות</h2>
          <p className="text-sm text-l-text-2 leading-relaxed">{SERVICE_AREA_CITIES.join(" · ")}</p>
          <div className="mt-6 pt-6 border-t border-l-text-muted/20">
            {/* Regenerate public/card-qr.svg when the real domain replaces CARD_URL. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG; next/image adds nothing for SVGs */}
            <img
              src="/card-qr.svg"
              alt={`קוד QR לפתיחת כרטיס הביקור של ${BRAND_NAME}`}
              width={140}
              height={140}
              className="mx-auto rounded-lg"
            />
            <p className="text-xs text-l-text-muted mt-3">סרקו כדי לפתוח ולשמור את הכרטיס</p>
          </div>
        </motion.section>

        <p className="text-center text-l-text-muted text-xs mt-6">
          כרטיס ביקור דיגיטלי · {BRAND_NAME}
        </p>
      </div>

      {/* Sticky mobile action bar — matches the site's funnel pattern (a11y widget floats above it) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-[60] flex border-t border-l-text-muted/20 bg-l-surface/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href={OWNER_PHONE_HREF}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 font-black text-sm text-l-primary border-e border-l-text-muted/20"
        >
          <Phone size={16} aria-hidden="true" /> חיוג
        </a>
        <a
          href={VCF_URL}
          download
          className="flex-1 flex items-center justify-center gap-2 py-3.5 font-black text-sm text-l-primary border-e border-l-text-muted/20"
        >
          <Contact size={16} aria-hidden="true" /> שמירה
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 font-black text-sm text-white bg-l-accent-dim"
        >
          <MessageCircle size={16} aria-hidden="true" /> וואטסאפ
        </a>
      </div>
    </main>
  );
}
