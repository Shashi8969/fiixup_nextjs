// Offline security regression suite. All database and email paths are mocks.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const { pathToFileURL } = require("node:url");
const ts = require("typescript");
const { NextRequest } = require("next/server");
const root = path.resolve(__dirname, "..");
let checks = 0;
function check(condition, message) { assert.ok(condition, message); checks++; }
function load(file, mocks = {}, appendix = "") {
  const full = path.join(root, file);
  const source = ts.transpileModule(fs.readFileSync(full, "utf8") + appendix, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true,
  } }).outputText;
  const mod = { exports: {} };
  const localRequire = createRequire(full);
  const req = name => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (name.startsWith("@/")) return load(name.slice(2) + ".ts", mocks);
    return localRequire(name);
  };
  vm.runInNewContext(source, { module: mod, exports: mod.exports, require: req, process,
    console: { ...console, error() {}, warn() {} }, Buffer, URL, Headers, TextDecoder, Uint8Array,
    AbortSignal, setTimeout, clearTimeout, Date, Promise, __filename: full, __dirname: path.dirname(full),
  }, { filename: full });
  return mod.exports;
}
function request(body, extraHeaders = {}, stream) {
  return new NextRequest("https://fiixup.in/api/leads", { method: "POST", headers: {
    "content-type": "application/json", origin: "https://fiixup.in", "x-forwarded-for": "192.0.2.20", ...extraHeaders,
  }, body: stream || JSON.stringify(body), ...(stream ? { duplex: "half" } : {}) });
}

(async () => {
  const security = load("lib/api-security.ts");
  const localReview = load("lib/local-review.ts");
  check(localReview.isLocalReviewHost('localhost:3000') && localReview.isLocalReviewHost('[::1]:3000') && !localReview.isLocalReviewHost('fiixup.in'), 'local review hosts isolated from public domain');
  const allowed = ["fiixup.in", "localhost:3000"];
  check(security.isSameOriginRequest(request({}), allowed), "same origin must work");
  check(!security.isSameOriginRequest(request({}, { origin: "https://evil.example" }), allowed), "cross origin blocked");
  check(!security.isSameOriginRequest(request({}, { origin: "http://fiixup.in" }), allowed), "production HTTP origin rejected");
  check(!security.isSameOriginRequest(request({}, { "sec-fetch-site": "cross-site" }), allowed), "cross-site metadata rejected");
  const missing = request({}); missing.headers.delete("origin");
  check(!security.isSameOriginRequest(missing, allowed), "missing origin and metadata rejected");
  missing.headers.set("sec-fetch-site", "same-origin");
  check(security.isSameOriginRequest(missing, allowed), "privacy-stripped same-origin browser supported");
  check(security.getClientIp(request({}, { "x-forwarded-for": "not-an-ip" })) === "unknown", "invalid IP bounded");
  const parsed = await security.readJsonBody(request({ message: "Hello" }), { maxBytes: 64 });
  check(parsed.ok && parsed.data.message === "Hello", "normal JSON read");
  const utf8 = await security.readJsonBody(request({ message: "₹".repeat(20) }), { maxBytes: 50 });
  check(!utf8.ok && utf8.response.status === 413, "limits bytes rather than UTF-16 characters");
  const plain = await security.readJsonBody(request({}, { "content-type": "text/plain" }), { maxBytes: 64 });
  check(!plain.ok && plain.response.status === 415, "simple text POST rejected");
  const array = await security.readJsonBody(request([]), { maxBytes: 64 });
  check(!array.ok && array.response.status === 400, "array JSON rejected");
  let cancelled = false;
  const chunks = new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode('{"x":"')); c.enqueue(new Uint8Array(100)); }, cancel() { cancelled = true; } });
  const large = await security.readJsonBody(request(null, {}, chunks), { maxBytes: 40 });
  check(!large.ok && large.response.status === 413 && cancelled, "chunked oversized body cancelled early");
  const slow = new ReadableStream({ start() {}, cancel() {} });
  const expired = await security.readJsonBody(request(null, {}, slow), { maxBytes: 64, timeoutMs: 5 });
  check(!expired.ok && expired.response.status === 408, "slow body bounded by deadline");
  const rateReq = request({});
  check(!security.rateLimitKey(rateReq, "test", { limit: 1, windowMs: 60000 }, "phone"), "first attempt allowed");
  check(!!security.rateLimitKey(rateReq, "test", { limit: 1, windowMs: 60000 }, "phone"), "repeat attempt limited");
  security.clearRateLimitKey(rateReq, "test", "phone");
  check(!security.rateLimitKey(rateReq, "test", { limit: 1, windowMs: 60000 }, "phone"), "failed-delivery reservation can be released");
  let saturation;
  for (let i = 0; i < 10002; i++) saturation = security.rateLimitKey(rateReq, "capacity", { limit: 1, windowMs: 60000 }, String(i));
  check(!!saturation, "rate limiter cannot grow without bound");

  const { cleanHtml, safeHref } = load("lib/security/html.ts");
  const safe = '<p class="text-blue-600">Hello <strong>world</strong> <a href="/contact">contact</a></p>';
  const safeResult = cleanHtml(safe);
  check(safeResult.includes('class="text-blue-600"') && safeResult.includes('<strong>world</strong>') && safeResult.includes('href="/contact"'), "safe formatting and classes preserved");
  for (const input of [
    '<img src="/photo.webp" onerror = "alert(1)">',
    '<img/onerror=alert(1) src="/photo.webp">',
    '<a href="jav&#x61;script:alert(1)">bad</a>',
    '<a href="java\nscript:alert(1)">bad</a>',
    '<svg><a xlink:href="javascript:alert(1)">bad</a><animate attributeName="href" values="javascript:alert(1)"/></svg>',
    '<textarea><img src=x onerror=alert(1)></textarea/> <script>alert(1)</script>',
    '<meta http-equiv="refresh" content="0;url=javascript:alert(1)">',
    '<iframe srcdoc="<script>alert(1)</script>"></iframe><form action="javascript:alert(1)"><input></form>',
  ]) {
    const result = cleanHtml(input);
    check(!/<(?:script|svg|iframe|meta|form|input|textarea)\b|\son\w+\s*=|(?:href|src)="(?:javascript|data):/i.test(result), "XSS payload removed");
  }
  check(safeHref("/contact") === "/contact" && safeHref("tel:+918197459732").startsWith("tel:"), "normal links preserved");
  for (const href of ["javascript:alert(1)", "java\nscript:alert(1)", "//evil.example", "/\\evil.example", "data:text/html,hi"]) check(safeHref(href) === "#", "unsafe link rejected");

  const { cleanLeadPayload, validLeadContact } = load("lib/lead-validation.ts");
  const cleaned = cleanLeadPayload(JSON.parse('{"phone":"9876543210","name":" Visitor ","__proto__":{"polluted":true},"unexpected":"ignored"}'));
  check(cleaned.name === "Visitor" && !Object.hasOwn(cleaned, "unexpected") && !Object.hasOwn(cleaned, "__proto__"), "lead fields allowlisted");
  check(validLeadContact(cleaned), "existing mobile lead works");
  check(!validLeadContact({ phone: "<script>" }) && !validLeadContact({ email: "x@example.com\r\nBcc:other@example.com" }), "invalid contact/header payload rejected");

  const originalEnv = { ...process.env };
  Object.assign(process.env, { SUPABASE_SERVICE_ROLE_KEY: "offline-test-key", NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co", SMTP_USER: "test@example.com", SMTP_PASS: "offline-test-password", NODE_ENV: "production" });
  let dbFails = false, mailFails = false, inserts = 0, emails = 0;
  const db = { from: () => ({ insert: () => { inserts++; return { select: () => ({ single: async () => dbFails ? { data: null, error: { message: "private-db-detail" } } : { data: { id: "test-lead", is_duplicate: false }, error: null } }) }; }, update: () => ({ eq: async () => ({ error: null }) }) }) };
  const api = load("app/api/leads/route.ts", {
    "@supabase/supabase-js": { createClient: () => db },
    nodemailer: { createTransport: () => ({ sendMail: async () => { emails++; if (mailFails) throw Error("private-smtp-detail"); } }) },
  });
  const input = phone => ({ phone, name: "Offline test", city: "Bengaluru", service: "Help", form_render_ms: 2000 });
  const localSubmission = await api.POST(new NextRequest('http://localhost:3000/api/leads', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'http://localhost:3000' }, body: JSON.stringify(input('9876543210')) }));
  check(localSubmission.status === 503 && inserts === 0 && emails === 0, 'local form review cannot create real leads or emails');
  let trackingClients = 0;
  const tracking = load('lib/notFoundTracking.ts', { 'server-only': {}, '@supabase/supabase-js': { createClient: () => { trackingClients++; throw Error('No live tracking'); } } });
  await tracking.logBrokenLinkHit({ host: 'localhost:3000', pathname: '/missing', referrer: null, userAgent: 'Offline review', forwardedFor: null, realIp: null });
  check(trackingClients === 0, 'local 404 review cannot write production tracking records');
  const bad = await api.POST(request(input("bad")));
  check(bad.status === 400 && inserts === 0 && emails === 0, "invalid lead cannot reach storage or SMTP");
  const received = await api.POST(request(input("9876543210")));
  const receivedBody = await received.json();
  check(received.status === 200 && receivedBody.ok && receivedBody.lead_saved, "stored lead acknowledged");
  check(!Object.hasOwn(receivedBody, "db_error") && !Object.hasOwn(receivedBody, "duplicate_note"), "internal lead details hidden");
  const repeated = await api.POST(request(input("9876543210")));
  check((await repeated.json()).is_duplicate && inserts === 1 && emails === 1, "delivered lead cooldown prevents duplicate sends");
  dbFails = true; mailFails = true;
  const failed = await api.POST(request(input("9876543211")));
  check(failed.status === 500 && !JSON.stringify(await failed.json()).includes("private-"), "failed delivery hides internals");
  const retry = await api.POST(request(input("9876543211")));
  check(retry.status === 500 && inserts === 3 && emails === 3, "failure releases phone cooldown for retry");
  dbFails = false;
  const savedFallback = await api.POST(request(input("9876543212")));
  const fallbackBody = await savedFallback.json();
  check(savedFallback.status === 200 && fallbackBody.lead_saved && !fallbackBody.email_sent && !Object.hasOwn(fallbackBody, "email_error"), "stored lead survives email outage without error leakage");

  const preview = load("lib/preview-drafts.ts", { "server-only": {}, react: { cache: fn => fn }, "@supabase/supabase-js": { createClient: () => { throw Error("Invalid token reached database"); } } });
  check(await preview.getPreviewDraft("not-a-token") === null, "invalid preview token rejected before DB");
  const proxy = load("proxy.ts", {}, "\nexports.__securityTest = { buildDestinationUrl };\n").__securityTest;
  for (const destination of ["javascript:alert(1)", "/\\evil.example", "https://user:pass@evil.example", "/bad\r\nLocation: https://evil.example"]) check(proxy.buildDestinationUrl({ destination }, "https://fiixup.in/test") === null, "unsafe redirect rejected");
  check(proxy.buildDestinationUrl({ destination: "/bangalore/:path*" }, "https://fiixup.in/old/a", "service").href === "https://fiixup.in/bangalore/service", "wildcard redirect preserved");
  check(proxy.buildDestinationUrl({ destination: "https://example.com/help" }, "https://fiixup.in/test").href === "https://example.com/help", "intentional HTTPS redirect preserved");
  const policy = await import(pathToFileURL(path.join(root, "lib/security-policy.mjs")).href);
  check(!policy.buildContentSecurityPolicy().includes("unsafe-eval"), "production policy blocks eval");
  check(policy.buildContentSecurityPolicy().includes("youtube-nocookie.com"), "approved video embed retained");
  check(!policy.buildContentSecurityPolicy({ analytics: false }).includes("googletagmanager") && !policy.buildContentSecurityPolicy({ analytics: false }).includes("google-analytics"), "preview CSP blocks analytics destinations");
  const analytics = load("lib/analytics.ts");
  check(analytics.isPrivateAnalyticsPath("/admin-preview/11111111-1111-1111-1111-111111111111") && !analytics.isPrivateAnalyticsPath("/contact"), "preview analytics excluded without changing public tracking");
  process.env.NEXT_PUBLIC_FIIXUP_ADMIN_URL = "https://admin.example/path";
  check(policy.getAdminPreviewOrigins().includes("https://admin.example") && !policy.getAdminPreviewOrigins().includes("/path"), "frame origins normalized");
  process.env.NEXT_PUBLIC_FIIXUP_ADMIN_URL = "https://trusted.example; script-src *";
  check(!policy.getAdminPreviewOrigins().includes("script-src"), "malformed environment cannot inject CSP");
  for (const key of Object.keys(process.env)) if (!Object.hasOwn(originalEnv, key)) delete process.env[key];
  Object.assign(process.env, originalEnv);
  console.log(`PASS: ${checks} security checks. Database, email and transport dependencies were mocked; no real enquiries sent.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
