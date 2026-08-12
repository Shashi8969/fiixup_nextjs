"use client";
// components/city/AreaDispatchPanel.tsx
// Illustrative "a mechanic is already on the way" hero panel — the one bold
// visual move in the area-page redesign. Deliberately stylized rather than a
// literal per-visitor live-tracking claim: no fabricated technician name or
// exact distance, no ticking countdown clock implying second-level GPS
// precision. Just a looping route animation + pulsing "Live" indicator,
// same spirit as the pulsing dots already used elsewhere on the site
// (e.g. CityHeroDynamic's "We call back in 2 mins" badge).
//
// Animates only transform/opacity (route dash-offset + a dot moved via
// getPointAtLength), so it never touches layout — no CLS/INP risk. Respects
// prefers-reduced-motion by freezing on a static frame.

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { useReducedMotion } from "motion/react";

export function AreaDispatchPanel({
  areaName,
  rating,
}: {
  areaName: string;
  rating: { average: number; count: number } | null;
}) {
  const moverRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const path = pathRef.current;
    const mover = moverRef.current;
    if (!path || !mover) return;

    const len = path.getTotalLength();
    let raf = 0;
    let start: number | null = null;
    const cycleMs = 5500;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = ((ts - start) % cycleMs) / cycleMs;
      const pt = path.getPointAtLength(progress * len);
      mover.setAttribute("cx", String(pt.x));
      mover.setAttribute("cy", String(pt.y));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0E1B3B] via-[#0A1330] to-[#0A0F22] p-6 shadow-2xl shadow-blue-950/40">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative flex items-center justify-between text-white">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live in {areaName}
        </span>
        {rating && (
          <span className="inline-flex items-center gap-1 text-sm font-extrabold text-amber-300">
            <Star className="h-3.5 w-3.5 fill-amber-300" aria-hidden="true" />
            {rating.average} · {rating.count.toLocaleString("en-IN")} reviews
          </span>
        )}
      </div>

      <div className="relative my-5 h-[190px]">
        <svg viewBox="0 0 340 190" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <path
            ref={pathRef}
            d="M20 150 C 90 150, 80 70, 150 70 S 240 40, 250 20"
            fill="none"
            stroke="#5C8DFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="7 9"
            opacity="0.85"
            className="motion-safe:animate-dash-flow"
          />
          <circle cx="20" cy="150" r="5" fill="#5C8DFF" />
          <circle cx="20" cy="150" r="9" fill="none" stroke="#5C8DFF" strokeWidth="1.5" opacity="0.5" />
          <circle cx="250" cy="20" r="6" fill="none" stroke="#FFD666" strokeWidth="2" className="motion-safe:animate-ping motion-reduce:hidden" style={{ transformOrigin: "250px 20px" }} />
          <circle cx="250" cy="20" r="6" fill="#FFD666" />
          <circle ref={moverRef} cx="20" cy="150" r="7" fill="#0E1B3B" stroke="#fff" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative flex items-end justify-between gap-3 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/25 bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-extrabold">
            🔧
          </span>
          <div>
            <p className="text-sm font-bold leading-tight">Technician en route</p>
            <p className="text-xs text-blue-300">Car &amp; bike specialist</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-extrabold leading-none">~20 min</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-blue-300">avg. arrival</p>
        </div>
      </div>
    </div>
  );
}
