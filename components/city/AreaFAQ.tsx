'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { AreaHubPageData } from '@/lib/areaPages';
import { Reveal } from '@/components/ui/Reveal';

export function AreaFAQ({ data, heading }: { data: AreaHubPageData; heading?: string | null }) {
  const faqs = data.faqs ?? [];
  const [open, setOpen] = useState<number | null>(0);
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">FAQ</span>
          <h2 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            {heading?.trim() || `Frequently asked — ${data.areaName}`}
          </h2>
          <p className="text-gray-500">Common questions from our customers in {data.areaName}, {data.cityName}.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={Math.min(i, 6) * 0.05}>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors hover:border-blue-200">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50"
                    aria-expanded={isOpen}
                    aria-controls={`area-faq-answer-${i}`}
                    id={`area-faq-question-${i}`}
                  >
                    <span className="pr-4 text-sm font-semibold text-gray-900 md:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-250 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div
                      id={`area-faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`area-faq-question-${i}`}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-gray-100 px-6 pb-5 pt-3 text-sm leading-relaxed text-gray-600 md:text-base">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
