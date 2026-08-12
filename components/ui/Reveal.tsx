"use client";
// components/ui/Reveal.tsx
// Shared scroll-reveal wrapper for SEO-content surfaces (blog post body,
// location-service / area / city-service SEO content). Fades + rises into
// view once, animating only transform/opacity (no layout properties, so it
// never affects Core Web Vitals CLS/INP), and renders unanimated for users
// who prefer reduced motion.

import { motion, useReducedMotion, type Variants } from "motion/react";

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={VARIANTS}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
