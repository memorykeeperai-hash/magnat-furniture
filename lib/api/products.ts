import { createClient } from "@/lib/supabase";
import { allProducts as fallbackProducts, Product as FallbackProduct } from "@/lib/data/products";
import { Product } from "@/lib/types";

// Helper to map DB Product to Frontend Product
function mapProduct(dbProduct: any): Product {
  return {
    ...dbProduct,
    category: dbProduct.categories || dbProduct.category,
    images: dbProduct.images || [],
    features: dbProduct.features || [],
    specifications: dbProduct.specifications || []
  };
}

// Convert fallback data to new Product type (making it async-friendly)
function mapFallbackProduct(p: FallbackProduct): Product {
  return {
    id: p.slug, // Using slug as ID for fallback items
    name: p.name,
    slug: p.slug,
    description: p.description,
    short_description: p.short_description,
    category_id: p.category, // Just string mapping for fallback
    images: p.images,
    features: p.features || [],
    specifications: p.specifications || [],
    price: p.price,
    delivery_time: p.deliveryTime,
    material: p.material,
    badge: p.badge,
    room:p.room,
    is_new: p.isNew,
    is_bestseller: p.isBestseller,
    is_active: true,
    is_featured: false,
    is_private: false,
    access_token: null,
    type: p.type || null,
    sort_order: 0,
    created_at: new Date().toISOString(),
    categories: {
      id: p.category,
      name: p.category,
      base_category: p.category.toLowerCase(),
      slug: p.category.toLowerCase(),
      description: null,
      image_url: null,
      is_featured: false,
      sort_order: 0,
      created_at: new Date().toISOString()
    }
  };
}

export async function getPrivateProducts(): Promise<Product[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*)")
      .eq("is_private", true)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];

    return data.map(mapProduct);
  } catch (err) {
    console.error("Error fetching private products:", err);
    return [];
  }
}

export async function getProducts(includePrivate: boolean = false): Promise<Product[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from("products")
      .select("*, categories(*)")
      .eq("is_active", true);
    
    if (!includePrivate) {
      query = query.eq("is_private", false);
    }

    const { data, error } = await query.order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackProducts.map(mapFallbackProduct);
    }

    return data.map(mapProduct);
  } catch (err) {
    console.error("Error fetching products, falling back:", err);
    return fallbackProducts.map(mapFallbackProduct);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*)")
      .eq("slug", slug)
      .eq("is_private", false)
      .single();

    if (error || !data) {
      // Logic from lib/data/products.ts getProductBySlug
      const fallback = fallbackProducts.find(p => p.slug === slug);
      if (fallback) return mapFallbackProduct(fallback);

      // Auto-generate fallback for preview if totally missing
      const formattedName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      return {
        id: slug,
        slug,
        name: formattedName,
        category_id: "Preview Collection",
        description: `Here is a beautiful ${formattedName} crafted with precision. Hand-tufted and built to last generations, this piece uses premium materials sourced specifically for longevity and style in modern Kerala homes.`,
        short_description: `Here is a beautiful ${formattedName} crafted with precision.`,
        images: ["/images/placeholder-furniture.jpg", "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop"],
        price: "Custom Quote",
        delivery_time: "3-5 weeks",
        material: "Premium Material",
        badge: "New Arrival",
        room: "Living Room",
        is_new: true,
        is_bestseller: false,
        is_active: true,
        is_featured: false,
        is_private: false,
        access_token: null,
        type: null,
        features: ["Custom Built in Kondotty", "Premium Upholstery Options", "Solid Wood Internal Framework", "5-Year Manufacturer Warranty"],
        specifications: [{ label: "Dimensions", value: "Customizable" }, { label: "Weight Capacity", value: "Standard" }, { label: "Warranty", value: "5 Years" }],
        sort_order: 0,
        created_at: new Date().toISOString(),
      };
    }

    return mapProduct(data);
  } catch (err) {
    console.error("Error fetching product by slug, falling back:", err);
    const fallback = fallbackProducts.find(p => p.slug === slug);
    return fallback ? mapFallbackProduct(fallback) : null;
  }
}

export async function getRelatedProducts(categorySlug: string, excludeSlug: string): Promise<Product[]> {
  try {
    const supabase = await createClient();
    
    // First find the category ID if categorySlug is provided
    let categoryCondition = "";
    if (categorySlug) {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug.toLowerCase())
        .single();
      
      if (categoryData) {
        const { data, error } = await supabase
          .from("products")
          .select("*, categories(*)")
          .eq("category_id", categoryData.id)
          .eq("is_private", false)
          .neq("slug", excludeSlug)
          .limit(3);
        
        if (!error && data && data.length > 0) return data.map(mapProduct);
      }
    }

    // Fallback logic
    return fallbackProducts
      .filter(p => p.category === categorySlug && p.slug !== excludeSlug)
      .slice(0, 3)
      .map(mapFallbackProduct);
  } catch (err) {
    return fallbackProducts
      .filter(p => p.category === categorySlug && p.slug !== excludeSlug)
      .slice(0, 3)
      .map(mapFallbackProduct);
  }
}

export async function getProductByToken(token: string): Promise<Product | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*)")
      .eq("access_token", token)
      .single();

    if (error || !data) return null;

    return mapProduct(data);
  } catch (err) {
    console.error("Error fetching product by token:", err);
    return null;
  }
}
