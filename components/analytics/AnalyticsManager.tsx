"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATED_EVENT,
  GA_MEASUREMENT_ID,
  hasAnalyticsConsent,
  readConsentPreferences,
  trackEvent,
} from "@/lib/analytics";

const ENGAGEMENT_THRESHOLDS = [30, 60, 120, 300];
const SCROLL_THRESHOLDS = [25, 50, 75, 90];

// Google Consent Mode v2: gtag.js loads and starts sending hits on every
// visit, not just after the cookie banner is accepted. Before any consent
// decision exists, storage defaults to "denied" — gtag.js then sends
// cookieless, non-identifying pings that Google uses to model traffic,
// instead of the site sending nothing at all until someone clicks Accept.
// Once real consent is known (stored choice, or the banner is answered),
// "consent update" upgrades those pings to full, cookie-backed tracking.
function initGoogleAnalytics(): boolean {
  if (typeof window === "undefined") return false;

  if (!GA_MEASUREMENT_ID) {
    console.warn(
      "Google Analytics disabled: NEXT_PUBLIC_GA_MEASUREMENT_ID is missing.",
    );
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  const preferences = readConsentPreferences();

  if (!window.sessionStorage.getItem("fiixup_ga_configured")) {
    window.gtag("consent", "default", {
      analytics_storage: preferences?.analytics ? "granted" : "denied",
      ad_storage: preferences?.advertising ? "granted" : "denied",
      ad_user_data: preferences?.advertising ? "granted" : "denied",
      ad_personalization: preferences?.advertising ? "granted" : "denied",
    });

    if (!document.querySelector(`script[data-fiixup-ga="${GA_MEASUREMENT_ID}"]`)) {
      const script = document.createElement("script");

      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.dataset.fiixupGa = GA_MEASUREMENT_ID;

      document.head.appendChild(script);
    }

    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
      allow_google_signals: preferences?.advertising === true,
      allow_ad_personalization_signals: preferences?.advertising === true,
    });
    window.sessionStorage.setItem("fiixup_ga_configured", "1");
  }

  return true;
}

function cleanDestination(href: string): string | undefined {
  if (!href) return undefined;
  if (href.startsWith("tel:") || href.startsWith("mailto:")) return href.slice(0, 120);

  try {
    const url = new URL(href, window.location.origin);
    return `${url.origin}${url.pathname}`.slice(0, 180);
  } catch {
    return href.slice(0, 180);
  }
}

function classifyLink(href: string) {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("wa.me") || href.toLowerCase().includes("whatsapp")) {
    return "whatsapp";
  }

  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin ? "internal" : "outbound";
  } catch {
    return "other";
  }
}

export function AnalyticsManager() {
  const pathname = usePathname();
  // Real value is set by sendCurrentPageView() before it's ever read (see
  // handlePageHide below) — 0 here is just an inert placeholder, not a
  // timestamp read during render.
  const pageStartedAt = useRef(0);
  const activeSeconds = useRef(0);
  const engagementSent = useRef(new Set<number>());
  const scrollSent = useRef(new Set<number>());
  const lastPageView = useRef<string | null>(null);

  const sendCurrentPageView = () => {
    if (!initGoogleAnalytics()) return;

    const currentPath = `${window.location.pathname}${window.location.search}`;
    if (lastPageView.current === currentPath) return;

    lastPageView.current = currentPath;
    pageStartedAt.current = Date.now();
    activeSeconds.current = 0;
    engagementSent.current.clear();
    scrollSent.current.clear();

    trackEvent("page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: currentPath,
    });
  };

  useEffect(() => {
    const handleConsentUpdate = () => {
      lastPageView.current = null;
      sendCurrentPageView();
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY) handleConsentUpdate();
    };

    window.addEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdate);
    window.addEventListener("storage", handleStorage);
    sendCurrentPageView();

    return () => {
      window.removeEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    sendCurrentPageView();
  }, [pathname]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible" || !hasAnalyticsConsent()) return;

      activeSeconds.current += 1;
      for (const threshold of ENGAGEMENT_THRESHOLDS) {
        if (
          activeSeconds.current >= threshold &&
          !engagementSent.current.has(threshold)
        ) {
          engagementSent.current.add(threshold);
          trackEvent("engagement_milestone", {
            engaged_seconds: threshold,
            page_path: window.location.pathname,
          });
        }
      }
    }, 1000);

    const handleScroll = () => {
      if (!hasAnalyticsConsent()) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !scrollSent.current.has(threshold)) {
          scrollSent.current.add(threshold);
          trackEvent("scroll_depth", {
            percent_scrolled: threshold,
            page_path: window.location.pathname,
          });
        }
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (!hasAnalyticsConsent()) return;
      const target = event.target as Element | null;
      const clickable = target?.closest("a,button") as HTMLElement | null;
      if (!clickable) return;

      const link = clickable instanceof HTMLAnchorElement ? clickable : null;
      const href = link?.getAttribute("href") || "";
      const interactionType = link ? classifyLink(href) : "button";
      const label = (
        clickable.getAttribute("data-analytics-label") ||
        clickable.getAttribute("aria-label") ||
        clickable.textContent ||
        "unlabelled"
      )
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 80);

      trackEvent("site_interaction", {
        interaction_type: interactionType,
        interaction_label: label,
        destination: cleanDestination(href),
        page_path: window.location.pathname,
      });

      if (interactionType === "phone") {
        trackEvent("call_click", { page_path: window.location.pathname });
      }
      if (interactionType === "whatsapp") {
        trackEvent("whatsapp_click", { page_path: window.location.pathname });
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      if (!hasAnalyticsConsent()) return;
      const form = event.target as HTMLFormElement | null;
      if (!form) return;

      trackEvent("lead_form_submit_attempt", {
        form_id: form.id || undefined,
        form_name:
          form.getAttribute("name") ||
          form.getAttribute("data-form-name") ||
          "website_form",
        page_path: window.location.pathname,
      });
    };

    const handlePageHide = () => {
      if (!hasAnalyticsConsent() || activeSeconds.current < 1) return;
      trackEvent("page_engagement_summary", {
        engaged_seconds: activeSeconds.current,
        elapsed_seconds: Math.max(
          1,
          Math.round((Date.now() - pageStartedAt.current) / 1000),
        ),
        max_scroll_percent: Math.max(0, ...Array.from(scrollSent.current)),
        page_path: window.location.pathname,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  return null;
}
