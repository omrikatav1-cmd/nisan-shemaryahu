"use client";

import { Phone, MessageCircle } from "lucide-react";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";

export default function LightCTABanner({ whatsappLabel }: { whatsappLabel: string }) {
  return (
    <section
      className="py-10 px-4 sm:px-6 text-center"
      style={{ background: "linear-gradient(120deg, var(--color-l-accent-dim), var(--color-l-accent))" }}
    >
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-white font-black text-lg sm:text-xl">צריך עזרה עכשיו? ניסן מגיע.</p>
        <div className="flex gap-3">
          <a
            href={OWNER_PHONE_HREF}
            className="flex items-center gap-2 bg-white text-l-accent-dim font-black px-5 py-3 rounded-xl hover:bg-white/90 transition-colors"
          >
            <Phone size={16} />
            <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
          </a>
          <a
            href={getSosWhatsAppUrl(whatsappLabel)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-l-primary text-white font-black px-5 py-3 rounded-xl hover:bg-l-primary-dim transition-colors"
          >
            <MessageCircle size={16} />
            וואטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}
