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
import { getCtaVisibilitySettings } from "@/lib/cta-settings";
import { AnalyticsManager } from "@/components/analytics/AnalyticsManager";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { Suspense } from "react";
import { siteOrganizationSchema, jsonLdString } from "@/lib/schema";
import { ImageQualityProvider } from "@/lib/image-quality-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Fiixup — 24/7 Doorstep Car & Bike Repair in India",
    template: `%s`,
  },

  description:
    "Certified mechanics at your home or office across India. Serving Bangalore, Chennai, Hyderabad & Mumbai. Starting ₹249. 20-min response. Book now.",

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
  const [headerLinks, siteSettings, ctaSettings] = await Promise.all([
    getHeaderNavigationLinks(),
    getPublicSiteSettings(),
    getCtaVisibilitySettings(),
  ]);

  return (
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(siteOrganizationSchema(siteSettings)) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <ImageQualityProvider quality={siteSettings.imageQuality}>
          <Suspense fallback={null}>
            <AnalyticsManager />
          </Suspense>
          <Header navLinks={headerLinks} mainPhone={siteSettings.mainPhone} />
          <main id="main-content">{children}</main>
          <Footer siteSettings={siteSettings} />
          <FloatingButtons
            mainPhone={siteSettings.mainPhone}
            whatsappNumber={siteSettings.whatsappNumber}
            whatsappMessage={siteSettings.floatingWhatsAppMessage}
            ctaSettings={ctaSettings}
          />
          <QuickServiceModal
            phonePlaceholder={siteSettings.mainPhoneDisplay}
            availableText={siteSettings.quickModalAvailableText}
          />
          <CookieConsent />
        </ImageQualityProvider>
      </body>
    </html>
  );
}
