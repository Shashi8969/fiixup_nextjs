// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspProcess.tsx
// ─────────────────────────────────────────────────────────────────────────────

import type { CityServiceCategoryPageData } from '@/lib/cityPages';

const DEFAULT_STEPS = [
  { step: 1, title: 'Book & Confirm', desc: 'Call, WhatsApp, or fill the form and share your vehicle, issue, and location.' },
  { step: 2, title: '20-Min Quick Arrival', desc: 'After confirmation, the quick-arrival promise applies to eligible doorstep and roadside visits.' },
  { step: 3, title: 'Diagnose & Choose the Right Fix', desc: 'Suitable work is handled at the vehicle; workshop-only car jobs can be coordinated through a partner garage.' },
  { step: 4, title: 'Approve & Complete', desc: 'Starting prices cover the standard scope. Extra paid work is explained before approval, and eligible repairs carry a 30-day warranty.' },
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
