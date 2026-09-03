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

export type SeoEditorialContentProps = {
  introHeading?: unknown
  introBody?: unknown
  sections?: unknown
  conclusion?: unknown
  contentBlocks?: unknown
}

/**
 * Shared long-form SEO/editorial content section — the admin's "AI content"
 * surface (intro heading/body, freeform seoSections[], a conclusion, and a
 * rich contentBlocks[] array supporting every BlockRenderer type: tables,
 * tips, warnings, steps, FAQ, CTA, pros/cons, comparison tables, code, etc.).
 *
 * Reused as-is by area hub (AreaSeoContent), location-service
 * (LocationServiceSeoContent), and city-service-category (CspSeoContent)
 * pages — those are thin per-type wrappers around this component, not
 * separate implementations. Edit here, not in a wrapper, so all three page
 * types stay in sync and never drift back into near-duplicate copies.
 */
export function SeoEditorialContent({ introHeading, introBody, sections, conclusion, contentBlocks }: SeoEditorialContentProps) {
  const heading = asString(introHeading)
  const normalizedSections = normalizeSeoSections(sections)
  const blocks = Array.isArray(contentBlocks) ? contentBlocks : []

  const hasContent = Boolean(
    heading || asString(introBody) || normalizedSections.length || asString(conclusion) || blocks.length
  )
  if (!hasContent) return null

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {heading && (
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
              {heading}
            </h2>
          </Reveal>
        )}

        {asString(introBody) && (
          <Reveal className="mb-10">
            <SeoParagraphs
              body={introBody}
              className="text-gray-600 leading-relaxed mb-5 text-base last:mb-0"
            />
          </Reveal>
        )}

        {normalizedSections.length > 0 && (
          <div className="space-y-8">
            {normalizedSections.map((section, index) => (
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

        {blocks.length > 0 && (
          <div className="mt-10">
            {/* This section already owns the <h2> (introHeading) and <h3>
                (seoSections). Clamp block headings to <h3>+ so AI content
                blocks can't emit page-level <h2>s that compete with the
                template's real section structure. */}
            <BlockRenderer blocks={blocks} minHeadingLevel={3} />
          </div>
        )}

        {asString(conclusion) && (
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
