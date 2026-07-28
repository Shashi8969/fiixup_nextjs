import type { ReactNode, CSSProperties } from "react";

// Pure CSS infinite-scroll: duplicate the row once so translateX(-50%) loops
// seamlessly, and let :hover pause it without any JS. Server component —
// nothing here needs client-side state.
export function Marquee({
  children,
  direction = "left",
  durationSeconds = 40,
  className = "",
}: {
  children: ReactNode;
  direction?: "left" | "right";
  durationSeconds?: number;
  className?: string;
}) {
  return (
    <div
      className={`group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${className}`}
      style={{ "--marquee-duration": `${durationSeconds}s` } as CSSProperties}
    >
      <div
        className={`flex w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        <div className="flex shrink-0 items-stretch gap-5 pr-5">{children}</div>
        <div className="flex shrink-0 items-stretch gap-5 pr-5" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
