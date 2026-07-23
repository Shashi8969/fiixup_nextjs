import { normalizeJsonLd } from '@/lib/cms-guards'
import { jsonLdString } from '@/lib/schema'

export function JsonLd({ data }: { data: unknown }) {
  const schemas = normalizeJsonLd(data)
  if (!schemas.length) return null

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
        />
      ))}
    </>
  )
}
