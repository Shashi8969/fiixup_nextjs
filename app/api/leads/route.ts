import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { MAIN_EMAIL, SITE_NAME, SITE_URL } from "@/lib/constants";
import {
  isSameOriginRequest,
  normalizePhoneKey,
  rateLimitKey,
  rateLimitRequest,
  readJsonBody,
} from "@/lib/api-security";

export const runtime = "nodejs";

const LEAD_RATE_LIMIT = { limit: 8, windowMs: 15 * 60 * 1000 };
const MAX_LEAD_BODY_BYTES = 32 * 1024;

// Same phone number can only trigger one DB insert + email within this
// window. Stops the "one person/bot mashes submit" case from burning a
// fresh SMTP send and DB row on every click — the actual cost driver.
const PHONE_COOLDOWN = { limit: 1, windowMs: 3 * 60 * 1000 };

// Real visitors take at least this long to read and fill the form after
// page load; a scripted submit that fires faster is almost always a bot.
const MIN_FORM_FILL_MS = 1200;

const SITE_HOST = new URL(SITE_URL).host;
const ALLOWED_ORIGIN_HOSTS =
  process.env.NODE_ENV === "production"
    ? [SITE_HOST]
    : [SITE_HOST, "localhost:3000", "127.0.0.1:3000"];

type LeadPayload = Record<string, unknown>;

type SavedLeadRow = {
  id?: string | null;
  page_path?: string | null;
  is_duplicate?: boolean | null;
  duplicate_lead_count_before?: number | null;
  first_seen_at?: string | null;
  duplicate_note?: string | null;
};

const IMPORTANT_FIELDS = [
  "form_type",
  "name",
  "phone",
  "email",
  "city",
  "city_name",
  "area",
  "vehicle",
  "vehicle_type",
  "vehicle_model",
  "service",
  "message",
  "request_time",
  "page_url",
  "source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
];

function cleanValue(value: unknown): string {
  if (typeof value === "string") return value.trim().slice(0, 1000);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizePayload(payload: LeadPayload): Record<string, string> {
  const normalized: Record<string, string> = {};

  for (const [key, value] of Object.entries(payload || {})) {
    const cleaned = cleanValue(value);
    if (cleaned) normalized[key] = cleaned;
  }

  return normalized;
}

function buildLeadTable(data: Record<string, string>) {
  const orderedKeys = [
    ...IMPORTANT_FIELDS.filter((key) => data[key]),
    ...Object.keys(data).filter((key) => !IMPORTANT_FIELDS.includes(key)),
  ];

  return orderedKeys
    .map((key) => {
      const label = escapeHtml(toLabel(key));
      const value = escapeHtml(data[key]);
      return `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">${label}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${value}</td></tr>`;
    })
    .join("");
}

function getServiceSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getIpAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || null;
  return request.headers.get("x-real-ip") || null;
}

function getPagePath(pageUrl?: string | null) {
  if (!pageUrl) return "";
  try {
    return new URL(pageUrl).pathname || "/";
  } catch {
    if (pageUrl.startsWith("/")) return pageUrl.split("?")[0] || "/";
    return "";
  }
}

function buildSuccessMessage(lead: SavedLeadRow | null) {
  if (lead?.is_duplicate) {
    return "Request received. This mobile number has contacted us before, so our team will check the earlier enquiry and call you shortly.";
  }

  return "Booking request received successfully. Our team will contact you shortly.";
}

function buildLeadResponseMeta(lead: SavedLeadRow | null) {
  return {
    success_message: buildSuccessMessage(lead),
    is_duplicate: Boolean(lead?.is_duplicate),
    duplicate_lead_count_before: lead?.duplicate_lead_count_before ?? 0,
    duplicate_note: lead?.duplicate_note ?? null,
    page_path: lead?.page_path ?? null,
  };
}

function buildLeadInsert(data: Record<string, string>, request: NextRequest) {
  return {
    status: "new",
    priority: "normal",
    lead_source: data.source || data.lead_source || "website",
    form_type: data.form_type || "Website Lead",
    name: data.name || data.customer_name || null,
    phone: data.phone || data.mobile || data.mobile_number || null,
    email: data.email || null,
    city: data.city || data.city_name || null,
    area: data.area || data.area_name || null,
    vehicle_type: data.vehicle_type || data.vehicle || null,
    vehicle_model: data.vehicle_model || data.model || null,
    service: data.service || data.service_name || null,
    message: data.message || data.problem || data.description || null,
    page_url: data.page_url || null,
    page_path: data.page_path || getPagePath(data.page_url) || null,
    referrer: data.referrer || request.headers.get("referer") || null,
    user_agent: request.headers.get("user-agent") || null,
    ip_address: getIpAddress(request),
    utm_source: data.utm_source || null,
    utm_medium: data.utm_medium || null,
    utm_campaign: data.utm_campaign || null,
    utm_term: data.utm_term || null,
    utm_content: data.utm_content || null,
    raw_payload: data,
    notification_status: "pending",
  };
}

async function saveLeadToDatabase(data: Record<string, string>, request: NextRequest) {
  const sb = getServiceSupabaseClient();
  if (!sb) {
    return {
      lead: null as SavedLeadRow | null,
      leadId: null as string | null,
      error: "SUPABASE_SERVICE_ROLE_KEY is not configured",
    };
  }

  const { data: row, error } = await sb
    .from("leads")
    .insert(buildLeadInsert(data, request))
    .select("id,page_path,is_duplicate,duplicate_lead_count_before,first_seen_at,duplicate_note")
    .single();

  if (error) return { lead: null as SavedLeadRow | null, leadId: null as string | null, error: error.message };
  const lead = (row ?? null) as SavedLeadRow | null;
  return { lead, leadId: lead?.id ? String(lead.id) : null, error: null as string | null };
}

async function updateLeadNotification(
  leadId: string | null,
  status: "sent" | "skipped" | "failed",
  error?: string
) {
  if (!leadId) return;
  const sb = getServiceSupabaseClient();
  if (!sb) return;

  await sb
    .from("leads")
    .update({
      notification_status: status,
      notification_error: error ? error.slice(0, 1000) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);
}

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimitRequest(request, "lead-submit", LEAD_RATE_LIMIT);
    if (limited) return limited;

    if (!isSameOriginRequest(request, ALLOWED_ORIGIN_HOSTS)) {
      return NextResponse.json(
        { error: "Request origin not allowed" },
        { status: 403, headers: { "Cache-Control": "no-store" } }
      );
    }

    const parsed = await readJsonBody<LeadPayload>(request, { maxBytes: MAX_LEAD_BODY_BYTES });
    if (!parsed.ok) return parsed.response;

    const rawPayload = parsed.data;

    // Honeypot: "website" is a hidden field real visitors never see or
    // fill; bots that auto-fill every input on the form trip it. Respond
    // as if the lead was accepted (no error to react to) but skip DB/SMTP
    // entirely so the submission costs nothing.
    if (cleanValue(rawPayload.website)) {
      return NextResponse.json(buildLeadResponseMeta(null));
    }

    // Timing trap: a submit that fires less than MIN_FORM_FILL_MS after
    // the page loaded is almost never a human filling out this form.
    const renderMs = Number(rawPayload.form_render_ms);
    if (Number.isFinite(renderMs) && renderMs >= 0 && renderMs < MIN_FORM_FILL_MS) {
      return NextResponse.json(buildLeadResponseMeta(null));
    }

    const data = normalizePayload(rawPayload);

    if (!data.phone && !data.email) {
      return NextResponse.json(
        { error: "Phone number or email is required" },
        { status: 400 }
      );
    }

    // Per-phone cooldown: the same mobile number can only trigger one
    // DB insert + email per window. Catches one person/bot mashing submit
    // without touching the database or mail server on the repeat hits.
    const phoneKey = normalizePhoneKey(data.phone);
    if (phoneKey && rateLimitKey(request, "lead-phone", PHONE_COOLDOWN, phoneKey)) {
      return NextResponse.json(
        buildLeadResponseMeta({ is_duplicate: true } as SavedLeadRow)
      );
    }

    const requestTime =
      data.request_time ||
      new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

    data.request_time = requestTime;

    const { lead, leadId, error: dbError } = await saveLeadToDatabase(data, request);

    const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const leadToEmail = process.env.LEAD_TO_EMAIL || smtpUser || MAIN_EMAIL;

    if (!smtpUser || !smtpPass) {
      await updateLeadNotification(leadId, "skipped", "Mail server is not configured");

      if (dbError) {
        return NextResponse.json(
          { error: "Lead storage and mail server are not configured", db_error: dbError },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        lead_saved: Boolean(leadId),
        email_sent: false,
        db_error: dbError,
        ...buildLeadResponseMeta(lead),
      });
    }

    const formType = data.form_type || "Website Lead";
    const service = data.service || "Service not selected";
    const city = data.city || data.city_name || "City not selected";
    const phone = data.phone || "Phone not provided";

    const subject = `New Fiixup Lead: ${service} - ${city} - ${phone}`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">
        <h2 style="margin:0 0 12px;color:#2563eb;">${escapeHtml(SITE_NAME)} Website Lead</h2>
        <p style="margin:0 0 16px;">New enquiry received from <strong>${escapeHtml(formType)}</strong>.</p>
        ${dbError ? `<p style="margin:0 0 16px;color:#b45309;">Database note: ${escapeHtml(dbError)}</p>` : ""}
        ${lead?.is_duplicate ? `<p style="margin:0 0 16px;color:#b45309;"><strong>Duplicate mobile:</strong> ${escapeHtml(lead.duplicate_note || "This customer has submitted before.")}</p>` : ""}
        <table style="border-collapse:collapse;width:100%;max-width:720px;font-size:14px;">
          ${buildLeadTable(data)}
        </table>
      </div>
    `;

    const text = Object.entries(data)
      .map(([key, value]) => `${toLabel(key)}: ${value}`)
      .join("\n");

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE || "true") !== "false",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    try {
      await transporter.sendMail({
        from: `${process.env.LEAD_FROM_NAME || SITE_NAME} <${smtpUser}>`,
        to: leadToEmail,
        replyTo: data.email || smtpUser,
        subject,
        text,
        html,
      });
      await updateLeadNotification(leadId, "sent");
    } catch (mailError) {
      const message = mailError instanceof Error ? mailError.message : "Unable to send lead email";
      await updateLeadNotification(leadId, "failed", message);

      if (!leadId) {
        return NextResponse.json(
          { error: "Unable to send lead request" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        lead_saved: true,
        email_sent: false,
        email_error: message,
        ...buildLeadResponseMeta(lead),
      });
    }

    return NextResponse.json({
      ok: true,
      lead_saved: Boolean(leadId),
      email_sent: true,
      db_error: dbError,
      ...buildLeadResponseMeta(lead),
    });
  } catch (error) {
    console.error("Lead request failed", error);
    return NextResponse.json(
      { error: "Unable to send lead request" },
      { status: 500 }
    );
  }
}
