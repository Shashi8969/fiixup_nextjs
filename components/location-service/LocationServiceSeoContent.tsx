import type { LocationServiceData } from "@/lib/locationServices";

type SeoParagraphProps = {
  body: string;
  className: string;
};

function SeoParagraphs({ body, className }: SeoParagraphProps) {
  return body
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className={className}>
        {paragraph}
      </p>
    ));
}

export function LocationServiceSeoContent({ data }: { data: LocationServiceData }) {
  const sections = data.seoSections ?? [];
  const hasContent = Boolean(
    data.seoIntroHeading ||
      data.seoIntroBody ||
      sections.length > 0 ||
      data.seoConclusion
  );

  if (!hasContent) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {data.seoIntroHeading && (
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
            {data.seoIntroHeading}
          </h2>
        )}

        {data.seoIntroBody && (
          <div className="mb-10">
            <SeoParagraphs
              body={data.seoIntroBody}
              className="text-gray-600 leading-relaxed mb-5 text-base last:mb-0"
            />
          </div>
        )}

        {sections.length > 0 && (
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={`${section.heading}-${index}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {section.heading}
                </h3>
                <SeoParagraphs
                  body={section.body}
                  className="text-gray-600 leading-relaxed mb-5 text-base last:mb-0"
                />
              </div>
            ))}
          </div>
        )}

        {data.seoConclusion && (
          <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <SeoParagraphs
              body={data.seoConclusion}
              className="text-blue-900 leading-relaxed font-medium mb-5 last:mb-0"
            />
          </div>
        )}
      </div>
    </section>
  );
}
