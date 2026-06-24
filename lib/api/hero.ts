import { createClient } from "@/lib/supabase";
import { HeroSlide } from "@/lib/types";

const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    id: "1",
    image_url: "/images/hero-section.png",
    mobile_image_url: "/images/hero-section.png",
    alt_text: "MAGNAT Premium Living Room",
    heading: "Living Room",
    description: "A quarter-century legacy of handcrafted excellence. We curate the world's finest designs for the most sophisticated Kerala interiors.",
    sort_order: 0,
    is_active: true,
  },
  {
    id: "2",
    image_url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2600&auto=format&fit=crop",
    mobile_image_url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop",
    alt_text: "MAGNAT Luxury Interior",
    heading: "Luxury Spaces",
    description: "From timeless classics to contemporary masterpieces — every piece tells a story of unmatched craftsmanship and refined taste.",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "3",
    image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2600&auto=format&fit=crop",
    mobile_image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    alt_text: "MAGNAT Sofa Collection",
    heading: "Sofa Collection",
    description: "Sink into comfort without sacrificing style. Our exclusive sofa collections redefine relaxation for the discerning homeowner.",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "4",
    image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2600&auto=format&fit=crop",
    mobile_image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    alt_text: "MAGNAT Contemporary Design",
    heading: "Contemporary Design",
    description: "Bold lines, rich textures, and thoughtful detail — our contemporary range brings modern elegance to Kerala's finest homes.",
    sort_order: 3,
    is_active: true,
  },
];

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_HERO_SLIDES;
    }
    return data;
  } catch (err) {
    return FALLBACK_HERO_SLIDES;
  }
}
