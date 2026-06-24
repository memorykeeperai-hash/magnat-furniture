// app/privacy/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Magnat Furniture",
  description:
    "Magnat Furniture's privacy policy. Learn how we handle your personal information and ensure your privacy while using our website and services.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: { canonical: "https://magnat.in/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
