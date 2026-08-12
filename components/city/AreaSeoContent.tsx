import type { AreaHubPageData } from '@/lib/areaPages'
import { SeoEditorialContent } from '@/components/ui/SeoEditorialContent'

export function AreaSeoContent({ data }: { data: AreaHubPageData }) {
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
