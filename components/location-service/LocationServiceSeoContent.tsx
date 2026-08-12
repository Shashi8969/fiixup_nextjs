import type { LocationServiceData } from '@/lib/locationServices'
import { SeoEditorialContent } from '@/components/ui/SeoEditorialContent'

export function LocationServiceSeoContent({ data }: { data: LocationServiceData }) {
  return (
    <SeoEditorialContent
      introHeading={data.seoIntroHeading}
      introBody={data.seoIntroBody}
      sections={data.seoSections}
      conclusion={data.seoConclusion}
      contentBlocks={data.contentBlocks}
    />
  )
}
