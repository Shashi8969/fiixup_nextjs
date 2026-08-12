import { Phone, MessageCircle } from "lucide-react";

type AreaStickyCallBarProps = {
  phone: string;
  whatsapp: string;
  areaName: string;
};

function digitsOnly(value?: string) {
  return (value ?? "").replace(/\D/g, "");
}

// Mobile-only persistent call bar — the single highest-conversion element on
// a local-service search-landing page: a customer who searched "car mechanic
// near me" and tapped through should be able to call within one thumb-reach,
// from anywhere on the page, without scrolling back to the hero. Desktop
// already has the hero's inline call button always in view, so this is
// deliberately hidden at `lg` and up rather than duplicated there.
export function AreaStickyCallBar({ phone, whatsapp, areaName }: AreaStickyCallBarProps) {
  const waDigits = digitsOnly(whatsapp || phone);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-gray-200 bg-white/95 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <a
        href={`tel:${phone}`}
        className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 font-bold text-white shadow-sm transition active:scale-[0.98]"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call Now
      </a>
      <a
        href={`https://wa.me/${waDigits}?text=${encodeURIComponent(`I need vehicle service in ${areaName}.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex min-h-12 w-14 flex-none items-center justify-center rounded-xl bg-green-500 text-white shadow-sm transition active:scale-[0.98]"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </div>
  );
}
