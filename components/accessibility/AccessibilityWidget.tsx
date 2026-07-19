"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  AlignJustify,
  Contrast,
  Heading,
  Link2,
  Pause,
  RotateCcw,
  Type,
  X,
} from "lucide-react";
import {
  a11yStore,
  applyPrefsToElement,
  isAnyActive,
  nextContrast,
  nextLineSpacing,
  nextTextSize,
  useA11yPrefs,
  type A11yPrefs,
} from "@/lib/a11y-prefs/store";

const CONTRAST_LABEL: Record<A11yPrefs["contrast"], string> = {
  off: "כבוי",
  high: "ניגודיות גבוהה",
  invert: "צבעים הפוכים",
  mono: "שחור-לבן",
};

const LINE_SPACING_LABEL: Record<A11yPrefs["lineSpacing"], string> = {
  normal: "רגיל",
  "16": "מוגדל",
  "20": "כפול",
};

// Regulation 35 / IS 5568 preference widget. Toggles CSS classes on <html>
// only — never touches content DOM, alt text, or ARIA. See docs/... for the
// full compliance write-up; this is the control surface, not the whole story.
export default function AccessibilityWidget() {
  const prefs = useA11yPrefs();
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Safety net if the inline FOUC bootstrap script didn't run (e.g. blocked
  // localStorage). Reads current snapshot only — never writes back to storage.
  useEffect(() => {
    applyPrefsToElement(document.documentElement, a11yStore.getSnapshot());
  }, []);

  // Alt+A shortcut. e.code (physical key), not e.key — macOS emits the
  // dead-key "å" for e.key on Alt+A, which would silently miss the check.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.code === "KeyA") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const applyToggle = useCallback((partial: Partial<A11yPrefs>, announce: string) => {
    a11yStore.set(partial);
    setAnnouncement(announce);
  }, []);

  return (
    <>
      {/* Outside the panel so the announcement survives the panel unmounting. */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <button
        id="a11y-widget-trigger"
        type="button"
        onClick={() => setOpen(true)}
        aria-label="פתח תפריט נגישות"
        aria-expanded={open}
        aria-controls="a11y-widget-panel"
        aria-keyshortcuts="Alt+A"
        className={`fixed bottom-20 sm:bottom-5 start-5 z-[70] flex h-13 w-13 items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-105 ${
          isAnyActive(prefs) ? "ring-2 ring-offset-2" : ""
        }`}
        style={{ background: "#14395E", width: 52, height: 52, ...(isAnyActive(prefs) ? { boxShadow: "0 0 0 2px #fff, 0 0 0 4px #C97A2B" } : {}) }}
      >
        <Accessibility size={26} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="a11y-widget-panel"
              role="dialog"
              aria-modal="true"
              aria-label="הגדרות נגישות"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              dir="rtl"
              className="fixed inset-y-0 start-0 z-[90] w-[85%] max-w-sm overflow-y-auto bg-white text-[#1A2433] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#E4DFD3] p-5">
                <h2 className="text-lg font-black">הגדרות נגישות</h2>
                <button type="button" onClick={() => setOpen(false)} aria-label="סגור" className="p-1 text-[#7A8697]">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 p-5">
                <ToggleCard
                  icon={Link2}
                  label="הדגשת קישורים"
                  active={prefs.links}
                  onClick={() => applyToggle({ links: !prefs.links }, `הדגשת קישורים: ${!prefs.links ? "פעיל" : "כבוי"}`)}
                />
                <ToggleCard
                  icon={Contrast}
                  label="ניגודיות"
                  active={prefs.contrast !== "off"}
                  valueLabel={CONTRAST_LABEL[prefs.contrast]}
                  onClick={() => {
                    const next = nextContrast(prefs.contrast);
                    applyToggle({ contrast: next }, `ניגודיות: ${CONTRAST_LABEL[next]}`);
                  }}
                />
                <ToggleCard
                  icon={Type}
                  label="גודל טקסט"
                  active={prefs.textSize !== 100}
                  valueLabel={`${prefs.textSize}%`}
                  onClick={() => {
                    const next = nextTextSize(prefs.textSize);
                    applyToggle({ textSize: next }, `גודל טקסט: ${next}%`);
                  }}
                />
                <ToggleCard
                  icon={AlignJustify}
                  label="ריווח שורות"
                  active={prefs.lineSpacing !== "normal"}
                  valueLabel={LINE_SPACING_LABEL[prefs.lineSpacing]}
                  onClick={() => {
                    const next = nextLineSpacing(prefs.lineSpacing);
                    applyToggle({ lineSpacing: next }, `ריווח שורות: ${LINE_SPACING_LABEL[next]}`);
                  }}
                />
                <ToggleCard
                  icon={Type}
                  label="פונט קריא"
                  active={prefs.readableFont}
                  onClick={() => applyToggle({ readableFont: !prefs.readableFont }, `פונט קריא: ${!prefs.readableFont ? "פעיל" : "כבוי"}`)}
                />
                <ToggleCard
                  icon={Heading}
                  label="הדגשת כותרות"
                  active={prefs.headings}
                  onClick={() => applyToggle({ headings: !prefs.headings }, `הדגשת כותרות: ${!prefs.headings ? "פעיל" : "כבוי"}`)}
                />
                <ToggleCard
                  icon={Pause}
                  label="עצירת אנימציות"
                  active={prefs.reduceMotion}
                  onClick={() => applyToggle({ reduceMotion: !prefs.reduceMotion }, `עצירת אנימציות: ${!prefs.reduceMotion ? "פעיל" : "כבוי"}`)}
                />
              </div>

              <div className="border-t border-[#E4DFD3] p-5">
                <button
                  type="button"
                  onClick={() => {
                    a11yStore.reset();
                    setAnnouncement("כל ההגדרות אופסו");
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#C23B3B]"
                >
                  <RotateCcw size={16} aria-hidden />
                  איפוס הגדרות
                </button>
                <a href="/accessibility" className="mt-4 block text-sm font-semibold underline text-[#14395E]">
                  הצהרת נגישות מלאה
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ToggleCard({
  icon: Icon,
  label,
  active,
  valueLabel,
  onClick,
}: {
  icon: typeof Accessibility;
  label: string;
  active: boolean;
  valueLabel?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={valueLabel ? undefined : active}
      aria-label={valueLabel ? `${label}: ${valueLabel}` : label}
      className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-colors ${
        active ? "border-[#14395E] bg-[#14395E]/5" : "border-[#E4DFD3] bg-white"
      }`}
    >
      <Icon size={22} aria-hidden />
      <span className="text-xs font-semibold">{label}</span>
      {valueLabel && <span className="text-[10px] text-[#7A8697]">{valueLabel}</span>}
    </button>
  );
}
