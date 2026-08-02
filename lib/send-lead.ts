import { trackEvent } from "@/lib/analytics";

export type LeadPayload = Record<string, unknown>;

// Captured once when this module first runs in the browser. Sent with every
// submission so the API can reject submits that fire implausibly fast after
// load (a strong bot signal) without adding any friction for real visitors.
const PAGE_LOADED_AT = typeof window !== "undefined" ? Date.now() : 0;

function normalizeLeadPayload(input: FormData | LeadPayload): LeadPayload {
  if (!(input instanceof FormData)) return input;

  const payload: LeadPayload = {};
  input.forEach((value, key) => {
    payload[key] = typeof value === "string" ? value : value.name;
  });
  return payload;
}

function getTrackingPayload(): LeadPayload {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const tracking: LeadPayload = {
    page_url: window.location.href,
    page_path: window.location.pathname || "/",
    referrer: document.referrer || undefined,
  };

  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    const value = params.get(key);
    if (value) tracking[key] = value;
  });

  return tracking;
}

export async function submitLead(input: FormData | LeadPayload) {
  const payload = normalizeLeadPayload(input);

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...getTrackingPayload(),
      ...payload,
      page_url:
        typeof window !== "undefined" ? window.location.href : payload.page_url,
      form_render_ms:
        typeof window !== "undefined" ? Date.now() - PAGE_LOADED_AT : undefined,
    }),
  });

  if (!response.ok) {
    trackEvent("lead_submit_failed", {
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      status_code: response.status,
    });
    let message = "Unable to send lead request";
    try {
      const data = await response.json();
      if (data?.error) message = data.error;
    } catch {
      // Keep default message.
    }
    throw new Error(message);
  }

  trackEvent("generate_lead", {
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    form_type: typeof payload.form_type === "string" ? payload.form_type : "website_form",
  });

  return response.json();
}
