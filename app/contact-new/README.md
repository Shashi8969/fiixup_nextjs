# Fiixup Contact — conversion design, 22 October 2026

Comparison route: `/contact-new`. Original route: `/contact`.

The original Contact and About pages and their shared components/data were not edited. All implementation changes are inside this directory. No navigation, sitemap, endpoint, database schema, admin code, or dependency changes were made. Nothing was deployed.

## Preview locally

Run `npm run dev` from the website project, then open:

- http://localhost:3000/contact-new
- http://localhost:3000/contact

The task's own preview server is stopped after verification. The saved images remain available without it.

## The form now sends real enquiries

This revision replaces the previous preview-only review flow. **Clicking “Request a mechanic” with valid details sends a real request to the existing `/api/leads` endpoint.** The endpoint's existing storage, notification, anti-spam, and duplicate controls still apply. A received enquiry does not confirm availability, price or technician dispatch.

Only mobile number and city are required. Vehicle and service have editable defaults. Locality, name, model and the problem description are optional. Urgent help and planned service are distinct choices. Additional details expand only when needed.

- Repeated clicks are blocked while a request is pending.
- A 20-second timeout stops the form waiting indefinitely. An aborted request may still have reached the server.
- Confirmation requires an explicit saved lead or sent email result. A generic HTTP 200 is insufficient.
- The endpoint's duplicate response has separate copy directing customers to check the earlier enquiry.
- Errors keep the entered details. Call, prefilled WhatsApp, copy-request and manual retry options are offered.
- There are no automatic retries or background submissions. No name, number or location is written to browser storage.
- Analytics reuse the existing event helper without sending contact details as event parameters.

Production delivery was not exercised with a real lead or SMTP email during this task. Contract tests use a mocked transport and make no network requests. Correct end-to-end delivery still depends on the existing backend's configuration and availability.

## Coverage and maps

The server reuses `getSmartNearbyAreaHubs` to read up to 80 active area links per supported city. The four-city scope is owner-confirmed. These cached reads use existing public data and require no database changes. If area data is unavailable, the page offers manual locality entry rather than fabricated results.

The explorer supports city selection, area search, selected locality, and transferring that city/locality into the form. Service choices similarly prefill the service field and move focus to the form heading.

Google Maps is loaded only when the visitor presses the map button. Before that, an original street illustration is explicitly labelled as illustrative. Maps show a city or selected neighbourhood, not live technicians, coverage boundaries or branch locations. The separately labelled contact-address link uses the existing public settings. The existing CSP already permits the Google iframe origin; no security headers changed.

Mobile has a fixed Call / WhatsApp / Request help bar. It hides while the form is in view. Route-scoped CSS hides the inherited duplicate floating call/WhatsApp controls and keeps Milo compact. Existing global header, footer, callback popup and chatbot code remain inherited.

## Files

- `page.tsx`: server-rendered page, existing public settings/area helpers, metadata and JSON-LD.
- `RequestForm.tsx`: single-form enquiry flow, guided picker, validation and delivery/fallback UI.
- `request.ts`: phone normalization, payload/attribution mapping, WhatsApp summary and request adapter.
- `request.test.cjs`: offline contract tests; run `node app/contact-new/request.test.cjs`.
- `CoverageExplorer.tsx`: city/locality discovery and click-to-load map.
- `ContactActions.tsx`, `booking.ts`: service selection, form-prefill events and mobile actions.
- `MiloLauncher.tsx`: adapter opening the existing widget via its accessible launcher label. Update it if that shared label changes.
- `content.ts`, `CityDrawing.tsx`: service guidance, accurate FAQs and original city line art.
- `contact-new.module.css`: scoped styling, breakpoints, focus treatment and reduced motion.
- `opengraph-image.tsx`: local 1200 × 630 social preview.

## Verification

- TypeScript passed with incremental output disabled; local page and sharing image returned HTTP 200.
- Phone/payload/attribution/delivery/duplicate/error/abort contract tests passed without network calls.
- Layouts at 320, 390, 768, 1024 and 1440px: no horizontal page overflow, headings fit. Phone text is 16px on mobile.
- Service-to-form and area-to-form transfer, city search, mobile jump/focus and optional fields checked in the browser.
- Invalid phone input was rejected before any request. Real submission was deliberately not attempted.
- Google Maps was visibly verified for Mumbai and Bengaluru. Milo opened, without sending a chat message.
- Native FAQs toggle with click and Enter. The mobile booking shortcut puts the heading below the sticky header and hides the dock.
- One H1, nine H2 sections and nested H3s. Page JSON-LD parses; canonical, noindex and contact address verified.
- Original Contact/About source hashes match the pre-task hashes.

The comparison remains `noindex, follow`, uses a `/contact-new` canonical, and is absent from the sitemap. Adopting it at `/contact` requires coordinated canonical/indexing/navigation review. Production build, Lighthouse, field Core Web Vitals, conversion uplift and search/AI rankings were not measured.
