// One policy shared by the Node config and application helpers.
export function getSupabaseHost() {
  try { return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vpnztzzsyzgesnpihxsu.supabase.co").host; }
  catch { return "vpnztzzsyzgesnpihxsu.supabase.co"; }
}

export function getAdminPreviewOrigins() {
  const production = process.env.NODE_ENV === "production";
  const candidates = [process.env.NEXT_PUBLIC_FIIXUP_ADMIN_URL, "https://fiixup-admin.vercel.app", !production ? "http://localhost:3001" : undefined];
  const origins = new Set();
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const url = new URL(candidate);
      const local = !production && ["localhost", "127.0.0.1"].includes(url.hostname);
      if (!url.username && !url.password && (url.protocol === "https:" || (local && url.protocol === "http:"))) origins.add(url.origin);
    } catch { /* Invalid configuration cannot inject extra CSP directives. */ }
  }
  return [...origins].join(" ");
}

export function buildContentSecurityPolicy({ analytics = true } = {}) {
  const production = process.env.NODE_ENV === "production";
  const supabaseHost = getSupabaseHost();
  return [
    "default-src 'self'", "base-uri 'self'", "object-src 'none'",
    `frame-ancestors 'self' ${getAdminPreviewOrigins()}`,
    "frame-src 'self' https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
    "form-action 'self'",
    `img-src 'self' data: blob: https://${supabaseHost}${analytics ? " https://www.google-analytics.com https://www.googletagmanager.com" : ""}`,
    "font-src 'self' data:", "style-src 'self' 'unsafe-inline'",
    // Next's streamed hydration still needs inline scripts. Eval is a dev
    // tooling requirement only; do not permit it in the production policy.
    `script-src 'self' 'unsafe-inline'${production ? "" : " 'unsafe-eval'"}${analytics ? " https://www.googletagmanager.com https://www.google-analytics.com" : ""}`,
    `connect-src 'self' https://${supabaseHost}${analytics ? " https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com" : ""}`,
    ...(production ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}

export function buildSecurityHeaders() {
  return [
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), magnetometer=(), gyroscope=()" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  ];
}
