import { Metadata } from "next";
import { getProductBySlug, getRelatedProducts } from "@/lib/api/products";
import ProductClientPage from "./ProductClientPage";
import ProductSchema from "@/components/schemas/ProductSchema";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | MAGNAT™ Furniture",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | Premium Furniture by MAGNAT™`,
    description: product.short_description || product.description?.slice(0, 160) || "",
    openGraph: {
      title: `${product.name} | MAGNAT™`,
      description: product.short_description || product.description?.slice(0, 160) || "",
      images: [
        {
          url: (product.images && product.images[0]) || "/images/placeholder-furniture.jpg",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return <ProductClientPage product={null} relatedProducts={[]} />;
  }

  const relatedProducts = await getRelatedProducts(product.categories?.slug || "", slug);

  // Parse price (e.g., "₹1,85,000" -> 185000)
  const priceString = product.price;
  const numericPrice = priceString && priceString !== "Custom Quote"
    ? parseFloat(priceString.replace(/[^\d]/g, ""))
    : undefined;

  return (
    <>
      <ProductSchema
        name={product.name}
        description={product.description || product.short_description || ""}
        images={product.images || []}
        price={numericPrice}
        category={product.categories?.name || undefined}
        sku={product.slug}
        url={`https://magnat.in/products/${product.slug}`}
      />
      <ProductClientPage product={product} relatedProducts={relatedProducts} />
    </>
  );
}