"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageCircle } from "lucide-react";
import { MAIN_PHONE, WHATSAPP_NUMBER } from "@/lib/constants";
import { classifyPageType } from "@/lib/pageType";
import type { CtaVisibilitySettings } from "@/lib/cta-settings";

type FloatingButtonsProps = {
  mainPhone?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  ctaSettings?: CtaVisibilitySettings;
};

// Returns the responsive display classes for a button given its desktop/
// mobile visibility flags, or null if it should not render at all. The `lg`
// breakpoint matches the existing mobile/desktop split used by
// AreaStickyCallBar elsewhere on the site.
function visibilityClasses(desktop: boolean, mobile: boolean): string | null {
  if (!desktop && !mobile) return null;
  const mobileClass = mobile ? "flex" : "hidden";
  const desktopClass = desktop ? "lg:flex" : "lg:hidden";
  return `${mobileClass} ${desktopClass}`;
}

export function FloatingButtons({
  mainPhone = MAIN_PHONE,
  whatsappNumber = WHATSAPP_NUMBER,
  whatsappMessage = "Hi Fiixup, I need roadside assistance for my vehicle.",
  ctaSettings,
}: FloatingButtonsProps) {
  const pathname = usePathname();
  const pageType = classifyPageType(pathname ?? "/");
  const visibility = ctaSettings?.[pageType];

  const message = encodeURIComponent(whatsappMessage);

  const whatsappVisibility = visibilityClasses(
    visibility?.whatsapp.desktop ?? true,
    visibility?.whatsapp.mobile ?? true
  );
  const callVisibility = visibilityClasses(
    visibility?.call.desktop ?? true,
    visibility?.call.mobile ?? true
  );

  return (
    <>
      {whatsappVisibility && (
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book service on WhatsApp"
          className={`fixed bottom-6 left-6 z-50 items-center gap-2 bg-green-700 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-400 ${whatsappVisibility}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline font-semibold">WhatsApp</span>
        </a>
      )}

      {callVisibility && (
        <a
          href={`tel:${mainPhone}`}
          aria-label="Call now for service"
          className={`fixed bottom-6 right-6 z-50 items-center gap-2 bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${callVisibility}`}
        >
          <Phone className="w-5 h-5" />
          <span className="hidden sm:inline font-semibold">Call Now</span>
        </a>
      )}
    </>
  );
}
