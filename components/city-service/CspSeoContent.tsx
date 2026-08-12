// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspSeoContent.tsx
// Long-form SEO prose — city+category specific content
// ─────────────────────────────────────────────────────────────────────────────

import type { CityServiceCategoryPageData } from '@/lib/cityPages';
import { SeoEditorialContent } from '@/components/ui/SeoEditorialContent';

export function CspSeoContent({ data }: { data: CityServiceCategoryPageData }) {
  return (
    <SeoEditorialContent
      introHeading={data.seoIntroHeading}
      introBody={data.seoIntroBody}
      sections={data.seoSections}
      conclusion={data.seoConclusion}
      contentBlocks={data.contentBlocks}
    />
  );
}
