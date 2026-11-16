# Fiixup contact redesign — research and decisions

Updated 22 October 2026. Local comparison route: `/contact-new`.

## Brief

The owner requested an attractive, responsive alternative while keeping the existing Contact page untouched. They chose balanced call/WhatsApp access plus a booking form, then confirmed the existing Milo assistant plus a guided booking helper. This revision responds to the request for a stronger form, maps, cities/areas, and clearer routes to booking.

The form now connects to the existing enquiry endpoint. It no longer stops at a preview review. The original `/contact` and `/about`, their shared content, and the backend were not changed. No publication occurred.

## Reference study

These references inform the choices; they do not establish a guaranteed conversion improvement or supply claims about Fiixup.

| Official page | Observed approach | Applied decision |
| --- | --- | --- |
| [Fiixup contact](https://fiixup.in/contact) | Contact cards and a substantial form follow the introduction; public contact and city information is available. | Put call, WhatsApp and the form together on desktop, use existing public settings, and make the next action clear on mobile. |
| [AA breakdown contact](https://www.theaa.com/help-support/contact-us-breakdown) | Task-specific contact routes distinguish breakdown help from other support and provide an assistant entry. | Separate urgent help, planned requests and existing-booking support. Keep human contact directly reachable. |
| [RAC contact](https://www.rac.co.uk/contact-us) | Breakdown reporting is prominent, with other contact purposes grouped separately. | Keep urgent calls available throughout discovery without requiring form completion. |
| [Urban Company help centre](https://www.urbancompany.com/helpcenter) | Compact topics help customers identify their reason for contacting support. | Use service choices that prefill the request and concise follow-up routes. |
| [Bosch Car Service contact](https://www.boschcarservice.com/xc/en/about-us/contact/) | Finding a workshop and sending a message serve different purposes. | Distinguish city/area discovery from the public contact address. Do not imply a walk-in branch in every neighbourhood. |

Fiixup, AA, RAC and Urban Company were visually inspected during the initial design research. Bosch's official contact content was reviewed. Fiixup, AA and Google's current guidance were checked again during this revision. Competitor phone numbers, scale, ratings and response promises were not transferred into Fiixup copy.

## Visual direction

An editorial service desk: large blue/ink typography, a pale blue hero, an existing repair photograph, a focused white booking panel, quiet borders and original city drawings. A darker Milo section provides a clear change of pace. Service discovery, a substantial area explorer, a vertical three-step explanation and purpose-specific support rows give sections distinct jobs.

The street illustration is deliberately labelled. Real city maps are available on request, so a heavy embed does not compete with the initial booking view. The repair photograph illustrates the service; it is not identified as a named employee portrait. Motion is limited to restrained hover/focus effects and a submission spinner, respecting reduced-motion preferences.

## Reducing enquiry friction

The previous two-step preview requested vehicle, locality, service and a description before reaching the customer's contact details. The new single form requires only mobile and city. Car/bike, service and urgency remain easy to change; unknown faults can stay “Help me choose”. More personal/vehicle detail expands optionally. There is no mandatory review step or account creation.

Six service choices populate the form. The local helper maps symptoms to a relevant service category with a clear explanation; it is rule-based, not a diagnosis or AI model. Selecting a neighbourhood transfers the actual city and locality into the same form. Mobile's fixed action bar offers call, WhatsApp and a shortcut to the form, then steps out of the way while the form is visible.

## Delivery handling

An HTTP success alone is not treated as proof of a new saved enquiry. The existing endpoint may also return a filtered or duplicate response. The new adapter requires an explicit saved lead or sent email for the received state, gives duplicates their own explanation, and preserves inputs when delivery cannot be confirmed.

A pending guard prevents repeated clicks. A bounded timeout avoids an endless spinner. Failures offer immediate call/WhatsApp routes, a copyable request and deliberate retry. A timed-out request might still have reached the backend, which is explained before retrying. There is no claim that every lead can be guaranteed or that this front end changes backend notification reliability.

No automatic message, booking, or real test lead was sent during verification. WhatsApp links contain the visitor's entered details only for sharing through their chosen action. Browser storage is not used for contact data.

## Coverage and business identity

Area names come from the existing active public area records, not an invented list. Four owner-confirmed cities are presented: Bengaluru (Bangalore), Mumbai, Hyderabad and Chennai. Maps reference the chosen city/neighbourhood; they do not represent a fleet tracker, branches or guaranteed service boundaries. Unlisted areas can still be entered manually for review.

Quick Mechanic's establishment in 2000 remains distinct from Fiixup's separate start in 2020. Their shared public number is preserved without merging their business identities. The current public contact address is separately labelled. Arrival estimates and availability are confirmed per request; extra paid work requires explanation and approval. No fabricated testimonials, scale figures, fixed ETA or universal warranty was added.

## Search, accessibility and speed

The server-rendered content includes one H1, descriptive section headings, phone/email/address details, city links, FAQs, unique metadata, a social image and ContactPage/Organization/BreadcrumbList structured data. The comparison remains excluded from indexing and the sitemap. These controls need review when adopting the selected design at the real contact URL.

[Google's generative-search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) continues to emphasize useful content and established SEO practices. The page makes Fiixup's contact methods, service scope, availability limits and booking process explicit; it makes no AI Overview inclusion promise and adds no special AI-ranking markup.

Controls use labels, native validation, visible focus, appropriate autocomplete, error/status announcements and keyboard-operable FAQs. Form shortcuts move focus to a heading positioned below the shared sticky header. Mobile inputs use 16px text. Interactivity is isolated to the required client components. There are no new dependencies, font families, animation libraries or map SDKs. The existing responsive image is prioritized; the map iframe is created only on demand.

The existing global header, footer and callback popup remain inherited. Route-scoped CSS hides duplicate floating call/WhatsApp actions and keeps Milo compact without editing shared files. The new mobile dock yields while the form is visible and when an ARIA dialog is open.

Verification and material limits are documented in README.md. Desktop/mobile checks and offline delivery tests are evidence of local behavior, not measured production conversion lift or Core Web Vitals.
