// Shared by next.config.ts so the CSP/security-header policy has one source
// of truth instead of drifting between files.
//
// Note on script-src: a nonce-based CSP (dropping 'unsafe-inline'/
// 'unsafe-eval') was tried and reverted. Next.js's own inline streaming/
// hydration "reveal" scripts (used to swap Suspense boundary fallbacks for
// real content — visible as the `<div id="S:0">` markers in the DOM) did not
// reliably pick up the nonce in this Next.js version, so content behind a
// Suspense boundary silently never revealed. 'unsafe-inline' is required
// until that's resolved upstream; the real XSS mitigation for JSON-LD is
// lib/schema.ts's jsonLdString(), which escapes "<" so injected content can
// never produce a literal closing/opening <script> tag in the first place —
// that protection holds regardless of this directive.

export function getSupabaseHost(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return "vpnztzzsyzgesnpihxsu.supabase.co";
  try {
    return new URL(url).host;
  } catch {
    return "vpnztzzsyzgesnpihxsu.supabase.co";
  }
}

export function getAdminPreviewOrigins(): string {
  return [
    process.env.NEXT_PUBLIC_FIIXUP_ADMIN_URL,
    "https://fiixup-admin.vercel.app",
    process.env.NODE_ENV !== "production" ? "http://localhost:3001" : undefined,
  ]
    .filter(Boolean)
    .join(" ");
}

export function buildContentSecurityPolicy(): string {
  const supabaseHost = getSupabaseHost();
  const adminPreviewOrigins = getAdminPreviewOrigins();

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    `frame-ancestors 'self' ${adminPreviewOrigins}`,
    "form-action 'self'",
    `img-src 'self' data: blob: https://${supabaseHost} https://www.google-analytics.com https://www.googletagmanager.com`,
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    `connect-src 'self' https://${supabaseHost} https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com`,
    "upgrade-insecure-requests",
  ].join("; ");
}

export const STATIC_SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), magnetometer=(), gyroscope=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
];
