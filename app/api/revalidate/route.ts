import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { rateLimitRequest, readJsonBody } from "@/lib/api-security";
import { resetRedirectCache } from "@/proxy";

export const runtime = "nodejs";

function secretsMatch(expected: string, provided: string): boolean {
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  // Length must match before timingSafeEqual (it throws on mismatched
  // lengths); comparing against a fixed-size buffer keeps that check itself
  // from leaking the expected secret's length via timing.
  if (expectedBuf.length !== providedBuf.length) {
    timingSafeEqual(expectedBuf, expectedBuf);
    return false;
  }
  return timingSafeEqual(expectedBuf, providedBuf);
}

const VALID_TAGS = [
  "cities",
  "areas",
  "services",
  "service-categories",
  "location-services",
  "posts",
  "redirects", // also resets the proxy.ts in-memory redirect cache directly, see revalidateRelatedPaths()
  "site-settings",
  "navigation-links",
  "page-link-overrides",
  "faq-library",
  "reviews",
  "seo-pages",
  "homepage",
  "leads",
  "brand-logos",
  "gallery",
  "team-members",
  "cta-settings",
] as const;

type ValidTag = (typeof VALID_TAGS)[number];
type RevalidatePayload = { path?: string; tag?: string };

function isValidTag(tag: string): tag is ValidTag {
  return (VALID_TAGS as readonly string[]).includes(tag);
}

function revalidateTagSafe(tag: ValidTag) {
  // Next.js 16 requires a second argument here; "max" is the documented
  // drop-in replacement for the old single-argument revalidateTag(tag) call
  // (see https://nextjs.org/docs/messages/revalidate-tag-single-arg). The
  // previous "pages" value was never a registered cacheLife profile, so
  // every call here threw and every admin save silently fell back to
  // waiting out the 1-hour ISR window instead of revalidating instantly.
  revalidateTag(tag, "max");
}

function isSafePath(path: string) {
  return (
    path === "all" ||
    (path.startsWith("/") &&
      !path.startsWith("//") &&
      !path.includes("..") &&
      !path.includes("\\") &&
      path.length <= 250)
  );
}

function getSecret(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";
  return (
    request.headers.get("x-revalidate-secret") ||
    bearer ||
    request.nextUrl.searchParams.get("secret") ||
    ""
  );
}

function unauthorized() {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401, headers: { "Cache-Control": "no-store" } }
  );
}

function revalidateRelatedPaths(tag: ValidTag) {
  switch (tag) {
    case "site-settings":
    case "navigation-links":
      revalidatePath("/", "layout");
      break;
    case "page-link-overrides":
      revalidatePath("/", "layout");
      revalidatePath("/");
      break;
    case "faq-library":
      revalidatePath("/faq");
      break;
    case "reviews":
    case "homepage":
      revalidatePath("/");
      break;
    case "seo-pages":
      revalidatePath("/sitemap.xml");
      revalidatePath("/robots.txt");
      revalidatePath("/");
      revalidatePath("/", "layout");
      break;
    case "posts":
      revalidatePath("/blog");
      break;
    case "redirects":
      resetRedirectCache();
      break;
    case "leads":
      break;
    case "brand-logos":
      revalidatePath("/");
      break;
    case "gallery":
      revalidatePath("/gallery");
      break;
    case "team-members":
      revalidatePath("/about");
      break;
    case "cta-settings":
      revalidatePath("/", "layout");
      break;
    default:
      break;
  }
}

function revalidateEverything() {
  VALID_TAGS.forEach((tag) => {
    revalidateTagSafe(tag);
    revalidateRelatedPaths(tag);
  });
  revalidatePath("/", "layout");
}

async function handleRevalidate(request: NextRequest, payload?: RevalidatePayload) {
  const expectedSecret = process.env.REVALIDATE_SECRET || "";
  const providedSecret = getSecret(request);

  if (!expectedSecret || !providedSecret || !secretsMatch(expectedSecret, providedSecret)) {
    return unauthorized();
  }

  const tag = payload?.tag || request.nextUrl.searchParams.get("tag") || "";
  const path = payload?.path || request.nextUrl.searchParams.get("path") || "";

  if (tag) {
    if (!isValidTag(tag)) {
      return NextResponse.json(
        { error: `Invalid tag. Valid tags: ${VALID_TAGS.join(", ")}` },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    revalidateTagSafe(tag);
    revalidateRelatedPaths(tag);

    return NextResponse.json(
      { revalidated: true, tag, message: `Cache tag cleared: ${tag}` },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  if (path) {
    if (!isSafePath(path)) {
      return NextResponse.json(
        { error: "Invalid path." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (path === "all") {
      revalidateEverything();
      return NextResponse.json(
        { revalidated: true, message: "All cache cleared" },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    revalidatePath(path);
    return NextResponse.json(
      { revalidated: true, path, message: `Cache cleared for ${path}` },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { error: "Provide path or tag." },
    { status: 400, headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: NextRequest) {
  const limited = rateLimitRequest(request, "revalidate", { limit: 30, windowMs: 60 * 1000 });
  if (limited) return limited;

  const parsed = await readJsonBody<RevalidatePayload>(request, { maxBytes: 4096 });
  if (!parsed.ok) return parsed.response;

  return handleRevalidate(request, parsed.data);
}

export async function GET(request: NextRequest) {
  // Backward compatibility for local testing only. In production, use POST with
  // x-revalidate-secret or Authorization: Bearer <secret> so secrets are not
  // stored in URLs, browser history, or proxy logs.
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_QUERY_REVALIDATE !== "true") {
    return NextResponse.json(
      { error: "Use POST for cache revalidation." },
      { status: 405, headers: { "Cache-Control": "no-store" } }
    );
  }

  return handleRevalidate(request);
}
