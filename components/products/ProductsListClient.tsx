"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";
import { Search, SlidersHorizontal, Grid3x3, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Categories, Product } from "@/lib/types";

interface ProductsListClientProps {
  initialProducts: Product[];
  categories: Categories[];
}

export default function ProductsListClient({ initialProducts, categories }: ProductsListClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Products";
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sync state with URL parameter changes
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const categoryNames = ["All Products", ...Array.from(new Set(categories.map(c => c.base_category).filter((c): c is string => !!c)))];
  const sortOptions = ["Featured", "Newest First", "Price: Low to High", "Price: High to Low", "Best Sellers"];

  const filteredProducts = initialProducts.filter(p => {
    const matchesCategory = activeCategory === "All Products" || p.categories?.base_category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    return matchesCategory && matchesSearch;
  });

  // Parse a price string like "₹1,85,000" → 185000 for numeric sorting
  const parsePrice = (price: string | null | undefined): number => {
    if (!price) return 0;
    return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
  };

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Newest First": return (b.created_at || "").localeCompare(a.created_at || "");
      case "Price: Low to High": return parsePrice(a.price) - parsePrice(b.price);
      case "Price: High to Low": return parsePrice(b.price) - parsePrice(a.price);
      case "Best Sellers": return a.is_bestseller === b.is_bestseller ? 0 : a.is_bestseller ? -1 : 1;
      default: return 0;
    }
  });

  return (
    <>
      {/* Search & Filter Bar */}
      <section className="sticky top-20 z-40 bg-white/98 backdrop-blur-xl border-b border-[#eeeeee] shadow-sm">
        <div className="max-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-b border-[#eeeeee]/50">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]" size={18} />
              <input
                type="text"
                placeholder="Search by name or material..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#eeeeee] rounded-lg text-sm focus:outline-none focus:border-[#C0001A] transition-colors"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-[#eeeeee] rounded-lg text-xs font-medium uppercase tracking-wider focus:outline-none focus:border-[#C0001A] transition-colors cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <div className="flex items-center gap-2 p-1 bg-[#f9f9f9] rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-[#C0001A]" : "text-[#666666] hover:text-[#111111]"
                    }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`p-2 rounded transition-colors ${viewMode === "compact" ? "bg-white shadow-sm text-[#C0001A]" : "text-[#666666] hover:text-[#111111]"
                    }`}
                  aria-label="Compact view"
                >
                  <Grid3x3 size={18} />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-3 border border-[#eeeeee] rounded-lg hover:border-[#C0001A] transition-colors"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center gap-6 py-6 overflow-x-auto no-scrollbar">
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative text-xs font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap pb-2 group ${activeCategory === cat ? "text-[#111111]" : "text-[#666666] hover:text-[#111111]"
                    }`}

                >
                  {cat}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#C0001A] transition-all duration-300 ${activeCategory === cat ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                </button>
              ))}
            </div>
          </div>

          {(searchTerm || activeCategory !== "All Products" || sortBy !== "Featured") && (
            <div className="flex flex-wrap items-center gap-2 py-3 border-t border-[#eeeeee]/50">
              <span className="text-xs text-[#666666] uppercase tracking-wider">Active:</span>
              {activeCategory !== "All Products" && (
                <span className="px-3 py-1 bg-[#C0001A]/10 text-[#C0001A] text-xs rounded-full flex items-center gap-2">
                  {activeCategory}
                  <button onClick={() => setActiveCategory("All Products")} className="hover:text-[#111111]">×</button>
                </span>
              )}
              {searchTerm && (
                <span className="px-3 py-1 bg-[#C0001A]/10 text-[#C0001A] text-xs rounded-full flex items-center gap-2">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="hover:text-[#111111]">×</button>
                </span>
              )}
              {sortBy !== "Featured" && (
                <span className="px-3 py-1 bg-[#f9f9f9] text-[#666666] text-xs rounded-full">
                  Sorted by: {sortBy}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-container">
          <FadeInView>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-[#666666]">
                Showing <span className="font-semibold text-[#111111]">{sortedProducts.length}</span> of {initialProducts.length} pieces
              </p>
            </div>
          </FadeInView>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchTerm + viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`grid gap-x-8 gap-y-16 ${viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                }`}
            >
              {sortedProducts.map((product, index) => (
                <FadeInView key={product.slug} delay={index * 0.05}>
                  <ProductCard product={product} compact={viewMode === "compact"} />
                </FadeInView>
              ))}
            </motion.div>
          </AnimatePresence>

          {sortedProducts.length === 0 && (
            <FadeInView>
              <div className="py-32 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f9f9f9] flex items-center justify-center">
                  <Search className="text-[#666666]" size={28} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  No pieces found
                </h3>
                <p className="text-[#666666] mb-8 max-w-md mx-auto">
                  We couldn't find any pieces matching your search. Try adjusting your filters or contact us for custom manufacturing.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All Products");
                    setSearchTerm("");
                    setSortBy("Featured");
                  }}
                  className="btn-ghost-dark"
                >
                  Reset Filters
                </button>
              </div>
            </FadeInView>
          )}
        </div>
      </section>
    </>
  );
}
