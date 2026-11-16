/** Keep trust metrics absent until a real source value is available. */
export function verifiedRating(value: unknown): number | null {
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 5 ? parsed : null;
}

export function verifiedReviewCount(value: unknown): number | null {
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : null;
}

export function hasVerifiedRatingSummary(
  rating: unknown,
  reviewCount: unknown,
): rating is number {
  return verifiedRating(rating) !== null && verifiedReviewCount(reviewCount) !== null;
}
