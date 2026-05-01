"use client";

import { useState, useEffect, useRef } from "react";
import { X, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import { MAIN_PHONE } from "@/lib/constants";

const MODAL_SESSION_KEY = "hasSeenQuickServiceModal";
const MODAL_DELAY_MS = 2000;

export function QuickServiceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem(MODAL_SESSION_KEY)) setIsOpen(true);
    }, MODAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(MODAL_SESSION_KEY, "true");
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(dismiss)
      .catch(() => setLoading(false));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={dismiss}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Need Quick Service?</h2>
          <p className="text-gray-600">
            Share your mobile number and our team will call you back within 1 minute!
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
              placeholder={MAIN_PHONE}
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
          Available 24/7 across Bengaluru, Chennai, Hyderabad &amp; Mumbai
        </p>
      </div>
    </div>
  );
}
