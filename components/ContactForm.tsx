"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, AlertCircle, Loader2, Phone, MapPin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedCheckmark from "@/components/ui/AnimatedCheckmark";

type FormState = "idle" | "loading" | "success" | "error";

const ISSUE_OPTIONS = [
  "נזילה / רטיבות",
  "פיצוץ צינור",
  "עמידת ביוב",
  "התקנה חדשה",
  "הדמיה תרמית",
  "שאלה כללית",
];

const ISRAELI_PHONE_REGEX = /^0[2-9]\d{7,8}$/;

function validatePhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return ISRAELI_PHONE_REGEX.test(digits);
}

function stripPhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

type FieldErrors = { name?: string; phone?: string; issue?: string };

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const validateFields = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = "שדה חובה";
    if (!phone.trim()) {
      errors.phone = "שדה חובה";
    } else if (!validatePhone(phone)) {
      errors.phone = "מספר טלפון לא תקין (לדוגמה: 050-1234567)";
    }
    if (!issue.trim()) errors.issue = "יש לבחור סוג בעיה";
    return errors;
  };

  const handleBlur = (field: keyof FieldErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errors = validateFields();
    setFieldErrors((prev) => ({ ...prev, [field]: errors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateFields();
    setFieldErrors(errors);
    setTouched({ name: true, phone: true, issue: true });
    if (Object.keys(errors).length > 0) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: stripPhone(phone), issue: issue.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "שגיאה בשליחה");
      }

      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "שגיאה בשליחה. נסה שוב.");
    }
  };

  const resetForm = () => {
    setFormState("idle");
    setName("");
    setPhone("");
    setIssue("");
    setFieldErrors({});
    setTouched({});
    setErrorMsg("");
    setTimeout(() => nameRef.current?.focus(), 50);
  };

  const isSubmitting = formState === "loading";

  const inputClass = (field: keyof FieldErrors) =>
    cn(
      "w-full bg-[#0F172A]/80 border rounded-[0.625rem] px-4 py-3 text-white placeholder:text-[#64748B] text-sm",
      "focus:outline-none focus:border-[#3B82F6]/60 focus:ring-1 focus:ring-[#3B82F6]/30 transition-colors",
      "min-h-[44px]",
      touched[field] && fieldErrors[field]
        ? "border-[#EF4444]/60"
        : "border-white/10"
    );

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
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center gap-5 py-12 text-center"
                >
                  <AnimatedCheckmark size={72} color="#22C55E" delay={0.15} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    <h3
                      className="text-2xl font-black text-white"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      הפנייה התקבלה!
                    </h3>
                    <p className="text-[#94A3B8] mt-1">
                      ניסן יחזור אליך בהקדם. תודה על הפנייה!
                    </p>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.3 }}
                    onClick={resetForm}
                    className="mt-2 text-[#3B82F6] hover:underline text-sm cursor-pointer"
                  >
                    שלח פנייה נוספת
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-name" className="text-sm font-semibold text-[#F1F5F9]">
                      שם מלא <span className="text-[#EF4444]" aria-hidden>*</span>
                    </label>
                    <input
                      ref={nameRef}
                      id="cf-name"
                      type="text"
                      autoComplete="name"
                      required
                      disabled={isSubmitting}
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (touched.name) setFieldErrors((p) => ({ ...p, name: e.target.value.trim() ? undefined : "שדה חובה" })); }}
                      onBlur={() => handleBlur("name")}
                      placeholder="ישראל ישראלי"
                      aria-invalid={touched.name && !!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "cf-name-err" : undefined}
                      className={inputClass("name")}
                    />
                    {touched.name && fieldErrors.name && (
                      <p id="cf-name-err" className="text-[#EF4444] text-xs mt-0.5" role="alert">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-phone" className="text-sm font-semibold text-[#F1F5F9]">
                      טלפון <span className="text-[#EF4444]" aria-hidden>*</span>
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      disabled={isSubmitting}
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^[\d\s\-]*$/.test(val)) {
                          setPhone(val);
                          if (touched.phone) {
                            const digits = val.replace(/\D/g, "");
                            if (!digits) setFieldErrors((p) => ({ ...p, phone: "שדה חובה" }));
                            else if (!ISRAELI_PHONE_REGEX.test(digits)) setFieldErrors((p) => ({ ...p, phone: "מספר טלפון לא תקין (לדוגמה: 050-1234567)" }));
                            else setFieldErrors((p) => ({ ...p, phone: undefined }));
                          }
                        }
                      }}
                      onBlur={() => handleBlur("phone")}
                      placeholder="050-1234567"
                      dir="ltr"
                      aria-invalid={touched.phone && !!fieldErrors.phone}
                      aria-describedby={fieldErrors.phone ? "cf-phone-err" : undefined}
                      className={inputClass("phone")}
                    />
                    {touched.phone && fieldErrors.phone && (
                      <p id="cf-phone-err" className="text-[#EF4444] text-xs mt-0.5" role="alert">{fieldErrors.phone}</p>
                    )}
                  </div>

                  {/* Issue */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-issue" className="text-sm font-semibold text-[#F1F5F9]">
                      סוג הבעיה <span className="text-[#EF4444]" aria-hidden>*</span>
                    </label>
                    <select
                      id="cf-issue"
                      required
                      disabled={isSubmitting}
                      value={issue}
                      onChange={(e) => { setIssue(e.target.value); if (touched.issue) setFieldErrors((p) => ({ ...p, issue: e.target.value ? undefined : "יש לבחור סוג בעיה" })); }}
                      onBlur={() => handleBlur("issue")}
                      aria-invalid={touched.issue && !!fieldErrors.issue}
                      aria-describedby={fieldErrors.issue ? "cf-issue-err" : undefined}
                      className={cn(
                        inputClass("issue"),
                        "cursor-pointer",
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
                    {touched.issue && fieldErrors.issue && (
                      <p id="cf-issue-err" className="text-[#EF4444] text-xs mt-0.5" role="alert">{fieldErrors.issue}</p>
                    )}
                  </div>

                  {/* General server error */}
                  {formState === "error" && errorMsg && (
                    <div className="flex items-center gap-2 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-[0.625rem] px-4 py-3" role="alert">
                      <AlertCircle size={16} className="text-[#EF4444] flex-shrink-0" />
                      <p className="text-[#EF4444] text-sm">{errorMsg}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileTap={{ scale: 0.98 }}
                    aria-busy={isSubmitting}
                    aria-live="polite"
                    className={cn(
                      "flex items-center justify-center gap-2 w-full font-black text-base px-6 py-4 rounded-[0.625rem] transition-all duration-200 cursor-pointer min-h-[52px]",
                      isSubmitting
                        ? "bg-[#3B82F6]/40 text-white/50 cursor-not-allowed"
                        : "bg-[#3B82F6] hover:bg-[#2563EB] text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>שולח...</span>
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
