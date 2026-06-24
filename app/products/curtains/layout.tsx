// app/products/curtains/layout.tsx
import { Metadata } from "next";
import { CATEGORY_KEYWORDS } from "@/lib/keywords";

export const metadata: Metadata = {
  title: "Curtains & Drapes in Kondotty | Custom Curtain Shop – Magnat Furniture",
  description:
    "Best curtain shop in Kondotty. Premium curtains, drapes, blackout curtains, designer curtains & blinds. Professional installation across Malappuram & Kozhikode. Custom fabric selection. Free home consultation.",
  keywords: [
    ...CATEGORY_KEYWORDS.curtains,
    "curtain shop kondotty",
    "curtains near kondotty",
    "best curtains malappuram",
    "custom curtains kondotty",
    "blackout curtains kondotty",
    "curtain installation malappuram",
    "designer curtains kerala",
    "window curtains kondotty price",
    "door curtains kondotty",
    "curtain shop near me kondotty",
    "curtain fabric kondotty",
    "premium curtains kerala",
  ],
  openGraph: {
    title: "Curtains & Drapes – Magnat Furniture Kondotty",
    description:
      "Premium curtain shop in Kondotty. Custom drapes, blackout curtains & professional installation across Kerala.",
    url: "https://magnat.in/products/curtains",
  },
  alternates: { canonical: "https://magnat.in/products/curtains" },
};

export default function CurtainsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
