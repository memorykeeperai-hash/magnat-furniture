"use client";

import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";
import Link from "next/link";

const featuredProducts = [
  {
    id: "1",
    name: "Classic Velvet Sofa",
    slug: "classic-velvet-sofa",
    short_description: "Deep-tufted velvet upholstery with walnut-finished solid wood legs. A masterpiece of comfort.",
    images: ["https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2070&auto=format&fit=crop"],
  },
  {
    id: "2",
    name: "Scandinavian Oak Dining",
    slug: "oak-dining-table",
    short_description: "Minimalist dining table crafted from sustainably sourced European White Oak. Seats up to 8.",
    images: ["https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=2070&auto=format&fit=crop"],
  },
  {
    id: "3",
    name: "Empiric Leather Armchair",
    slug: "leather-armchair",
    short_description: "Top-grain Italian leather with hand-stitched detailing. Ergonomic design for ultimate leisure.",
    images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop"],
  },
  {
    id: "4",
    name: "Heritage Canopy Bed",
    slug: "heritage-canopy-bed",
    short_description: "Architectural metal framing with a plush upholstered headboard. The center-piece of your sanctuary.",
    images: ["https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2070&auto=format&fit=crop"],
  },
];

export default function ProductShowcase() {
  return (
    <section className="bg-[#f5f2ee] py-24 lg:py-32 border-t border-[#f0f0f0]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-10">
          <FadeInView className="max-w-2xl">
            <span className="text-[#c9a96e] text-[9px] font-bold tracking-[0.45em] uppercase mb-4 block" >
              Selected Works
            </span>
            <h2 className="text-[#1a1a1a] leading-[1.1] mb-6" style={{  fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)", fontWeight: 600 }}>
              The Art of <br />
              <span className="italic">Lived Comfort</span>
            </h2>
            <div className="w-16 h-[1px] bg-[#c9a96e] mb-6" />
            <p className="text-[#1a1a1a]/55 text-sm leading-relaxed max-w-md font-light" >
              Explore our most iconic pieces, each representing the intersection of artistic form and rigorous engineering.
            </p>
          </FadeInView>

          <FadeInView delay={0.3}>
            <Link href="/products" className="flex items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase text-[#111] hover:text-[#C0001A] transition-all group">
              Shop All Pieces
              <div className="w-12 h-[1px] bg-black/10 group-hover:bg-[#C0001A] group-hover:w-16 transition-all" />
            </Link>
          </FadeInView>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {featuredProducts.map((product, index) => (
            <FadeInView key={product.id} delay={0.1 * index}>
              <ProductCard product={product} />
            </FadeInView>
          ))}
        </div>
        
      </div>
    </section>
  );
}
