"use client";

// components/chat/ChatPanel.tsx
// The assistant UI. Free retrieval bot: POST a question to /api/chat, render the
// best-matching answer from the site's own data. A small inline form hands
// booking requests to the existing /api/leads pipeline.
//
// Code-split — this module is only fetched when the visitor opens the chat.

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, X, Phone, MessageCircle, Loader2, CheckCircle2, CalendarPlus } from "lucide-react";
import { ASSISTANT_NAME } from "@/lib/chat/shared";
import { submitLead } from "@/lib/send-lead";
import { trackEvent } from "@/lib/analytics";

type Role = "user" | "assistant";
type Related = { question: string; url?: string | null };
type ChatMessage = { role: Role; content: string; url?: string | null; related?: Related[] };

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi! I'm ${ASSISTANT_NAME}. Ask me about Fiixup services, prices, coverage areas or timings — or tap "Book a mechanic" to request a doorstep visit.`,
};

const QUICK_REPLIES = ["Car service price", "Do you cover my area?", "What are your timings?", "Book a mechanic"];

type Props = {
  onClose: () => void;
  mainPhone: string;
  mainPhoneDisplay: string;
  whatsappNumber: string;
};

export default function ChatPanel({ onClose, mainPhone, mainPhoneDisplay, whatsappNumber }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    trackEvent("chat_opened", {});
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, showBooking, booked]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const ask = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || busy) return;

      if (/^book(ing)?\b/i.test(q) || /book a mechanic/i.test(q)) {
        setMessages((p) => [...p, { role: "user", content: q }]);
        setShowBooking(true);
        setInput("");
        return;
      }

      setMessages((p) => [...p, { role: "user", content: q }, { role: "assistant", content: "" }]);
      setInput("");
      setBusy(true);
      trackEvent("chat_message_sent", {});

      const setLast = (patch: Partial<ChatMessage>) =>
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...copy[copy.length - 1], ...patch };
          return copy;
        });

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });
        const data = (await res.json().catch(() => null)) as
          | { answer?: string; url?: string | null; related?: Related[] }
          | null;

        if (!res.ok || !data?.answer) {
          setLast({
            content: `Sorry, I can't answer that right now. Please call us on ${mainPhoneDisplay}.`,
          });
          return;
        }
        setLast({
          content: data.answer,
          url: data.url || null,
          related: (data.related || []).filter((r) => r.question),
        });
      } catch {
        setLast({ content: `Connection dropped. Please call or WhatsApp us on ${mainPhoneDisplay}.` });
      } finally {
        setBusy(false);
      }
    },
    [busy, mainPhoneDisplay],
  );

  return (
    <div
      role="dialog"
      aria-label={`${ASSISTANT_NAME} — Fiixup assistant`}
      className="fixed inset-x-0 bottom-0 z-[190] flex h-[85dvh] max-h-[640px] flex-col overflow-hidden rounded-t-2xl border border-gray-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-5 sm:h-[560px] sm:w-[390px] sm:rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-blue-600 px-4 py-3 text-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
            {ASSISTANT_NAME.charAt(0)}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold">{ASSISTANT_NAME}</p>
            <p className="flex items-center gap-1 text-[11px] text-blue-100">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Fiixup assistant
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex flex-col items-start"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[82%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-blue-600 px-3.5 py-2 text-sm text-white"
                  : "max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800"
              }
            >
              {m.content ||
                (busy && i === messages.length - 1 ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                ) : null)}
            </div>
            {m.role === "assistant" && m.url && (
              <a
                href={m.url}
                className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-blue-700"
              >
                Learn more →
              </a>
            )}
            {m.related && m.related.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {m.related.map((r, j) =>
                  r.url ? (
                    <a
                      key={j}
                      href={r.url}
                      className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 hover:bg-blue-100"
                    >
                      {r.question}
                    </a>
                  ) : (
                    <button
                      key={j}
                      type="button"
                      onClick={() => ask(r.question)}
                      className="rounded-full border border-gray-300 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-600 hover:border-blue-400 hover:text-blue-700"
                    >
                      {r.question}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        ))}

        {messages.length === 1 && !busy && (
          <div className="flex flex-wrap gap-2 pt-1">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-blue-400 hover:text-blue-700"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {showBooking && !booked && (
          <BookingForm
            mainPhoneDisplay={mainPhoneDisplay}
            onDone={() => {
              setBooked(true);
              setShowBooking(false);
              setMessages((p) => [
                ...p,
                {
                  role: "assistant",
                  content: `Thanks! Your request is in — the Fiixup team will call you shortly to confirm. For anything urgent, call ${mainPhoneDisplay}.`,
                },
              ]);
              trackEvent("chat_booking_created", {});
            }}
            onCancel={() => setShowBooking(false)}
          />
        )}

        {booked && (
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-medium text-green-800">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> Booking request sent.
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-gray-100 bg-white px-3 py-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex items-end gap-2"
        >
          <button
            type="button"
            onClick={() => setShowBooking((v) => !v)}
            aria-label="Book a mechanic"
            title="Book a mechanic"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-gray-300 text-gray-500 transition-colors hover:border-blue-400 hover:text-blue-600"
          >
            <CalendarPlus className="h-4 w-4" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask(input);
              }
            }}
            rows={1}
            maxLength={500}
            placeholder={`Ask ${ASSISTANT_NAME} a question…`}
            className="max-h-28 flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
        <div className="mt-1.5 flex items-center justify-between px-1 text-[11px] text-gray-400">
          <span>Answers come from fiixup.in. The team confirms specifics when they call.</span>
          <span className="flex items-center gap-2">
            <a href={`tel:${mainPhone}`} aria-label="Call Fiixup" className="hover:text-blue-600">
              <Phone className="h-3.5 w-3.5" />
            </a>
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Fiixup"
                className="hover:text-green-600"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Inline booking form → existing /api/leads pipeline ───────────────────────

function BookingForm({
  mainPhoneDisplay,
  onDone,
  onCancel,
}: {
  mainPhoneDisplay: string;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ name: "", phone: "", city: "", problem: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const valid = form.name.trim() && /\d{10}/.test(form.phone.replace(/\D/g, "")) && form.problem.trim();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    setError("");
    try {
      await submitLead({
        form_type: "AI Assistant (Milo)",
        source: "ai-chat",
        name: form.name.trim(),
        phone: form.phone.replace(/\D/g, "").slice(-10),
        city: form.city.trim(),
        service: form.problem.trim().slice(0, 120),
        message: form.problem.trim(),
      });
      onDone();
    } catch {
      setError(`Couldn't send that. Please call us on ${mainPhoneDisplay}.`);
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2 rounded-xl border border-blue-200 bg-white p-3">
      <p className="text-xs font-semibold text-gray-700">Request a doorstep visit</p>
      {(["name", "phone", "city"] as const).map((f) => (
        <input
          key={f}
          value={form[f]}
          onChange={(e) => setForm((s) => ({ ...s, [f]: e.target.value }))}
          placeholder={f === "name" ? "Your name" : f === "phone" ? "10-digit mobile" : "City (optional)"}
          inputMode={f === "phone" ? "numeric" : "text"}
          className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500"
        />
      ))}
      <textarea
        value={form.problem}
        onChange={(e) => setForm((s) => ({ ...s, problem: e.target.value }))}
        placeholder="What's the problem? (e.g. bike won't start)"
        rows={2}
        className="w-full resize-none rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500"
      />
      {error && <p className="text-[11px] text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!valid || sending}
          className="flex-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300"
        >
          {sending ? "Sending…" : "Send request"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
