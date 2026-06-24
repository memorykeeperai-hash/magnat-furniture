"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { getProductBySlug, Product } from "@/lib/data/products";
import { Trash2, HeartCrack, ArrowRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (favorites.length === 0) {
        setFavoriteProducts([]);
        setIsLoading(false);
        return;
      }

      // We load them dynamically using the exported getProductBySlug 
      // (which creates them dynamically if missing!)
      const loaded = await Promise.all(
        favorites.map((slug) => getProductBySlug(slug))
      );
      
      const validProducts = loaded.filter((p): p is Product => p !== null);
      setFavoriteProducts(validProducts);
      setIsLoading(false);
    }

    loadFavorites();
  }, [favorites]);

  return (
    <div className="pt-32 pb-32 bg-[#fafaf9] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        
        <FadeInView>
          <div className="mb-12">
            <span className="block text-[10px] tracking-[0.3em] uppercase text-[#C0001A] font-bold mb-3" >
              Your Collection
            </span>
             <h1 className="text-[40px] md:text-[50px] text-[#111111] leading-tight" >
                Saved Favorites
             </h1>
             <p className="text-[#666666] text-sm mt-3" >
                {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved to your personal collection.
             </p>
          </div>
        </FadeInView>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#111] border-t-transparent animate-spin"></div>
          </div>
        ) : favoriteProducts.length === 0 ? (
          <FadeInView delay={0.2}>
            <div className="bg-white rounded-2xl p-16 text-center border border-[#f0f0f0] shadow-sm flex flex-col items-center">
              <HeartCrack size={48} className="text-[#e0e0e0] mb-6" strokeWidth={1} />
              <h2 className="text-xl font-medium text-[#111111] mb-3" >Your favorites list is empty</h2>
              <p className="text-[#666666] text-sm mb-8 max-w-sm" >
                Explore our catalog and click the heart icon on any product to save it here for later.
              </p>
              <Link 
                href="/products/sofas" 
                className="bg-[#111111] text-white px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors hover:bg-[#C0001A] inline-flex items-center gap-2"
                
              >
                Browse Collection <ArrowRight size={14} />
              </Link>
            </div>
          </FadeInView>
        ) : (
          <div className="flex flex-col gap-6">
            {favoriteProducts.map((product, i) => (
              <FadeInView key={product.slug} delay={i * 0.1}>
                <div className="bg-white rounded-[4px] p-4 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 border border-[#f0f0f0] shadow-sm transition-all hover:shadow-md group">
                  
                  {/* Image */}
                  <Link href={`/products/${product.slug}`} className="relative w-full sm:w-48 aspect-square bg-[#f9f9f9] rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src={product.images[0] || "/images/placeholder-furniture.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                  
                  {/* Info */}
                  <div className="flex-1 flex flex-col py-2 w-full">
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <span className="block text-[9px] uppercase tracking-[0.2em] text-[#C0001A] font-bold mb-2">
                          {product.category || 'Furniture'}
                        </span>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="text-xl text-[#111111] hover:text-[#C0001A] transition-colors mb-2" >
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                      
                      <button 
                        onClick={() => toggleFavorite(product.slug)}
                        className="text-[#999] hover:text-[#C0001A] p-2 rounded-full hover:bg-red-50 transition-colors shrink-0"
                        title="Remove from favorites"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <p className="text-[#666666] text-sm line-clamp-2 mt-1 mb-4 max-w-lg" >
                      {product.short_description || product.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                       <Link 
                         href={`/products/${product.slug}`} 
                         className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#111111] hover:text-[#C0001A] transition-colors flex items-center gap-1"
                       >
                         View Details <ArrowRight size={12} />
                       </Link>
                    </div>
                  </div>
                </div>
              </FadeInView>
            ))}
            
            <FadeInView delay={0.4}>
               <div className="mt-8 flex justify-end">
                  <a 
                    href="https://wa.me/919446516395?text=Hello%20MAGNAT%20Furniture%2C%20I%20have%20saved%20some%20items%20to%20my%20favorites%20and%20would%20like%20to%20enquire%20about%20availability%20and%20customization."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors hover:bg-[#20bd5a] shadow-lg flex items-center gap-3 rounded-[3px]"
                  >
                     Enquire Saved Collection on WhatsApp
                  </a>
               </div>
            </FadeInView>
          </div>
        )}
      </div>
    </div>
  );
}
