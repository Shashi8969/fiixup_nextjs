import { supabase } from "./supabase";

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

export async function getPreviewDraft(token: string): Promise<PreviewDraft | null> {
  const { data, error } = await supabase
    .from("preview_drafts")
    .select("*")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .single();

  if (error || !data) return null;
  return data as PreviewDraft;
}
