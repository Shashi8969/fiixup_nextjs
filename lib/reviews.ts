import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import { asBoolean, asNumber, asString } from "@/lib/cms-guards";
import type { TestimonialCardProps } from "@/lib/models/testimonial.model";

export type PublicReview = TestimonialCardProps & {
  sourceLabel?: string;
  sourceName?: string;
  usageType?: "brand" | "category" | "exact_service";
};

type ReviewRow = Record<string, unknown>;

function firstText(row: ReviewRow, keys: string[], fallback = "") {
  for (const key of keys) {
    const text = asString(row[key]).trim();
    if (text) return text;
  }
  return fallback;
}

function normalizeReview(row: ReviewRow): PublicReview | null {
  const text = firstText(row, ["text", "body", "review_text", "review", "comment", "content"]);
  const name = firstText(row, ["name", "customer_name", "reviewer_name", "author_name", "user_name"], "Fiixup Customer");

  if (!text) return null;

  const sourceName = firstText(row, ["source_name", "source", "platform", "review_platform"], "Google Business Profile");
  const usageType = firstText(row, ["usage_type", "review_usage", "level"], "brand").toLowerCase();

  return {
    name,
    rating: Math.round(Math.max(1, Math.min(5, asNumber(row.rating, 5)))),
    text,
    date: firstText(row, ["date_label", "review_date_label", "published_at", "created_at", "date"], "Verified review"),
    vehicle: firstText(row, ["vehicle", "vehicle_type", "customer_type"], "Customer"),
    area: firstText(row, ["area", "area_name", "city", "city_name", "location"]),
    sourceName,
    sourceLabel: sourceName.toLowerCase().includes("google")
      ? "Verified Google Review"
      : `Verified ${sourceName} Review`,
    usageType: usageType === "category" || usageType === "exact_service" ? usageType : "brand",
  };
}

function isPublicReview(row: ReviewRow) {
  return (
    asBoolean(row.is_active, true) &&
    asBoolean(row.is_published, true) &&
    asBoolean(row.show_on_site, true)
  );
}

function dedupeReviews(reviews: PublicReview[]) {
  const seen = new Set<string>();
  return reviews.filter((review) => {
    const key = review.text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const getBrandReviews = unstable_cache(
  async (limit = 4): Promise<PublicReview[]> => {
  const { data, error } = await supabase
    .from("review_sources")
    .select("*")
    .limit(Math.max(limit * 3, 12));

  if (error || !data?.length) return [];

  const reviews = (data as ReviewRow[])
    .filter(isPublicReview)
    .map(normalizeReview)
    .filter((review): review is PublicReview => Boolean(review))
    .filter((review) => review.usageType === "brand" || review.usageType === "category");

    return dedupeReviews(reviews).slice(0, limit);
  },
  ["brand-reviews"],
  { revalidate: 3600, tags: ["reviews"] }
);
