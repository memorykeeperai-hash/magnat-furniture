// ============================================
// MAGNAT FURNITURE — TypeScript Types
// ============================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null | undefined;
  short_description: string | null | undefined;
  category_id: string | null | undefined;
  images: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  price: string | null | undefined;
  delivery_time: string | null | undefined;
  material: string | null | undefined;
  badge: string | null | undefined;
  room: string | null | undefined;
  is_new: boolean;
  is_bestseller: boolean;
  is_active: boolean;
  is_featured: boolean;
  is_private: boolean;
  access_token: string | null | undefined;
  type: string | null | undefined;
  sort_order: number;
  created_at: string;
  categories?: Categories;
}

export interface Categories {
  id: string;
  name: string;
  base_category: string | null;
  slug: string;
  description: string | null | undefined;
  image_url: string | null | undefined;
  sort_order: number;
  is_featured: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_image: string | null;
  client_role: string | null;
  quote: string;
  rating: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface HeroSlide {
  id: string;
  image_url: string;
  mobile_image_url: string | null;
  alt_text: string | null;
  heading: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface ProcessStep {
  id: string;
  step_number: string;
  label: string;
  title: string;
  description: string | null;
  tag: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface FeaturedItem {
  id: string;
  name: string;
  category: string | null;
  slug?: string;
  subtitle: string | null;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  is_new?: boolean;
  is_bestseller?: boolean;
  is_featured?: boolean;
}

export interface HomepageSection {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  mobile_image_url: string | null;
  cta_text: string | null;
  cta_url: string | null;
  is_active: boolean;
  updated_at: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface InstagramPost {
  id: string;
  image_url: string;
  caption: string | null;
  post_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  interest_category: string | null;
  product_id: string | null;
  status: 'pending' | 'contacted' | 'resolved' | 'archived';
  created_at: string;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
