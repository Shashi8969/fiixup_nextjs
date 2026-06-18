export const revalidate = 3600;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, DEFAULT_KEYWORDS } from "@/lib/constants";
import { QuickServiceModal } from "@/components/QuickServiceModal";
import { getHeaderNavigationLinks } from "@/lib/navigation";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { AnalyticsManager } from "@/components/analytics/AnalyticsManager";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Fiixup — 24/7 Doorstep Car & Bike Repair in India",
    template: `%s`,
  },

  description:
    "Certified mechanics at your home or office across India. Serving Bangalore, Chennai, Hyderabad & Mumbai. Starting ₹249. 30-min response. Book now.",

  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: "Fiixup" }],
  creator: "Fiixup",

  // ✅ FIX: og:title now matches <title> exactly — no "India's #1"
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Fiixup — 24/7 Doorstep Car & Bike Repair in India",
    description:
      "Certified mechanics at your home in Bangalore, Chennai, Hyderabad & Mumbai. Starting ₹249. Book now.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Fiixup — Doorstep Car & Bike Repair in India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@fiixup",
    title: "Fiixup — 24/7 Doorstep Car & Bike Repair in India",
    description:
      "Certified mechanics at your doorstep. Bangalore, Chennai, Hyderabad, Mumbai. 24/7.",
    images: [DEFAULT_OG_IMAGE],
  },

  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },

  verification: {
    google: "google-site-verification=higaGzTXpt_DAUviEgFKmwkrufs8X75OK4A033HQq1g",
  },

  // ✅ ADD: Helps search engines understand content category
  category: "Automotive Repair Service",

  // ✅ ADD: India-specific geo signals
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [headerLinks, siteSettings] = await Promise.all([
    getHeaderNavigationLinks(),
    getPublicSiteSettings(),
  ]);

  return (
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
  <AnalyticsManager />
</Suspense>
        <Header navLinks={headerLinks} mainPhone={siteSettings.mainPhone} />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} />
        <FloatingButtons
          mainPhone={siteSettings.mainPhone}
          whatsappNumber={siteSettings.whatsappNumber}
          whatsappMessage={siteSettings.floatingWhatsAppMessage}
        />
        <QuickServiceModal
          phonePlaceholder={siteSettings.mainPhoneDisplay}
          availableText={siteSettings.quickModalAvailableText}
        />
        <CookieConsent />
      </body>
    </html>
  );
}
