"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Phone, MapPin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

const ISSUE_OPTIONS = [
  "נזילה / רטיבות",
  "פיצוץ צינור",
  "עמידת ביוב",
  "התקנה חדשה",
  "הדמיה תרמית",
  "שאלה כללית",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !issue.trim()) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), issue: issue.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "שגיאה בשליחה");
      }

      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "שגיאה בשליחה. נסה שוב.");
    }
  };

  const contactInfo = [
    { icon: Phone, label: "טלפון / וואטסאפ", value: "050-9911241", href: "tel:0509911241", dir: "ltr" },
    { icon: MapPin, label: "אזור שירות", value: "אור יהודה ומרכז הארץ (20 ק\"מ)", href: null, dir: "rtl" },
    { icon: Mail, label: "דוא\"ל", value: "nisan.plumber@gmail.com", href: "mailto:nisan.plumber@gmail.com", dir: "ltr" },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-[#3B82F6] font-bold text-sm tracking-widest uppercase mb-3">
            צרו קשר
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            מוכן לעזור –{" "}
            <span className="gradient-blue">עכשיו</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-md mx-auto">
            השאירו פרטים ואחזור אליכם בהקדם האפשרי.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href, dir }) => (
              <div key={label} className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={18} className="text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-[#64748B] text-xs font-medium mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      dir={dir as "ltr" | "rtl"}
                      className="text-white font-semibold hover:text-[#3B82F6] transition-colors text-sm"
                    >
                      {value}
                    </a>
                  ) : (
                    <p dir={dir as "ltr" | "rtl"} className="text-white font-semibold text-sm">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* License */}
            <div className="glass-card p-5">
              <p className="text-[#64748B] text-xs font-medium mb-1">רישיון מקצועי</p>
              <p className="text-[#D4AF37] font-bold text-sm">שרברב מוסמך – משרד העבודה</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-6 sm:p-8">
              {formState === "success" ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <CheckCircle size={56} className="text-[#22C55E]" />
                  <h3
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    הפנייה התקבלה!
                  </h3>
                  <p className="text-[#94A3B8]">
                    ניסן יחזור אליך בהקדם. תודה על הפנייה!
                  </p>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setName("");
                      setPhone("");
                      setIssue("");
                    }}
                    className="mt-2 text-[#3B82F6] hover:underline text-sm cursor-pointer"
                  >
                    שלח פנייה נוספת
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-[#F1F5F9]">
                      שם מלא <span className="text-[#EF4444]" aria-hidden>*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ישראל ישראלי"
                      className={cn(
                        "w-full bg-[#0F172A]/80 border border-white/10 rounded-[0.625rem] px-4 py-3 text-white placeholder:text-[#64748B] text-sm",
                        "focus:outline-none focus:border-[#3B82F6]/60 focus:ring-1 focus:ring-[#3B82F6]/30 transition-colors",
                        "min-h-[44px]"
                      )}
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-[#F1F5F9]">
                      טלפון <span className="text-[#EF4444]" aria-hidden>*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="050-0000000"
                      dir="ltr"
                      className={cn(
                        "w-full bg-[#0F172A]/80 border border-white/10 rounded-[0.625rem] px-4 py-3 text-white placeholder:text-[#64748B] text-sm",
                        "focus:outline-none focus:border-[#3B82F6]/60 focus:ring-1 focus:ring-[#3B82F6]/30 transition-colors",
                        "min-h-[44px]"
                      )}
                    />
                  </div>

                  {/* Issue */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="issue" className="text-sm font-semibold text-[#F1F5F9]">
                      סוג הבעיה <span className="text-[#EF4444]" aria-hidden>*</span>
                    </label>
                    <select
                      id="issue"
                      required
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      className={cn(
                        "w-full bg-[#0F172A]/80 border border-white/10 rounded-[0.625rem] px-4 py-3 text-white text-sm",
                        "focus:outline-none focus:border-[#3B82F6]/60 focus:ring-1 focus:ring-[#3B82F6]/30 transition-colors",
                        "min-h-[44px] cursor-pointer",
                        !issue && "text-[#64748B]"
                      )}
                    >
                      <option value="" disabled>
                        בחר סוג בעיה...
                      </option>
                      {ISSUE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#1E293B] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Error */}
                  {formState === "error" && (
                    <div className="flex items-center gap-2 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-[0.625rem] px-4 py-3" role="alert">
                      <AlertCircle size={16} className="text-[#EF4444] flex-shrink-0" />
                      <p className="text-[#EF4444] text-sm">{errorMsg}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === "loading" || !name || !phone || !issue}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex items-center justify-center gap-2 w-full font-black text-base px-6 py-4 rounded-[0.625rem] transition-all duration-200 cursor-pointer min-h-[52px]",
                      formState === "loading" || !name || !phone || !issue
                        ? "bg-[#3B82F6]/40 text-white/50 cursor-not-allowed"
                        : "bg-[#3B82F6] hover:bg-[#2563EB] text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    )}
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        שולח...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        שלח פנייה
                      </>
                    )}
                  </motion.button>

                  <p className="text-[#64748B] text-xs text-center">
                    הפרטים שלך ישמרו בסודיות מוחלטת ולא יועברו לצד שלישי.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
