import { createClient } from "@/lib/supabase";
import { FeaturedItem } from "@/lib/types";

const FALLBACK_FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: "1",
    category: "Living Area",
    name: "Nordic Chair",
    subtitle: "A stylish and comfortable Nordic chair designed with minimal aesthetics, perfect for modern living rooms.",
    image_url: "/images/singlesofa.png",
    sort_order: 0,
    is_active: true,
  },
  {
    id: "2",
    category: "Living Area",
    name: "Skyline Sofa",
    subtitle: "A premium skyline sofa offering superior comfort and elegant design, ideal for relaxing and entertaining guests.",
    image_url: "/images/sofa3d1.png",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "3",
    category: "Living Area",
    name: "Bloom Sofa",
    subtitle: "A cozy and compact bloom sofa that blends softness with contemporary design for small and large spaces.",
    image_url: "/images/singlesofa.png",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "4",
    category: "Bedroom",
    name: "Luna Armchair",
    subtitle: "A luxurious armchair crafted for bedroom comfort, featuring soft cushioning and a sleek modern look.",
    image_url: "/images/sofa3d1.png",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "5",
    category: "Office",
    name: "Crest Desk Chair",
    subtitle: "An ergonomic office chair designed for long working hours, providing excellent back support and comfort.",
    image_url: "/images/singlesofa.png",
    sort_order: 4,
    is_active: true,
  },
];

export async function getFeaturedItems(): Promise<FeaturedItem[]> {
  try {
    const supabase = createClient();
    // Fetch products marked as Signature Collection (is_featured=true)
    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        subtitle:short_description,
        image_url:images,
        sort_order:price,
        is_active,
        is_new,
        is_bestseller,
        is_featured,
        categories (
          name
        )
      `)
      .eq("is_featured", true)
      .eq("is_active", true)
      .eq("is_private", false)
      .limit(8);

    if (error || !data || data.length === 0) {
      return FALLBACK_FEATURED_ITEMS;
    }

    // Map Product data to FeaturedItem shape for the carousel
    return data.map((item: any) => ({
      id: item.id.toString(),
      slug: item.slug,
      category: item.categories?.name || "Premium Collection",
      name: item.name,
      subtitle: item.subtitle || "Exclusive design for modern luxury.",
      image_url: Array.isArray(item.image_url) ? item.image_url[0] : item.image_url || "/images/placeholder-furniture.jpg",
      sort_order: 0,
      is_active: item.is_active,
      is_new: item.is_new,
      is_bestseller: item.is_bestseller,
      is_featured: item.is_featured,
    }));

  } catch (err) {
    return FALLBACK_FEATURED_ITEMS;
  }
}
