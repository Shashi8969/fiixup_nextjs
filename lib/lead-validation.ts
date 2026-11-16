const ALLOWED_FIELDS = new Set([
  "form_type", "name", "customer_name", "phone", "mobile", "mobile_number", "email", "city", "city_name", "area", "area_name",
  "vehicle", "vehicle_type", "vehicle_model", "model", "service", "service_name", "message", "problem", "description",
  "request_time", "page_url", "page_path", "source", "lead_source", "referrer",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
]);
export function cleanLeadPayload(payload: Record<string, unknown>): Record<string, string> {
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (!ALLOWED_FIELDS.has(key)) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      const cleaned = String(value).trim().slice(0, 1000);
      if (cleaned) normalized[key] = cleaned;
    }
  }
  normalized.phone = normalized.phone || normalized.mobile || normalized.mobile_number || "";
  normalized.name = normalized.name || normalized.customer_name || "";
  return normalized;
}
export function validLeadContact(data: Record<string, string>): boolean {
  const phone = data.phone || "";
  const email = data.email || "";
  if (!phone && !email) return false;
  if (phone && (!/^[+\d\s().-]+$/.test(phone) || !/^\d{7,15}$/.test(phone.replace(/\D/g, "")))) return false;
  if (email && (email.length > 254 || !/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(email))) return false;
  return true;
}
