"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Zap } from "lucide-react";
import { getSosWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
  { label: "שירותים", href: "#services" },
  { label: "אבחון", href: "#diagnostic" },
  { label: "עבודות", href: "#works" },
  { label: "צרו קשר", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className={`glass rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-500 ${
              scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.7)]" : ""
            }`}
          >
            {/* Logo */}
            <a href="#" className="group flex flex-col leading-tight" aria-label="ניסן שמריהו – ראשי">
              <span
                className="font-black text-white text-lg leading-none group-hover:text-gold transition-colors duration-200"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ניסן שמריהו
              </span>
              <span className="text-[10px] text-[#64748B] tracking-[0.2em] font-medium">
                הנדסת תשתיות
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7" aria-label="תפריט ראשי">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 font-medium"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            {/* Desktop SOS */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:0509911241"
                className="text-sm text-[#94A3B8] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Phone size={13} />
                <span dir="ltr">050-9911241</span>
              </a>
              <a
                href={getSosWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="sos-pulse flex items-center gap-2 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white text-sm font-black px-4 py-2 rounded-xl cursor-pointer select-none shadow-[0_4px_20px_rgba(239,68,68,0.35)]"
                aria-label="חירום – שלח הודעת וואטסאפ"
              >
                <Zap size={14} fill="currentColor" />
                SOS חירום
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              aria-label={open ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -12, scaleY: 0.9 }}
              transition={{ duration: 0.22 }}
              style={{ originY: "top" }}
              className="md:hidden max-w-6xl mx-auto px-4 sm:px-6 mt-2"
            >
              <div className="glass-bright rounded-2xl p-5 flex flex-col gap-4">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-base text-[#F1F5F9] hover:text-[#D4AF37] transition-colors py-1 border-b border-white/5 last:border-0"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="tel:0509911241"
                  className="flex items-center gap-2 text-[#94A3B8] text-sm"
                >
                  <Phone size={14} />
                  <span dir="ltr">050-9911241</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile fixed SOS */}
      <motion.a
        href={getSosWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        className="md:hidden fixed bottom-6 left-4 z-50 sos-pulse flex items-center gap-2 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white font-black text-sm px-5 py-3 rounded-full cursor-pointer shadow-[0_6px_24px_rgba(239,68,68,0.4)]"
        aria-label="חירום"
      >
        <Zap size={16} fill="currentColor" />
        SOS חירום
      </motion.a>
    </>
  );
}
