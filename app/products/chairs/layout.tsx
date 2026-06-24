// app/products/chairs/layout.tsx
import { Metadata } from "next";
import { CATEGORY_KEYWORDS } from "@/lib/keywords";

export const metadata: Metadata = {
  title: "Premium Chairs in Kondotty | Office, Dining, & Accent Chairs – Magnat Furniture",
  description:
    "Explore the best collection of chairs in Kondotty. From ergonomic office chairs and premium dining chairs to designer accent chairs. Custom-made for your comfort and style. Delivery across Malappuram & Kerala.",
  keywords: [
    ...CATEGORY_KEYWORDS.chairs,
    "buy chairs kondotty",
    "office chairs kondotty price",
    "dining chairs shop kondotty",
    "best chairs showroom malappuram",
    "custom chair manufacturing kondotty",
    "accent chairs kondotty",
    "executive chairs kondotty",
    "wooden chairs kondotty",
    "furniture showroom kondotty chairs",
  ],
  openGraph: {
    title: "Premium Chairs – Magnat Furniture Kondotty",
    description:
      "Ergonomic, dining, and accent chairs custom-made in Kondotty. Quality craftsmanship and free delivery.",
    url: "https://magnat.in/products/chairs",
  },
  alternates: { canonical: "https://magnat.in/products/chairs" },
};

export default function ChairsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
