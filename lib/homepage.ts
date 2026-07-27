import { cache } from "react";
import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import { features as fallbackFeatures, avatars as fallbackAvatars } from "@/lib/data/homepageData";
import { aboutContent, highlights as fallbackHighlights, stats as fallbackStats } from "@/lib/data/about";
import { getAllServiceCategories } from "@/lib/data/serviceCategory";
import { SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_KEYWORDS, CITIES_LIST, MAIN_EMAIL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { asArray, asObject, asString, normalizeJsonLd } from "@/lib/cms-guards";
import { getGlobalServiceHref } from "@/lib/routes";
import { normalizePublicPath } from "@/lib/public-links";

type HomeSeoRow = {
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  canonical_url?: string | null;
  og_image_url?: string | null;
  schema_json?: unknown;
  page_data?: unknown;
};

type CityHubRow = {
  url_path: string | null;
  page_data: Record<string, unknown> | null;
};

export type HomeHeroData = {
  badgeText: string;
  heading: string;
  subheading: string;
  features: string[];
  avatars: string[];
  reviewText: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  imageUrl: string;
  imageAlt: string;
  formTitle: string;
  formSubtitle: string;
  cityOptions: string[];
  successTitle: string;
  successText: string;
  experienceValue: string;
  experienceLabel: string;
};

export type HomeServicesData = {
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  maxItems: number;
  categories: any[];
};

export type HomeAboutData = {
  title: string;
  description1: string;
  description2: string;
  imageUrl: string;
  imageAlt: string;
  imageTitle: string;
  highlights: { heading: string; text: string }[];
  stats: { value: string; label: string }[];
  howItWorksHeading: string;
};

export type HomeCoverageCity = {
  name: string;
  slug: string;
  areas: string;
  highlight: string;
};

export type HomeCityCoverageData = {
  heading: string;
  subtext: string;
  expansionText: string;
  cities: HomeCoverageCity[];
};

export type HomeBlogData = {
  heading: string;
  subtext: string;
  ctaLabel: string;
};

export type HomeContactData = {
  heading: string;
  subtext: string;
  formTitle: string;
  formSubtitle: string;
  successText: string;
  errorText: string;
  cities: string[];
  trustBadges: string[];
};

export type HomePageData = {
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
    schemaJson: unknown[] | null;
  };
  hero: HomeHeroData;
  services: HomeServicesData;
  about: HomeAboutData;
  cityCoverage: HomeCityCoverageData;
  blog: HomeBlogData;
  contact: HomeContactData;
};

const FALLBACK_HOME_DATA: Omit<HomePageData, "services" | "cityCoverage"> & {
  services: Omit<HomeServicesData, "categories">;
  cityCoverage: Omit<HomeCityCoverageData, "cities">;
} = {
  seo: {
    title: "24/7 Doorstep Car & Bike Repair | Fiixup",
    description: "Certified mechanics at your home or office across India. Serving Bangalore, Chennai, Hyderabad & Mumbai. Starting ₹249. 20-min response. Book now.",
    keywords: DEFAULT_KEYWORDS,
    canonical: SITE_URL,
    ogImage: DEFAULT_OG_IMAGE,
    schemaJson: null,
  },
  hero: {
    badgeText: "Bengaluru · Chennai · Hyderabad · Mumbai",
    heading: "24/7 Car & Bike Service at Your Doorstep",
    subheading: "Book in Seconds, Get Car & Bike Repair in Minutes. Certified Mechanics, Transparent Pricing, 30-Day Warranty.",
    features: fallbackFeatures,
    avatars: fallbackAvatars,
    reviewText: "Drivers across Bangalore, Chennai, Hyderabad & Mumbai trust us for quick and reliable doorstep repairs",
    primaryCtaLabel: "Book Service Now",
    primaryCtaHref: "/contact#contact-form",
    secondaryCtaLabel: "Call Now",
    imageUrl: "/assets/Car_mechanic_700x1049.webp",
    imageAlt: "Certified mechanic performing doorstep car repair in India",
    formTitle: "Book in 30 seconds. Mechanic at your doorstep in 20 minutes.",
    formSubtitle: "Tell us your issue — our nearby mechanic team will contact you shortly",
    cityOptions: [...CITIES_LIST],
    successTitle: "Request Sent!",
    successText: "Our team will call you within 1 minutes 🚀",
    experienceValue: "20+",
    experienceLabel: "Years Experience",
  },
  services: {
    heading: "Professional Vehicle Services",
    subtext: "Certified technicians at your doorstep. We provide high-quality maintenance and repair for all makes and models.",
    ctaLabel: "Browse All Services",
    ctaHref: "/services",
    maxItems: 8,
  },
  about: {
    title: aboutContent.title,
    description1: aboutContent.description1,
    description2: aboutContent.description2,
    imageUrl: "https://vpnztzzsyzgesnpihxsu.supabase.co/storage/v1/object/public/images/general/about-us-fiixup-1779454912831.webp",
    imageAlt: aboutContent.imageAlt,
    imageTitle: "About Fiixup doorstep car and bike service",
    highlights: fallbackHighlights,
    stats: fallbackStats.map(({ value, label }) => ({ value, label })),
    howItWorksHeading: aboutContent.sections.howItWorks,
  },
  cityCoverage: {
    heading: "Doorstep Car & Bike Mechanic Services Across Major Indian Cities",
    subtext: "Book nearby car and bike mechanics for doorstep repair, emergency breakdown help, battery replacement, puncture repair, oil change, and roadside assistance across Bengaluru, Chennai, Hyderabad, and Mumbai.",
    expansionText: "Expanding soon to Delhi, Pune, Kolkata, Ahmedabad, and more Indian cities",
  },
  blog: {
    heading: "Latest from Our Blog",
    subtext: "Expert tips, maintenance guides, and industry insights to help you keep your car and bike in perfect condition.",
    ctaLabel: "View All Articles",
  },
  contact: {
    heading: "Book a Nearby Car or Bike Mechanic at Your Location",
    subtext: `Need help with a dead battery, puncture, engine issue, oil change, brake problem, or vehicle not starting? Fiixup provides doorstep car and bike repair services across ${CITIES_LIST.join(", ")}. Mechanics arrive at your home, office, apartment parking, or roadside location for quick repair and servicing support.`,
    formTitle: "Book in 30 seconds. Mechanic at your doorstep in 20 minutes.",
    formSubtitle: "Share your vehicle issue and our nearby mechanic team will contact you shortly for booking confirmation and assistance.",
    successText: "✅ Booking request received successfully. Our team will contact you shortly.",
    errorText: `❌ Unable to send your request right now. Please call us directly at ${MAIN_PHONE_DISPLAY}.`,
    cities: [...CITIES_LIST],
    trustBadges: [
      "✅ Technician arrives in 20 minutes",
      "✅ Upfront pricing — no hidden charges",
      "✅ 30-day warranty on all repairs",
      "✅ Certified & background-verified technicians",
    ],
  },
};

function clean(value: unknown, fallback = "") {
  const text = asString(value).trim();
  return text || fallback;
}

function strings(value: unknown, fallback: string[] = []) {
  const items = asArray(value).map((item) => clean(item)).filter(Boolean);
  return items.length ? items : fallback;
}

function records<T>(value: unknown, map: (item: Record<string, unknown>) => T | null, fallback: T[] = []) {
  const items = asArray<Record<string, unknown>>(value).map(map).filter(Boolean) as T[];
  return items.length ? items : fallback;
}

function numberValue(value: unknown, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function mergeHero(pd: Record<string, unknown>, cityOptions: string[]): HomeHeroData {
  const hero = asObject(pd.hero);
  return {
    badgeText: clean(hero.badgeText, FALLBACK_HOME_DATA.hero.badgeText),
    heading: clean(hero.heading, FALLBACK_HOME_DATA.hero.heading),
    subheading: clean(hero.subheading, FALLBACK_HOME_DATA.hero.subheading),
    features: strings(hero.features, FALLBACK_HOME_DATA.hero.features),
    avatars: strings(hero.avatars, FALLBACK_HOME_DATA.hero.avatars),
    reviewText: clean(hero.reviewText, FALLBACK_HOME_DATA.hero.reviewText),
    primaryCtaLabel: clean(hero.primaryCtaLabel, FALLBACK_HOME_DATA.hero.primaryCtaLabel),
    primaryCtaHref: normalizePublicPath(clean(hero.primaryCtaHref, FALLBACK_HOME_DATA.hero.primaryCtaHref)),
    secondaryCtaLabel: clean(hero.secondaryCtaLabel, FALLBACK_HOME_DATA.hero.secondaryCtaLabel),
    imageUrl: clean(hero.imageUrl, FALLBACK_HOME_DATA.hero.imageUrl),
    imageAlt: clean(hero.imageAlt, FALLBACK_HOME_DATA.hero.imageAlt),
    formTitle: clean(hero.formTitle, FALLBACK_HOME_DATA.hero.formTitle),
    formSubtitle: clean(hero.formSubtitle, FALLBACK_HOME_DATA.hero.formSubtitle),
    cityOptions: strings(hero.cityOptions, cityOptions.length ? cityOptions : FALLBACK_HOME_DATA.hero.cityOptions),
    successTitle: clean(hero.successTitle, FALLBACK_HOME_DATA.hero.successTitle),
    successText: clean(hero.successText, FALLBACK_HOME_DATA.hero.successText),
    experienceValue: clean(hero.experienceValue, FALLBACK_HOME_DATA.hero.experienceValue),
    experienceLabel: clean(hero.experienceLabel, FALLBACK_HOME_DATA.hero.experienceLabel),
  };
}

function mergeServices(pd: Record<string, unknown>, categories: any[]): HomeServicesData {
  const services = asObject(pd.services);
  return {
    heading: clean(services.heading, FALLBACK_HOME_DATA.services.heading),
    subtext: clean(services.subtext, FALLBACK_HOME_DATA.services.subtext),
    ctaLabel: clean(services.ctaLabel, FALLBACK_HOME_DATA.services.ctaLabel),
    ctaHref: normalizePublicPath(clean(services.ctaHref, FALLBACK_HOME_DATA.services.ctaHref)),
    maxItems: numberValue(services.maxItems, FALLBACK_HOME_DATA.services.maxItems),
    categories,
  };
}

// "Vehicles Serviced" is a sum of every city's own area totals (see
// fn_build_city_seo_page), not an independently-typed number — this keeps
// the homepage claim mathematically tied to what each city page claims,
// instead of the two silently drifting apart.
function overrideVehiclesServiced(
  stats: { value: string; label: string }[],
  vehiclesTotal: number
): { value: string; label: string }[] {
  if (!Number.isFinite(vehiclesTotal) || vehiclesTotal <= 0) return stats;
  const formatted = `${vehiclesTotal.toLocaleString("en-IN")}+`;
  return stats.map((stat) =>
    stat.label.trim().toLowerCase() === "vehicles serviced" ? { ...stat, value: formatted } : stat
  );
}

function mergeAbout(pd: Record<string, unknown>, vehiclesTotal: number): HomeAboutData {
  const about = asObject(pd.about);
  return {
    title: clean(about.title, FALLBACK_HOME_DATA.about.title),
    description1: clean(about.description1, FALLBACK_HOME_DATA.about.description1),
    description2: clean(about.description2, FALLBACK_HOME_DATA.about.description2),
    imageUrl: clean(about.imageUrl, FALLBACK_HOME_DATA.about.imageUrl),
    imageAlt: clean(about.imageAlt, FALLBACK_HOME_DATA.about.imageAlt),
    imageTitle: clean(about.imageTitle, FALLBACK_HOME_DATA.about.imageTitle),
    highlights: records(
      about.highlights,
      (item) => {
        const heading = clean(item.heading ?? item.title);
        const text = clean(item.text ?? item.description);
        return heading && text ? { heading, text } : null;
      },
      FALLBACK_HOME_DATA.about.highlights
    ),
    stats: overrideVehiclesServiced(
      records(
        about.stats,
        (item) => {
          const value = clean(item.value);
          const label = clean(item.label);
          return value && label ? { value, label } : null;
        },
        FALLBACK_HOME_DATA.about.stats
      ),
      vehiclesTotal
    ),
    howItWorksHeading: clean(about.howItWorksHeading, FALLBACK_HOME_DATA.about.howItWorksHeading),
  };
}

function mergeCityCoverage(pd: Record<string, unknown>, cities: HomeCoverageCity[]): HomeCityCoverageData {
  const cityCoverage = asObject(pd.cityCoverage);
  return {
    heading: clean(cityCoverage.heading, FALLBACK_HOME_DATA.cityCoverage.heading),
    subtext: clean(cityCoverage.subtext, FALLBACK_HOME_DATA.cityCoverage.subtext),
    expansionText: clean(cityCoverage.expansionText, FALLBACK_HOME_DATA.cityCoverage.expansionText),
    cities,
  };
}

function mergeBlog(pd: Record<string, unknown>): HomeBlogData {
  const blog = asObject(pd.blog);
  return {
    heading: clean(blog.heading, FALLBACK_HOME_DATA.blog.heading),
    subtext: clean(blog.subtext, FALLBACK_HOME_DATA.blog.subtext),
    ctaLabel: clean(blog.ctaLabel, FALLBACK_HOME_DATA.blog.ctaLabel),
  };
}

function mergeContact(pd: Record<string, unknown>, cities: string[]): HomeContactData {
  const contact = asObject(pd.contact);
  return {
    heading: clean(contact.heading, FALLBACK_HOME_DATA.contact.heading),
    subtext: clean(contact.subtext, FALLBACK_HOME_DATA.contact.subtext),
    formTitle: clean(contact.formTitle, FALLBACK_HOME_DATA.contact.formTitle),
    formSubtitle: clean(contact.formSubtitle, FALLBACK_HOME_DATA.contact.formSubtitle),
    successText: clean(contact.successText, FALLBACK_HOME_DATA.contact.successText),
    errorText: clean(contact.errorText, FALLBACK_HOME_DATA.contact.errorText),
    cities: strings(contact.cities, cities.length ? cities : FALLBACK_HOME_DATA.contact.cities),
    trustBadges: strings(contact.trustBadges, FALLBACK_HOME_DATA.contact.trustBadges),
  };
}

async function fetchHomeSeoPage(): Promise<HomeSeoRow | null> {
  const { data, error } = await supabase
    .from("seo_pages")
    .select("meta_title,meta_description,meta_keywords,canonical_url,og_image_url,schema_json,page_data")
    .eq("url_path", "/")
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) return null;
  return data as HomeSeoRow;
}

async function fetchHomepageCities(): Promise<{ cities: HomeCoverageCity[]; vehiclesTotal: number }> {
  const { data, error } = await supabase
    .from("seo_pages")
    .select("url_path,page_data")
    .eq("page_type", "city_hub")
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .limit(24);

  if (error || !data?.length) return { cities: [], vehiclesTotal: 0 };

  const rows = data as CityHubRow[];
  const seen = new Set<string>();
  const cities: HomeCoverageCity[] = [];
  let vehiclesTotal = 0;

  for (const row of rows) {
    const path = normalizePublicPath(row.url_path);

    const pd = asObject(row.page_data);
    const citySlug = clean(pd.citySlug, path.split("/").filter(Boolean)[0] ?? "").toLowerCase();
    const cityName = clean(pd.cityName, citySlug);
    if (!citySlug || seen.has(citySlug)) continue;

    const areas = asArray<Record<string, unknown>>(pd.areas)
      .map((area) => clean(area.name))
      .filter(Boolean)
      .slice(0, 4)
      .join(" · ");

    seen.add(citySlug);
    cities.push({
      name: cityName,
      slug: citySlug,
      areas: areas || clean(pd.statsCoverage, "Major service areas"),
      highlight: clean(pd.heroTagline ?? pd.servicesSectionSubtext, `Doorstep repair service across ${cityName}`),
    });

    const cityVehiclesTotal = Number(pd.vehiclesServicedTotal);
    if (Number.isFinite(cityVehiclesTotal)) vehiclesTotal += cityVehiclesTotal;
  }

  return { cities, vehiclesTotal };
}

async function getHomepageServiceCategories() {
  const categories = await getAllServiceCategories();
  const seen = new Set<string>();
  const deduped = categories.filter((cat: any) => {
    const slug = clean(cat.slug).toLowerCase();
    if (!slug || seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });

  return deduped.map((cat: any) => ({
    ...cat,
    link: getGlobalServiceHref(cat.slug),
  }));
}

const getHomepageDbPayload = unstable_cache(
  async () => {
    const [homeRow, homepageCities] = await Promise.all([
      fetchHomeSeoPage(),
      fetchHomepageCities(),
    ]);

    return { homeRow, coverageCities: homepageCities.cities, vehiclesTotal: homepageCities.vehiclesTotal };
  },
  ["homepage-db-payload"],
  { revalidate: 3600, tags: ["homepage", "seo-pages", "cities", "areas", "navigation-links"] }
);

export const getHomepageData = cache(async (): Promise<HomePageData> => {
  const { homeRow, coverageCities, vehiclesTotal } = await getHomepageDbPayload() as {
    homeRow: HomeSeoRow | null;
    coverageCities: HomeCoverageCity[];
    vehiclesTotal: number;
  };
  const categories = await getHomepageServiceCategories();
  const pd = asObject(homeRow?.page_data);
  const cityNames = coverageCities.map((city) => city.name).filter(Boolean);
  const schemaJson = normalizeJsonLd(homeRow?.schema_json);

  return {
    seo: {
      title: clean(homeRow?.meta_title, FALLBACK_HOME_DATA.seo.title),
      description: clean(homeRow?.meta_description, FALLBACK_HOME_DATA.seo.description),
      keywords: clean(homeRow?.meta_keywords, FALLBACK_HOME_DATA.seo.keywords),
      canonical: clean(homeRow?.canonical_url, FALLBACK_HOME_DATA.seo.canonical),
      ogImage: clean(homeRow?.og_image_url, FALLBACK_HOME_DATA.seo.ogImage),
      schemaJson: schemaJson.length ? schemaJson : null,
    },
    hero: mergeHero(pd, cityNames),
    services: mergeServices(pd, categories),
    about: mergeAbout(pd, vehiclesTotal),
    cityCoverage: mergeCityCoverage(pd, coverageCities),
    blog: mergeBlog(pd),
    contact: mergeContact(pd, cityNames),
  };
});
