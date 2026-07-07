# Fiixup

Doorstep car & bike repair + 24/7 roadside assistance (towing, jump start, puncture repair, battery replacement, fuel delivery, locksmith). Live in Bangalore, Chennai, Hyderabad, Mumbai — scaling toward 100+ cities.

Production: https://fiixup.in
Admin panel: https://admin.fiixup.in (separate `fiixup-admin` repo)

## Stack

- Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS, Radix UI, React Hook Form
- Supabase (Postgres, Singapore region) — single source of truth for all content
- Deploy: GitHub → Hostinger, auto-deploy on every push to `main`

## ⚠️ Content workflow — read this before touching anything

Cities, areas, services, location-service pages, blog posts, FAQs, testimonials, navigation, media, and site settings all live in Supabase and are edited through the admin panel — **not** in this repo.

**Never push content changes to GitHub.** Only push actual code/architecture changes. To add a new city or service, use the Admin Panel (`/cities`, `/services`) — the page, sitemap entry, and metadata are generated from the database automatically. There is no `lib/cities.ts` array to hand-edit anymore.

## Lead capture

Contact and quick-booking forms submit to `/api/leads`, which:

1. Writes to the `leads` table via the service-role client (a lead is never lost even if the email step fails)
2. Runs duplicate-phone detection
3. Sends a notification email over SMTP (`nodemailer`)

No EmailJS. No client-to-third-party form submission.

## Local development

```
npm install
npm run dev
```

Requires a `.env.local` with your Supabase URL/anon key and SMTP credentials.
**TODO:** paste the real variable names here — not guessing at these to avoid documenting something wrong again.

## Folder structure

See `CLAUDE.md` for the current architecture and data model. If it drifts from reality again, regenerate the tree with:

```
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) | sort
```

and paste the output back in rather than hand-editing this section from memory.
