import { createClient } from "@/lib/supabase-server";
import HomeSettingsClient from "./HomeSettingsClient";

export default async function AdminHomePage() {
  const supabase = await createClient();

  // 1. Fetch Homepage Sections
  const { data: sections } = await supabase
    .from("homepage_sections")
    .select("*")
    .order("section_key");

  // 2. Fetch Hero Slides
  const { data: heroSlides } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order");

  // 3. Fetch Categories (to select featured ones for Elite section)
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  // 4. Fetch Instagram Posts
  const { data: instagramPosts } = await supabase
    .from("instagram_posts")
    .select("*")
    .order("sort_order");

  return (
    <div className="font-inter max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-2xl font-playfair font-black text-[#111111] tracking-tight">Home Page Architecture</h2>
        <p className="text-[10px] text-[#C0001A] uppercase tracking-[0.2em] mt-2 font-bold">Orchestrate the landing experience of the Magnat brand</p>
      </div>

      <HomeSettingsClient 
        initialSections={sections || []}
        heroSlides={heroSlides || []}
        categories={categories || []}
        instagramPosts={instagramPosts || []}
      />
    </div>
  );
}
