"use client";
// components/ui/Reveal.tsx
// Shared scroll-reveal wrapper for SEO-content surfaces (blog post body,
// location-service / area / city-service SEO content). Fades + rises into
// view once, animating only transform/opacity (no layout properties, so it
// never affects Core Web Vitals CLS/INP), and renders unanimated for users
// who prefer reduced motion.
//
// Pure CSS transition + IntersectionObserver — no animation library. Content
// renders fully visible before hydration and when JS is disabled (the hidden
// state is only applied after mount), so it's crawl-safe.

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, rootMargin: "0px 0px -10% 0px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const hidden = mounted && !inView;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(16px)" : "translateY(0)",
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
