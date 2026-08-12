import type { LocationServiceData } from '@/lib/locationServices'
import { asString, normalizeSeoSections, paragraphs } from '@/lib/cms-guards'
import { BlockRenderer } from '@/components/ui/BlockRenderer'
import { Reveal } from '@/components/ui/Reveal'

type SeoParagraphProps = {
  body: unknown
  className: string
}

function SeoParagraphs({ body, className }: SeoParagraphProps) {
  const items = paragraphs(body)
  if (!items.length) return null

  return items.map((paragraph, index) => (
    <p key={index} className={className}>{paragraph}</p>
  ))
}

export function LocationServiceSeoContent({ data }: { data: LocationServiceData }) {
  const sections = normalizeSeoSections(data.seoSections)
  const introHeading = asString(data.seoIntroHeading)
  const introBody = asString(data.seoIntroBody)
  const conclusion = asString(data.seoConclusion)
  const contentBlocks = Array.isArray(data.contentBlocks) ? data.contentBlocks : []

  const hasContent = Boolean(introHeading || introBody || sections.length || conclusion || contentBlocks.length)
  if (!hasContent) return null

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {introHeading && (
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
              {introHeading}
            </h2>
          </Reveal>
        )}

        {introBody && (
          <Reveal className="mb-10">
            <SeoParagraphs
              body={introBody}
              className="text-gray-600 leading-relaxed mb-5 text-base last:mb-0"
            />
          </Reveal>
        )}

        {sections.length > 0 && (
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Reveal key={section.heading + '-' + index} delay={Math.min(index, 6) * 0.05}>
                {section.heading && (
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {section.heading}
                  </h3>
                )}
                <SeoParagraphs
                  body={section.body}
                  className="text-gray-600 leading-relaxed mb-5 text-base last:mb-0"
                />
              </Reveal>
            ))}
          </div>
        )}

        {contentBlocks.length > 0 && (
          <div className="mt-10">
            <BlockRenderer blocks={contentBlocks} />
          </div>
        )}

        {conclusion && (
          <Reveal className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <SeoParagraphs
              body={conclusion}
              className="text-blue-900 leading-relaxed font-medium mb-5 last:mb-0"
            />
          </Reveal>
        )}
      </div>
    </section>
  )
}
