import { asArray, asObject, asString } from "@/lib/cms-guards";

export interface LocationServicePageSettings {
  hero: {
    eyebrow: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    arrivalNote: string;
    availabilityLabel: string;
    arrivalLabel: string;
    warrantyLabel: string;
  };
  trustItems: { icon: string; label: string }[];
  breadcrumbs: { name: string; url: string }[];
  pricing: {
    intro: string;
    ctaLabel: string;
    ctaHref: string;
  };
  faqIntro: string;
  closingCta: {
    heading: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}

function isLocalPath(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\");
}

export function normalizeLocationServicePageSettings(value: unknown): LocationServicePageSettings {
  const settings = asObject(value);
  const hero = asObject(settings.hero);
  const pricing = asObject(settings.pricing);
  const closingCta = asObject(settings.closingCta ?? settings.closing_cta);

  return {
    hero: {
      eyebrow: asString(hero.eyebrow),
      primaryLabel: asString(hero.primaryLabel ?? hero.primary_label),
      primaryHref: asString(hero.primaryHref ?? hero.primary_href),
      secondaryLabel: asString(hero.secondaryLabel ?? hero.secondary_label),
      secondaryHref: asString(hero.secondaryHref ?? hero.secondary_href),
      arrivalNote: asString(hero.arrivalNote ?? hero.arrival_note),
      availabilityLabel: asString(hero.availabilityLabel ?? hero.availability_label),
      arrivalLabel: asString(hero.arrivalLabel ?? hero.arrival_label),
      warrantyLabel: asString(hero.warrantyLabel ?? hero.warranty_label),
    },
    trustItems: asArray<unknown>(settings.trustItems ?? settings.trust_items).flatMap((item) => {
      const row = asObject(item);
      const label = asString(row.label);
      return label ? [{ icon: asString(row.icon), label }] : [];
    }),
    breadcrumbs: asArray<unknown>(settings.breadcrumbs).flatMap((item) => {
      const row = asObject(item);
      const name = asString(row.name);
      const url = asString(row.url);
      return name && isLocalPath(url) ? [{ name, url }] : [];
    }),
    pricing: {
      intro: asString(pricing.intro),
      ctaLabel: asString(pricing.ctaLabel ?? pricing.cta_label),
      ctaHref: asString(pricing.ctaHref ?? pricing.cta_href),
    },
    faqIntro: asString(settings.faqIntro ?? settings.faq_intro),
    closingCta: {
      heading: asString(closingCta.heading),
      body: asString(closingCta.body),
      primaryLabel: asString(closingCta.primaryLabel ?? closingCta.primary_label),
      primaryHref: asString(closingCta.primaryHref ?? closingCta.primary_href),
      secondaryLabel: asString(closingCta.secondaryLabel ?? closingCta.secondary_label),
      secondaryHref: asString(closingCta.secondaryHref ?? closingCta.secondary_href),
    },
  };
}

export function safeLocationServiceActionHref(value: string, fallback: string): string {
  const href = value.trim();
  if (!href) return fallback;
  if (isLocalPath(href) || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return href;
  }

  try {
    const parsed = new URL(href);
    return parsed.protocol === "https:" ? parsed.toString() : fallback;
  } catch {
    return fallback;
  }
}
