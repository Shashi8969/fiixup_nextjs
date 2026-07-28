import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";

export type GalleryImage = {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  altText: string | null;
  category: string | null;
};

export const getGalleryImages = unstable_cache(
  async (): Promise<GalleryImage[]> => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("id, title, description, image_url, alt_text, category")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      imageUrl: row.image_url,
      altText: row.alt_text,
      category: row.category,
    }));
  },
  ["gallery-images"],
  { revalidate: 3600, tags: ["gallery"] }
);
