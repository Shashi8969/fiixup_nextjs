import "server-only";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";

export type PreviewDraft = {
  token: string;
  content_type: "post" | "city" | "service" | "city_service_page" | "location_service";
  source_table: string | null;
  source_id: string | null;
  source_slug: string | null;
  public_path: string | null;
  payload: any;
  image_settings: any;
  expires_at: string;
};

export const getPreviewDraft = cache(async (token: string): Promise<PreviewDraft | null> => {
  // UUID tokens are capability links. Never list drafts with a browser key.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token)) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data, error } = await supabase
    .from("preview_drafts")
    .select("token,content_type,source_table,source_id,source_slug,public_path,payload,image_settings,expires_at")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .single();

  if (error || !data) return null;
  return data as PreviewDraft;
});
