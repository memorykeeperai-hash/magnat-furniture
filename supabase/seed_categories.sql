-- Seed Core Categories for Magnat Admin & Frontend Sync

INSERT INTO categories (name, slug, description, image_url, sort_order, is_featured, is_active) 
VALUES 
  ('Classic Sofas', 'sofas', 'Premium sofas designed for unmatched comfort and style.', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop', 0, true, true),
  ('Premium Curtains', 'curtains', 'Elegant drapery and precision-crafted blinds.', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop', 1, true, true),
  ('Dining Sets', 'dining-sets', 'Masterfully crafted tables and dining chairs.', 'https://images.unsplash.com/photo-1617806118233-1ec365ba409e?q=80&w=2000&auto=format&fit=crop', 2, true, true),
  ('Lounge Chairs', 'chairs', 'Architectural excellence translated into seating.', 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=2000&auto=format&fit=crop', 3, true, true),
  ('Bespoke Interiors', 'interiors', 'End-to-end luxury architectural projects.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', 4, true, true),
  ('Bedroom Suites', 'bedroom', 'Beds, nightstands, and wardrobes for serenity.', 'https://images.unsplash.com/photo-1505693419148-de1967a93fb4?q=80&w=2000&auto=format&fit=crop', 5, true, true)
ON CONFLICT (slug) 
DO UPDATE SET 
  is_featured = EXCLUDED.is_featured,
  image_url = EXCLUDED.image_url;
