export const revalidate = 3600; // refreshes every 1 hour

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, DEFAULT_KEYWORDS } from "@/lib/constants";
import { homeSchema } from "@/lib/schema";
import { QuickServiceModal } from "@/components/QuickServiceModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fiixup — 24/7 Doorstep Car & Bike Repair Service in India",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "India's trusted 24/7 doorstep car and bike repair service. Certified mechanics at your home or office in Bengaluru, Chennai, Hyderabad & Mumbai. Honest pricing. Book now.",
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: "Fiixup" }],
  creator: "Fiixup",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Fiixup — 24/7 Doorstep Car & Bike Repair",
    description:
      "Certified mechanics at your doorstep in Bengaluru, Chennai, Hyderabad & Mumbai. 24/7. Honest pricing.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Fiixup Doorstep Car & Bike Repair" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fiixup",
    title: "Fiixup — 24/7 Doorstep Car & Bike Repair",
    description: "Certified mechanics at your doorstep. 24/7 across India.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <QuickServiceModal />
      </body>
    </html>
  );
}
