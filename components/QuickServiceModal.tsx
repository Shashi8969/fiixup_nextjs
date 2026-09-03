"use client";

import { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Phone } from "lucide-react";
import { MAIN_PHONE } from "@/lib/constants";
import { submitLead } from "@/lib/send-lead";
import { QUICK_SERVICE_MODAL_STATE_EVENT } from "@/lib/analytics";

const MODAL_SESSION_KEY = "hasSeenQuickServiceModal";

type QuickServiceModalProps = {
  phonePlaceholder?: string;
  availableText?: string;
};

export function QuickServiceModal({
  phonePlaceholder = MAIN_PHONE,
  availableText = "Available 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai",
}: QuickServiceModalProps) {
  // Opens on mount. The 2s delay + "already seen this session" check live in
  // QuickServiceModalLazy, which is what defers this component (and Radix
  // Dialog) out of the initial page bundle.
  const [isOpen, setIsOpen] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Let other fixed-position overlays (the cookie banner) know when this
  // modal is up, so they can hold off instead of rendering on top of it.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(QUICK_SERVICE_MODAL_STATE_EVENT, { detail: { open: isOpen } })
    );
  }, [isOpen]);

  const dismiss = () => {
    sessionStorage.setItem(MODAL_SESSION_KEY, "true");
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);

    const data = Object.fromEntries(new FormData(formRef.current).entries());
    data.request_time = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    data.phone        = phoneNumber;
    data.name         = "Not provided";
    data.city         = "Not provided";
    data.vehicle      = "Not specified";
    data.service      = "Callback Request";
    data.message      = "Customer requested a quick callback";

    try {
      await submitLead(data);
      dismiss();
    } catch {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) dismiss(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-md bg-black/30 z-[100] data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          aria-modal="true"
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl max-w-md w-[calc(100%-2rem)] p-8 z-[100] focus:outline-none"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            formRef.current?.querySelector("input")?.focus();
          }}
        >
          <Dialog.Close asChild>
            <button
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </Dialog.Close>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <Dialog.Title className="text-2xl font-bold mb-2">Need Quick Service?</Dialog.Title>
            <Dialog.Description className="text-gray-600">
              Book in 30 seconds. Mechanic at your doorstep in 20 minutes.
            </Dialog.Description>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot — hidden from real visitors, bots auto-fill it */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }}
            />

            <div>
              <label htmlFor="modal-phone" className="block text-sm font-medium mb-2 text-gray-700">
                Mobile Number
              </label>
              <input
                id="modal-phone"
                type="tel"
                name="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={phonePlaceholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <input type="hidden" name="form_type" value="Quick Callback Request" />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-60"
            >
              {loading ? "Sending…" : "Request Callback"}
            </button>
            <button type="button" onClick={dismiss} className="w-full text-gray-500 py-2 text-sm hover:text-gray-700">
              Maybe Later
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            {availableText}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
