export const GA_MEASUREMENT_ID = "G-XSNGMPP0KH";export const CONSENT_STORAGE_KEY = "fiixup_cookie_consent_v1";
export const CONSENT_UPDATED_EVENT = "fiixup-consent-updated";
export const OPEN_CONSENT_EVENT = "fiixup-open-cookie-settings";
// Fired by QuickServiceModal whenever it opens/closes so other fixed-position
// overlays (the cookie banner) can avoid rendering on top of it — both sit at
// the same z-index and occupy the same bottom-of-screen region on mobile.
export const QUICK_SERVICE_MODAL_STATE_EVENT = "fiixup-quick-service-modal-state";

export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  updatedAt: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      advertising: parsed.advertising === true,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return readConsentPreferences()?.analytics === true;
}

export function trackEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean | undefined> = {},
) {
  // Not gated on hasAnalyticsConsent(): Google Consent Mode (set up in
  // AnalyticsManager) decides whether this becomes a full hit or an
  // anonymous cookieless ping based on the visitor's actual consent state,
  // so gtag is always safe to call once it's loaded.
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const safeParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined),
  );

  window.gtag("event", eventName, safeParameters);
}
