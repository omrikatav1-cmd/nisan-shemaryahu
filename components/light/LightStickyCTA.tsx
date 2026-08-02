"use client";

import { Phone, MessageCircle } from "lucide-react";
import type { ServiceConfig } from "@/lib/serviceContent";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF } from "@/lib/siteConfig";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";

// Persistent mobile-only CTA bar (bio-israel pattern) — phone + WhatsApp
// always one tap away while scrolling. Desktop already has these in the nav.
export default function LightStickyCTA({ service }: { service: ServiceConfig }) {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-[60] flex border-t border-l-border bg-l-surface/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <a href={OWNER_PHONE_HREF} className="flex-1 flex items-center justify-center gap-2 py-3.5 font-black text-sm text-l-primary border-l border-l-border">
        <Phone size={16} /> <span dir="ltr">{OWNER_PHONE_DISPLAY}</span>
      </a>
      <a href={getSosWhatsAppUrl(service.whatsappIssueLabel)} target="_blank" rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 font-black text-sm text-white bg-l-accent-dim">
        <MessageCircle size={16} /> וואטסאפ
      </a>
    </div>
  );
}
