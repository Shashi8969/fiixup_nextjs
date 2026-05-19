
// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspPricing.tsx
// City-specific pricing table
// ─────────────────────────────────────────────────────────────────────────────

import type { CityServiceCategoryPageData } from '@/lib/cityPages';

export function CspPricing({ data }: { data: CityServiceCategoryPageData }) {
  const rows = data.pricingRows ?? [];
  if (rows.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            {data.categoryTitle} Pricing in {data.cityName}
          </h2>
          {data.pricingIntro && <p className="text-gray-500">{data.pricingIntro}</p>}
        </div>

        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Service</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Starting Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`hover:bg-gray-50 transition-colors ${row.highlight ? 'bg-blue-50' : 'bg-white'}`}
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 text-sm">{row.label}</span>
                    {row.note && <p className="text-xs text-gray-400 mt-0.5">{row.note}</p>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-bold ${row.highlight ? 'text-blue-700 text-base' : 'text-gray-900 text-sm'}`}>
                      ₹{row.priceFrom.toLocaleString('en-IN')}
                      {row.priceTo ? ` – ₹${row.priceTo.toLocaleString('en-IN')}` : '+'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.pricingDisclaimer && (
          <p className="text-xs text-gray-400 mt-4 text-center">{data.pricingDisclaimer}</p>
        )}

        <div className="mt-6 text-center">
          <a
            href={`tel:${data.cityPhone}`}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Get Exact Quote — Call {data.cityPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
