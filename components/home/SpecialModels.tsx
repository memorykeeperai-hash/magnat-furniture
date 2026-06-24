"use client";

import { useRef } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Categories, HomepageSection } from "@/lib/types";

/* ── Fallback Data (Functional & Premium) ── */
const FALLBACK_ITEMS: Categories[] = [
  { id: "fb1", name: "Luxury Seating", slug: "sofas", image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop", description: null, is_featured: true, sort_order: 0, created_at: "", base_category: null },
  { id: "fb2", name: "Designer Armchairs", slug: "chairs", image_url: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=800&auto=format&fit=crop", description: null, is_featured: true, sort_order: 1, created_at: "", base_category: null },
  { id: "fb3", name: "Signature Window Drapery", slug: "curtains", image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop", description: null, is_featured: true, sort_order: 2, created_at: "", base_category: null },
  { id: "fb4", name: "Elegant Dining Sets", slug: "dining", image_url: "https://images.unsplash.com/photo-1617806118233-1ec365ba409e?q=80&w=800&auto=format&fit=crop", description: null, is_featured: true, sort_order: 3, created_at: "", base_category: null },
  { id: "fb5", name: "Modern Bedroom Suites", slug: "bedroom", image_url: "https://images.unsplash.com/photo-1505693419148-de1967a93fb4?q=80&w=800&auto=format&fit=crop", description: null, is_featured: true, sort_order: 4, created_at: "", base_category: null },
];

function CategoryCard({ cat }: { cat: Categories }) {
  // Map specific slugs to high-quality Unsplash placeholders if image_url is missing
  const getPlaceholder = (slug: string) => {
    const placeholders: Record<string, string> = {
      sofas: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
      chairs: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?q=80&w=800&auto=format&fit=crop",
      curtains: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
      dining: "https://images.unsplash.com/photo-1617806118233-1ec365ba409e?q=80&w=800&auto=format&fit=crop",
      bedroom: "https://images.unsplash.com/photo-1505693419148-de1967a93fb4?q=80&w=800&auto=format&fit=crop",
    };
    return placeholders[slug.toLowerCase()] || "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop";
  };

  const displayImage = cat.image_url || getPlaceholder(cat.slug);

  const getCategoryUrl = (cat: Categories) => {
    const slug = cat.slug.toLowerCase();
    if (slug === "sofas") return "/products/sofas";
    if (slug === "curtains") return "/products/curtains";
    if (slug === "chairs") return "/products/chairs";
    if (slug === "dining" || slug === "dining-sets") return "/products/dining";
    
    const categoryFilter = cat.base_category || cat.slug || cat.name;
    return `/products?category=${encodeURIComponent(categoryFilter)}`;
  };

  return (
    <div className="flex-shrink-0 w-[280px] md:w-[320px] group cursor-pointer">
      <Link href={getCategoryUrl(cat)} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-xl">
          <img
            src={displayImage}
            alt={cat.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay Button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
            <span className="bg-white text-[#111] px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-xl">
              View Collection
            </span>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-1 text-center px-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C0001A] font-extrabold">
            {cat.base_category || "Collection"}
          </span>
          <h3 className="text-[19px] md:text-[21px] font-bold text-[#111] leading-[1.2] group-hover:text-[#C0001A] transition-colors mt-1 mx-auto max-w-full truncate-none">
            {cat.name}
          </h3>
          <button className="mt-3 text-[12px] font-bold text-gray-400 border-b border-gray-200 pb-1 uppercase tracking-widest group-hover:text-[#111] group-hover:border-[#C0001A] transition-all md:hidden">
            View Collection
          </button>
        </div>
      </Link>
    </div>
  );
}

export default function SpecialModels({
  categories,
  section
}: {
  categories?: Categories[],
  section?: HomepageSection
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayItems = (categories && categories.length > 0) ? categories : FALLBACK_ITEMS;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const amount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - amount : scrollLeft + amount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-[#FAF8F6] py-12 md:py-24">
      <div className="max-container px-4">

        {/* 1. Header Area */}
        <div className="text-center mb-6">
          <SectionHeading
            label="Shop by Category"
            titlePart1={section?.title || "Elite Home"}
            titlePart2={section?.subtitle || "Collections"}
          />
        </div>

        {/* 2. The Balanced Description Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 items-center mb-10 md:mb-16">

          {/* LEFT: Subtle Element for Balance (Hidden on Mobile) */}
          <div className="hidden md:flex justify-start items-center">
            <span className="text-[11px] tracking-[0.3em] text-gray-400 uppercase font-medium">
              Explore All
            </span>
          </div>

          {/* CENTER: Description */}
          <div className="md:col-span-3 flex justify-center">
            <p className="text-[15px] md:text-[17px] text-gray-500 max-w-2xl text-center leading-relaxed font-light">
              {section?.description || "Explore our signature collections tailored for every corner of your home, from architectural sofas to serene bedroom suites."}
            </p>
          </div>

          {/* RIGHT: Controls */}
          <div className="hidden md:flex justify-end items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3.5 rounded-full border border-gray-200 bg-white hover:bg-[#111] hover:text-white transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3.5 rounded-full border border-gray-200 bg-white hover:bg-[#111] hover:text-white transition-all active:scale-95 shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* 3. Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayItems.map((cat) => (
            <div key={cat.id} className="snap-start flex-shrink-0">
              <CategoryCard cat={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}