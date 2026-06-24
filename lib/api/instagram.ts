import { createClient } from "@/lib/supabase";
import { InstagramPost } from "@/lib/types";

const FALLBACK_INSTAGRAM_POSTS: InstagramPost[] = [
  { id: "1", image_url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop", caption: null, post_url: null, sort_order: 0, is_active: true },
  { id: "2", image_url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop", caption: null, post_url: null, sort_order: 1, is_active: true },
  { id: "3", image_url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2064&auto=format&fit=crop", caption: null, post_url: null, sort_order: 2, is_active: true },
  { id: "4", image_url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop", caption: null, post_url: null, sort_order: 3, is_active: true },
  { id: "5", image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop", caption: null, post_url: null, sort_order: 4, is_active: true },
  { id: "6", image_url: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2070&auto=format&fit=crop", caption: null, post_url: null, sort_order: 5, is_active: true },
];

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("instagram_posts")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_INSTAGRAM_POSTS;
    }
    return data;
  } catch (err) {
    return FALLBACK_INSTAGRAM_POSTS;
  }
}
