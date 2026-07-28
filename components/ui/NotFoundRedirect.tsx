"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, X } from "lucide-react";

const REDIRECT_SECONDS = 8;

export function NotFoundRedirect() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;

    if (secondsLeft <= 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, cancelled, router]);

  if (cancelled) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-gray-900 px-4 py-2.5 text-sm text-white">
      <Home className="h-4 w-4 flex-shrink-0 text-blue-400" aria-hidden="true" />
      <span>
        Taking you back to the homepage in <span className="font-bold tabular-nums">{secondsLeft}s</span>…
      </span>
      <button
        type="button"
        onClick={() => setCancelled(true)}
        className="ml-1 inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10"
      >
        Stay on this page
      </button>
      <button
        type="button"
        onClick={() => setCancelled(true)}
        aria-label="Dismiss"
        className="ml-1 text-white/50 transition-colors hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
