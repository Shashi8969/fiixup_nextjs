import type { AreaHubPageData } from '@/lib/areaPages'
import { paragraphs } from '@/lib/cms-guards'

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

export function AreaSeoContent({ data }: { data: AreaHubPageData }) {
  const { seoIntroHeading, seoIntroBody, seoSections, seoConclusion } = data
  const hasContent = Boolean(seoIntroHeading || seoIntroBody || seoSections.length || seoConclusion)
  if (!hasContent) return null

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {seoIntroHeading && (
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
            {seoIntroHeading}
          </h2>
        )}

        {seoIntroBody && (
          <div className="mb-10">
            <SeoParagraphs
              body={seoIntroBody}
              className="text-gray-600 leading-relaxed mb-5 text-base last:mb-0"
            />
          </div>
        )}

        {seoSections.length > 0 && (
          <div className="space-y-8">
            {seoSections.map((section, index) => (
              <div key={section.heading + '-' + index}>
                {section.heading && (
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {section.heading}
                  </h3>
                )}
                <SeoParagraphs
                  body={section.body}
                  className="text-gray-600 leading-relaxed mb-5 text-base last:mb-0"
                />
              </div>
            ))}
          </div>
        )}

        {seoConclusion && (
          <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <SeoParagraphs
              body={seoConclusion}
              className="text-blue-900 leading-relaxed font-medium mb-5 last:mb-0"
            />
          </div>
        )}
      </div>
    </section>
  )
}
