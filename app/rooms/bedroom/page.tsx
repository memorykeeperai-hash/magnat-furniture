import { getProducts } from "@/lib/api/products";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";

export const metadata = {
  title: 'Bedroom Collection - MAGNAT Furniture',
  description: 'Explore our premium bedroom furniture collection.',
};

export default async function BedroomPage() {
  const products = await getProducts();
  let roomProducts = products.filter(
    p => typeof p.room === 'string' && p.room.toLowerCase().includes('bed') && Array.isArray(p.images) && p.images.length > 0
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="max-container pb-16">
        {roomProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
            {roomProducts.map((product, index) => (
              <FadeInView key={`${product.slug}-${index}`} delay={index * 0.05}>
                <ProductCard product={product} />
              </FadeInView>
            ))}
          </div>
        ) : (
          <FadeInView className="flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center">
            <div className="w-24 h-24 mb-8 rounded-full bg-[#f9f9f9] border border-[#f0f0f0] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#999]">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-medium text-[#111] mb-4 tracking-tight">Collection Updating</h3>
            <p className="text-[#666] mb-10 max-w-md mx-auto text-base font-light leading-relaxed">
              We are currently curating new pieces for our Bedroom collection. Please check back soon or explore our available pieces.
            </p>
            <a href="/rooms/all-pieces" className="inline-flex items-center justify-center bg-[#111] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-[4px] hover:bg-[#C0001A] transition-colors duration-300">
              Discover All Pieces
            </a>
          </FadeInView>
        )}
      </div>
    </div>
  );
}
