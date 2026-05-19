"use client";
// components/ui/FAQAccordion.tsx
// This is the ONLY "use client" component in the location service page.
// Isolated here so the parent LocationServicePage can be a Server Component.

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQ[];
  accentText?: string;
}

export function FAQAccordion({ faqs, accentText = "text-blue-600" }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            aria-expanded={openFaq === i}
          >
            <span>{faq.q}</span>
            {openFaq === i
              ? <ChevronUp className={`w-5 h-5 ${accentText} flex-shrink-0`} />
              : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
          </button>
          {openFaq === i && (
            <div className="px-5 pb-5 pt-3 text-gray-600 leading-relaxed border-t border-gray-100">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
