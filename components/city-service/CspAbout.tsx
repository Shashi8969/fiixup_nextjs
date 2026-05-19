
// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspAbout.tsx
// City+category specific about/intro section
// ─────────────────────────────────────────────────────────────────────────────

import type { CityServiceCategoryPageData } from '@/lib/cityPages';

export function CspAbout({ data }: { data: CityServiceCategoryPageData }) {
  const highlights = data.serviceHighlights ?? [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            {data.aboutHeading}
          </h2>
          <p className="text-lg text-gray-600 mb-5 leading-relaxed">{data.aboutPara1}</p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{data.aboutPara2}</p>

          {(data.aboutBullets ?? []).length > 0 && (
            <ul className="grid md:grid-cols-2 gap-4 mb-8">
              {data.aboutBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
                  <span className="text-green-500 font-bold text-lg mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{b.heading}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {highlights.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <h3 className="font-bold text-blue-900 mb-1">{h.title}</h3>
                  <p className="text-blue-800 text-sm leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

