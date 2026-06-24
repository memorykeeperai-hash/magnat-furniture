-- Migration: Add base_category to categories table
ALTER TABLE categories ADD COLUMN IF NOT EXISTS base_category text;

-- Optional: Add a check constraint to ensure base_category is one of the allowed values
-- NOTE: In a real-world scenario, you might want to use an enum, but text is more flexible for this task.
-- ALTER TABLE categories ADD CONSTRAINT categories_base_category_check 
-- CHECK (base_category IN ('chairs', 'sofas', 'tables', 'curtains', 'beds'));
