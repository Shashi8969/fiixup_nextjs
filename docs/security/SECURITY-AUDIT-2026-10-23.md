# Fiixup website security and performance audit

Date: 23 October 2026. Dependency and database checks were collected on 22–23 October 2026.

Follow-up: the expanded website/CMS review is recorded in `D:/Projects/fiixup-admin/docs/LOCAL-REVIEW-2026-10-23.md`. It adds localhost write protection, 58 public-site checks, CMS hardening and safer editing. Its CMS/database rollout notes supersede the preview-access details in this original audit.

The public website has been hardened locally and passes its production build. This work preserves the existing page layouts, stylesheets, and normal booking flows. Nothing has been deployed, pushed, or applied to the production database. Two database findings remain open until the rollout below is completed.

## Scope and evidence

- Public website: `D:/Projects/fiixup_nextjs`. Source scanning covered 247 JavaScript/TypeScript files and traced dependencies from 40 client entry points. The nine API handlers, request helpers, preview access, redirects, HTML rendering, security headers, and dependency configuration were reviewed.
- Supabase: read-only schema, policy, privilege, advisor, and aggregate checks. Customer records and draft payloads were not retrieved. No test lead, email, or cache-revalidation request was sent successfully.
- The admin repository was inspected only to check compatibility of its existing server-side preview helper. This is not a complete audit of the admin application.
- This checkout already contained substantial staged and unstaged work. A pre-security file-hash baseline was used to distinguish this task's changes. No Git reset, commit, push, or deployment was performed. Next regenerated its own `next-env.d.ts` during the build; that generated file was not included in the baseline.

Machine-readable results are in `tmp/security-audit-2026-10-22/`. These are local audit artifacts, not public assets.

## Findings and disposition

| Priority | Finding | Result |
| --- | --- | --- |
| Critical | Installed Next 16.4.0 was affected by the framework security advisory | Updated locally to 16.4.2; production build passed. Deployment required. |
| High | Anonymous callers can list all unexpired preview drafts under the current database policy | Exact-token lookup now uses a server-only client locally. Database access revocation is prepared but not applied. |
| High | Five public CMS views use owner privileges and can bypass underlying publication RLS | `security_invoker` SQL is prepared but not applied. |
| High | Regex-based rich HTML cleanup could miss executable or malformed markup | Replaced with a patched HTML-parser sanitizer and URL allowlists. Regression cases passed. |
| Medium | Missing origin headers could pass the API origin check; JSON bodies were not bounded while streaming | Hardened origin checks, actual byte limits, content-type checks, and a 15-second body deadline. |
| Medium | Public lead responses disclosed internal delivery/database details; failed delivery could leave a misleading duplicate cooldown | Removed internal response details and release the phone reservation when neither delivery channel succeeds. |
| Medium | Preview URLs and unpublished page titles could enter analytics or referrer data | Private routes skip analytics, block analytics sources in CSP, send no-referrer, and use private/no-store plus noindex headers. |
| Medium | Production policy allowed eval; image redirects could bypass the intended image-host boundary | Production eval removed; SVG/local-IP optimization disabled and remote image redirects disabled. |
| Medium | Redirect failures and concurrent chat initialization could cause repeated upstream work | Bounded redirect fetches/backoff and shared in-flight chat-index initialization. |
| Upstream | Seven development dependency entries remain flagged through `braces` | No patched braces release was available at audit time; production dependency audit is clean. See dependency limitations below. |
| Owner setting | Supabase Auth leaked-password protection is disabled | Advisor warning remains; no Auth settings were changed. Confirm plan support and enable in the owning Auth configuration. |

The Next update addresses the affected framework version described in the [official October security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026). Installed versions and audit output, rather than an assumption that all latest releases are compatible, were used for the upgrade decisions.

## Implemented changes

### Requests, booking, and email

`lib/api-security.ts` now enforces actual streamed UTF-8 body limits, rejects malformed/non-object JSON, requires JSON content types, and cancels slow or oversized reads. Cross-site browser requests are rejected; missing Origin/Referer requires same-origin Fetch Metadata. This is browser request protection, not authentication for a publicly accessible form.

Rate-limit identities are hashed rather than stored as raw phone/IP keys. The in-memory limiter is bounded to 10,000 buckets, cleans expired entries, and does not evict live entries to admit new identities. Forwarded IP values are parsed as IP addresses.

`lib/lead-validation.ts` allowlists known fields and legacy form aliases, limits field lengths, rejects nested/unexpected values, and validates phone/email contacts on the server. Normal existing form payloads remain supported. Internal delivery errors and duplicate-history details are no longer returned to callers. SMTP uses TLS/certificate verification and bounded timeouts; subject line breaks are removed. If both storage and email fail, a retry is no longer falsely treated as an accepted duplicate because of a leftover phone reservation.

Revalidation continues to accept its normal secret header/bearer authentication. Production query-string secrets are disabled unless explicitly restored with the legacy flag, and invalid path/tag types return a controlled error. Any external caller using query-string authentication must migrate before rollout; such callers were not invoked during this audit.

### Stored HTML and destinations

`lib/security/html.ts` replaces the regex sanitizer used by `BlockRenderer`. It preserves permitted editorial formatting, classes, tables, lists, images, and links, while removing executable tags, event handlers, unsafe protocols, inline styles, forms, and arbitrary embeds. Malformed markup and encoded protocol cases are covered by regression checks. Unsafe CMS HTML will intentionally be removed; normal component layout/classes were not redesigned.

CMS redirect destinations reject executable schemes, credentials, backslashes, and control characters. Relative destinations must resolve to the same origin; valid external HTTP(S) redirects and wildcard behavior remain supported. Redirect lookup has a deadline, caches empty results correctly, and backs off after failures.

### Preview privacy and server secrets

Preview tokens must have UUID syntax before any query. Lookup is server-only, selects an exact unexpired token, and uses a service-role client without browser session persistence. The same-render lookup is cached between metadata and rendering.

Preview routes receive private/no-store caching, no-referrer, and noindex/nofollow/noarchive headers, including invalid/expired responses. Analytics initialization and events skip private routes; their CSP excludes Google Analytics and Tag Manager destinations. Ordinary public-page tracking is retained.

Service-role keys bypass RLS and must remain server-only, as explained in [Supabase's API-key guidance](https://supabase.com/docs/guides/getting-started/api-keys). Source import-graph scanning and built public-asset scanning found no exposure of the checked private environment values. These scans do not establish that a secret was never exposed historically.

### Headers, images, and rendering

The Next configuration and application helpers now share one security-policy builder. Production CSP removes `unsafe-eval`, validates configured admin frame origins, and preserves approved Google Maps/YouTube embeds. `unsafe-inline` remains for the existing streamed Next hydration and styling; a nonce-only policy would require a separate rendering/cache migration.

Image optimization explicitly disables SVG and local-IP sources and follows zero remote redirects. The approved public Supabase storage pattern, existing formats, image sizes, qualities, and cache lifetime remain. `X-Powered-By` is disabled. Sensitive API responses use no-store.

The comparison contact form uses a hydration snapshot instead of a cascading effect update; its privacy link uses the framework Link component. Its appearance and booking logic remain intact.

### Performance

- Public-link registry queries now fetch the required city slug instead of entire page JSON objects. The read-only aggregate measured 217 active pages: their complete page-data JSON totalled 1,934,297 bytes, while extracted city-slug string values totalled 1,643 bytes. Path/type fields and transport overhead are additional and unchanged. This reduces work on registry refresh; it is not a measured whole-page speed percentage.
- Concurrent cold chat requests share one index-build promise. Failures clear it for a subsequent retry.
- Redirect fetches have bounded deadlines and backoff rather than retrying an unavailable backend on every page request. Snapshot generation has a deadline too.
- Static generation and existing public ISR cache behavior were preserved. No production Core Web Vitals or ranking improvement is claimed from local checks.

## Dependencies and runtime

Hosting must use **Node.js 22.13.0 or later** before deployment. Local validation used Node 24.12.0. The current patched sanitizer and Supabase client require a newer runtime than Node 20.

| Package | Installed after this audit |
| --- | --- |
| next / eslint-config-next | 16.4.2 |
| react / react-dom | 19.3.1 |
| @supabase/supabase-js | 2.118.0 |
| nodemailer | 10.2.1 |
| sanitize-html | 2.18.1 |
| @radix-ui/react-dialog | 1.3.1 |
| react-hook-form | 7.90.0 |
| sonner | 2.0.8 |
| tailwind-merge | 3.7.0 |
| postcss / autoprefixer | 8.5.31 / 10.6.1 |
| server-only | 0.0.1 |

Compatible type packages were updated as well. Tailwind 3.4.19, ESLint 9.39.5, TypeScript 5.9.3, and the existing Lucide icon version were retained to avoid styling, plugin-peer, compiler-major, or icon changes outside scope. A forced audit fix was not used.

`npm audit --omit=dev` reports **zero known vulnerabilities**. The full audit reports **seven high-severity package entries**: braces, chokidar, micromatch, fast-glob, tailwindcss, @next/eslint-plugin-next, and eslint-config-next. They trace to one unpatched braces advisory; the [upstream advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists no patched version. Automated suggestions include a Tailwind major migration or framework tooling downgrade, so they were not applied blindly. Build/lint tooling still needs controlled inputs; these findings are not erased by omitting development packages from a report.

## Verification

| Check | Result |
| --- | --- |
| `npm run test:security` | 55 offline regression checks passed; database/email/transport dependencies mocked |
| Existing contact request tests | Passed |
| Full ESLint run | 245 checked files; zero errors and zero warnings |
| `npx tsc --noEmit --incremental false` | Passed |
| `npx next build --webpack` | Passed, including 335/335 generated pages |
| Source and client import-graph checks | 247 source files, 40 client roots; no detected private-key boundary violations |
| Built public assets and tracked-secret scan | 69 public asset files checked; no checked private values exposed and no tracked sensitive files detected |
| Baseline stylesheet comparison | No stylesheet changes; existing main page source retained |
| Production local HTTP smoke checks | Homepage, original contact, contact comparison, services, city, blog, and posts API returned 200 |
| Negative endpoint checks | Invalid contact 400, cross-site lead request 403, oversized request 413, empty chat request 400, unauthenticated revalidation 401 |
| Preview negative check | Invalid token 404 with private/no-store, no-referrer, noindex, and analytics-free CSP |
| Image optimizer | Existing local service image returned 200 |

The final browser visual/hydration pass could not run: browser security policy blocked binding the existing local preview tab. No workaround was attempted. Therefore desktop/mobile screenshots, real-browser hydration, remote CMS image rendering, and a real successful booking remain rollout smoke checks. Source/style comparisons, mocked booking behavior, HTTP responses, TypeScript, and the production build provide the completed local evidence. The owned temporary production server was stopped after verification.

The direct build command deliberately avoided regenerating the pre-existing redirect snapshot through `prebuild`. The normal `npm run build` command remains configured for deployment.

## Production database findings and rollout order

The current `preview_drafts` SELECT policy only checks expiry. That permits anonymous enumeration of unexpired payloads and capability tokens. Code alone cannot close direct database access. Five owner-rights CMS views also bypass caller RLS; the route-registry definition includes posts without its own publication filter.

The prepared transaction is in [database-hardening-after-deploy.sql](./database-hardening-after-deploy.sql). The follow-up CMS review revised it to revoke anonymous preview access while preserving authenticated privileges behind the existing admin-only RLS policy, with a prerequisite policy check. It changes the five views to use caller privileges, preserves view definitions, and does not modify or delete content rows. Verify the revised CMS's authenticated preview CRUD before any production rollout.

1. Review the security diff separately from the checkout's unrelated existing edits. Configure hosting Node >=22.13 and verify required server-only environment values are present, without exposing them in logs or browser configuration.
2. Deploy the patched public website. Confirm the CMS and website both use their server-side preview helpers. Do not revoke database access while the old anonymous preview implementation is still serving traffic.
3. Apply the prepared database transaction. This step has **not** been performed by this audit.
4. Run the metadata verification included in the SQL; confirm public navigation, a known valid preview, and invalid/expired preview behavior. Re-run Supabase advisors.
5. Complete desktop/mobile browser smoke checks: public layout, menus, CMS images, maps/video, consent/analytics, and a deliberately coordinated booking test. A successful real booking test sends/stores a real lead and must not be mistaken for an offline test.
6. Review the disabled leaked-password-protection Auth setting with the account owner. Keep the three RLS-with-no-policy tables default-deny; do not add public policies merely to silence informational advisors.

Other database checks: all public tables had RLS enabled; lead SELECT policy was restricted to the configured admin identity; public posts and settings had publication/visibility policies. The five inspected SECURITY DEFINER functions did not grant execution to anon. Public storage bucket metadata was reviewed (50 MB limit, no MIME allowlist), but upload-policy behavior was not fully verified and was not changed without CMS compatibility testing.

## Limits and follow-up responsibilities

The local limiter is per process. It does not coordinate across instances, survive restarts, or replace edge rate limiting. Hosting must overwrite forwarded client-IP headers at a trusted proxy; otherwise clients can influence IP-based buckets. Review edge/WAF limits if abuse occurs.

Hosting TLS, infrastructure access, backups, historical secrets, all external revalidation callers, live Auth settings, and the complete admin application were not changed or exhaustively audited. Existing HSTS and permissions behavior was retained. The browser and live rollout checks above remain outstanding. No security review can guarantee the absence of all vulnerabilities; the specific findings, fixes, evidence, and remaining work are recorded here so that production closure can be verified.
