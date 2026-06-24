// components/schemas/ProductSchema.tsx
interface ProductSchemaProps {
  name: string;
  description: string;
  images: string[];
  price?: number;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  sku?: string;
  brand?: string;
  category?: string;
  ratingValue?: number;
  reviewCount?: number;
  url?: string;
}

export default function ProductSchema({
  name,
  description,
  images,
  price,
  priceCurrency = "INR",
  availability = "InStock",
  sku,
  brand = "Magnat",
  category,
  ratingValue,
  reviewCount,
  url,
}: ProductSchemaProps) {
  const priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: images,
    description,
    ...(sku && { sku }),
    brand: { "@type": "Brand", name: brand },
    manufacturer: {
      "@type": "Organization",
      name: "Magnat Furniture",
      url: "https://magnat.in",
    },
    ...(category && { category }),
    ...(price && {
      offers: {
        "@type": "Offer",
        url: url ?? "https://magnat.in/products",
        priceCurrency,
        price,
        priceValidUntil,
        availability: `https://schema.org/${availability}`,
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@type": "Organization",
          name: "Magnat Furniture",
          url: "https://magnat.in",
        },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: "0",
            currency: "INR",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "IN",
            addressRegion: ["KL"],
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 10,
              maxValue: 20,
              unitCode: "DAY",
            },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "IN",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 7,
          returnMethod: "https://schema.org/ReturnInStore",
          returnFees: "https://schema.org/FreeReturn",
        },
      },
    }),
    ...(ratingValue && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue,
        reviewCount: reviewCount ?? 0,
        bestRating: "5",
        worstRating: "1",
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
