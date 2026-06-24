"use client";

import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

interface ExclusiveShowroomClientProps {
  products: Product[];
}

export default function ExclusiveShowroomClient({ products }: ExclusiveShowroomClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      {/* ── HERO ── */}
      <div className="mb-24 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-playfair text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none">
            The Digital <span className="text-[#C0001A]">Atelier</span>
          </h1>
          <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed mb-10">
            Welcome to Magnat's private sanctuary. This space is reserved for our most discerning clients, featuring bespoke creations and limited-run pieces that never grace the public eyes.
          </p>
          <div className="h-px w-20 bg-[#C0001A] mx-auto" />
        </motion.div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <Link href={`/exclusive/${product.access_token}`} className="block space-y-6">
              {/* Image Container */}
              <div className="aspect-[4/5] bg-stone-900 overflow-hidden relative border border-white/5">
                {product.images?.[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-800">
                    <Lock size={48} strokeWidth={1} />
                  </div>
                )}
                
                {/* Overlay Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                   <div className="flex items-center gap-2 text-[#C0001A] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                     <Lock size={12} /> Private View
                   </div>
                   <h3 className="text-2xl font-playfair font-black text-white">{product.name}</h3>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#C0001A]">
                  Exclusive
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-playfair font-black tracking-tight group-hover:text-[#C0001A] transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-sm font-bold text-stone-500">{product.price || "Custom Quote"}</span>
                </div>
                <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
                  {product.description || "A masterfully crafted piece for the modern luxury home, available only through private invitation."}
                </p>
                
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C0001A] pt-2 group-hover:translate-x-2 transition-transform duration-300">
                  Request Details <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-40 text-center border border-dashed border-white/10">
          <Lock className="mx-auto text-stone-800 mb-6" size={64} strokeWidth={1} />
          <p className="text-stone-500 uppercase tracking-[0.3em] text-xs">The showroom is currently being curated.</p>
          <p className="text-stone-600 text-sm mt-4">Please check back soon for our next collection.</p>
        </div>
      )}
    </div>
  );
}
