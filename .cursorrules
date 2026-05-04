# Fiixup Project Context

## Project Overview
- Car and bike doorstep repair service
- Operating in Bengaluru, Chennai
- Website: fiixup.in
- GitHub repo auto deploys to Hostinger on every push
- **Critical: Never push content changes to GitHub — edit data in Supabase dashboard only**

## Tech Stack
- Next.js 15 (App Router)
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

## Folder Structure
```
app/
  [citySlug]/                     → city landing pages
    page.tsx                      → city home
    services/
      page.tsx                    → all services for that city
      [serviceSlug]/
        page.tsx                  → individual service in city
  services/                       → global service pages
    [serviceSlug]/
      page.tsx                    → individual service page
  api/                            → Next.js API routes
    cities/
      route.ts                    → GET /api/cities
      [slug]/
        route.ts                  → GET /api/cities/:slug
    services/
      route.ts                    → GET /api/services?category=car|bike
      [slug]/
        route.ts                  → GET /api/services/:slug
    categories/
      route.ts                    → GET /api/categories
    posts/
      route.ts                    → GET /api/posts?tag=&limit=
      [slug]/
        route.ts                  → GET /api/posts/:slug
    revalidate/
      route.ts                    → GET /api/revalidate?secret=&path=
  blog/
    page.tsx
    [slug]/
      page.tsx
  contact/
    page.tsx
components/
  city/                           → city specific components
    CityHero.tsx
    CityServices.tsx              → CRITICAL: see rules below
    CityAreas.tsx
    CityFAQ.tsx
    CityTestimonials.tsx
    CityAbout.tsx
  ui/                             → reusable UI components
    ServiceCard.tsx
    TrustStrip.tsx
    HowItWorks.tsx
lib/
  supabase.ts                     → Supabase client
  cities.ts                       → city data functions
  services.ts                     → service data functions
  categories.ts                   → category data functions
  posts.ts                        → blog post functions
  constants.ts                    → SITE_URL, MAIN_PHONE, etc
  theme.ts                        → serviceThemes, ThemeColor type
content/                          → JSON fallback files (gitignored)
```

## Supabase Schema

### cities table
```sql
id uuid primary key
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
about_bullets jsonb          -- [{ heading, text }]
stats_label text
services_section_heading text
services_section_subtext text
car_services_heading text
bike_services_heading text
city_service_highlights jsonb -- [{ title, description }]
testimonials_heading text
testimonials_subtext text
testimonials jsonb           -- [{ name, rating, text, date, area }]
faq_categories jsonb         -- [{ category, faqs: [{ q, a }] }]
areas jsonb                  -- [{ name, slug, highlight }]
```

### services table
```sql
id uuid primary key
slug text unique not null
category text               -- 'car' or 'bike'
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
```

### service_categories table
```sql
id uuid primary key
slug text unique not null
title text
description text
color text
bg_color text
icon text
link text
benefits jsonb
pricing_summary jsonb
brands jsonb
guide jsonb
```

### posts table
```sql
id uuid primary key
slug text unique not null
title text
excerpt text
content text
cover_image text
author text
published_at timestamptz
tags jsonb
```

## Supabase Client
```ts
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

## Data Fetching Pattern
- Always use async/await with Supabase client
- Always add export const revalidate = 3600 on data pages
- Never fetch data client side — always server components
- Always handle null/empty with ?? [] or ?? null

```ts
// Standard pattern for all lib functions
export async function getCityBySlug(slug: string) {
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug.toLowerCase())
    .single();
  if (error) return null;
  return data;
}
```

## URL Structure
```
/bengaluru                              → city landing page
/bengaluru/services                     → all services for city
/bengaluru/services/car-oil-change      → specific service in city
/services/car-oil-change               → global service page
/blog                                  → blog list
/blog/some-post-slug                   → blog post
/contact                               → contact page
```

## Critical Rules — Never Break These

### Routing
- NEVER use &city= or ?city= query params for city routing
- ALWAYS use /[citySlug]/services/[serviceSlug] pattern
- NEVER use /services/car&city=bengaluru pattern

### CityServices.tsx links
```ts
// CORRECT
href={`/${city.slug}/services/${cat.slug}`}   // category card
href={`/${city.slug}/services`}               // browse all button

// WRONG — caused 503 in production
href={`${cat.link}&city=${city.slug}`}        // broken pattern
href={`/services?city=${city.slug}`}          // broken pattern
```

### next.config.ts Rules
- NEVER add hash (#) in redirect destinations
  → use /contact not /contact#contact-form
- NEVER duplicate source paths in redirects array
  → Next.js throws fatal error and site goes down (503)
- NEVER edit next-env.d.ts manually
  → it is auto-generated by Next.js

### ISR — Add to Every Page That Reads Supabase
```ts
export const revalidate = 3600; // refresh every 1 hour
```

### generateStaticParams — Always Async
```ts
export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((city) => ({ citySlug: city.slug }));
}
```

## Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
REVALIDATE_SECRET=your-long-random-secret
```

Also add all three to Hostinger Environment Variables panel.

## Instant Page Refresh After Supabase Edit
```
GET https://fiixup.in/api/revalidate?secret=YOUR_SECRET&path=/bengaluru
```
Call this after editing any city/service data in Supabase dashboard.

## Content Update Workflow (No GitHub Push Needed)
```
Edit data → Supabase Table Editor → Save
→ Hit /api/revalidate?secret=xxx&path=/affected-page
→ Page updates instantly
→ Zero GitHub push
→ Zero Hostinger rebuild
→ Zero resource consumption
```

## What Triggers GitHub Push (Code Only)
- UI/component changes
- New page routes
- next.config.ts redirect additions
- Bug fixes in TypeScript/React code
- Never for: phone numbers, FAQs, testimonials, service prices, city data

## Row Level Security (Supabase)
```sql
-- All tables are public read, no public write
create policy "Public read" on cities for select using (true);
create policy "Public read" on services for select using (true);
create policy "Public read" on service_categories for select using (true);
create policy "Public read" on posts for select using (true);
```

## Known Past Bugs (Do Not Repeat)
1. CityServices.tsx used &city= param → 503 on city pages
2. next.config.ts had duplicate /car-jumpstart-near-me-bengaluru source → 503
3. next.config.ts had /contact#contact-form destination → 503
4. next-env.d.ts had manual import of dev-only types file → build crash
5. package.json had next: ^16.2.1 (does not exist) → install failure
