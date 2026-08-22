"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie, Settings, ShieldCheck, X } from "lucide-react";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATED_EVENT,
  OPEN_CONSENT_EVENT,
  QUICK_SERVICE_MODAL_STATE_EVENT,
  type ConsentPreferences,
  readConsentPreferences,
} from "@/lib/analytics";

// Short delay instead of showing on load — visitors get a beat to see the
// page before being asked anything, but not so long that fast-bouncing
// visitors (e.g. someone who just wants the phone number) leave before ever
// seeing the banner.
const BANNER_DELAY_MS = 3_000;

function savePreferences(analytics: boolean, advertising: boolean) {
  const preferences: ConsentPreferences = {
    necessary: true,
    analytics,
    advertising,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: advertising ? "granted" : "denied",
    ad_user_data: advertising ? "granted" : "denied",
    ad_personalization: advertising ? "granted" : "denied",
  });
  window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [quickServiceModalOpen, setQuickServiceModalOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(
    () => readConsentPreferences()?.analytics ?? true,
  );
  const [advertising, setAdvertising] = useState(
    () => readConsentPreferences()?.advertising ?? false,
  );

  useEffect(() => {
    // Already decided — nothing to show.
    if (readConsentPreferences()) return;

    const timer = window.setTimeout(() => setVisible(true), BANNER_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onQuickServiceModalState = (event: Event) => {
      setQuickServiceModalOpen(Boolean((event as CustomEvent).detail?.open));
    };
    window.addEventListener(QUICK_SERVICE_MODAL_STATE_EVENT, onQuickServiceModalState);
    return () => {
      window.removeEventListener(QUICK_SERVICE_MODAL_STATE_EVENT, onQuickServiceModalState);
    };
  }, []);

  useEffect(() => {
    const openPreferences = () => {
      const existing = readConsentPreferences();
      setAnalytics(existing?.analytics ?? true);
      setAdvertising(existing?.advertising ?? false);
      setCustomizing(true);
      setVisible(true);
    };

    window.addEventListener(OPEN_CONSENT_EVENT, openPreferences);
    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, openPreferences);
    };
  }, []);

  const confirm = (analyticsAllowed: boolean, advertisingAllowed: boolean) => {
    savePreferences(analyticsAllowed, advertisingAllowed);
    setAnalytics(analyticsAllowed);
    setAdvertising(advertisingAllowed);
    setVisible(false);
    setCustomizing(false);
  };

  if (!visible || quickServiceModalOpen) return null;

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-[100] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[340px]"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
    >
      <div className="overflow-hidden rounded-xl border border-orange-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.25)]">
        <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 via-white to-amber-50 px-3.5 py-3.5">
          <div className="flex items-start gap-2.5">
            <div className="rounded-lg bg-orange-100 p-1.5 text-orange-700 flex-shrink-0">
              <Cookie className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-extrabold text-slate-950">
                Your privacy, your choice
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Necessary cookies keep the site working. With permission, analytics
                helps us understand visits — we never send form text or phone
                numbers to Google Analytics.
              </p>
              <p className="mt-1.5 text-[11px] text-slate-500">
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-orange-700 underline underline-offset-2"
                >
                  Privacy &amp; Cookie Policy
                </Link>
              </p>
            </div>
            {customizing ? (
              <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Close cookie settings"
                className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-slate-900 flex-shrink-0"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>

        {customizing ? (
          <div className="space-y-2 px-3.5 py-3">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-2.5">
              <div>
                <p className="text-xs font-bold text-slate-900">Necessary</p>
                <p className="text-[11px] text-slate-500">Always required.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 flex-shrink-0">
                On
              </span>
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-200 p-2.5">
              <div>
                <p className="text-xs font-bold text-slate-900">Analytics</p>
                <p className="text-[11px] text-slate-500">Page views and interactions.</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="h-4 w-4 accent-orange-600 flex-shrink-0"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-200 p-2.5">
              <div>
                <p className="text-xs font-bold text-slate-900">Advertising</p>
                <p className="text-[11px] text-slate-500">Not currently used.</p>
              </div>
              <input
                type="checkbox"
                checked={advertising}
                onChange={(event) => setAdvertising(event.target.checked)}
                className="h-4 w-4 accent-orange-600 flex-shrink-0"
              />
            </label>
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5 p-3.5">
          <div className="flex gap-1.5">
            {!customizing ? (
              <button
                type="button"
                onClick={() => setCustomizing(true)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-2 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <Settings className="h-3.5 w-3.5" aria-hidden="true" />
                Customize
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => confirm(false, false)}
              className="flex-1 rounded-lg border border-slate-300 px-2 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Reject
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              confirm(customizing ? analytics : true, customizing ? advertising : true)
            }
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-orange-700 px-4 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-800"
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {customizing ? "Save choices" : "Accept all"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="transition-colors hover:text-white"
    >
      Cookie settings
    </button>
  );
}
