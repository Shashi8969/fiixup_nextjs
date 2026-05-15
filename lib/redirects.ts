// lib/redirects.ts
// ─────────────────────────────────────────────────────────────────────────────
// Admin helper functions for the redirects table.
// Uses the service role key — only safe in server-side / admin contexts.
// Future: wire these up to /admin/redirects page.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env var");
  return createClient(url, key);
}

export interface RedirectRow {
  id: string;
  source: string;
  destination: string;
  is_permanent: boolean;
  is_active: boolean;
  note: string | null;
  created_at: string;
  updated_at: string;
}

// ── Fetch all redirects (admin view — includes inactive) ──────────────────────
export async function getAllRedirects(): Promise<{ data: RedirectRow[] | null; error: Error | null }> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("redirects")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: data as RedirectRow[] | null, error: error as Error | null };
}

// ── Add a new redirect ────────────────────────────────────────────────────────
export async function addRedirect(
  source: string,
  destination: string,
  isPermanent = true,
  note = ""
) {
  const supabase = getAdminClient();
  return supabase.from("redirects").insert({
    source:       source.startsWith("/") ? source : `/${source}`,
    destination:  destination.startsWith("/") || destination.startsWith("http")
      ? destination
      : `/${destination}`,
    is_permanent: isPermanent,
    note:         note || null,
    is_active:    true,
  });
}

// ── Toggle active / inactive ──────────────────────────────────────────────────
export async function toggleRedirect(id: string, isActive: boolean) {
  const supabase = getAdminClient();
  return supabase
    .from("redirects")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("id", id);
}

// ── Update destination or other fields ───────────────────────────────────────
export async function updateRedirect(
  id: string,
  updates: {
    destination?: string;
    is_permanent?: boolean;
    note?: string;
    is_active?: boolean;
  }
) {
  const supabase = getAdminClient();
  return supabase
    .from("redirects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);
}

// ── Delete permanently ────────────────────────────────────────────────────────
export async function deleteRedirect(id: string) {
  const supabase = getAdminClient();
  return supabase.from("redirects").delete().eq("id", id);
}
