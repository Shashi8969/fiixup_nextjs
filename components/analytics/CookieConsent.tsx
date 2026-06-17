"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie, Settings, ShieldCheck, X } from "lucide-react";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATED_EVENT,
  OPEN_CONSENT_EVENT,
  type ConsentPreferences,
  readConsentPreferences,
} from "@/lib/analytics";

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
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const existing = readConsentPreferences();
    if (!existing) {
      setVisible(true);
      return;
    }

    setAnalytics(existing.analytics);
    setAdvertising(existing.advertising);
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
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openPreferences);
  }, []);

  const confirm = (analyticsAllowed: boolean, advertisingAllowed: boolean) => {
    savePreferences(analyticsAllowed, advertisingAllowed);
    setAnalytics(analyticsAllowed);
    setAdvertising(advertisingAllowed);
    setVisible(false);
    setCustomizing(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.28)]">
        <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 via-white to-amber-50 px-4 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-orange-100 p-2.5 text-orange-700">
              <Cookie className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-extrabold text-slate-950 sm:text-lg">
                Your privacy, your choice
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Necessary storage keeps the site working. With your permission,
                analytics helps us understand page visits, active time, scrolling
                and clicks. We do not send form text or customer phone numbers to
                Google Analytics.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Read our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-orange-700 underline underline-offset-2"
                >
                  Privacy & Cookie Policy
                </Link>
                .
              </p>
            </div>
            {customizing ? (
              <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Close cookie settings"
                className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-slate-900"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>

        {customizing ? (
          <div className="space-y-3 px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
              <div>
                <p className="font-bold text-slate-900">Necessary</p>
                <p className="text-sm text-slate-500">
                  Basic functions and remembering your consent choice.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                Always on
              </span>
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
              <div>
                <p className="font-bold text-slate-900">Analytics</p>
                <p className="text-sm text-slate-500">
                  Page views, active time, scroll depth and button or link interactions.
                </p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="h-5 w-5 accent-orange-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
              <div>
                <p className="font-bold text-slate-900">Advertising</p>
                <p className="text-sm text-slate-500">
                  Advertising measurement and personalization. No advertising tag
                  is loaded by this patch.
                </p>
              </div>
              <input
                type="checkbox"
                checked={advertising}
                onChange={(event) => setAdvertising(event.target.checked)}
                className="h-5 w-5 accent-orange-600"
              />
            </label>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
          {!customizing ? (
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Customize
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => confirm(false, false)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Reject non-essential
          </button>

          <button
            type="button"
            onClick={() =>
              confirm(customizing ? analytics : true, customizing ? advertising : true)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
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
