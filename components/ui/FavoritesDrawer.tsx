"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { getProductBySlug, Product } from "@/lib/data/products";
import { X, Trash2, HeartCrack, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesDrawer() {
  const { favorites, toggleFavorite, isDrawerOpen, setDrawerOpen } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isDrawerOpen) return;

    async function loadFavorites() {
      setIsLoading(true);
      if (favorites.length === 0) {
        setFavoriteProducts([]);
        setIsLoading(false);
        return;
      }

      const loaded = await Promise.all(
        favorites.map((slug) => getProductBySlug(slug))
      );
      
      const validProducts = loaded.filter((p): p is Product => p !== null);
      setFavoriteProducts(validProducts);
      setIsLoading(false);
    }

    loadFavorites();
  }, [favorites, isDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#f0f0f0]">
               <div>
                  <h2 className="text-[20px] font-bold text-[#111]">
                     Your Collection
                  </h2>
                  <p className="text-[#666] text-xs">
                     {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
                  </p>
               </div>
               <button 
                 onClick={() => setDrawerOpen(false)}
                 className="w-10 h-10 rounded-full hover:bg-[#f6f6f6] flex items-center justify-center text-[#111] transition-colors"
                 aria-label="Close Favorites"
               >
                  <X size={20} strokeWidth={1.5} />
               </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 rounded-full border-2 border-[#111] border-t-transparent animate-spin"></div>
                </div>
              ) : favoriteProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center pb-20">
                  <HeartCrack size={40} className="text-[#e0e0e0] mb-6" strokeWidth={1} />
                  <h3 className="text-lg font-medium text-[#111] mb-2">Your list is empty</h3>
                  <p className="text-[#666] text-sm mb-8 px-4">
                    Explore our catalog and click the heart icon on any product to save it here.
                  </p>
                  <button 
                    onClick={() => setDrawerOpen(false)}
                    className="bg-[#111] text-white px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {favoriteProducts.map((product) => (
                    <div key={product.slug} className="group relative flex gap-4 bg-white p-3 border border-[#f0f0f0] rounded hover:border-[#111] transition-colors">
                      <Link 
                        href={`/products/${product.slug}`}
                        onClick={() => setDrawerOpen(false)} 
                        className="relative w-24 h-24 bg-[#f9f9f9] rounded shrink-0 overflow-hidden block"
                      >
                         <Image
                           src={product.images[0] || "/images/placeholder-furniture.jpg"}
                           alt={product.name}
                           fill
                           className="object-cover group-hover:scale-105 transition-transform"
                         />
                      </Link>
                      
                      <div className="flex-1 flex flex-col pt-1">
                         <span className="text-[8px] uppercase tracking-[0.2em] text-[#C0001A] font-bold mb-1">
                           {product.category || 'Furniture'}
                         </span>
                         <Link 
                           href={`/products/${product.slug}`}
                           onClick={() => setDrawerOpen(false)} 
                           className="text-[14px] font-medium text-[#111] leading-tight hover:text-[#C0001A] transition-colors pr-6"
                         >
                           {product.name}
                         </Link>
                         <p className="text-[#666] text-[11px] mt-1 line-clamp-1">{product.short_description || product.description}</p>
                         
                         <button 
                           onClick={() => toggleFavorite(product.slug)}
                           className="absolute top-3 right-3 text-[#999] hover:text-[#C0001A] transition-colors"
                           aria-label="Remove item"
                         >
                           <Trash2 size={16} />
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Action */}
            {favoriteProducts.length > 0 && (
              <div className="p-6 border-t border-[#f0f0f0] bg-white">
                 <a 
                   href="https://wa.me/919446516395?text=Hello%20MAGNAT%20Furniture%2C%20I%20have%20saved%20some%20items%20to%20my%20favorites%20and%20would%20like%20to%20enquire%20about%20availability."
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full bg-[#25D366] text-white px-6 py-4 text-[11px] font-bold tracking-[0.1em] uppercase shadow-lg flex justify-center items-center gap-2 rounded-sm hover:bg-[#20bd5a] transition-colors"
                 >
                    Enquire Collection <MessageCircle size={16} />
                 </a>
              </div>
            )}
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
