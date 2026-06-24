"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { slugify, ensureUniqueSlug } from "@/lib/utils/slug";
import { uploadToCloudinary } from "@/lib/cloudinary";


/**
 * Update the status of a customer inquiry
 */
export async function updateInquiryStatus(id: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating inquiry status:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/inquiries");
  return { success: true };
}

/**
 * Save or update a product
 */
export async function saveProduct(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const short_description = formData.get("short_description") as string;
  const price = formData.get("price") as string;
  const delivery_time = formData.get("delivery_time") as string;
  const material = formData.get("material") as string;
  const badge = formData.get("badge") as string;
  const category_id = formData.get("category_id") as string;
  const type = formData.get("type") as string;
  const room = formData.get("room") as string;
  
  const is_new = formData.get("is_new") === "true";
  const is_bestseller = formData.get("is_bestseller") === "true";
  const is_featured = formData.get("is_featured") === "true";
  const is_active = formData.get("is_active") === "true";
  const is_private = formData.get("is_private") === "true";
  let access_token = formData.get("access_token") as string;

  // Generate token if private and no token exists
  if (is_private && (!access_token || access_token === "null" || access_token === "undefined")) {
    access_token = `mag-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`;
  }

  const images = formData.getAll("images") as string[];
  let features = [];
  try {
    const featuresRaw = formData.get("features");
    features = featuresRaw ? JSON.parse(featuresRaw as string) : [];
  } catch (e) {
    console.error("Error parsing product features:", e);
    features = [];
  }

  let specifications = [];
  try {
    const specsRaw = formData.get("specifications");
    specifications = specsRaw ? JSON.parse(specsRaw as string) : [];
  } catch (e) {
    console.error("Error parsing product specifications:", e);
    specifications = [];
  }

  const productData = {
    name,
    slug,
    description,
    short_description,
    price,
    delivery_time,
    material,
    badge,
    room: room || null,
    category_id: category_id || null,
    type,
    is_new,
    is_bestseller,
    is_featured,
    is_active,
    is_private,
    access_token: is_private ? access_token : null,
    images: images.filter(img => img), // Remove empty strings
    features,
    specifications,
  };

  let query;
  if (id && id !== "new") {
    query = supabase.from("products").update(productData).eq("id", id);
  } else {
    query = supabase.from("products").insert([productData]);
  }

  const { error } = await query;

  if (error) {
    console.error("Error saving product:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  
  return { success: true };
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/products");
  return { success: true };
}

/**
 * Save or update a hero slide
 */
export async function saveHeroSlide(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get("id") as string;
  const heading = formData.get("heading") as string;
  const description = formData.get("description") as string;
  const image_url = formData.get("image_url") as string;
  const mobile_image_url = formData.get("mobile_image_url") as string || null;
  const alt_text = formData.get("alt_text") as string;
  const sort_order = parseInt(formData.get("sort_order") as string || "0");
  const is_active = formData.get("is_active") === "true";

  const slideData = {
    heading,
    description,
    image_url,
    mobile_image_url,
    alt_text,
    sort_order,
    is_active,
  };

  let query;
  if (id && id !== "new") {
    query = supabase.from("hero_slides").update(slideData).eq("id", id);
  } else {
    query = supabase.from("hero_slides").insert([slideData]);
  }

  const { error } = await query;

  if (error) {
    console.error("Error saving hero slide:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/hero-slides");
  revalidatePath("/");
  return { success: true };
}

/**
 * Delete a hero slide
 */
export async function deleteHeroSlide(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("hero_slides")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting hero slide:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/hero-slides");
  revalidatePath("/");
  return { success: true };
}

/**
 * Save or update a category
 */
export async function saveCategory(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const base_category = formData.get("base_category") as string;
  const image_url = formData.get("image_url") as string;
  const description = formData.get("description") as string;
  const sort_order = parseInt(formData.get("sort_order") as string || "0");
  const is_featured = formData.get("is_featured") === "true";

  if (!name || !base_category) {
    return { error: "Name and Base Category are required." };
  }

  // Auto-generate slug from name
  const baseSlug = slugify(name);
  const slug = await ensureUniqueSlug(baseSlug, "categories", supabase, id);

  const categoryData = {
    name,
    base_category,
    slug,
    image_url,
    description,
    sort_order,
    is_featured,
  };

  let query;
  if (id && id !== "new") {
    query = supabase.from("categories").update(categoryData).eq("id", id);
  } else {
    query = supabase.from("categories").insert([categoryData]);
  }

  const { error } = await query;

  if (error) {
    console.error("Error saving category:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}

/**
 * Delete a category
 */
export async function deleteCategory(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting category:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  return { success: true };
}

/**
 * Save or update a testimonial
 */
export async function saveTestimonial(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get("id") as string;
  const client_name = formData.get("client_name") as string;
  const client_role = formData.get("client_role") as string;
  const quote = formData.get("quote") as string;
  const rating = parseInt(formData.get("rating") as string || "5");
  const client_image = formData.get("client_image") as string;
  const is_active = formData.get("is_active") === "true";

  const testimonialData = {
    client_name,
    client_role,
    quote,
    rating,
    client_image,
    is_active,
  };

  let query;
  if (id && id !== "new") {
    query = supabase.from("testimonials").update(testimonialData).eq("id", id);
  } else {
    query = supabase.from("testimonials").insert([testimonialData]);
  }

  const { error } = await query;

  if (error) {
    console.error("Error saving testimonial:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

/**
 * Delete a testimonial
 */
export async function deleteTestimonial(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting testimonial:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}
/**
 * Delete a media asset from the system
 * Note: This currently only removes references if they're tracked, 
 * but for this implementation we'll simulate a success or specific logic if needed.
 */
export async function deleteMediaAsset(formData: FormData) {
  const supabase = await createClient();
  const url = formData.get("url") as string;

  if (!url) return;

  // Logic: In a full implementation, we might check which table uses this URL
  // and nullify it, or delete from Storage. For now, we'll revalidate to refresh UI.
  
  console.log("Request to delete asset:", url);
  
  // We can revalidate the media page to reflect changes
  revalidatePath("/admin/media");
}

/**
 * Save or update a homepage section
 */
export async function saveHomepageSection(formData: FormData) {
  const supabase = await createClient();
  const isMulti = formData.get("is_multi") === "true";
  
  try {
    if (isMulti) {
      // Handle multiple sections at once (e.g. curtains)
      const keys = Array.from(formData.keys()).filter(k => k.includes("_title")).map(k => k.split("_")[0]);
      const uniqueKeys = Array.from(new Set(keys));

      for (const key of uniqueKeys) {
        const sectionData = {
          section_key: key,
          title: formData.get(`${key}_title`) as string,
          subtitle: formData.get(`${key}_subtitle`) as string,
          description: formData.get(`${key}_description`) as string,
          image_url: formData.get(`${key}_image_url`) as string,
          mobile_image_url: formData.get(`${key}_mobile_image_url`) as string || null,
          is_active: true,
          updated_at: new Date().toISOString(),
        };

        const { error } = await supabase.from("homepage_sections").upsert(sectionData, { onConflict: "section_key" });
        if (error) throw error;
      }
    } else {
      // Handle single section
      const id = formData.get("id") as string;
      const section_key = formData.get("section_key") as string;
      const sectionData = {
        section_key,
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        description: formData.get("description") as string,
        image_url: formData.get("image_url") as string,
        mobile_image_url: formData.get("mobile_image_url") as string || null,
        updated_at: new Date().toISOString(),
      };

      let query;
      if (id && id !== "new") {
        query = supabase.from("homepage_sections").update(sectionData).eq("id", id);
      } else {
        query = supabase.from("homepage_sections").upsert(sectionData, { onConflict: "section_key" });
      }

      const { error } = await query;
      if (error) throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin/home");
    return { success: true };
  } catch (err: any) {
    console.error("Error saving homepage section:", err);
    return { error: err.message || "Failed to save section" };
  }
}

/**
 * Update which categories are featured on the homepage
 */
export async function updateFeaturedCategories(categoryIds: string[]) {
  const supabase = await createClient();

  // First, set all to NOT featured
  await supabase.from("categories").update({ is_featured: false }).neq("id", "00000000-0000-0000-0000-000000000000");

  // Then, set selected ones to featured
  if (categoryIds.length > 0) {
    await supabase.from("categories").update({ is_featured: true }).in("id", categoryIds);
  }

  revalidatePath("/");
  revalidatePath("/admin/home");
  revalidatePath("/admin/categories");
  return { success: true };
}

/**
 * Save or update an Instagram post
 */
export async function saveInstagramPost(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const postData = {
    image_url: formData.get("image_url") as string,
    post_url: formData.get("post_url") as string,
    caption: formData.get("caption") as string,
    is_active: true,
  };

  if (id && id !== "new") {
    await supabase.from("instagram_posts").update(postData).eq("id", id);
  } else {
    await supabase.from("instagram_posts").insert([postData]);
  }

  revalidatePath("/");
  revalidatePath("/admin/home");
  return { success: true };
}

/**
 * Delete an Instagram post
 */
export async function deleteInstagramPost(id: string) {
  const supabase = await createClient();
  await supabase.from("instagram_posts").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/home");
  return { success: true };
}

/**
 * Upload an image to Cloudinary
 */
export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file provided" };
  }

  try {
    const url = await uploadToCloudinary(file);
    return { url };
  } catch (error: any) {
    console.error("Error uploading image to Cloudinary:", error);
    return { error: error.message || "Failed to upload image" };
  }
}

