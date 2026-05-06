# Fiixup Project Context

## Project Overview
- Car and bike doorstep repair service
- Operating in Bangalore, Chennai, Hyderabad, Mumbai
- Website: fiixup.in
- GitHub repo auto deploys to Hostinger on every push
- **Critical: Never push content changes to GitHub — edit data in Supabase dashboard only**

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- Tailwind Merge + CVA for variants
- Lucide React icons
- Radix UI components
- React Hook Form
- Sonner (toast notifications)
- Hostinger hosting (auto deploy from GitHub)
- Supabase (PostgreSQL database — Singapore region)
- EmailJS (contact form)
- @supabase/supabase-js

## Folder Structure
```
app/
  page.tsx                        → homepage (async — Services & Blog are async)
  [citySlug]/
    page.tsx                      → city landing page
    [areaSlug]/
      page.tsx                    → area sub-page
    services/
      page.tsx                    → all service categories for city
      [serviceSlug]/
        page.tsx                  → individual service in city
  services/
    page.tsx                      → global services listing
    [serviceSlug]/
      page.tsx                    → individual service or category page
    ServiceList.tsx               → "use client" — receives categories+services as props
  blog/
    page.tsx                      → blog list (fetches from Supabase)
    [id]/
      page.tsx                    → blog post (fetches from Supabase)
  about/page.tsx
  contact/page.tsx
  faq/page.tsx
  api/
    cities/route.ts               → GET /api/cities
    cities/[slug]/route.ts        → GET /api/cities/:slug
    services/route.ts             → GET /api/services?category=car|bike
    services/[slug]/route.ts      → GET /api/services/:slug
    categories/route.ts           → GET /api/categories
    posts/route.ts                → GET /api/posts?tag=&limit=&featured=true
    posts/[slug]/route.ts         → GET /api/posts/:slug
    revalidate/route.ts           → GET /api/revalidate?secret=&path=
  sitemap.ts                      → async, uses getAllCities + getAllServices
  not-found.tsx
  layout.tsx
  globals.css
components/
  city/
    CityHero.tsx
    CityServices.tsx              → async server component, calls getAllServiceCategories()
    CityAreas.tsx
    CityFAQ.tsx
    CityTestimonials.tsx
    CityAbout.tsx
    CityContact.tsx
    CityServiceDetail.tsx         → "use client", receives relatedServices as prop
  service/
    ServiceHero.tsx
    ServiceFAQ.tsx
    ServiceBenefits.tsx
    ServiceTestimonials.tsx
    PricingTable.tsx
    BrandsGrid.tsx
    CompleteGuide.tsx
    ServiceIncluded.tsx
    ServiceRelated.tsx
    ServiceCities.tsx
    ServiceTrustStrip.tsx
  ui/
    ServiceCard.tsx
    ServiceCardPrice.tsx
    TrustStrip.tsx
    HowItWorks.tsx
    BlogCard.tsx
    BookingCTA.tsx
    PageHero.tsx
    SectionHeader.tsx
    WhyChooseDoorstep.tsx
    FAQAccordion.tsx
  Hero.tsx
  About.tsx
  Services.tsx                    → async server component, calls getAllServiceCategories()
  Blog.tsx                        → async server component, getFeaturedPosts() + fallback to getAllPosts()
  CityCoverage.tsx                → static hardcoded 4 cities for homepage
  Testimonials.tsx
  Contact.tsx
  Header.tsx
  Footer.tsx
  FloatingButtons.tsx
  QuickServiceModal.tsx
lib/
  supabase.ts                     → Supabase client (anon key only)
  cities.ts                       → getAllCities, getCityBySlug (undefined guard!), getAreaBySlug
  services.ts                     → getAllServices, getServiceBySlug, getServicesByCategory, getServicesBySlugs
  posts.ts                        → getAllPosts, getPostBySlug, getFeaturedPosts, getPostsByTag
  data/
    serviceCategory.ts            → getAllServiceCategories(), getServiceCategoryBySlug() + empty serviceCategories[]
    seo/                          → static SEO metadata
    faqs.ts
    about.ts
    homepageData.ts
    site.ts
    testimonials.ts
    brands.ts
    serviceOptions.ts
  models/
    city.model.ts
    service.model.ts
    blog.model.ts                 → content: any[] (NOT string)
    faq.model.ts
    testimonial.model.ts
  icons.ts
  schema.ts
  theme.ts                        → serviceThemes, ThemeColor type
  constants.ts                    → SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY
  utils.ts
scripts/
  push-to-supabase.mjs            → one-time migration script (already run — do not delete)
```

## Supabase Schema

### cities table
```sql
id uuid primary key default gen_random_uuid()
slug text unique not null
name text
state text
phone text
whatsapp text
email text
hero_tagline text
meta_title text
meta_description text
meta_keywords text
about_heading text
about_para1 text
about_para2 text
about_bullets jsonb           -- [{ heading, text }]
stats_label text
services_section_heading text
services_section_subtext text
car_services_heading text
bike_services_heading text
city_service_highlights jsonb -- [{ title, description }]
testimonials_heading text
testimonials_subtext text
testimonials jsonb            -- [{ name, rating, text, date, area, vehicle }]
faq_categories jsonb          -- [{ category, faqs: [{ q, a }] }]
areas jsonb                   -- [{ name, slug, highlight }]
created_at timestamptz default now()
updated_at timestamptz default now()
```

### services table
```sql
id uuid primary key default gen_random_uuid()
slug text unique not null
category text                 -- 'car'|'bike'|'battery'|'towing'|'puncture'|'roadside'|'mechanic'
title text
short_title text
tagline text
description text
price text
duration text
icon text
features jsonb
benefits jsonb
pricing jsonb
faqs jsonb
testimonials jsonb
car_brands jsonb
bike_brands jsonb
related_slugs jsonb
guide jsonb
meta_title text
meta_description text
meta_keywords text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### service_categories table
```sql
id uuid primary key default gen_random_uuid()
slug text unique not null       -- 'car'|'bike'|'towing'|'battery'|'puncture'|'mechanic'|'roadside'
title text
description text
color text
bg_color text
icon text                       -- string: "Car"|"Bike"|"Truck"|"Battery"|"ShipWheel"|"Wrench"|"ShieldCheck"
link text
category_slug text              -- used by getServicesByCategory()
benefits jsonb
pricing_summary jsonb
brands jsonb
guide jsonb
faqs jsonb
meta_title text
meta_description text
meta_keywords text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### posts table
```sql
id uuid primary key default gen_random_uuid()
slug text unique not null
title text
excerpt text
content jsonb                  -- [{ type, content, items?, level? }] — BlogSection[]
author text
author_role text
date text
read_time text
category text
tags jsonb                     -- string[]
image text
image_alt text
related_service text
featured boolean default false -- set true for homepage Blog section
meta_title text
meta_description text
meta_keywords text
created_at timestamptz default now()
updated_at timestamptz default now()
```

## Current Data in Supabase
- **4 cities**: bangalore, chennai, hyderabad, mumbai
- **26 services** across 7 categories
- **7 service categories**: car, bike, towing, battery, puncture, mechanic, roadside
- **5 blog posts** — set `featured = true` on 3 posts for homepage display

## Supabase Client
```ts
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

## Data Fetching Rules

### 1. All lib functions are async
```ts
export async function getCityBySlug(slug: string | undefined) {
  if (!slug) return undefined;  // ALWAYS guard undefined
  const { data, error } = await supabase
    .from("cities").select("*").eq("slug", slug.toLowerCase()).single();
  if (error || !data) return undefined;
  return rowToCity(data);
}
```

### 2. Pages must be async with revalidate
```ts
export const revalidate = 3600;
export default async function Page() {
  const data = await getSomething();
}
```

### 3. generateStaticParams must be async
```ts
export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((city) => ({ citySlug: city.slug }));
}
```

### 4. sitemap.ts must be async
```ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cities, services] = await Promise.all([getAllCities(), getAllServices()]);
}
```

### 5. serviceCategories — ALWAYS use async function
```ts
// WRONG — static array is always empty []
import { serviceCategories } from "@/lib/data/serviceCategory";

// CORRECT
import { getAllServiceCategories } from "@/lib/data/serviceCategory";
const serviceCategories = await getAllServiceCategories();
```

### 6. Client components cannot call Supabase
```ts
// "use client" components receive data as props from server parent
export default function ServiceList({ categories, services }: Props) { ... }
```

### 7. Blog content type cast
```ts
// post.content is any[] in Supabase but typed as string in old model
const sections = (post.content as unknown as BlogSection[]) ?? [];
```

## URL Structure
```
/                                   → homepage
/bangalore                          → city landing page
/bangalore/koramangala              → area sub-page
/bangalore/services                 → all service categories for city
/bangalore/services/car             → car category in city
/services                           → global services listing
/services/car                       → car category page
/services/car-oil-change-at-home    → individual service page
/blog                               → blog list
/blog/how-to-jump-start-car-safely  → blog post
/contact                            → contact page
/about                              → about page
/faq                                → FAQ page
```

## Critical Rules — Never Break These

### Routing
- NEVER use &city= or ?city= query params
- ALWAYS use /[citySlug]/services/[serviceSlug] pattern

### CityServices.tsx links
```ts
// CORRECT
href={`/${city.slug}/services/${cat.slug}`}
href={`/${city.slug}/services`}

// WRONG — caused 503
href={`${cat.link}&city=${city.slug}`}
href={`/services?city=${city.slug}`}
```

### next.config.ts Rules
- NEVER add # in redirect destinations
- NEVER duplicate source paths → 503
- NEVER edit next-env.d.ts manually

### getCityBySlug — always guard undefined
```ts
export async function getCityBySlug(slug: string | undefined) {
  if (!slug) return undefined;  // without this → .toLowerCase() crash
}
```

## Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
REVALIDATE_SECRET=your-long-random-secret
# Migration only — never commit, never add to Hostinger:
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Add to Hostinger Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
REVALIDATE_SECRET
```

## Instant Page Refresh After Supabase Edit
```bash
# Single page
https://fiixup.in/api/revalidate?secret=YOUR_SECRET&path=/bangalore

# All pages at once (after bulk edits)
https://fiixup.in/api/revalidate?secret=YOUR_SECRET&path=all
```

## Content Update Workflow (No GitHub Push Needed)
```
Edit data in Supabase Table Editor → Save
→ Hit revalidate URL
→ Page live instantly
→ Zero GitHub push, Zero rebuild, Zero resources consumed
```

## What Triggers GitHub Push (Code Only)
- UI/component changes
- New page routes
- next.config.ts redirect additions
- Bug fixes in TypeScript/React code
- Never for: phone numbers, FAQs, testimonials, prices, city/service/blog data

## Row Level Security
```sql
alter table cities             enable row level security;
alter table services           enable row level security;
alter table service_categories enable row level security;
alter table posts              enable row level security;

create policy "Public read cities"     on cities             for select using (true);
create policy "Public read services"   on services           for select using (true);
create policy "Public read categories" on service_categories for select using (true);
create policy "Public read posts"      on posts              for select using (true);
```

## Known Past Bugs (Do Not Repeat)
1.  CityServices.tsx used &city= param → 503 on city pages
2.  next.config.ts had duplicate redirect source → 503
3.  next.config.ts had /contact#contact-form destination → 503
4.  next-env.d.ts had manual import of dev-only types → build crash
5.  package.json had next: ^16.2.1 (does not exist) → install failure
6.  serviceCategories static array is [] — always use getAllServiceCategories()
7.  import cities/services as default from lib → no default export → build error
8.  getCityBySlug(undefined) → .toLowerCase() crash → undefined guard required
9.  generateStaticParams sync with async data → must be async
10. sitemap() sync → must be async + Promise<MetadataRoute.Sitemap>
11. "use client" components cannot call Supabase → pass data as props
12. blog.model.ts content typed as string → must be any[]
13. carServices/bikeServices/allServicesOrdered removed → use getServicesByCategory()
14. blogPosts.json deleted → use getAllPosts() / getFeaturedPosts()
15. Blog homepage empty → set featured=true in Supabase OR fallback to getAllPosts()
16. CityServiceDetail imports carServices/bikeServices → broken → pass relatedServices as prop
