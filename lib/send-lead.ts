export type LeadPayload = Record<string, unknown>;

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
    }),
  });

  if (!response.ok) {
    let message = "Unable to send lead request";
    try {
      const data = await response.json();
      if (data?.error) message = data.error;
    } catch {
      // Keep default message.
    }
    throw new Error(message);
  }

  return response.json();
}
