// components/products/ProductListWithFilter.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Filter, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/lib/types";
import FilterSection from "./FilterSection";

interface ProductListWithFilterProps {
  initialProducts: Product[];
  category: string;
}

export default function ProductListWithFilter({
  initialProducts,
  category,
}: ProductListWithFilterProps) {
  const [activeType, setActiveType] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Navbar Sync States
  const [scrolled, setScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const { scrollY } = useScroll();

  // Replicate Navbar visibility logic for sync
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Scrolled state
    setScrolled(latest > 20);

    // Hide on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setIsNavbarVisible(false);
    } else if (latest < previous) {
      setIsNavbarVisible(true);
    }

    // Always show at the very top
    if (latest < 50) {
      setIsNavbarVisible(true);
    }
  });

  // Lock scroll when filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  // Extract unique types for the filter
  const uniqueTypes = useMemo(() => {
    const types = initialProducts
      .map((p) => p.type)
      .filter((t): t is string => !!t);
    return Array.from(new Set(types)).sort();
  }, [initialProducts]);

  // Filter products based on activeType
  const filteredProducts = useMemo(() => {
    if (activeType === "All") return initialProducts;
    return initialProducts.filter((p) => p.type === activeType);
  }, [activeType, initialProducts]);

  // Dynamic Sticky Offset
  // Navbar Scrolled Height = 80px (top-20)
  // Navbar Initial Height = 136px (top-[136px])
  const stickyTop = isNavbarVisible
    ? (scrolled ? "80px" : "136px")
    : "0px";

  return (
    <>
      {/* Count Bar (Dynamic Sticky) */}
      <motion.div
        animate={{ top: stickyTop }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="z-40 bg-white border-b mt-[-58px] md:mt-0 border-[#f0f0f0] py-5 max-sm:py-4 shadow-sm"
      >
        <div className="max-container">
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-[0.1em] uppercase text-[#666] m-0">
              Showing <strong className="text-[#111]">{filteredProducts.length} {category.toLowerCase()}</strong>
              {activeType !== "All" && (
                <span className="hidden sm:inline"> — Filtered by <strong className="text-[#C0001A]">{activeType}</strong></span>
              )}
            </p>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="group flex items-center gap-2 px-4 py-2 hover:text-[#C0001A] transition-all duration-300"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                Filter
              </span>
              <Filter size={14} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {activeType !== "All" && (
            <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[9px] uppercase tracking-widest text-[#999] whitespace-nowrap">Active Filter:</span>
              <div className="flex items-center gap-1.5 bg-[#f9f9f9] border border-[#f0f0f0] px-3 py-1 rounded-full">
                <span className="text-[9px] font-bold uppercase text-[#C0001A]">{activeType}</span>
                <button onClick={() => setActiveType("All")} className="text-[#999] hover:text-[#C0001A]">
                  <X size={10} />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Filter Sidebar Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-[#111]/40 backdrop-blur-sm z-[100]"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-[400px] bg-white z-[101] shadow-2xl"
            >
              <FilterSection
                types={uniqueTypes}
                activeType={activeType}
                onTypeChange={(type) => {
                  setActiveType(type);
                  setIsFilterOpen(false);
                }}
                onClose={() => setIsFilterOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <section className="pt-5 pb-12  min-h-[400px]">

        <div className="max-container">
          <motion.div
            layout
            className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 max-sm:gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[#666]">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
