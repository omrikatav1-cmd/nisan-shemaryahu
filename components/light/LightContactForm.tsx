"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, AlertCircle, Loader2, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedCheckmark from "@/components/ui/AnimatedCheckmark";
import type { ServiceConfig } from "@/lib/serviceContent";
import type { City } from "@/lib/cities";
import { cityUrl } from "@/lib/cities";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF, SERVICE_AREA_CITIES } from "@/lib/siteConfig";

type FormState = "idle" | "loading" | "success" | "error";
type FieldErrors = { name?: string; phone?: string; issue?: string };

const ISRAELI_PHONE_REGEX = /^0[2-9]\d{7,8}$/;

function validatePhone(raw: string): boolean {
  return ISRAELI_PHONE_REGEX.test(raw.replace(/\D/g, ""));
}

export default function LightContactForm({ service, city }: { service: ServiceConfig; city?: City }) {
  const sourcePage = city ? cityUrl(service.slug, city) : `/${service.slug}`;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const nameRef = useRef<HTMLInputElement>(null);

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = "שדה חובה";
    if (!phone.trim()) errors.phone = "שדה חובה";
    else if (!validatePhone(phone)) errors.phone = "מספר טלפון לא תקין (לדוגמה: 050-1234567)";
    if (!issue.trim()) errors.issue = "יש לבחור מה צריך";
    return errors;
  };

  const handleBlur = (field: keyof FieldErrors) => {
    setTouched((p) => ({ ...p, [field]: true }));
    setFieldErrors((p) => ({ ...p, [field]: validate()[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    setTouched({ name: true, phone: true, issue: true });
    if (Object.keys(errors).length > 0) return;

    setFormState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\D/g, ""),
          issue: issue.trim(),
          service: service.whatsappIssueLabel,
          source_page: sourcePage,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "שגיאה בשליחה");
      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "שגיאה בשליחה. נסה שוב.");
    }
  };

  const inputClass = (field: keyof FieldErrors) =>
    cn(
      "w-full bg-l-bg border rounded-[0.625rem] px-4 py-3 text-l-text placeholder:text-l-text-muted text-sm min-h-[44px]",
      "focus:outline-none focus:border-l-primary/60 focus:ring-1 focus:ring-l-primary/25 transition-colors",
      touched[field] && fieldErrors[field] ? "border-l-danger/60" : "border-l-border-bright"
    );

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 bg-l-surface">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-l-accent text-xs font-black tracking-[0.2em] uppercase mb-2">צרו קשר</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">מוכן לעזור — עכשיו</h2>
          <p className="text-l-text-2">השאירו פרטים ואחזור אליכם בהקדם.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="light-card p-5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-l-primary/8 border border-l-primary/20 flex items-center justify-center flex-shrink-0">
                <Phone size={16} className="text-l-primary" />
              </div>
              <div>
                <p className="text-l-text-muted text-xs mb-0.5">טלפון / וואטסאפ</p>
                <a href={OWNER_PHONE_HREF} dir="ltr" className="font-semibold text-sm hover:text-l-primary transition-colors">{OWNER_PHONE_DISPLAY}</a>
              </div>
            </div>
            <div className="light-card p-5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-l-primary/8 border border-l-primary/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-l-primary" />
              </div>
              <div>
                <p className="text-l-text-muted text-xs mb-0.5">אזור שירות</p>
                <p className="font-semibold text-sm">{SERVICE_AREA_CITIES.slice(0, 4).join(", ")} ועוד</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="light-card p-6 sm:p-8">
              {formState === "success" ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-10 text-center"
                >
                  <AnimatedCheckmark size={72} color="#1F7A4D" />
                  <h3 className="text-2xl font-black">הפנייה התקבלה!</h3>
                  <p className="text-l-text-2">ניסן יחזור אליך בהקדם.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lf-name" className="text-sm font-semibold">שם מלא <span className="text-l-danger">*</span></label>
                    <input
                      ref={nameRef} id="lf-name" type="text" autoComplete="name" disabled={formState === "loading"}
                      value={name} onChange={(e) => setName(e.target.value)} onBlur={() => handleBlur("name")}
                      placeholder="ישראל ישראלי" className={inputClass("name")}
                    />
                    {touched.name && fieldErrors.name && <p className="text-l-danger text-xs">{fieldErrors.name}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lf-phone" className="text-sm font-semibold">טלפון <span className="text-l-danger">*</span></label>
                    <input
                      id="lf-phone" type="tel" inputMode="tel" dir="ltr" disabled={formState === "loading"}
                      value={phone} onChange={(e) => /^[\d\s-]*$/.test(e.target.value) && setPhone(e.target.value)}
                      onBlur={() => handleBlur("phone")} placeholder="050-1234567" className={inputClass("phone")}
                    />
                    {touched.phone && fieldErrors.phone && <p className="text-l-danger text-xs">{fieldErrors.phone}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lf-issue" className="text-sm font-semibold">מה צריך? <span className="text-l-danger">*</span></label>
                    <select
                      id="lf-issue" disabled={formState === "loading"} value={issue}
                      onChange={(e) => setIssue(e.target.value)} onBlur={() => handleBlur("issue")}
                      className={cn(inputClass("issue"), "cursor-pointer")}
                    >
                      <option value="" disabled>בחר...</option>
                      {service.services.map((s) => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                      <option value="אחר">אחר</option>
                    </select>
                    {touched.issue && fieldErrors.issue && <p className="text-l-danger text-xs">{fieldErrors.issue}</p>}
                  </div>

                  {formState === "error" && errorMsg && (
                    <div className="flex items-center gap-2 bg-l-danger/8 border border-l-danger/25 rounded-[0.625rem] px-4 py-3">
                      <AlertCircle size={16} className="text-l-danger flex-shrink-0" />
                      <p className="text-l-danger text-sm">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit" disabled={formState === "loading"}
                    className={cn(
                      "flex items-center justify-center gap-2 w-full font-black px-6 py-4 rounded-[0.625rem] transition-colors min-h-[52px]",
                      formState === "loading" ? "bg-l-primary/40 text-white/60" : "bg-l-primary hover:bg-l-primary-dim text-white"
                    )}
                  >
                    {formState === "loading" ? <><Loader2 size={18} className="animate-spin" />שולח...</> : <><Send size={18} />שלח פנייה</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
