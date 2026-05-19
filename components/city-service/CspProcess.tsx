// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspProcess.tsx
// ─────────────────────────────────────────────────────────────────────────────

import type { CityServiceCategoryPageData } from '@/lib/cityPages';

const DEFAULT_STEPS = [
  { step: 1, title: 'Book in 60 Seconds',  desc: 'Call, WhatsApp, or fill the form.' },
  { step: 2, title: 'We Dispatch Fast',     desc: 'Nearest certified mechanic dispatched.' },
  { step: 3, title: 'Repair at Your Door', desc: 'Mechanic arrives with all tools & parts.' },
  { step: 4, title: 'Back on the Road',    desc: '30-day warranty on all repairs.' },
];

export function CspProcess({ data }: { data: CityServiceCategoryPageData }) {
  const steps = data.processSteps?.length ? data.processSteps : DEFAULT_STEPS;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            How {data.categoryTitle} Works in {data.cityName}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-extrabold flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                {s.step}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
