"use client";

// lib/hooks/useReducedMotion.ts
// Tiny replacement for motion/react's useReducedMotion — one matchMedia query,
// no animation library. Returns false on the server / first paint, then the
// real value after mount.

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
