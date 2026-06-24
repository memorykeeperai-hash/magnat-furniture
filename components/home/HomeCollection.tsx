"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FeaturedItem } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInView from "@/components/ui/FadeInView";

const FALLBACK_PRODUCTS: FeaturedItem[] = [
  {
    id: "1",
    category: "Living Area",
    name: "Nordic Chair",
    subtitle: "A stylish and comfortable Nordic chair designed with minimal aesthetics.",
    image_url: "/images/singlesofa.png",
    sort_order: 0,
    is_active: true
  },
  {
    id: "2",
    category: "Living Area",
    name: "Skyline Sofa",
    subtitle:
      "A premium skyline sofa offering superior comfort and elegant design, ideal for relaxing and entertaining guests.",
    image_url: "/images/singlesofa4.png",
    sort_order: 1,
    is_active: true
  },
  {
    id: "3",
    category: "Living Area",
    name: "Bloom Sofa",
    subtitle:
      "A cozy and compact bloom sofa that blends softness with contemporary design for small and large spaces.",
    image_url: "/images/singlesofa3.png",
    sort_order: 2,
    is_active: true
  },
  {
    id: "4",
    category: "Bedroom",
    name: "Luna Armchair",
    subtitle:
      "A luxurious armchair crafted for bedroom comfort, featuring soft cushioning and a sleek modern look.",
    image_url: "/images/sofa3d1.png",
    sort_order: 3,
    is_active: true
  },
  {
    id: "5",
    category: "Office",
    name: "Crest Desk Chair",
    subtitle:
      "An ergonomic office chair designed for long working hours, providing excellent back support and comfort.",
    image_url: "/images/chair.png",
    sort_order: 4,
    is_active: true
  },
];

const CARD_GAP = 32;

// Always show 3 cards on tablet and above
const getCardWidth = () => {
  if (typeof window === "undefined") return 300;
  if (window.innerWidth < 640) return Math.min(window.innerWidth - 48, 320); // mobile: near full width
  if (window.innerWidth < 1024) return 240; // tablet: 3 cards
  return 300; // desktop: 3 cards
};

const getVisibleCount = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1; // mobile: 1 card
  return 3; // tablet + desktop: always 3
};

export default function FurnitureCarousel({ items }: { items?: FeaturedItem[] }) {
  const activeProducts = items && items.length > 0 ? items : FALLBACK_PRODUCTS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Touch/swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth());
      setVisibleCount(getVisibleCount());
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (cardWidth === null || visibleCount === null) return null;

  const STEP = cardWidth + CARD_GAP;
  const maxIndex = activeProducts.length - visibleCount;

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  const goTo = (i: number) => setCurrentIndex(i);

  // Touch handlers for swipe (mobile only)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      if (delta > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getTransform = (isCenter: boolean, index: number) => {
    // On mobile, all visible cards treated the same
    if (isMobile) return "scale(1)";
    const isHovered = hoveredIndex === index;
    if (isCenter) return isHovered ? "scale(1.05)" : "scale(1)";
    return isHovered ? "scale(0.95)" : "scale(0.9)";
  };

  const getCardHeight = (isCenter: boolean) => {
    if (isMobile) return "480px";
    return isCenter ? "500px" : "450px";
  };

  return (
    <section className="bg-[#FCFCFC] py-12 md:py-24 px-4 overflow-hidden border-t border-gray-100">
      <div className="max-container">
        <SectionHeading 
          label="Featured Masterpieces"
          titlePart1="The Signature"
          titlePart2="Selection"
          subtitle="A curated selection of our most-loved pieces, ready for your home. Crafted with precision and an eye for enduring style."
          className=""
        />
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-[1100px] mx-auto flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="absolute -left-2 sm:-left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 !bg-[#C0001A] text-white rounded-full flex items-center justify-center shadow-2xl disabled:opacity-20 hover:scale-110 transition-all duration-300 active:scale-90"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Slider Viewport */}
        <div
          className="overflow-hidden py-12"
          style={{
            width: isMobile
              ? `${cardWidth}px`
              : `${cardWidth * visibleCount + CARD_GAP * (visibleCount - 1)}px`,
          }}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchMove={isMobile ? handleTouchMove : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          <div
            className="flex items-end will-change-transform"
            style={{
              gap: `${CARD_GAP}px`,
              transform: `translateX(-${currentIndex * STEP}px)`,
              transition: "transform 0.6s cubic-bezier(0.2, 0, 0.2, 1)",
            }}
          >
            {activeProducts.map((product, index) => {
              const relIndex = index - currentIndex;
              const isCenter = isMobile
                ? relIndex === 0
                : relIndex === Math.floor(visibleCount / 2);
              const isVisible = relIndex >= 0 && relIndex < visibleCount;

              return (
                <div
                  key={product.id}
                  className="relative flex flex-col items-center justify-end flex-shrink-0 cursor-pointer group"
                  style={{
                    width: `${cardWidth}px`,
                    height: getCardHeight(isCenter),
                    opacity: isVisible ? 1 : 0.2,
                    transform: getTransform(isCenter, index),
                    transformOrigin: "bottom center",
                    zIndex: isCenter ? 20 : 10,
                    transition:
                      "transform 0.5s ease-out, opacity 0.5s ease-out",
                  }}
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                >
                  {/* Image & Badges */}
                  <div
                    className="absolute w-full z-20 flex items-center justify-center pointer-events-none"
                    style={{
                      top: 0,
                      height: isCenter ? "260px" : "260px",
                    }}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="max-h-full max-w-[95%] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] mx-auto transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Badge Logic */}
                    {(product.is_bestseller || product.is_new) && (
                      <div className="absolute top-4 left-6 z-30 flex flex-col gap-1">
                        {product.is_bestseller && (
                          <span className="bg-[#C0001A] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-lg">
                            Best Seller
                          </span>
                        )}
                        {product.is_new && (
                          <span className="bg-[#111] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-lg">
                            New Arrival
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Box */}
                  <div
                    className="bg-white w-full h-[65%] md:h-[70%] rounded-3xl shadow  flex flex-col justify-center transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center relative overflow-hidden"
                    style={{ paddingTop: "60px" }}
                  >
                    {/* Subtle Background Accent */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C0001A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                    <div className="flex flex-col pt-16 h-full justify-between pb-8">
                      <div className="px-6 ">
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C0001A] font-bold mb-1">
                          {product.category || "Luxury Furniture"}
                        </span>
                        <h3 className="text-xl font-bold text-[#111] leading-tight group-hover:text-[#C0001A] transition-colors">
                          {product.name}
                        </h3>
                        <p
                          className="text-sm text-gray-400 mt-3 line-clamp-2 overflow-hidden mx-auto max-w-[220px] font-light leading-relaxed"
                        >
                          {product.subtitle}
                        </p>
                      </div>
                      
                      <div className="px-10 mt-6 transition-all duration-300">
                        <Link 
                          href={product.slug ? `/products/${product.slug}` : "#"}
                          className="block w-full py-3.5 bg-[#111] text-white text-[11px] uppercase font-bold tracking-widest rounded-full transition-all hover:bg-[#C0001A] shadow-xl hover:shadow-[#C0001A]/20"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          disabled={currentIndex >= maxIndex}
          className="absolute -right-2 sm:-right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 !bg-[#C0001A] text-white rounded-full flex items-center justify-center shadow-2xl disabled:opacity-20 hover:scale-110 transition-all duration-300 active:scale-90"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full h-1 ${i === currentIndex ? "w-2 bg-[#C0001A]" : "w-2 bg-gray-300"
              }`}
          />
        ))}
      </div>
    </section>
  );
}