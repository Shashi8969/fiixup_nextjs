// Editorial display typeface for the /blog listing page only.
// Paired with the site-wide Inter (set in app/layout.tsx) for body/UI text.
import { Source_Serif_4 } from "next/font/google";

export const blogDisplayFont = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-blog-serif",
});
