# Fiixup About page: design study and review

Reviewed 20 October 2026. Local comparison route: `/about-new`.

## Reference study

These are design references, not endorsements, copied templates, or evidence for Fiixup claims.

| Official page | Observation | Applied to Fiixup |
| --- | --- | --- |
| [Urban Company — About](https://www.urbancompany.com/about) | A direct business definition leads into distinct business and people sections. Strong typography makes the page easy to scan. | Define Fiixup immediately, then separate origins, service model, people, and priorities. Keep a consistent H1–H4 hierarchy rather than copying its heading choices. |
| [Bosch Car Service India — About](https://ap.boschcarservice.com/in/en/about-us/) | Workshop photography and a restrained layout connect the brand to practical work. History, service quality, and promises have distinct routes. | Use existing repair photographs, open space, clear service navigation, and an explanation of checks and customer approval. No borrowed training, certification, network, or quality claims. |
| [AA — About](https://www.theaa.com/about-us) | A recognizable origin story introduces routes into history, services, and future direction. | Connect the garage history to the new service model, and make current priorities a dedicated section. Dates and business identities remain explicit. |
| [RAC Business — About](https://www.rac.co.uk/business/about-us) | Motoring history and service examples connect the company's background with its current work. | Use the owner's specific October service account as evidence of the approach. No copied performance statistics or operational promises. |

The first three pages were inspected visually in the browser; the RAC page was also reviewed for its content structure. The resulting design is an original layout using Fiixup's business facts and existing assets.

## What changed

The previous draft used a rounded navy split hero, italic serif slogans, repeated card grids, and a second H2 inside the people section. The new version uses an open typographic introduction, a wide repair photograph, a two-entity history graphic, an illustrated service process, a compact service index, a mechanic profile, a clock-led service journal, current priorities, city links, and native FAQs.

Fiixup blue is the main accent. Red appears sparingly in the historical years and workshop detail. Dark navy is reserved for the real service account. The existing Inter font is reused; no font request, animation library, or package was added.

The history distinguishes Quick Mechanic (garage, established 2000) from Fiixup (separate company, started 2020). A shared phone number does not merge the entities. Jakir is described as a mobile mechanic, not the founder. His learning history around 2004 is kept separate.

The current-priorities section reflects the supplied business information: service quality, practical local coverage, technician support, and useful technology. It does not invent launch dates, future locations, staff counts, or completed milestones.

## Heading structure

- H1: Workshop roots. Doorstep care.
- H2: Origins; how Fiixup works; people; service account; current priorities; coverage; questions; closing invitation.
- H3: The two businesses, process steps and outcomes, service index heading, mechanic name, service-account stages, priorities, cities.
- H4: Individual service topics within the H3 service index.
- Labels, years, dates, and FAQ summaries are not used as heading substitutes.

There is one page H1 and no skipped downward heading levels. The existing site header, footer, callback modal, and chat tools are inherited and have not been redesigned.

## Search and accessibility decisions

The main content and company facts are server rendered. Metadata includes a unique title, description, canonical, social sharing image, and AboutPage, Person, Organization, and BreadcrumbList data. The draft overrides inherited keyword lists with an empty list. Structured data reflects the visible content and keeps the two businesses separate.

This comparison remains `noindex, follow`, with its own `/about-new` canonical, and is not added to the sitemap. If chosen for adoption, move it to the main About URL and review indexing and canonical settings together. It cannot attract search traffic while it remains a local, noindexed comparison.

Native FAQs work without the page's JavaScript. All text remains visible without scroll-reveal code. Section navigation has a current-location indicator, keyboard focus styles, and a header-aware sticky offset. The mobile navigation scrolls within its own rail. The service diagram becomes a vertical sequence on small screens. Optional hover movement and in-page smooth scrolling respect reduced-motion preferences on supporting browsers.

Images have alt text, dimensions, and responsive sizes. The hero is preloaded and the supporting photo is lazy-loaded. Both are existing illustrative service photographs; neither is identified as a portrait of Jakir, a Quick Mechanic historical photograph, or the documented service call.

[Google's official guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) continues to recommend useful, original content and established SEO practices for generative search. Specific company history and the supplied service account add information a generic About page would lack. This is not a guarantee of rankings or AI Overview inclusion. Production Core Web Vitals require measurement after deployment; development preview timings are not a production speed score.

## Verification

Results are recorded in README.md after the final local checks. The original About page and its shared data are protected by before/after SHA-256 comparisons.