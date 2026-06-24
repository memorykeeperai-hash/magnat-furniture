// app/products/dining/layout.tsx
import { Metadata } from "next";
import { CATEGORY_KEYWORDS } from "@/lib/keywords";

export const metadata: Metadata = {
  title: "Dining Table & Sets in Kondotty | Custom Dining Furniture – Magnat Furniture",
  description:
    "Discover premium dining sets in Kondotty. Custom-made dining tables, chairs, and complete dining room solutions. Handcrafted by experts in Malappuram. Free consultation and delivery across Kerala.",
  keywords: [
    ...CATEGORY_KEYWORDS.dining,
    "dining table kondotty",
    "buy dining set kondotty",
    "best dining furniture malappuram",
    "custom dining table manufacturing kondotty",
    "modern dining sets kondotty",
    "wooden dining table kondotty",
    "dining chairs shop kondotty",
    "luxury dining room furniture kerala",
  ],
  openGraph: {
    title: "Premium Dining Furniture – Magnat Furniture Kondotty",
    description:
      "Handcrafted dining tables and sets custom-made in Kondotty. Elevate your dining experience with Magnat.",
    url: "https://magnat.in/products/dining",
  },
  alternates: { canonical: "https://magnat.in/products/dining" },
};

export default function DiningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
