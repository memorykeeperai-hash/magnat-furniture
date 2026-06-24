// app/about/layout.tsx
// Server component — exports metadata for the "use client" page below
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Magnat Furniture | 25+ Years of Sofa Manufacturing in Kondotty",
  description:
    "Magnat Furniture — Kondotty's trusted sofa manufacturer since 2001. Family-owned workshop crafting custom sofas, curtains & furniture. No middlemen, direct from our factory to your home in Malappuram & Kerala.",
  keywords: [
    "about magnat furniture",
    "magnat furniture kondotty",
    "sofa manufacturer kondotty history",
    "furniture workshop kondotty",
    "family owned furniture kondotty",
    "custom sofa factory kondotty",
    "25 years furniture manufacturing kerala",
    "best sofa maker kondotty",
    "magnat furniture story",
    "kondotty furniture manufacturer since 2001",
    "furniture manufacturer malappuram",
    "sofa workshop kerala",
  ],
  openGraph: {
    title: "About Magnat Furniture | 25+ Years in Kondotty",
    description:
      "Family-owned sofa manufacturer in Kondotty since 2001. Visit our workshop and see how your furniture is made.",
    url: "https://magnat.in/about",
  },
  alternates: { canonical: "https://magnat.in/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
