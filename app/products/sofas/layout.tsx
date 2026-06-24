// app/products/sofas/layout.tsx
import { Metadata } from "next";
import { CATEGORY_KEYWORDS } from "@/lib/keywords";

export const metadata: Metadata = {
  title: "Custom Sofas in Kondotty | L-Shape, Recliner, Leather – Magnat Furniture",
  description:
    "Best sofa manufacturers in Kondotty. Custom L-shape sofas, corner sofas, recliner sofas, leather sofas, fabric sofas & sofa sets. All made-to-order in our Kondotty factory. Free home consultation & delivery across Malappuram.",
  keywords: [
    ...CATEGORY_KEYWORDS.sofas,
    "sofa manufacturers kondotty",
    "l shape sofa kondotty price",
    "recliner sofa kondotty",
    "leather sofa kondotty price",
    "corner sofa kondotty",
    "sofa set kondotty",
    "buy sofa kondotty",
    "custom sofa maker near kondotty",
    "best sofa showroom kondotty",
    "sofa on emi kondotty",
    "sofa delivery kondotty malappuram",
  ],
  openGraph: {
    title: "Custom Sofas – Magnat Furniture Kondotty | L-Shape, Recliner, Leather",
    description:
      "Premium custom sofa manufacturers in Kondotty. L-shape, corner, recliner & leather sofas. Made-to-order. Free delivery.",
    url: "https://magnat.in/products/sofas",
  },
  alternates: { canonical: "https://magnat.in/products/sofas" },
};

export default function SofasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
