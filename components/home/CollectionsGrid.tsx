"use client";

import { motion } from "framer-motion";
import FadeInView from "@/components/ui/FadeInView";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const collections = [
  {
    id: 1,
    title: "Sofas",
    brand: "Natuzzi · Flexform · Minotti",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: 2,
    title: "Sectionals",
    brand: "Poliform · Cassina",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=900&auto=format&fit=crop",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    id: 3,
    title: "Armchairs",
    brand: "Walter Knoll · Flexform",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=900&auto=format&fit=crop",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 4,
    title: "Curtains & Drapes",
    brand: "Soft Furnishings",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=900&auto=format&fit=crop",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 5,
    title: "Showroom Picks",
    brand: "Curated Exclusives",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?q=80&w=1400&auto=format&fit=crop",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: 6,
    title: "Dining & Office",
    brand: "Contemporary Living",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1400&auto=format&fit=crop",
    colSpan: 2,
    rowSpan: 1,
  },
];

export default function CollectionsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 120);
          });
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FCFCFC] py-12 md:py-20 overflow-hidden">
      <div className="max-container px-4">
        <SectionHeading 
          label="Our Collections"
          titlePart1="Curated"
          titlePart2="Collections"
          subtitle="Explore our diverse range of furniture collections, each designed with structural integrity and timeless aesthetic appeal."
          className="mb-10 md:mb-16"
        />
      </div>

      {/* ── Desktop Masonry Grid (≥lg) ── */}
      <div
        className="hidden lg:grid gap-[2px]"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "280px",
        }}
      >
        {collections.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="collection-card relative block overflow-hidden"
            style={{
              gridColumn: `span ${item.colSpan}`,
              gridRow: `span ${item.rowSpan}`,
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width:1200px) 50vw, 25vw"
              className="collection-card-img"
            />
            <div className="collection-card-overlay" />

            {/* Always-visible label */}
            <div className="absolute top-4 left-4 z-10">
              <span
                className="text-white/90 text-[9px] font-semibold tracking-[0.3em] uppercase bg-[#1a1a1a]/40 backdrop-blur-sm px-3 py-1.5"
                
              >
                {item.title}
              </span>
            </div>

            {/* Hover info */}
            <div className="collection-card-info z-10">
              <p
                className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase mb-1 font-semibold"
                
              >
                {item.brand}
              </p>
              <p
                className="text-white text-xl font-semibold leading-snug mb-3"
                
              >
                {item.title}
              </p>
              <span
                className="inline-flex items-center gap-2 text-[#c9a96e] text-[9px] font-bold tracking-[0.25em] uppercase"
                
              >
                View Collection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Mobile / Tablet Grid (< lg) ── */}
      <div className="lg:hidden grid grid-cols-2 gap-[2px]">
        {collections.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="collection-card relative block overflow-hidden aspect-square"
            style={
              item.colSpan === 2
                ? { gridColumn: "span 2", aspectRatio: "16/7" }
                : {}
            }
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="50vw"
              className="collection-card-img"
            />
            <div className="collection-card-overlay" />

            <div className="absolute top-3 left-3 z-10">
              <span
                className="text-white/90 text-[8px] font-semibold tracking-[0.25em] uppercase bg-[#1a1a1a]/40 backdrop-blur-sm px-2.5 py-1"
                
              >
                {item.title}
              </span>
            </div>

            <div className="collection-card-info z-10">
              <p
                className="text-white text-base font-semibold leading-snug mb-2"
                
              >
                {item.title}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-[#c9a96e] text-[8px] font-bold tracking-[0.2em] uppercase"
                
              >
                View →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10 px-6">
        <Link href="/products" className="btn-gold-outline">
          Explore All Collections
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
