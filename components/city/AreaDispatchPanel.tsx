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
// Animates only transform/opacity (route dash-offset + a dot moved via a
// precomputed point table), so it never touches layout — no CLS/INP risk.
// Respects prefers-reduced-motion by freezing on a static frame, and pauses
// the animation loop when scrolled out of view.

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const PATH_SAMPLES = 120;
const CYCLE_MS = 5500;

export function AreaDispatchPanel({
  areaName,
  rating,
}: {
  areaName: string;
  rating: { average: number; count: number } | null;
}) {
  const moverRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const path = pathRef.current;
    const mover = moverRef.current;
    const container = containerRef.current;
    if (!path || !mover || !container) return;

    // getPointAtLength() forces a synchronous layout read, so it's sampled
    // once into a lookup table here instead of on every animation frame —
    // calling it per-frame in a loop that runs for as long as the page is
    // open was pinning the main thread (confirmed via a live Lighthouse
    // audit: 87s of main-thread work / a 23.5s Speed Index on an area page).
    const len = path.getTotalLength();
    const points = Array.from({ length: PATH_SAMPLES + 1 }, (_, i) =>
      path.getPointAtLength((i / PATH_SAMPLES) * len)
    );

    let raf = 0;
    let start: number | null = null;
    let visible = false;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = ((ts - start) % CYCLE_MS) / CYCLE_MS;
      const idx = progress * PATH_SAMPLES;
      const i0 = Math.floor(idx);
      const i1 = Math.min(i0 + 1, PATH_SAMPLES);
      const t = idx - i0;
      const x = points[i0].x + (points[i1].x - points[i0].x) * t;
      const y = points[i0].y + (points[i1].y - points[i0].y) * t;
      mover.setAttribute("cx", String(x));
      mover.setAttribute("cy", String(y));
      raf = requestAnimationFrame(tick);
    };

    // Only animate while actually on screen — no point burning main-thread
    // time on a route animation the visitor has already scrolled past.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) {
          start = null;
          raf = requestAnimationFrame(tick);
        } else if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0E1B3B] via-[#0A1330] to-[#0A0F22] p-6 shadow-2xl shadow-blue-950/40"
    >
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
