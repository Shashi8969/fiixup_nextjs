// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspSeoContent.tsx
// Long-form SEO prose — city+category specific content
// ─────────────────────────────────────────────────────────────────────────────

import type { CityServiceCategoryPageData } from '@/lib/cityPages';

export function CspSeoContent({ data }: { data: CityServiceCategoryPageData }) {
  const sections = data.seoSections ?? [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {data.seoIntroHeading && (
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
            {data.seoIntroHeading}
          </h2>
        )}
        {data.seoIntroBody && (
          <p className="text-gray-600 leading-relaxed mb-10 text-base">{data.seoIntroBody}</p>
        )}

        {sections.length > 0 && (
          <div className="space-y-8">
            {sections.map((sec, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{sec.heading}</h3>
                <p className="text-gray-600 leading-relaxed text-base">{sec.body}</p>
              </div>
            ))}
          </div>
        )}

        {data.seoConclusion && (
          <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-blue-900 leading-relaxed font-medium">{data.seoConclusion}</p>
          </div>
        )}
      </div>
    </section>
  );
}

