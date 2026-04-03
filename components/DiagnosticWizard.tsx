"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets, Wrench, Layers, HelpCircle,
  Zap, Clock, Send, ArrowRight, AlertCircle, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedCheckmark from "@/components/ui/AnimatedCheckmark";

type Step = 1 | 2 | 3;

const ISSUES = [
  { id: "leak",         icon: Droplets,   label: "נזילה / רטיבות",  color: "#3B82F6" },
  { id: "clog",         icon: Wrench,     label: "סתימה / ביוב",    color: "#D4AF37" },
  { id: "installation", icon: Layers,     label: "התקנה חדשה",      color: "#22C55E" },
  { id: "other",        icon: HelpCircle, label: "אחר",              color: "#94A3B8" },
];

const URGENCY = [
  { id: "emergency" as const, icon: Zap,   label: "חירום – עכשיו",   sub: "יש נזק פעיל",       color: "#EF4444" },
  { id: "normal"    as const, icon: Clock, label: "לא דחוף",         sub: "בתוך יום-יומיים",   color: "#3B82F6" },
];

const SLIDE = {
  initial:    { opacity: 0, x: -28 },
  animate:    { opacity: 1, x: 0   },
  exit:       { opacity: 0, x: 28  },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

function StepDots({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {([1, 2, 3] as Step[]).map((s) => (
        <motion.div
          key={s}
          layout
          className="h-1.5 rounded-full"
          style={{ background: s <= current ? "#3B82F6" : "rgba(255,255,255,0.1)" }}
          animate={{ width: s === current ? 32 : 16 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}

export default function DiagnosticWizard() {
  const [step, setStep]         = useState<Step>(1);
  const [issue, setIssue]       = useState("");
  const [urgency, setUrgency]   = useState<"normal" | "emergency" | "">("");
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const issueLabel   = ISSUES.find((i) => i.id === issue)?.label ?? issue;
  const urgencyLabel = urgency === "emergency" ? "חירום" : "לא דחוף";

  const waUrl = `https://wa.me/972509911241?text=${encodeURIComponent(
    `היי ניסן, ראיתי את האתר שלך ואני צריך עזרה עם ${issueLabel} (${urgencyLabel}). שמי ${name}, טלפון: ${phone}`
  )}`;

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), issue: `${issueLabel} | ${urgencyLabel}` }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "שגיאה");
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "שגיאה בשליחה");
    }
  };

  return (
    <section id="diagnostic" className="py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[#3B82F6] text-xs font-black tracking-[0.25em] uppercase mb-3">
            הצעת מחיר
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="text-blue">ספר לנו</span> מה קרה
          </h2>
          <p className="text-[#94A3B8]">ניסן יחזור אליך עם פתרון ומחיר תוך זמן קצר.</p>
        </motion.div>

        {/* Wizard card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glass-bright rounded-2xl p-7 sm:p-10 min-h-[400px] flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent" />

          {/* ── Success ── */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col items-center justify-center gap-5 text-center"
            >
              <AnimatedCheckmark size={88} color="#22C55E" />
              <div>
                <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  קיבלנו!
                </h3>
                <p className="text-[#94A3B8]">ניסן יחזור אליך בהקדם.</p>
              </div>
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 bg-[#25D366]/15 border border-[#25D366]/35 text-[#25D366] font-bold px-7 py-3.5 rounded-xl hover:bg-[#25D366]/25 transition-all cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.524 5.855L0 24l6.32-1.499A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.373l-.359-.214-3.732.885.916-3.627-.234-.372A9.783 9.783 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.431 0 9.818 4.388 9.818 9.818 0 5.43-4.387 9.818-9.818 9.818z"/>
                </svg>
                פתח וואטסאפ
                <ArrowRight size={15} />
              </motion.a>
            </motion.div>
          ) : (
            <>
              <StepDots current={step} />
              <AnimatePresence mode="wait">

                {/* Step 1 – Issue */}
                {step === 1 && (
                  <motion.div key="s1" {...SLIDE} className="flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-white mb-6 text-center" style={{ fontFamily: "var(--font-heading)" }}>
                      מה הבעיה?
                    </h3>
                    <div className="grid grid-cols-2 gap-3 flex-1">
                      {ISSUES.map((opt) => {
                        const Icon = opt.icon;
                        const sel  = issue === opt.id;
                        return (
                          <motion.button
                            key={opt.id}
                            onClick={() => { setIssue(opt.id); setTimeout(() => setStep(2), 220); }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                              "flex flex-col items-center justify-center gap-3 p-5 rounded-xl border transition-all duration-200 cursor-pointer min-h-[110px]",
                              sel ? "border-[#3B82F6] bg-[#3B82F6]/15" : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"
                            )}
                            aria-pressed={sel}
                          >
                            <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: `${opt.color}20`, border: `1px solid ${opt.color}35` }}>
                              <Icon size={20} style={{ color: opt.color }} />
                            </div>
                            <span className="text-sm font-bold text-white text-center leading-tight">{opt.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 2 – Urgency */}
                {step === 2 && (
                  <motion.div key="s2" {...SLIDE} className="flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-white mb-6 text-center" style={{ fontFamily: "var(--font-heading)" }}>
                      מתי צריך?
                    </h3>
                    <div className="flex flex-col gap-3 flex-1 justify-center">
                      {URGENCY.map((opt) => {
                        const Icon = opt.icon;
                        const sel  = urgency === opt.id;
                        return (
                          <motion.button
                            key={opt.id}
                            onClick={() => { setUrgency(opt.id); setTimeout(() => setStep(3), 220); }}
                            whileHover={{ scale: 1.02, x: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 cursor-pointer"
                            style={sel ? { borderColor: opt.color, backgroundColor: `${opt.color}18` } : { borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)" }}
                            aria-pressed={sel}
                          >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${opt.color}20`, border: `1px solid ${opt.color}35` }}>
                              <Icon size={22} style={{ color: opt.color }} />
                            </div>
                            <div className="text-right">
                              <p className="text-white font-black text-base">{opt.label}</p>
                              <p className="text-[#64748B] text-sm">{opt.sub}</p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                    <button onClick={() => setStep(1)} className="mt-4 text-sm text-[#64748B] hover:text-white transition-colors cursor-pointer text-center">
                      ← חזור
                    </button>
                  </motion.div>
                )}

                {/* Step 3 – Contact */}
                {step === 3 && (
                  <motion.div key="s3" {...SLIDE} className="flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-white mb-1 text-center" style={{ fontFamily: "var(--font-heading)" }}>
                      השאר פרטים
                    </h3>
                    <p className="text-[#64748B] text-sm text-center mb-6">{issueLabel} · {urgencyLabel}</p>
                    <div className="flex flex-col gap-4 flex-1">
                      <div>
                        <label htmlFor="wiz-name" className="text-sm font-semibold text-[#F1F5F9] block mb-1.5">
                          שם <span className="text-[#EF4444]" aria-hidden>*</span>
                        </label>
                        <input
                          id="wiz-name" type="text" autoComplete="name"
                          value={name} onChange={(e) => setName(e.target.value)}
                          placeholder="ישראל ישראלי"
                          className="w-full bg-[#020617]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#3B82F6]/60 focus:ring-1 focus:ring-[#3B82F6]/30 transition-colors min-h-[48px]"
                        />
                      </div>
                      <div>
                        <label htmlFor="wiz-phone" className="text-sm font-semibold text-[#F1F5F9] block mb-1.5">
                          טלפון <span className="text-[#EF4444]" aria-hidden>*</span>
                        </label>
                        <input
                          id="wiz-phone" type="tel" autoComplete="tel" inputMode="tel"
                          value={phone} onChange={(e) => setPhone(e.target.value)}
                          placeholder="050-0000000" dir="ltr"
                          className="w-full bg-[#020617]/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#3B82F6]/60 focus:ring-1 focus:ring-[#3B82F6]/30 transition-colors min-h-[48px]"
                        />
                      </div>

                      {status === "error" && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl px-4 py-3" role="alert">
                          <AlertCircle size={15} className="text-[#EF4444] flex-shrink-0" />
                          <p className="text-[#EF4444] text-sm">{errorMsg}</p>
                        </motion.div>
                      )}

                      <motion.button
                        type="button" onClick={handleSubmit}
                        disabled={!name.trim() || !phone.trim() || status === "loading"}
                        whileHover={name.trim() && phone.trim() ? { scale: 1.02 } : {}}
                        whileTap={name.trim() && phone.trim() ? { scale: 0.97 } : {}}
                        className={cn(
                          "flex items-center justify-center gap-2.5 w-full font-black text-base px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer min-h-[52px]",
                          !name.trim() || !phone.trim() || status === "loading"
                            ? "bg-[#3B82F6]/35 text-white/40 cursor-not-allowed"
                            : "bg-[#3B82F6] hover:bg-[#2563EB] text-white hover:shadow-[0_0_32px_rgba(59,130,246,0.45)]"
                        )}
                      >
                        {status === "loading"
                          ? <><Loader2 size={18} className="animate-spin" /> שולח...</>
                          : <><Send size={17} /> שלח לניסן</>}
                      </motion.button>
                    </div>
                    <button onClick={() => setStep(2)} className="mt-3 text-sm text-[#64748B] hover:text-white transition-colors cursor-pointer text-center">
                      ← חזור
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[#64748B] text-xs text-center mt-4">שלב {step} מתוך 3</p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
