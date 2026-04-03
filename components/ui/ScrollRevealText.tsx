"use client";

import { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  colorFrom?: string;
  colorTo?: string;
  /**
   * Provide [startPx, endPx] to use DOCUMENT-level scroll (for above-fold content).
   * When omitted, uses element-relative scroll (for below-fold content).
   */
  pageScroll?: [number, number];
  /** Element-relative offset. Default: ["start 0.8", "start 0.1"] */
  offset?: [string, string];
}

/* ─── Single word ─────────────────────────────────────────────── */
function Word({
  word,
  progress,
  start,
  end,
  colorFrom,
  colorTo,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  colorFrom: string;
  colorTo: string;
}) {
  const color = useTransform(progress, [start, end], [colorFrom, colorTo]);
  return (
    <motion.span style={{ color }} className="inline-block ml-[0.3em]">
      {word}
    </motion.span>
  );
}

/* ─── Page-scroll wrapper (above fold) ──────────────────────── */
function PageScrollReveal({
  words,
  pageScroll,
  colorFrom,
  colorTo,
  className,
  style,
}: {
  words: string[];
  pageScroll: [number, number];
  colorFrom: string;
  colorTo: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { scrollY } = useScroll();
  const rawProgress = useTransform(
    scrollY,
    [pageScroll[0], pageScroll[1]],
    [0, 1]
  );

  return (
    <div className={className} style={style}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={rawProgress}
          start={i / words.length}
          end={(i + 1) / words.length}
          colorFrom={colorFrom}
          colorTo={colorTo}
        />
      ))}
    </div>
  );
}

/* ─── Element-scroll wrapper (below fold) ───────────────────── */
function ElementScrollReveal({
  words,
  offset,
  colorFrom,
  colorTo,
  className,
  style,
}: {
  words: string[];
  offset: [string, string];
  colorFrom: string;
  colorTo: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- framer-motion offset typing is overly strict
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any });

  return (
    <div ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={scrollYProgress}
          start={i / words.length}
          end={(i + 1) / words.length}
          colorFrom={colorFrom}
          colorTo={colorTo}
        />
      ))}
    </div>
  );
}

/* ─── Public component ───────────────────────────────────────── */
export default function ScrollRevealText({
  text,
  className,
  style,
  colorFrom = "#334155",
  colorTo = "#F1F5F9",
  pageScroll,
  offset = ["start 0.8", "start 0.1"],
}: Props) {
  const words = useMemo(() => text.split(" "), [text]);

  if (pageScroll) {
    return (
      <PageScrollReveal
        words={words}
        pageScroll={pageScroll}
        colorFrom={colorFrom}
        colorTo={colorTo}
        className={className}
        style={style}
      />
    );
  }

  return (
    <ElementScrollReveal
      words={words}
      offset={offset}
      colorFrom={colorFrom}
      colorTo={colorTo}
      className={className}
      style={style}
    />
  );
}
