import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";

export type TeamMember = {
  id: string;
  name: string;
  role: string | null;
  photoUrl: string | null;
  bio: string | null;
};

export const getTeamMembers = unstable_cache(
  async (): Promise<TeamMember[]> => {
    const { data, error } = await supabase
      .from("team_members")
      .select("id, name, role, photo_url, bio")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      photoUrl: row.photo_url,
      bio: row.bio,
    }));
  },
  ["team-members"],
  { revalidate: 3600, tags: ["team-members"] }
);
