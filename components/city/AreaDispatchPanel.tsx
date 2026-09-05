"use client";
// components/city/AreaDispatchPanel.tsx
// Illustrative service-coverage panel. The route animation is decorative and
// must never imply that a real technician has already been dispatched for the
// current visitor. Fiixup's verified customer-facing promise is the 20-Min
// Quick Arrival after booking confirmation for eligible doorstep/roadside jobs.

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
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          Service coverage in {areaName}
        </span>
        {rating && (
          <span className="inline-flex items-center gap-1 text-sm font-extrabold text-amber-300">
            <Star className="h-3.5 w-3.5 fill-amber-300" aria-hidden="true" />
            {rating.average} · {rating.count.toLocaleString("en-IN")} reviews
          </span>
        )}
      </div>

      <div className="relative my-5 h-[190px]">
        <svg viewBox="0 0 340 190" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden="true">
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
          <circle cx="250" cy="20" r="6" fill="none" stroke="#FFD666" strokeWidth="2" opacity="0.7" />
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
            <p className="text-sm font-bold leading-tight">Doorstep & roadside support</p>
            <p className="text-xs text-blue-300">Partner-garage pickup for eligible car jobs</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-extrabold leading-none">20-Min</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-blue-300">Quick Arrival*</p>
        </div>
      </div>
      <p className="relative mt-4 text-[11px] leading-4 text-blue-300/80">
        *After booking confirmation for eligible doorstep/roadside requests. Exceptional traffic, weather, distance, access, or technician availability can affect arrival.
      </p>
    </div>
  );
}
