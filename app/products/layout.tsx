// app/products/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Furniture Products | Sofas, Curtains, Chairs – Magnat Furniture Kondotty",
  description:
    "Browse Magnat Furniture's complete collection — custom sofas, L-shape sofas, recliners, leather sofas, curtains, dining chairs & bedroom furniture. All manufactured in Kondotty. Free delivery across Malappuram & Kerala.",
  keywords: [
    "furniture products kondotty",
    "sofa collection kondotty",
    "buy furniture kondotty",
    "magnat furniture products",
    "sofa catalogue kondotty",
    "custom furniture kondotty",
    "furniture shop kondotty",
    "sofa types kondotty",
    "curtains furniture kondotty",
    "chairs kondotty",
    "dining furniture kondotty",
    "furniture price list kondotty",
    "all furniture kondotty",
    "premium sofa collection kerala",
    "furniture catalogue malappuram",
  ],
  openGraph: {
    title: "Furniture Products | Magnat Furniture Kondotty",
    description:
      "Explore our complete range of custom sofas, curtains, chairs & dining furniture. Manufactured in Kondotty.",
    url: "https://magnat.in/products",
  },
  alternates: { canonical: "https://magnat.in/products" },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
