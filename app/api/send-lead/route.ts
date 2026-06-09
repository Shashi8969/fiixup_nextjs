import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { MAIN_EMAIL, SITE_NAME } from "@/lib/constants";

export const runtime = "nodejs";

type LeadPayload = Record<string, unknown>;

const IMPORTANT_FIELDS = [
  "form_type",
  "name",
  "phone",
  "city",
  "city_name",
  "vehicle",
  "service",
  "message",
  "request_time",
  "page_url",
  "source",
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
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizePayload(payload: LeadPayload): Record<string, string> {
  const normalized: Record<string, string> = {};

  for (const [key, value] of Object.entries(payload)) {
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

export async function POST(request: NextRequest) {
  try {
    const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const leadToEmail = process.env.LEAD_TO_EMAIL || smtpUser || MAIN_EMAIL;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "Mail server is not configured" },
        { status: 500 }
      );
    }

    const rawPayload = (await request.json()) as LeadPayload;
    const data = normalizePayload(rawPayload);

    if (!data.phone && !data.email) {
      return NextResponse.json(
        { error: "Phone number or email is required" },
        { status: 400 }
      );
    }

    const requestTime =
      data.request_time ||
      new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

    data.request_time = requestTime;

    const formType = data.form_type || "Website Lead";
    const service = data.service || "Service not selected";
    const city = data.city || data.city_name || "City not selected";
    const phone = data.phone || "Phone not provided";

    const subject = `New Fiixup Lead: ${service} - ${city} - ${phone}`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">
        <h2 style="margin:0 0 12px;color:#2563eb;">${escapeHtml(SITE_NAME)} Website Lead</h2>
        <p style="margin:0 0 16px;">New enquiry received from <strong>${escapeHtml(formType)}</strong>.</p>
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

    await transporter.sendMail({
      from: `${process.env.LEAD_FROM_NAME || SITE_NAME} <${smtpUser}>`,
      to: leadToEmail,
      replyTo: data.email || smtpUser,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead email failed", error);
    return NextResponse.json(
      { error: "Unable to send lead request" },
      { status: 500 }
    );
  }
}
