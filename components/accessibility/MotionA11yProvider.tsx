"use client";

import { MotionConfig } from "framer-motion";
import { useA11yPrefs } from "@/lib/a11y-prefs/store";

export default function MotionA11yProvider({ children }: { children: React.ReactNode }) {
  const { reduceMotion } = useA11yPrefs();
  return <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>{children}</MotionConfig>;
}
