"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Pick<Product, 'name' | 'slug' | 'images'> & Partial<Product>;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const {
    slug,
    name,
    description,
    short_description,
    images,
    material,
    categories,
    badge,
    is_new,
    is_bestseller,
    price
  } = product;

  // Handle both possible sources of images and description
  const mainImage = images?.[0] || "/images/placeholder-furniture.jpg";
  const hoverImage = images?.[1];
  const displayDescription = short_description || description;
  const displayLabel = material || categories?.name;
  const displayBadge = badge || (is_new ? "New Arrival" : is_bestseller ? "Best Seller" : null);

  const isSofa = 
    categories?.base_category?.toLowerCase().includes("sofa") ||
    categories?.slug?.toLowerCase().includes("sofa") ||
    categories?.name?.toLowerCase().includes("sofa") ||
    name?.toLowerCase().includes("sofa") ||
    slug?.toLowerCase().includes("sofa");

  return (
    <Link href={`/products/${slug}`} className="block h-full no-underline">
      <article
        className="
          group relative bg-white flex flex-col overflow-hidden cursor-pointer
          border border-[#e8e4e0]
          rounded-[2px]
          transition-all duration-500 ease-out
          hover:-translate-y-[3px]
          hover:shadow-[0_24px_64px_rgba(17,17,17,0.12)]
          hover:border-[#d4cfc9]
          h-full
        "
      >

      {/* ── Image Container ── */}
      <div
        className={`relative w-full overflow-hidden flex-shrink-0 transition-colors duration-500 ${
          isSofa ? "bg-white" : "bg-[#f5f3f0]"
        }`}
        style={{ aspectRatio: "4/3" }}
      >
        <Image
          src={mainImage}
          alt={`${name} — MAGNAT Furniture`}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={`transition-all duration-700 ease-out group-hover:scale-[1.02] ${
            isSofa ? "object-contain p-2" : "object-cover"
          }`}
          priority={false}
        />

        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${name} (Alternative view) — MAGNAT Furniture`}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-[1.02] ${
              isSofa ? "object-contain p-2" : "object-cover"
            }`}
            priority={false}
          />
        )}

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Badge */}
        {displayBadge && (
          <div className="absolute top-1.5 left-1.5 sm:top-4 sm:left-4 z-10">
            <span className="
              inline-block bg-[#111] text-white
              text-[7.5px] font-bold tracking-[0.1em] uppercase
              px-1.5 py-0.5 rounded-[1px]
              sm:text-[8px] sm:tracking-[0.22em] sm:px-2.5 sm:py-1 sm:rounded-[2px]
            ">
              {displayBadge}
            </span>
          </div>
        )}
      </div>

      {/* ── Thin accent line ── */}
      <div className="h-[2px] w-0 bg-[#C0001A] group-hover:w-full transition-all duration-500 ease-out" />

      {/* ── Content Area ── */}
      <div className="
        flex flex-col flex-1
        px-3 pt-3.5 pb-4
        sm:px-6 sm:pt-5 sm:pb-6
      ">

        {/* Label (Material or Category) */}
        {displayLabel && (
          <span className="
            block mb-1 text-[8px] font-bold tracking-[0.2em] uppercase text-[#C0001A]
            sm:text-[9px] sm:tracking-[0.28em] sm:mb-2
          ">
            {displayLabel}
          </span>
        )}

        {/* Product Name */}
        <h3 className="
          font-semibold leading-tight text-[#111] mb-1.5
          text-[13px]
          sm:text-[1.05rem]
          transition-colors duration-300 group-hover:text-[#111]
          tracking-tight
          line-clamp-2
        ">
          {name}
        </h3>

        {/* Divider */}
        <div className="hidden sm:block w-8 h-px bg-[#ddd] mb-3" />

        {/* Description */}
        {displayDescription && (
          <p className="
            hidden sm:line-clamp-2 text-[#888] leading-relaxed mb-4 flex-1
            text-[0.825rem]
          ">
            {displayDescription}
          </p>
        )}

        {/* CTA Button */}
        <div className="mt-auto pt-3 sm:pt-4">
          <div
            className="
              w-full inline-flex items-center justify-center gap-1.5
              bg-[#111] text-white
              text-[9px] font-bold tracking-[0.12em] uppercase
              px-2 py-2
              rounded-[2px]
              no-underline
              transition-all duration-300
              hover:bg-[#C0001A]
              active:scale-[0.98]
              sm:py-3 sm:px-5 sm:text-[10px] sm:tracking-[0.2em] sm:gap-2
              group/btn
            "
          >
            <span>Details</span>
            <ArrowRight
              size={12}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 sm:size-[13px]"
            />
          </div>
        </div>
      </div>
      </article>
    </Link>
  );
}