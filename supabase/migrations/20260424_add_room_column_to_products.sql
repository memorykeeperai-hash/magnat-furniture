-- ============================================
-- MIGRATION: Add room column to products table
-- Description: Add a room field to store product room types
--   Allowed values: Living Room, Dining Room, Bedroom, Office
-- ============================================

-- Add room column to products table if it doesn't exist
ALTER TABLE products
ADD COLUMN IF NOT EXISTS room text;

-- Add a comment to document the column
COMMENT ON COLUMN products.room IS 'Room type for the product: Living Room, Dining Room, Bedroom, Office';
