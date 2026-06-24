import { Metadata } from "next";
import { getProductByToken, getRelatedProducts } from "@/lib/api/products";
import ProductClientPage from "../../products/[slug]/ProductClientPage";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  const product = await getProductByToken(token);

  if (!product) {
    return {
      title: "Private Collection | MAGNAT™ Furniture",
      description: "Exclusive furniture preview by invitation only.",
    };
  }

  return {
    title: `Exclusive: ${product.name} | MAGNAT™ Furniture`,
    description: "Private preview of an exclusive Magnat masterpiece.",
    robots: { index: false, follow: false }, // Prevent search engines from indexing private products
  };
}

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const product = await getProductByToken(token);
  
  if (!product) {
    notFound();
  }

  // We still use related products but maybe we should filter those too? 
  // For now, let's just show related public products.
  const relatedProducts = await getRelatedProducts(product.category_id || "", product.slug);

  return (
    <div className="exclusive-view">
      <div className="bg-stone-900 text-stone-400 text-xs py-2 text-center tracking-[0.2em] uppercase">
        Private Collection • Invite Only
      </div>
      <ProductClientPage product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
