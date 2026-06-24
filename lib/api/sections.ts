import { createClient } from "@/lib/supabase";
import { HomepageSection } from "@/lib/types";

export async function getSection(key: string): Promise<HomepageSection | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("homepage_sections")
      .select("*")
      .eq("section_key", key)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      return null;
    }
    return data;
  } catch (err) {
    return null;
  }
}
