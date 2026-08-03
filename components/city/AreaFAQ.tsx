'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { AreaHubPageData } from '@/lib/areaPages';

export function AreaFAQ({ data }: { data: AreaHubPageData }) {
  const faqs = data.faqs ?? [];
  const [open, setOpen] = useState<number | null>(0);
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Frequently Asked Questions — {data.areaName}
          </h2>
          <p className="text-gray-500">Common questions from our customers in {data.areaName}, {data.cityName}.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-blue-200 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={open === i}
                aria-controls={`area-faq-answer-${i}`}
                id={`area-faq-question-${i}`}
              >
                <span className="font-semibold text-gray-900 pr-4 text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`area-faq-answer-${i}`}
                role="region"
                aria-labelledby={`area-faq-question-${i}`}
                className={`px-6 pb-5 bg-gray-50 border-t border-gray-100 ${open === i ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-600 leading-relaxed pt-3 text-sm md:text-base">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
