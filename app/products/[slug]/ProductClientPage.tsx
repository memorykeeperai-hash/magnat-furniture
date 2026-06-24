"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { motion, AnimatePresence } from "framer-motion";
import {
   ArrowLeft, MessageCircle, Heart, Star, ChevronLeft, ChevronRight, ShoppingBag, ArrowRight
} from "lucide-react";

import { Product } from "@/lib/types";

export default function ProductClientPage({
   product,
   relatedProducts
}: {
   product: Product | null;
   relatedProducts: Product[];
}) {
   const router = useRouter();
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const { isFavorite, toggleFavorite } = useFavorites();
   const liked = product ? isFavorite(product.slug) : false;

   if (!product) {
      return (
         <div className="pt-40 pb-32 bg-[#fafaf9] min-h-screen flex flex-col items-center justify-center">
            <FadeInView>
               <div className="text-center max-w-md">
                  <h1 className="text-5xl font-bold text-[#111111] mb-6" >
                     Product Not Found
                  </h1>
                  <p className="text-[#666666] font-light mb-10 leading-relaxed">
                     The product you're looking for is currently unavailable. Browse our curated catalog for other exquisite pieces.
                  </p>
                  <Link href="/products" className="bg-[#111] text-white px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm">
                     Browse All Products
                  </Link>
               </div>
            </FadeInView>
         </div>
      );
   }

   const whatsappMessage = encodeURIComponent(`Hi MAGNAT Furniture, I'm enquiring about the ${product.name}.`);
   const whatsappLink = `https://wa.me/919446516395?text=${whatsappMessage}`;
   const images = product.images && product.images.length > 0 ? product.images : ["/images/placeholder-furniture.jpg"];

   const isSofa = 
      product.categories?.base_category?.toLowerCase().includes("sofa") ||
      product.categories?.slug?.toLowerCase().includes("sofa") ||
      product.categories?.name?.toLowerCase().includes("sofa") ||
      product.name?.toLowerCase().includes("sofa") ||
      product.slug?.toLowerCase().includes("sofa");

   return (
      <div className="bg-white min-h-screen pb-32">

         {/* ── Mobile Standalone Header ── */}


         <div className="max-container pt-4 md:pt-10 px-6 md:px-10 lg:px-16">

            {/* ── Desktop Breadcrumbs ── */}
            <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.05em] text-[#999] mb-12">
               <Link href="/" className="hover:text-[#111] transition-colors">Home</Link>
               <span className="text-[#ccc] px-1">/</span>
               <Link href={`/products?category=${product.categories?.base_category || ""}`} className="hover:text-[#111] transition-colors uppercase tracking-widest">{product.categories?.base_category || 'Collection'}</Link>
               <span className="text-[#ccc] px-1">/</span>
               <span className="text-[#111] font-bold uppercase tracking-widest">{product.name}</span>
            </div>

            {/* ── Main Layout ── */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32">

               {/* ══════ LEFT: Premium Gallery ══════ */}
               <div className="w-full lg:w-[55%] flex flex-col gap-6">

                  {/* Main Image Viewport */}
                  <div className={`relative w-full transition-all duration-500 ${
                     isSofa 
                        ? "aspect-[4/3] md:aspect-[3/2] bg-white border border-[#f0f0f0]" 
                        : "aspect-[4/5] md:aspect-[1.1/1] bg-[#f9f9f8]"
                  } rounded-2xl overflow-hidden group`}>
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={currentImageIndex}
                           initial={{ opacity: 0, scale: 1.05 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.98 }}
                           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                           className="relative w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
                           drag="x"
                           dragConstraints={{ left: 0, right: 0 }}
                           dragElastic={0.6}
                           onDragEnd={(event, info) => {
                              const swipeThreshold = 50; // pixels
                              if (info.offset.x < -swipeThreshold) {
                                 // Swiped left -> next image
                                 setCurrentImageIndex((prev) => (prev + 1) % images.length);
                              } else if (info.offset.x > swipeThreshold) {
                                 // Swiped right -> previous image
                                 setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                              }
                           }}
                        >
                           <Image
                              src={images[currentImageIndex]}
                              alt={product.name}
                              fill
                              priority
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className={isSofa ? "object-contain p-4 select-none pointer-events-none" : "object-cover select-none pointer-events-none"}
                           />
                        </motion.div>
                     </AnimatePresence>

                     {/* Image Counter Overlay */}
                     <div className="absolute bottom-6 right-6 bg-black/80 text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest backdrop-blur-sm">
                        {currentImageIndex + 1} / {images.length}
                     </div>
                  </div>

                  {/* Thumbnails Row */}
                  {images.length > 1 && (
                     <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {images.map((img: string, i: number) => (
                           <button
                              key={i}
                              className={`relative flex-shrink-0 w-24 md:w-32 aspect-square rounded-xl overflow-hidden transition-all duration-500 snap-start ${
                                 isSofa ? "bg-white border border-[#f0f0f0]" : "bg-[#f9f9f8]"
                              } ${currentImageIndex === i
                                 ? 'ring-2 ring-[#C0001A] ring-offset-2 scale-95 shadow-lg'
                                 : 'opacity-50 hover:opacity-100 hover:scale-[1.02]'
                                 }`}
                              onClick={() => setCurrentImageIndex(i)}
                           >
                              <Image src={img} alt={`${product.name} thumbnail ${i}`} fill className={isSofa ? "object-contain p-1" : "object-cover"} />
                           </button>
                        ))}
                      </div>
                  )}
               </div>

               {/* ══════ RIGHT: Premium Product Information ══════ */}
               <div className="w-full lg:w-[45%] flex flex-col pt-2">

                  {/* Header */}
                  <div className="mb-8">
                     <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C0001A]">
                           {product.categories?.name || 'Curated Model'}
                        </span>
                        <button
                           onClick={() => toggleFavorite(product.slug)}
                           className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#111] hover:text-[#C0001A] transition-colors"
                        >
                           <Heart size={18} fill={liked ? '#C0001A' : 'none'} className={liked ? 'text-[#C0001A]' : ''} />
                        </button>
                     </div>
                     <h1 className="text-4xl md:text-5xl font-bold text-[#111] leading-[1.1] tracking-tight mb-6">
                        {product.name}
                     </h1>

                     <div className="text-[#666] text-sm md:text-base leading-relaxed font-light max-w-xl">
                        {product.short_description || product.description}
                     </div>
                  </div>

                  {/* Features Highlights */}
                  <div className="mb-10">
                     <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111] mb-5">Key Highlights</h3>
                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                        {product.features && product.features.length > 0 ? (
                           product.features.map((feature: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-[13px] text-[#444]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#C0001A] mt-1.5 shrink-0" />
                                 {feature}
                              </li>
                           ))
                        ) : (
                           <>
                              <li className="flex items-start gap-3 text-[13px] text-[#444]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#C0001A] mt-1.5 shrink-0" />
                                 Handcrafted Solid Wood Frame
                              </li>
                              <li className="flex items-start gap-3 text-[13px] text-[#444]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#C0001A] mt-1.5 shrink-0" />
                                 Premium Fabric/Leatherette Options
                              </li>
                              <li className="flex items-start gap-3 text-[13px] text-[#444]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#C0001A] mt-1.5 shrink-0" />
                                 Ergonomic Design for Comfort
                              </li>
                              <li className="flex items-start gap-3 text-[13px] text-[#444]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#C0001A] mt-1.5 shrink-0" />
                                 Durable & High-Density Cushioning
                              </li>
                           </>
                        )}
                     </ul>
                  </div>

                  {/* Customization Note */}
                  <div className="bg-[#f9f9f8] border border-[#f0eee8] p-5 rounded-2xl mb-10 flex items-center gap-5">
                     <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                        <ShoppingBag size={20} className="text-[#111]" />
                     </div>
                     <div>
                        <h4 className="text-xs font-bold text-[#111] mb-1">Bespoke Customization</h4>
                        <p className="text-[11px] text-[#666] leading-relaxed">Available in 100+ premium fabrics and different wood polish finishes to match your interior.</p>
                     </div>
                  </div>

                  {/* Dimensions Grid */}
                  <div className="grid grid-cols-2 gap-px bg-[#f0f0f0] border-y border-[#f0f0f0] mb-10 overflow-hidden">
                     <div className="bg-white py-6">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#999] block mb-2">Dimensions (W×D×H)</span>
                        <span className="text-sm font-medium text-[#111]">
                           {product.specifications?.find((s: any) => s.label.toLowerCase().includes('size'))?.value || "210 × 95 × 85 cm"}
                        </span>
                     </div>
                     <div className="bg-white py-6 pl-8">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#999] block mb-2">Weight Approx.</span>
                        <span className="text-sm font-medium text-[#111]">
                           {product.specifications?.find((s: any) => s.label.toLowerCase().includes('weight'))?.value || "45.0 kg"}
                        </span>
                     </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-4 mb-12">
                     <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#111] hover:bg-[#C0001A] text-white py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-black/5 active:scale-[0.98]"
                     >
                        <MessageCircle size={18} />
                        Enquire via WhatsApp
                     </a>

                     <div className="flex items-center justify-center gap-10 py-4">
                        <div className="flex flex-col items-center gap-1.5 group cursor-default">
                           <div className="w-10 h-10 rounded-full bg-[#f9f9f8] flex items-center justify-center text-[#111] group-hover:bg-[#111] group-hover:text-white transition-colors duration-300">
                              <Star size={16} />
                           </div>
                           <span className="text-[9px] font-bold uppercase tracking-wider text-[#666]">Premium Build</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 group cursor-default">
                           <div className="w-10 h-10 rounded-full bg-[#f9f9f8] flex items-center justify-center text-[#111] group-hover:bg-[#111] group-hover:text-white transition-colors duration-300">
                              <Heart size={16} />
                           </div>
                           <span className="text-[9px] font-bold uppercase tracking-wider text-[#666]">Loved by 500+</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 group cursor-default">
                           <div className="w-10 h-10 rounded-full bg-[#f9f9f8] flex items-center justify-center text-[#111] group-hover:bg-[#111] group-hover:text-white transition-colors duration-300">
                              <ShoppingBag size={16} />
                           </div>
                           <span className="text-[9px] font-bold uppercase tracking-wider text-[#666]">Direct Pricing</span>
                        </div>
                     </div>
                  </div>

                  {/* How it works */}
                  <div className="bg-[#111] text-white p-8 rounded-3xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[#C0001A]/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                     <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 relative z-10">How it works</h3>
                     <div className="space-y-6 relative z-10">
                        {[
                           { step: "01", title: "Send Enquiry", desc: "Share your requirement via WhatsApp" },
                           { step: "02", title: "Customize", desc: "Select fabrics, wood finishes and size" },
                           { step: "03", title: "Confirm Order", desc: "Get final quote and delivery timeline" }
                        ].map((item, idx) => (
                           <div key={idx} className="flex gap-5">
                              <span className="text-[#C0001A] font-black text-sm">{item.step}</span>
                              <div>
                                 <h4 className="text-[11px] font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                                 <p className="text-[10px] text-gray-400 font-light leading-relaxed">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

               </div>
            </div>
         </div>

         {/* ── Related Products ── */}
         {relatedProducts && relatedProducts.length > 0 && (
            <div className="max-container px-6 md:px-10 lg:px-16 pt-20 border-t border-[#f0f0f0]">
               <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                  <div className="text-center md:text-left">
                     <h2 className="text-[28px] md:text-[32px] font-bold text-[#111] tracking-tight mb-2" >
                        Related Products
                     </h2>
                     <p className="text-xs text-[#666] tracking-widest uppercase">Explore other premium models from our catalog</p>
                  </div>
                  <Link href={`/products?category=${product.categories?.base_category || ""}`} className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#111] border-b-2 border-transparent hover:border-[#C0001A] transition-all pb-1 translate-y-2">
                     View All Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {relatedProducts.slice(0, 4).map((p, i) => (
                     <ProductCard key={p.slug} product={p} />
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}
