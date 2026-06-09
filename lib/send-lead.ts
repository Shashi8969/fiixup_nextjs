export type LeadPayload = Record<string, unknown>;

function normalizeLeadPayload(input: FormData | LeadPayload): LeadPayload {
  if (!(input instanceof FormData)) return input;

  const payload: LeadPayload = {};
  input.forEach((value, key) => {
    payload[key] = typeof value === "string" ? value : value.name;
  });
  return payload;
}

export async function submitLead(input: FormData | LeadPayload) {
  const payload = normalizeLeadPayload(input);

  const response = await fetch("/api/send-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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
