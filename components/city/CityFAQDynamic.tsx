// =====================================================================
// FILE: components/city/CityFAQDynamic.tsx — "use client" for accordion
// =====================================================================

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CityHubPageData } from '@/lib/cityPages';

export function CityFAQDynamic({ data }: { data: CityHubPageData }) {
  const faqs = data.faqs ?? [];
  const [open, setOpen] = useState<number | null>(0);
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Frequently Asked Questions — {data.cityName}
          </h2>
          <p className="text-gray-500">Common questions about doorstep vehicle repair in {data.cityName}.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-gray-900 pr-4 text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 bg-gray-50 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed pt-3 text-sm md:text-base">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
