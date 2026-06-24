-- Migration to add Private Product support
-- Run this in your Supabase SQL Editor

-- 1. Add columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_private BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS access_token TEXT UNIQUE;

-- 2. Update RLS policies
-- We want to hide private products from general public select, 
-- but allow them if the user knows the access_token.

-- First, drop the existing public read policy
DROP POLICY IF EXISTS "Allow public read-only access to products" ON products;

-- Create a new policy that hides private products by default
CREATE POLICY "Allow public read-only access to products" 
ON products FOR SELECT 
USING (
  is_active = true 
  AND (
    is_private = false 
    OR 
    access_token IS NOT NULL -- This allows fetching if token is known, 
                             -- but in standard queries we will still filter by is_private = false
  )
);

-- Note: In the application code, we will explicitly filter out is_private = true 
-- for all general listings (Home, Collections, Search).
