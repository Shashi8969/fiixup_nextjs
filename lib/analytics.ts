export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
export const CONSENT_STORAGE_KEY = "fiixup_cookie_consent_v1";
export const CONSENT_UPDATED_EVENT = "fiixup-consent-updated";
export const OPEN_CONSENT_EVENT = "fiixup-open-cookie-settings";

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
  if (
    typeof window === "undefined" ||
    !hasAnalyticsConsent() ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  const safeParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined),
  );

  window.gtag("event", eventName, safeParameters);
}
