"use client";

// lib/hooks/useInView.ts
// IntersectionObserver hook — replaces motion/react's useInView. ~20 lines vs.
// pulling the animation runtime. Falls back to "in view" when IO is missing.

import { useEffect, useState, type RefObject } from "react";

export function useInView(
  ref: RefObject<Element | null>,
  { once = false, rootMargin = "0px" }: { once?: boolean; rootMargin?: string } = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, rootMargin]);

  return inView;
}
