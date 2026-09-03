"use client";

// components/QuickServiceModalLazy.tsx
// Defers QuickServiceModal — and with it @radix-ui/react-dialog + its
// scroll-lock / focus-trap deps (~20 KB gzip) — out of the initial page
// bundle. The modal only appears 2s in and only once per session, so there's
// no reason for its code to be on the critical path.

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MODAL_SESSION_KEY = "hasSeenQuickServiceModal";
const MODAL_DELAY_MS = 2000;

const QuickServiceModal = dynamic(
  () => import("./QuickServiceModal").then((m) => m.QuickServiceModal),
  { ssr: false },
);

type Props = {
  phonePlaceholder?: string;
  availableText?: string;
};

export function QuickServiceModalLazy(props: Props) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(MODAL_SESSION_KEY)) return;
    } catch {
      /* sessionStorage blocked — still show once */
    }
    const timer = setTimeout(() => setMount(true), MODAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!mount) return null;
  return <QuickServiceModal {...props} />;
}
