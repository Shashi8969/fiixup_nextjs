import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";

export type BrandLogo = {
  name: string;
  logoUrl: string | null;
  vehicleType: "car" | "bike";
};

export const getBrandLogos = unstable_cache(
  async (): Promise<BrandLogo[]> => {
    const { data, error } = await supabase
      .from("brand_logos")
      .select("name, logo_url, vehicle_type")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return [];

    return data.map((row) => ({
      name: row.name,
      logoUrl: row.logo_url,
      vehicleType: row.vehicle_type === "bike" ? "bike" : "car",
    }));
  },
  ["brand-logos"],
  { revalidate: 3600, tags: ["brand-logos"] }
);
