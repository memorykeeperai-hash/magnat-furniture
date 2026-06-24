-- ============================================
-- MAGNAT FURNITURE — DATABASE SCHEMA
-- ============================================

-- Enable pgcrypto for UUID generation
create extension if not exists pgcrypto;

-- 1. CATEGORIES
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  base_category text,
  slug text unique not null,
  description text,
  image_url text,
  sort_order int default 0,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 2. PRODUCTS
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  short_description text,
  category_id uuid references categories(id) on delete set null,
  images text[] default '{}',              -- Array of image URLs
  features text[] default '{}',            -- Array of feature strings
  specifications jsonb default '[]',       -- JSON array of {label, value}
  price text,
  delivery_time text,
  material text,
  badge text,
  room text,                               -- Room type: Living Room, Dining Room, Bedroom, Office
  is_new boolean default false,
  is_bestseller boolean default false,
  type text,
  is_featured boolean default false,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3. TESTIMONIALS
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_image text,
  client_role text,
  quote text not null,
  rating int default 5 check (rating >= 1 and rating <= 5),
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 4. HERO SLIDES
create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  mobile_image_url text,
  alt_text text,
  heading text not null,
  description text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 5. PROCESS STEPS (How It Works)
create table if not exists process_steps (
  id uuid primary key default gen_random_uuid(),
  step_number text not null,
  label text not null,
  title text not null,
  description text,
  tag text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 6. FEATURED ITEMS (HomeCollection carousel)
create table if not exists featured_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  subtitle text,
  image_url text not null,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 7. HOMEPAGE SECTIONS (CMS)
create table if not exists homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text unique not null,   -- e.g. 'hero', 'banner', 'experience'
  title text,
  subtitle text,
  description text,
  image_url text,
  mobile_image_url text,
  cta_text text,
  cta_url text,
  is_active boolean default true,
  updated_at timestamptz default now()
);

-- 8. CLIENT LOGOS
create table if not exists client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 9. INSTAGRAM CONTENT
create table if not exists instagram_posts (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  post_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 10. INQUIRIES (LEAD GENERATION)
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  subject text,
  message text,
  interest_category text,
  product_id uuid references products(id) on delete set null,
  status text default 'new' check (status in ('new', 'contacted', 'resolved', 'archived')),
  created_at timestamptz default now()
);

-- 11. SITE VISITS (Analytics)
create table if not exists site_visits (
  id uuid primary key default gen_random_uuid(),
  path text,
  user_agent text,
  created_at timestamptz default now()
);

-- ============================================
-- STORAGE BUCKETS (Manual Setup via UI)
-- ============================================
-- Create 'products' bucket
-- Create 'categories' bucket
-- Create 'media' bucket

-- ============================================
-- RLS POLICIES (Row Level Security)
-- ============================================

-- Categories: Public Read, Auth Write
alter table categories enable row level security;
create policy "Allow public read-only access to categories" on categories for select using (true);
create policy "Allow auth admin full access to categories" on categories for all using (auth.role() = 'authenticated');

-- Products: Public Read, Auth Write
alter table products enable row level security;
create policy "Allow public read-only access to products" on products for select using (is_active = true);
create policy "Allow auth admin full access to products" on products for all using (auth.role() = 'authenticated');

-- Testimonials: Public Read, Auth Write
alter table testimonials enable row level security;
create policy "Allow public read-only access to testimonials" on testimonials for select using (is_active = true);
create policy "Allow auth admin full access to testimonials" on testimonials for all using (auth.role() = 'authenticated');

-- Hero Slides: Public Read, Auth Write
alter table hero_slides enable row level security;
create policy "Allow public read-only access to hero_slides" on hero_slides for select using (is_active = true);
create policy "Allow auth admin full access to hero_slides" on hero_slides for all using (auth.role() = 'authenticated');

-- Process Steps: Public Read, Auth Write
alter table process_steps enable row level security;
create policy "Allow public read-only access to process_steps" on process_steps for select using (true);
create policy "Allow auth admin full access to process_steps" on process_steps for all using (auth.role() = 'authenticated');

-- Featured Items: Public Read, Auth Write
alter table featured_items enable row level security;
create policy "Allow public read-only access to featured_items" on featured_items for select using (is_active = true);
create policy "Allow auth admin full access to featured_items" on featured_items for all using (auth.role() = 'authenticated');

-- Homepage Sections: Public Read, Auth Write
alter table homepage_sections enable row level security;
create policy "Allow public read-only access to homepage_sections" on homepage_sections for select using (is_active = true);
create policy "Allow auth admin full access to homepage_sections" on homepage_sections for all using (auth.role() = 'authenticated');

-- Client Logos: Public Read, Auth Write
alter table client_logos enable row level security;
create policy "Allow public read-only access to client_logos" on client_logos for select using (is_active = true);
create policy "Allow auth admin full access to client_logos" on client_logos for all using (auth.role() = 'authenticated');

-- Instagram Posts: Public Read, Auth Write
alter table instagram_posts enable row level security;
create policy "Allow public read-only access to instagram_posts" on instagram_posts for select using (is_active = true);
create policy "Allow auth admin full access to instagram_posts" on instagram_posts for all using (auth.role() = 'authenticated');

-- Inquiries: Auth Insert (from form), Auth Read/Write (from dashboard)
alter table inquiries enable row level security;
create policy "Allow anyone to insert inquiries" on inquiries for insert with check (true);
create policy "Allow auth admin full access to inquiries" on inquiries for all using (auth.role() = 'authenticated');

-- Site Visits: Public Insert, Auth Read
alter table site_visits enable row level security;
create policy "Allow public to log visits" on site_visits for insert with check (true);
create policy "Allow auth admin full access to site_visits" on site_visits for all using (auth.role() = 'authenticated');
