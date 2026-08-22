// =====================================================================
// FILE: components/city/CityMapDynamic.tsx
// Renders the city's Google Maps embed if one is set in the CMS
// (cities.map_embed_url) — returns null otherwise, so cities without a
// real Google Business Profile listing (currently everyone but Bangalore)
// simply don't show a map section rather than a fake/generic one.
// =====================================================================

import { MapPin } from 'lucide-react';
import type { CityHubPageData } from '@/lib/cityPages';

// The CMS stores a full <iframe> embed snippet (copy-pasted from Google
// Maps' own "Share > Embed a map" dialog) — pull just the src out of it so
// we can control sizing/styling ourselves instead of trusting the
// hardcoded width/height Google's snippet ships with.
function extractMapSrc(embed: string | null): string | null {
  if (!embed) return null;
  const trimmed = embed.trim();
  if (trimmed.startsWith('http')) return trimmed; // already a bare URL
  const match = trimmed.match(/src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

export function CityMapDynamic({ data }: { data: CityHubPageData }) {
  const src = extractMapSrc(data.mapEmbedUrl);
  if (!src) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Find Us
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Fiixup on the Map in {data.cityName}
          </h2>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 max-w-4xl mx-auto">
          <iframe
            src={src}
            title={`Fiixup ${data.cityName} on Google Maps`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
