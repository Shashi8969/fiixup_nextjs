# Fiixup About page — independent comparison

New route: `/about-new`. Existing route: `/about`.

All design and content changes are contained in this directory. The current About page, its shared data, global header/footer, sitemap, database, and admin panel were not changed.

## Preview

Run the website's usual local development preview, then open:

- http://127.0.0.1:3000/about-new
- http://127.0.0.1:3000/about

The comparison page includes a link to the original. The temporary server used for verification is stopped after testing.

## Design

The new page uses an open photographic introduction, a 2000-to-2020 history graphic, a responsive service diagram, a service index, a mechanic profile, a clock-led service account, current priorities, city links, and native FAQs. It uses Fiixup's blue and red accents with the existing Inter font. No package, animation library, remote font, or new database request was added by the page.

See [DESIGN-REVIEW.md](./DESIGN-REVIEW.md) for the official company references, design decisions, heading structure, and search considerations.

## Files

- `page.tsx`: server-rendered page, metadata, and structured data.
- `content.ts`: isolated services, priorities, city links, and eight FAQs.
- `about-new.module.css`: scoped responsive styles and reduced-motion rules.
- `PageEffects.tsx`: current-section navigation and a sticky offset that follows the existing header height. Content is fully readable without this enhancement.
- `opengraph-image.tsx`: 1200 × 630 social sharing image.

## Business facts

Quick Mechanic is the owner's garage in HSR Layout, Bengaluru, established in 2000. Fiixup is a separate company started in 2020 for doorstep car and bike repair and 24/7 roadside assistance. Both use 8197459732, including the Quick Mechanic Google Business Profile. The two organizations have separate structured-data identities and founding dates.

Md. Jakir Hussain is described as a mobile mechanic. His learning history around 2004 is not a company founding date. The service account reflects the supplied 2–3 October 2026 case. Images illustrate service work; they are not presented as photographs of Jakir, the historical garage, or that service call. No testimonial, rating, staff count, arrival guarantee, or expansion date has been invented.

## Local verification — 20 October 2026

- TypeScript check passed.
- Route returned HTTP 200 and compiled in the local Next.js development server.
- Checked 320, 390, 768, 1024, and 1280 pixel widths; no horizontal page overflow or clipped headings.
- One H1, eight H2s, and properly nested H3/H4 topics; no skipped downward levels.
- Section anchors resolve, active navigation updates, and anchored sections clear the sticky header/navigation.
- FAQ expansion and keyboard toggling work.
- Both page photographs loaded successfully; responsive sources, dimensions, and alt text are present.
- Booking links point to the existing contact form anchor. Phone and email links use the existing public contact details.
- JSON-LD parses successfully. Fiixup's founding date is 2020; Quick Mechanic's is 2000.
- Canonical and noindex verified in returned HTML. The inherited keyword list is absent.
- Social image returned HTTP 200 with image/png content.
- Original About source and shared About data SHA-256 hashes are unchanged.

The production build and production Core Web Vitals were not measured. Existing global callback, chat, analytics, and footer behavior remain inherited from the website and are outside this isolated redesign.

## Search indexing

The comparison page intentionally remains `noindex, follow` with its own canonical URL. It is not added to the sitemap. If selected, adopt the design at the main About URL and update canonical/indexing settings together. Local development checks do not establish Google rankings, AI Overview inclusion, or a production speed score.