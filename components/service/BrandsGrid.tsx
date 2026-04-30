// components/service/BrandsGrid.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Displays car or bike brands with top model names.
// Data driven — no hardcoding in this component.
// ─────────────────────────────────────────────────────────────────────────────

import type { BrandEntry } from "@/lib/models/service.model";

interface Props {
  brands: BrandEntry[];
  heading?: string;
  subtext?: string;
  accentColor?: "blue" | "red";
}

export default function BrandsGrid({
  brands,
  heading = "Brands We Service",
  subtext,
  accentColor = "red",
}: Props) {
  const pillBg = accentColor === "red" ? "bg-red-50 text-red-700 border-red-200" : "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <section className="py-14 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
            All Brands Covered
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{heading}</h2>
          {subtext && <p className="text-gray-500 max-w-xl mx-auto">{subtext}</p>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all"
            >
              <p className="font-bold text-gray-900 text-sm mb-2">{brand.name}</p>
              {brand.models && brand.models.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {brand.models.slice(0, 3).map((m) => (
                    <span key={m} className={`text-xs px-2 py-0.5 rounded-full border font-medium ${pillBg}`}>
                      {m}
                    </span>
                  ))}
                  {brand.models.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full border bg-gray-100 text-gray-500 font-medium">
                      +{brand.models.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't see your brand? Call{" "}
          <a href="tel:+918197459732" className="text-red-600 font-semibold hover:underline">
            +91 8197459732
          </a>{" "}
          — we service virtually all brands available in India.
        </p>
      </div>
    </section>
  );
}
