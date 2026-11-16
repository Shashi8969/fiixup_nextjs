export { getSupabaseHost, getAdminPreviewOrigins, buildContentSecurityPolicy } from "./security-policy.mjs";
import { buildSecurityHeaders } from "./security-policy.mjs";
export const STATIC_SECURITY_HEADERS = buildSecurityHeaders();
