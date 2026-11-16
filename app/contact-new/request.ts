export type ContactDetails = {
  vehicle: string; city: string; locality: string; service: string;
  name: string; phone: string; model: string; message: string; timing: string;
};
export const emptyDetails: ContactDetails = {
  vehicle: "Car", city: "", locality: "", service: "Help me choose",
  name: "", phone: "", model: "", message: "", timing: "Roadside help",
};
export function normalizeMobile(value: string) {
  if (!/^[+\d\s().-]+$/.test(value)) return null;
  const digits = value.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}
export function requestMessage(details: ContactDetails) {
  return ["Hi Fiixup, I need vehicle assistance.", `Vehicle: ${details.vehicle}${details.model ? ` · ${details.model}` : ""}`,
    details.city && `City: ${details.city}`, details.locality && `Locality / landmark: ${details.locality}`,
    `Help needed: ${details.service}`, `Request: ${details.timing}`,
    details.name && `Name: ${details.name}`, details.phone && `Phone: ${details.phone}`,
    details.message && `What happened: ${details.message}`].filter(Boolean).join("\n");
}
export type Delivery = "received" | "earlier-request";
// A 200 from the existing endpoint can also mean a filtered submission.
export function readDelivery(data: Record<string, unknown>): Delivery {
  if (data.is_duplicate === true) return "earlier-request";
  if (data.ok === true && (data.lead_saved === true || data.email_sent === true)) return "received";
  throw new Error("delivery-unconfirmed");
}
export function buildPayload(details: ContactDetails, renderMs: number, pageUrl: string, referrer: string) {
  const url = new URL(pageUrl);
  const attribution: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const value = url.searchParams.get(key);
    if (value) attribution[key] = value.slice(0, 200);
  }
  return { ...attribution, form_type: "Contact New — Service Request", source: "contact-new",
    name: details.name.trim(), phone: normalizeMobile(details.phone), city: details.city,
    area: details.locality.trim(), vehicle_type: details.vehicle, vehicle_model: details.model.trim(),
    service: details.service, message: [`Request: ${details.timing}`, details.message.trim()].filter(Boolean).join("\n"),
    request_time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    page_url: url.href, page_path: url.pathname, referrer, form_render_ms: renderMs,
  };
}

export async function sendContactRequest(payload: ReturnType<typeof buildPayload>, signal: AbortSignal, transport: typeof fetch = fetch): Promise<Delivery> {
  const response = await transport("/api/leads", {
    method: "POST", headers: { "Content-Type": "application/json" }, signal,
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("request-unconfirmed");
  return readDelivery(await response.json());
}
