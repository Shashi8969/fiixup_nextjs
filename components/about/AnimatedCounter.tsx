"use client";
// components/about/AnimatedCounter.tsx
// Counts up from 0 to the numeric value embedded in a label like "10,000+",
// "98%", or "4+" once it scrolls into view. Falls back to rendering the
// label unchanged for values with no leading number (e.g. "24/7") or when
// the user prefers reduced motion.
//
// requestAnimationFrame tween — no animation library.

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const NUMBER_PATTERN = /^([^\d]*)([\d,]+)(.*)$/;

export function AnimatedCounter({
  value,
  durationSeconds = 1.6,
}: {
  value: string;
  durationSeconds?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, rootMargin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(NUMBER_PATTERN);
    if (!match || reduceMotion || !isInView) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr.replace(/,/g, ""), 10);
    if (!Number.isFinite(target)) return;

    let raf = 0;
    const start = performance.now();
    const durationMs = durationSeconds * 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(`${prefix}${Math.round(target * eased).toLocaleString("en-US")}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, isInView, reduceMotion, durationSeconds]);

  return <span ref={ref}>{display}</span>;
}
