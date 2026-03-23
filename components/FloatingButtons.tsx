"use client";

import { Phone, MessageCircle } from "lucide-react";
import { MAIN_PHONE, WHATSAPP_NUMBER } from "@/lib/constants";

export function FloatingButtons() {
  const message = encodeURIComponent("Hi Fiixup, I need roadside assistance for my vehicle.");
  return (
    <>
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
        aria-label="Book on WhatsApp"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
        <MessageCircle className="w-5 h-5 relative" />
        <span className="hidden sm:inline font-semibold relative">WhatsApp</span>
      </a>

      {/* Call */}
      <a
        href={`tel:${MAIN_PHONE}`}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Book Service — Call now"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
        <Phone className="w-5 h-5 relative" />
        <span className="hidden sm:inline font-semibold relative">Call Now</span>
      </a>
    </>
  );
}
