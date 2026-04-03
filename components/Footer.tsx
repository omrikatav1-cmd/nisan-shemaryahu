import { Phone, MapPin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/6 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-20 bg-[#3B82F6]/5 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-black text-white mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ניסן שמריהו
            </h3>
            <p className="text-[#64748B] text-sm leading-relaxed mb-4">
              אינסטלציה ותשתיות. מוצאים, מתקנים, ומסיימים בלי כאב ראש.
            </p>
            <a
              href="tel:0509911241"
              className="inline-flex items-center gap-2 bg-[#3B82F6]/15 border border-[#3B82F6]/25 text-[#3B82F6] font-bold text-sm px-4 py-2 rounded-xl hover:bg-[#3B82F6]/25 transition-all"
            >
              <Phone size={14} />
              <span dir="ltr">050-9911241</span>
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">ניווט</h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: "#hero",       label: "ראשי" },
                { href: "#services",   label: "שירותים" },
                { href: "#diagnostic", label: "אבחון חינם" },
                { href: "#works",      label: "גלריה" },
                { href: "#contact",    label: "צרו קשר" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[#64748B] hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">פרטי קשר</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={13} className="text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-[#64748B] text-xs mb-0.5">טלפון / וואטסאפ</p>
                  <a href="tel:0509911241" dir="ltr" className="text-white font-semibold text-sm hover:text-[#3B82F6] transition-colors">
                    050-9911241
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={13} className="text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-[#64748B] text-xs mb-0.5">אזור שירות</p>
                  <p className="text-white font-semibold text-sm">אור יהודה ומרכז הארץ</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={13} className="text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-[#64748B] text-xs mb-0.5">דוא״ל</p>
                  <a href="mailto:nisan.plumber@gmail.com" dir="ltr" className="text-white font-semibold text-sm hover:text-[#3B82F6] transition-colors">
                    nisan.plumber@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#64748B] text-xs order-2 sm:order-1">
            © {year} ניסן שמריהו | שרברב מוסמך
          </p>
          <p className="text-[#64748B] text-xs order-3 sm:order-2">
            כל הזכויות שמורות
          </p>
          {/* Back to top */}
          <a
            href="#hero"
            className="order-1 sm:order-3 w-9 h-9 glass rounded-xl flex items-center justify-center hover:border-white/20 transition-all cursor-pointer"
            aria-label="חזור לראש הדף"
          >
            <ArrowUp size={15} className="text-[#64748B] hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
