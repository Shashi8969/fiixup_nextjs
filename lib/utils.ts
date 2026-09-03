import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Renders a pricing-row amount for the public site.
 *
 * A row with `priceFrom === 0` and no upper bound is an included/complimentary
 * line item (e.g. "Alternator health check — free with every battery
 * replacement"), NOT a placeholder. Show "Free" rather than the literal
 * "₹0+", which reads as an unfinished page — see the Aug-2026 AI Visibility
 * audit, finding 3.3.
 */
export function formatPriceRange(
  priceFrom: number,
  priceTo?: number | null,
): string {
  const from = Number.isFinite(priceFrom) ? priceFrom : 0;
  const to = priceTo != null && Number.isFinite(priceTo) ? priceTo : null;

  if (to != null && to > 0) {
    return `₹${from.toLocaleString("en-IN")} – ₹${to.toLocaleString("en-IN")}`;
  }
  if (from <= 0) return "Free";
  return `₹${from.toLocaleString("en-IN")}+`;
}
