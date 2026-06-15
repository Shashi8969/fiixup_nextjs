import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Wrench } from "lucide-react";

export type BlogLinkAttachment = {
  label?: string;
  title?: string;
  name?: string;
  href?: string;
  url?: string;
  path?: string;
  description?: string;
};

export type BlogServiceAttachment = BlogLinkAttachment & {
  price?: string;
};

function normaliseLink(item: BlogLinkAttachment) {
  const label = String(item.label ?? item.title ?? item.name ?? "").trim();
  const href = String(item.href ?? item.url ?? item.path ?? "").trim();
  const description = item.description ? String(item.description).trim() : "";
  return { label, href, description };
}

function normaliseService(item: BlogServiceAttachment) {
  const title = String(item.title ?? item.label ?? item.name ?? "").trim();
  const href = String(item.href ?? item.url ?? item.path ?? "").trim();
  const description = item.description ? String(item.description).trim() : "";
  const price = item.price ? String(item.price).trim() : "";
  return { title, href, description, price };
}

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

function SafeLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (!href) return <span className={className}>{children}</span>;
  if (isExternal(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

export function BlogAttachments({
  nearbyAreas = [],
  relatedServices = [],
  internalLinks = [],
}: {
  nearbyAreas?: BlogLinkAttachment[];
  relatedServices?: BlogServiceAttachment[];
  internalLinks?: BlogLinkAttachment[];
}) {
  const areas = nearbyAreas.map(normaliseLink).filter((item) => item.label && item.href);
  const services = relatedServices.map(normaliseService).filter((item) => item.title && item.href);
  const links = internalLinks.map(normaliseLink).filter((item) => item.label && item.href);

  if (!areas.length && !services.length && !links.length) return null;

  return (
    <section className="mt-10 pt-8 border-t border-gray-200 space-y-8" aria-label="Related Fiixup links">
      {services.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Related Fiixup Services</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service, index) => (
              <SafeLink
                key={`${service.href}-${index}`}
                href={service.href}
                className="group block rounded-2xl border border-gray-200 bg-white p-4 hover:border-red-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{service.title}</h3>
                    {service.description && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{service.description}</p>}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 mt-1 shrink-0" />
                </div>
                {service.price && <p className="text-xs font-semibold text-red-600 mt-3">{service.price}</p>}
              </SafeLink>
            ))}
          </div>
        </div>
      )}

      {areas.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Nearby Areas Covered</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {areas.map((area, index) => (
              <SafeLink
                key={`${area.href}-${index}`}
                href={area.href}
                className="group rounded-xl border border-gray-200 bg-gray-50 p-4 hover:bg-white hover:border-red-200 transition-all"
              >
                <span className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{area.label}</span>
                {area.description && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{area.description}</p>}
              </SafeLink>
            ))}
          </div>
        </div>
      )}

      {links.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Helpful Links</h2>
          <div className="flex flex-wrap gap-2">
            {links.map((link, index) => (
              <SafeLink
                key={`${link.href}-${index}`}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                {link.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </SafeLink>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
