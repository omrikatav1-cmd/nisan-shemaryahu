"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MessageCircle, KeyRound, Droplets, Hammer, ArrowLeft } from "lucide-react";
import { BRAND_NAME, BASE_CITY, OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";
import { SERVICE_LIST } from "@/lib/serviceContent";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";

const HUB_ICON = { locksmith: KeyRound, plumbing: Droplets, handyman: Hammer } as const;

// Short, honest one-liner per trade — not lifted from the funnel's own hero
// copy (that's tuned for someone who already searched that exact trade).
const HUB_PITCH = {
  locksmith: "נעילות, צילינדרים ומנעולי ביטחון.",
  plumbing: "סתימות, צנרת, דודים ותקלות חירום.",
  handyman: "כל התיקונים הקטנים בבית, בביקור אחד.",
} as const;

// Brand root — not a sealed funnel. Lists all 3 trades and links out to each
// one's own dedicated page; the funnels themselves never link back here or
// to each other (see docs/service-separation-tradeoffs.html).
export default function HomeHub() {
  return (
    <div className="light-page">
      <header className="sticky top-0 z-50 bg-l-surface/95 backdrop-blur border-b border-l-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/brand/logo-general-v2.png" alt="" width={38} height={38} className="rounded-full flex-shrink-0" priority />
            <span className="font-black text-l-text text-lg" style={{ fontFamily: "var(--font-heading)" }}>{BRAND_NAME}</span>
          </div>
          <a href={OWNER_PHONE_HREF} className="flex items-center gap-1.5 text-sm font-semibold text-l-text-2 hover:text-l-primary transition-colors">
            <Phone size={15} /><span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="py-20 px-4 sm:px-6 text-center" style={{ background: "linear-gradient(180deg, var(--color-l-bg) 0%, var(--color-l-surface) 100%)" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-l-accent-dim/10 border border-l-accent-dim/30 text-l-accent-dim text-xs font-black px-4 py-1.5 rounded-full mb-4">
              {BASE_CITY} והסביבה
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">{BRAND_NAME}</h1>
            <p className="text-l-text-2 text-lg leading-relaxed">
              בעל מקצוע אחד לשלושה תחומים: מנעולנות, אינסטלציה והנדימן. בחרו את השירות שאתם צריכים.
            </p>
          </motion.div>
        </section>

        <section className="py-4 px-4 sm:px-6 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SERVICE_LIST.map((service, i) => {
              const Icon = HUB_ICON[service.key];
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link href={`/${service.slug}`} className="light-card p-6 flex flex-col h-full group hover:border-l-primary/40 transition-colors">
                    <div className="w-11 h-11 rounded-lg bg-l-primary/8 border border-l-primary/20 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-l-primary" />
                    </div>
                    <h2 className="font-black text-xl mb-1.5">{service.navLabel}</h2>
                    <p className="text-l-text-2 text-sm leading-relaxed flex-1">{HUB_PITCH[service.key]}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-l-primary">
                      מעבר לעמוד {service.navLabel}
                      <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-l-border bg-l-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-l-text-muted">
          <span>{BRAND_NAME} · {BASE_CITY} והסביבה</span>
          <div className="flex items-center gap-5">
            <a href={getSosWhatsAppUrl()} className="flex items-center gap-1.5 font-semibold text-l-text-2 hover:text-l-primary transition-colors">
              <MessageCircle size={15} /> וואטסאפ
            </a>
            <Link href="/accessibility" className="hover:text-l-primary transition-colors">הצהרת נגישות</Link>
            <Link href="/privacy" className="hover:text-l-primary transition-colors">מדיניות פרטיות</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
