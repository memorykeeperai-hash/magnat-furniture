// app/terms/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Magnat Furniture",
  description:
    "Terms and conditions for using Magnat Furniture's website and services. Quality warranty, delivery terms, and customer service agreements.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: { canonical: "https://magnat.in/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
