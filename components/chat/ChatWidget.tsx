"use client";

// components/chat/ChatWidget.tsx
// Lightweight launcher for the Milo assistant.
//
// Performance shape:
//  - Mounts nothing until the browser is idle (requestIdleCallback / 1.5s
//    fallback), so it never competes with LCP or first interaction.
//  - The launcher button has no heavy deps.
//  - The real chat UI (ChatPanel) is a separate chunk, fetched only when the
//    visitor first opens the chat — `ssr:false` keeps it out of the HTML too.

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MessageSquareText, X } from "lucide-react";
import { ASSISTANT_NAME } from "@/lib/chat/shared";

const ChatPanel = dynamic(() => import("./ChatPanel"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-x-0 bottom-0 z-[190] h-[85dvh] max-h-[640px] rounded-t-2xl border border-gray-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-5 sm:h-[560px] sm:w-[390px] sm:rounded-2xl" />
  ),
});

type Props = {
  mainPhone: string;
  mainPhoneDisplay: string;
  whatsappNumber: string;
};

export function ChatWidget({ mainPhone, mainPhoneDisplay, whatsappNumber }: Props) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <>
      {open && (
        <ChatPanel
          onClose={() => setOpen(false)}
          mainPhone={mainPhone}
          mainPhoneDisplay={mainPhoneDisplay}
          whatsappNumber={whatsappNumber}
        />
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : `Chat with ${ASSISTANT_NAME}, the Fiixup assistant`}
        aria-expanded={open}
        className="fixed bottom-24 right-4 z-[180] flex h-12 items-center gap-2 rounded-full bg-blue-600 px-4 text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:right-6"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageSquareText className="h-5 w-5" />
            <span className="text-sm font-semibold">Ask {ASSISTANT_NAME}</span>
          </>
        )}
      </button>
    </>
  );
}
