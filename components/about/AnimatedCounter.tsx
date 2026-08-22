"use client";
// components/about/AnimatedCounter.tsx
// Counts up from 0 to the numeric value embedded in a label like "10,000+",
// "98%", or "4+" once it scrolls into view. Falls back to rendering the
// label unchanged for values with no leading number (e.g. "24/7") or when
// the user prefers reduced motion.

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const NUMBER_PATTERN = /^([^\d]*)([\d,]+)(.*)$/;

export function AnimatedCounter({
  value,
  durationSeconds = 1.6,
}: {
  value: string;
  durationSeconds?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(NUMBER_PATTERN);
    if (!match || reduceMotion || !isInView) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr.replace(/,/g, ""), 10);
    if (!Number.isFinite(target)) return;

    const controls = animate(0, target, {
      duration: durationSeconds,
      ease: "easeOut",
      onUpdate(current) {
        setDisplay(`${prefix}${Math.round(current).toLocaleString("en-US")}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [value, isInView, reduceMotion, durationSeconds]);

  return <span ref={ref}>{display}</span>;
}
