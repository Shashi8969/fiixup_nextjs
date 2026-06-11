import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";

export type PageLinkOverride = {
  id?: string;
  source_path: string;
  section_key: string;
  label: string;
  href: string;
  sort_order?: number | null;
  opens_new_tab?: boolean | null;
};

function cleanPath(value: string) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "/";
  if (/^(https?:|tel:|mailto:|#)/i.test(trimmed)) return trimmed;
  if (trimmed === "/") return "/";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

export const getPageLinkOverrides = unstable_cache(
  async (sourcePath: string, sectionKey: string): Promise<PageLinkOverride[]> => {
    const path = cleanPath(sourcePath);
    const section = String(sectionKey ?? "").trim();
    if (!path || !section) return [];

    try {
      const { data, error } = await supabase
        .from("page_link_overrides")
        .select("id,source_path,section_key,label,href,sort_order,opens_new_tab")
        .eq("source_path", path)
        .eq("section_key", section)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error || !data) return [];
      return data.map((row: any) => ({
        id: row.id,
        source_path: row.source_path,
        section_key: row.section_key,
        label: String(row.label ?? ""),
        href: cleanPath(row.href),
        sort_order: Number(row.sort_order ?? 100),
        opens_new_tab: Boolean(row.opens_new_tab),
      })).filter((row) => row.label && row.href);
    } catch {
      return [];
    }
  },
  ["page-link-overrides"],
  { revalidate: 3600, tags: ["page-link-overrides", "seo-pages"] }
);
