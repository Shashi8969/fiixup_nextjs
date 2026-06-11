"use client";

import { Phone, MessageCircle } from "lucide-react";
import { MAIN_PHONE, WHATSAPP_NUMBER } from "@/lib/constants";

type FloatingButtonsProps = {
  mainPhone?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
};

export function FloatingButtons({
  mainPhone = MAIN_PHONE,
  whatsappNumber = WHATSAPP_NUMBER,
  whatsappMessage = "Hi Fiixup, I need roadside assistance for my vehicle.",
}: FloatingButtonsProps) {
  const message = encodeURIComponent(whatsappMessage);

  return (
    <>
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book service on WhatsApp"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-green-700 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline font-semibold">WhatsApp</span>
      </a>

      {/* Call */}
      <a
        href={`tel:${mainPhone}`}
        aria-label="Call now for service"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden sm:inline font-semibold">Call Now</span>
      </a>
    </>
  );
}