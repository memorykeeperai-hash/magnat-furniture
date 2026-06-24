// app/contact/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Magnat Furniture | Visit Our Showroom in Kondotty, Malappuram",
  description:
    "Contact Magnat Furniture Kondotty. Call +91-9446516395 for free home consultation. Visit our showroom on Kondotty-Malappuram Road. WhatsApp us for custom sofa quotes. Free delivery across Malappuram & Kozhikode.",
  keywords: [
    "contact magnat furniture",
    "magnat furniture phone number",
    "magnat furniture address kondotty",
    "furniture showroom kondotty address",
    "sofa shop phone number kondotty",
    "furniture consultation kondotty",
    "free home visit sofa kondotty",
    "sofa quote kondotty",
    "magnat furniture whatsapp",
    "furniture delivery kondotty",
    "visit furniture showroom kondotty",
    "furniture shop near me kondotty",
    "sofa manufacturer contact malappuram",
    "custom sofa enquiry kondotty",
  ],
  openGraph: {
    title: "Contact Magnat Furniture | Kondotty Showroom",
    description:
      "Call +91-9446516395 or visit our Kondotty showroom. Free home consultation & delivery across Kerala.",
    url: "https://magnat.in/contact",
  },
  alternates: { canonical: "https://magnat.in/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
