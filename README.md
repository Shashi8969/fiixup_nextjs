# Fiixup — Next.js 14 (Migrated from Vite + React Router)

## What changed

| Old (Vite SPA) | New (Next.js 14) |
|---|---|
| `react-router` `<Link to>` | `next/link` `<Link href>` |
| `react-router` `useParams` | `params` props (server components) |
| `<SEO>` + `react-helmet-async` | `generateMetadata()` — server-side |
| `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` |
| `vite.config.ts` + `index.html` | `next.config.ts` |
| `generate-sitemap.js` (manual) | `app/sitemap.ts` (auto, built-in) |
| `vercel.json` rewrites (SPA fallback) | Next.js App Router (native routing) |
| Client-side rendering only | SSR + SSG (Google sees full HTML) |

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your EmailJS keys

# 3. Run dev server
npm run dev

# 4. Build for production
npm run build
```

## Environment variables

Rename `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

These are the same values as your old `VITE_EMAILJS_*` variables — just renamed.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import into Vercel at vercel.com/new
3. Add your `NEXT_PUBLIC_EMAILJS_*` environment variables in Vercel dashboard
4. Connect `fiixup.in` domain under Settings → Domains
5. Deploy — done!

## Adding a new city

Edit `lib/cities.ts` — add a new entry to the `cities` array following the same pattern as Bengaluru/Chennai. The city page, sitemap entry, and metadata will all generate automatically on next build.

## Adding a new service

Edit `lib/services.ts` — add a new entry to the `services` array. The service page, sitemap entry, and metadata generate automatically.

## File structure

```
app/
  layout.tsx          ← Global layout, Header, Footer, schema
  page.tsx            ← Homepage
  sitemap.ts          ← Auto-generates sitemap.xml for all pages
  not-found.tsx       ← 404 page
  [citySlug]/
    page.tsx          ← SSG city pages (bengaluru, chennai, hyderabad, mumbai)
  services/
    page.tsx          ← Services index
    [serviceSlug]/
      page.tsx        ← SSG individual service pages (12 services)
  about/page.tsx
  blog/
    page.tsx
    [id]/page.tsx     ← SSG blog post pages
  contact/page.tsx
  faq/page.tsx

components/
  Header.tsx          ← "use client" — uses usePathname
  Footer.tsx          ← Server component
  Hero.tsx            ← Server component
  Services.tsx        ← Server component
  About.tsx           ← Server component
  CityCoverage.tsx    ← Server component
  Testimonials.tsx    ← Server component (exports Testimonials + CityTestimonials)
  Blog.tsx            ← Server component
  Contact.tsx         ← "use client" — EmailJS form
  FloatingButtons.tsx ← "use client" — fixed position buttons
  city/
    CityHero.tsx      ← Server component
    CityAbout.tsx     ← Server component
    CityServices.tsx  ← Server component
    CityTestimonials.tsx
    CityFAQ.tsx       ← "use client" — accordion state
    CityContact.tsx   ← "use client" — EmailJS form

lib/
  cities.ts           ← All city data (SEO, FAQs, testimonials)
  services.ts         ← All service data (SEO, features, FAQs)
  blogPosts.json      ← Blog post content
  constants.ts        ← Phone numbers, site URL, trust badges
  schema.ts           ← JSON-LD schema helpers
  utils.ts            ← cn() utility

public/
  assets/             ← All images (copied from original project)
  robots.txt          ← Allows all crawlers, references sitemap
  favicon.ico
  site.webmanifest
```

## SEO improvements over the old site

- ✅ Googlebot now sees full HTML on first request (SSG/SSR)
- ✅ Every page has unique `<title>`, `<meta description>`, canonical URL
- ✅ Open Graph tags for WhatsApp sharing on every page
- ✅ `LocalBusiness` + `Service` + `FAQPage` JSON-LD schema — server-side
- ✅ `sitemap.xml` auto-generated — covers all 22+ pages
- ✅ `robots.txt` in place
- ✅ 301 redirects from all old WordPress URLs
- ✅ `next/image` — automatic WebP conversion + lazy loading
- ✅ City pages: `/bengaluru`, `/chennai`, `/hyderabad`, `/mumbai`
- ✅ Service pages: 12 individual service landing pages
- ✅ Blog pages: all 6 posts pre-rendered as static HTML
