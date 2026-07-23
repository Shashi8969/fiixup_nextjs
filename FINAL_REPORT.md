# Fiixup — Audit & Remediation Report

Scope note up front: the request was to bring this codebase to Google/Apple/Airbnb/Stripe-level polish across SEO, performance, accessibility, and security. That is a multi-week program across a 250+-page site, not a single pass. What follows is what was actually done in this session, verified against a real production build and a real browser — not a wishlist. Everything below either shipped or was explicitly reverted with the reason why.

## Verification method

Every change in this report was checked with, in this order: `npx tsc --noEmit`, `eslint .`, `next build` (Turbopack, production), and for the higher-risk changes, a real `next start` + browser session (network requests, console, DOM state, keyboard interaction) — not just "the build succeeded." One change (a nonce-based CSP) was built, tested, found to break real functionality, and reverted; that process is documented in the security section because the negative result is itself useful.

---

## 1. Critical bugs fixed

### `next lint` was completely broken — linting has not been running
Next.js 16 removed the built-in `next lint` command. Running it errored (`Invalid project directory provided`), and there was no `eslint.config.mjs` in the repo at all, so `eslint-config-next` (already a devDependency) was never wired up. In practice: **no lint has run against this codebase**, likely since the Next 16 upgrade.
- **Fix**: added [eslint.config.mjs](eslint.config.mjs) (flat config using `eslint-config-next`'s native flat-config export) and changed the `lint` script in [package.json](package.json) to `eslint .`.
- Running it for the first time surfaced 10 real defects (next section) — all fixed.

### Real React/hooks correctness bugs (found by the now-working lint)
- [components/analytics/AnalyticsManager.tsx](components/analytics/AnalyticsManager.tsx) — `useRef(Date.now())` called an impure function during render. Changed to `useRef(0)`; the real timestamp is already set by `sendCurrentPageView()` before it's ever read.
- [components/analytics/CookieConsent.tsx](components/analytics/CookieConsent.tsx) — reading existing consent and calling `setAnalytics`/`setAdvertising` synchronously inside a mount effect caused an avoidable cascading re-render. Switched to lazy `useState(() => ...)` initializers instead.
- [components/ui/CityServiceCard.tsx](components/ui/CityServiceCard.tsx) — an icon was selected via a function call (`resolveIcon(...)`) and the result assigned to a capitalized variable used as a JSX tag, which the compiler flags as "component created during render" (resets state every render). Inlined the same lookup as plain property access/`??` chains (no function call), which is both correct and satisfies the rule. Also fixed `lib/icons.ts`'s `iconMap` typing from `Record<string, any>` to `Record<string, LucideIcon>`.
- 4 unescaped-entity JSX errors (apostrophes/quotes rendered raw instead of as entities) across `CspCTA.tsx`, `CityContact.tsx`, `CityContactDynamic.tsx`, `BlockRenderer.tsx` — fixed.

### Stored-XSS vector in JSON-LD structured data
Every page injects schema.org JSON-LD via `dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}`. If any CMS-editable field that ends up in that JSON (a testimonial quote, an FAQ answer, business copy) ever contained the literal string `</script>`, it would close the JSON-LD `<script>` tag early and let anything after it — including a literal `<script>` tag — execute as real, unescaped markup in the page.
- **Fix**: added `jsonLdString()` to [lib/schema.ts](lib/schema.ts) — `JSON.stringify(data).replace(/</g, "\\u003c")` — and replaced every one of the 13 raw `JSON.stringify(schema)` call sites across `app/page.tsx`, `app/about`, `app/contact`, `app/faq`, `app/blog`, `app/services`, `app/[citySlug]/*`, and `components/seo/JsonLd.tsx` / `components/ui/Breadcrumb.tsx` with it. Verified in-browser that the escaped output still parses back to identical JSON (so Google/structured-data validators see no change), while the injection vector is closed.

---

## 2. Security

### Fixed
- **JSON-LD XSS** — see above.
- **`nodemailer` high-severity CVE** (arbitrary file read / SSRF via the `raw` mail option — this codebase doesn't use `raw`, but it's the live transport for `/api/leads`, a public-facing endpoint). Bumped 8.x → 9.0.3.
- **`sharp` high-severity CVE** (inherited libvips CVEs). Next.js pins its own optional `sharp@^0.34.5`, and that nested copy (`node_modules/next/node_modules/sharp`) is what Node actually resolves at runtime — bumping only the top-level dependency doesn't touch it. Added an npm `overrides` entry to force every copy in the tree to `^0.35.3`. Verified only one `sharp` directory exists post-install and image optimization still works.
- **Public read-only API routes with no rate limit and raw error leakage** — `/api/cities/[slug]`, `/api/posts`, `/api/posts/[slug]`, `/api/services`, `/api/services/[slug]`, `/api/categories` had none of the hardening already established elsewhere in the codebase (`/api/leads` and `/api/revalidate` both rate-limit and never leak raw error messages). Added `rateLimitRequest` (60/min/IP) and a new `safeErrorResponse()` helper (logs the real error server-side, returns a generic message to the client) to all 6. Note: these routes aren't called anywhere in the frontend today — worth a follow-up decision on whether to remove them or keep them as a documented public API.
- **Timing-unsafe secret comparison** in `/api/revalidate` (`providedSecret !== expectedSecret`) — switched to `crypto.timingSafeEqual` with a length-safe wrapper.

### Attempted and reverted: nonce-based CSP
The CSP had `script-src 'self' 'unsafe-inline' 'unsafe-eval' ...` — `unsafe-inline` means an XSS bug that got a `<script>` tag onto the page would simply execute, CSP or not. Built a proper per-request nonce mechanism in `proxy.ts` (Next.js 16's `proxy.ts`/middleware layer), confirmed against Next's own source that it has built-in support for reading a nonce back off the request's own CSP header (`get-script-nonce-from-header.js`) to auto-apply it to its internal scripts. Built it, tested it in a real browser — and found that Next.js's inline **streaming/Suspense-reveal scripts** (the ones that swap a `<Suspense>` fallback for real content once it's ready — visible as `<div id="S:0">` markers in the DOM) do not reliably receive that nonce in this Next.js version. Confirmed via `securitypolicyviolation` event capture: dozens of blocked inline `script-src-elem` violations, and as a direct, reproducible consequence, the cookie-consent banner and the quick-service modal — both of which reveal after a delay — silently never appeared. This is exactly the kind of regression that's easy to miss without live browser testing (`tsc`/`eslint`/`next build` all stayed green throughout).
- **Reverted** to the original permissive `script-src`, cleanly (no leftover nonce plumbing). The JSON-LD escaping fix above is unaffected by this — it holds regardless of what `script-src` allows, since it prevents the injection from ever producing a script tag in the first place.
- **Recommendation**: revisit nonce-based CSP once Next.js's streaming-script nonce propagation is confirmed fixed (or if this app moves away from Suspense-based streaming), rather than attempting it again blind.

### Left alone (false positive)
`npm audit` still flags `postcss <8.5.10` (moderate) nested inside `next`'s own bundled build tooling — the only "fix" npm offers is downgrading Next.js to a `9.x` canary, which would be a catastrophic regression for a CVE that isn't reachable from this app's own code path. This will resolve itself in a future Next.js patch release.

---

## 3. Accessibility (WCAG 2.2)

- **No skip-to-content link existed** — keyboard users had to tab through the full header nav on every single page load. Added one in [app/layout.tsx](app/layout.tsx), visually hidden until focused (`sr-only focus:not-sr-only`), targeting a new `id="main-content"` on `<main>`.
- **Mobile nav toggle had no `aria-expanded`/`aria-controls`** — a screen reader couldn't tell whether the menu was open. Fixed in [components/Header.tsx](components/Header.tsx).
- **`QuickServiceModal` (auto-opens on every page after 2s) had no dialog semantics at all** — no `role="dialog"`, no focus trap, no focus management (opening it never moved focus, so a keyboard/screen-reader user wouldn't know it appeared), no Escape-to-close. The project already had `@radix-ui/react-dialog` installed as a dependency but unused anywhere. Rebuilt the component on top of it: proper `role="dialog"`, `aria-labelledby`/`aria-describedby` via `Dialog.Title`/`Dialog.Description`, `aria-modal="true"`, a focus trap, auto-focus into the phone input on open, and Escape/overlay-click to close — all verified in a real browser (confirmed `document.activeElement` lands on the phone input the instant the dialog opens).
- **FAQAccordion** — answer panels weren't linked to their trigger buttons via `aria-controls`/`id`. Added both, plus `role="region"` + `aria-labelledby` on the panel.

---

## 4. Performance

- Confirmed `next/image` is used everywhere (zero raw `<img>` tags in the codebase) and `next/font` is used for the site font — both already correct.
- `sharp` (native image optimizer, required for fast `next/image` on a self-hosted/Hostinger deploy rather than Vercel's own pipeline) is now on a single, patched, correctly-deduped version — see security section.
- `components/FloatingButtons.tsx` was marked `"use client"` with zero hooks/state/effects — pure static links. Removed the directive so it renders as a Server Component (one less component in the client bundle, no hydration cost). Spot-checked the other 22 client components in `components/`; the rest use `usePathname`/`useState`/etc. genuinely (e.g. `DynamicInternalLink` and `FooterNavigationColumns` need `usePathname` to rewrite links contextually per-city) — not a systemic pattern.

Not attempted this session, and genuinely out of scope for a single pass: a full Core Web Vitals pass (LCP/INP/CLS measurement) requires Lighthouse/CrUX against a deployed environment, not a local dev build — recommend running that as a follow-up against the live or a staging deploy.

---

## 5. Dead code / dependency cleanup

- **`mongodb` + `mongoose`** — zero references anywhere in `app/`, `components/`, or `lib/` (the `lib/models/*.model.ts` files with `.model.ts` names are pure TypeScript type definitions, not Mongoose schemas — confirmed no `mongoose.model()`/`Schema()` calls exist). Removed both from `package.json` (16 transitive packages gone).
- **`@radix-ui/react-accordion`, `-select`, `-tabs`, `-slot`, `class-variance-authority`** — installed, never imported anywhere. Removed. (`@radix-ui/react-dialog` was in the same boat until this session — now genuinely used by `QuickServiceModal`.)
- **`lib/seo/seo.config.ts`** — a 0-byte empty file, unreferenced. Removed.
- **`phase1-remaining-v2.patch`** — a stale unified diff left in the repo root, tracked in git; confirmed via `git apply --check` that it no longer applies cleanly against current source (i.e. it's a leftover from an earlier agent session, not a pending change). Removed.
- **`tsconfig.tsbuildinfo`** — a build cache file, already matched by `.gitignore`'s `*.tsbuildinfo` pattern but was tracked in git anyway (added before the ignore rule existed). Untracked it with `git rm --cached`.

---

## Full list of files touched

```
NEW:      eslint.config.mjs, lib/security-headers.ts
REMOVED:  lib/seo/seo.config.ts, phase1-remaining-v2.patch (+ untracked tsconfig.tsbuildinfo)
MODIFIED: app/layout.tsx, app/page.tsx, app/about/page.tsx, app/contact/page.tsx,
          app/faq/page.tsx, app/blog/page.tsx, app/services/page.tsx,
          app/services/[serviceSlug]/page.tsx, app/[citySlug]/page.tsx,
          app/[citySlug]/services/page.tsx, app/[citySlug]/[areaSlug]/page.tsx,
          app/api/{categories,cities/[slug],posts,posts/[slug],revalidate,
                   services,services/[slug]}/route.ts,
          components/{Header,QuickServiceModal,FloatingButtons}.tsx,
          components/analytics/{AnalyticsManager,CookieConsent}.tsx,
          components/city-service/CspCTA.tsx,
          components/city/{CityContact,CityContactDynamic}.tsx,
          components/seo/JsonLd.tsx,
          components/ui/{BlockRenderer,Breadcrumb,CityServiceCard,FAQAccordion}.tsx,
          lib/{api-security,icons,schema}.ts,
          next.config.ts, proxy.ts, package.json, package-lock.json
```

## Verified working end-to-end

Production build (`next build`) is clean with zero errors/warnings across all ~237 generated routes. `tsc --noEmit` and `eslint .` are both clean. A real `next start` + browser session confirmed: homepage, a city page, and the blog list all return 200 and render full content; JSON-LD parses correctly on a city page; the quick-service modal opens with correct focus and ARIA semantics; the cookie-consent banner appears; the header mobile-menu toggle exposes correct ARIA state; client-side form validation (react-hook-form) still blocks empty submissions; and the skip-link/`#main-content` pair is present and functional.

## Recommended next steps (not done this session)

1. **Lighthouse/CrUX pass** against a real deployment for actual LCP/INP/CLS numbers — can't be meaningfully measured against local dev.
2. **Decide the fate of the unused public API routes** (`/api/cities/[slug]`, `/api/posts*`, `/api/services*`, `/api/categories`) — now hardened, but still unconsumed by the frontend. Either remove them or document them as an intentional public API.
3. **Revisit nonce-based CSP** once Next.js's Suspense-stream script-nonce propagation is verified fixed upstream.
4. A broader accessibility pass on the ~10 other hand-rolled FAQ/accordion variants scattered across `components/city/`, `components/city-service/`, and `components/service/` (only the shared `FAQAccordion` was fixed this session) — worth consolidating into one component given how many near-duplicates exist.
5. Consider a proper HTML sanitizer library (e.g. `isomorphic-dompurify`) for `components/ui/BlockRenderer.tsx`'s CMS rich-text rendering in place of its current custom regex-based sanitizer — the regex approach is a reasonable mitigation given admin-only content authorship, but a battle-tested library is safer defense-in-depth if that content model ever changes.
