// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Lato, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloating from "@/components/ui/WhatsAppFloating";
import Preloader from "@/components/ui/Preloader";
import FavoritesDrawer from "@/components/ui/FavoritesDrawer";
import { FavoritesProvider } from "@/lib/context/FavoritesContext";
import AdminExclusionWrapper from "@/components/layout/AdminExclusionWrapper";
import OrganizationSchema from "@/components/schemas/OrganizationSchema";
import LocalBusinessSchema from "@/components/schemas/LocalBusinessSchema";
import MainContentWrapper from "@/components/layout/MainContentWrapper";
import { Toaster } from "sonner";
import VisitTracker from "@/components/analytics/VisitTracker";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8B4513",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://magnat.in"),
  title: {
    default: "Magnat Furniture | Best Sofa Manufacturers & Showroom in Kondotty, Kerala",
    template: "%s | Magnat Furniture Kondotty",
  },
  description:
    "Leading sofa manufacturers in Kondotty, Malappuram. Premium custom sofas, L-shape, recliners, curtains & interior solutions. 25+ years of excellence. Free home consultation & delivery across Kerala.",
  keywords: [
    "sofa manufacturers kondotty",
    "furniture showroom kondotty",
    "sofa near kondotty",
    "furniture near kondotty",
    "curtain shops kondotty",
    "sofa kondotty",
    "furniture kondotty",
    "magnat furniture",
    "magnat sofa kondotty",
    "custom sofa kondotty",
    "modular sofa kondotty",
    "l shape sofa kondotty",
    "corner sofa kondotty",
    "recliner sofa kondotty",
    "leather sofa kondotty",
    "fabric sofa kondotty",
    "wooden sofa kondotty",
    "3 seater sofa kondotty",
    "5 seater sofa kondotty",
    "sofa cum bed kondotty",
    "sofa set kondotty",
    "living room sofa kondotty",
    "bedroom furniture kondotty",
    "dining chairs kondotty",
    "office furniture kondotty",
    "executive chairs kondotty",
    "sofa repair kondotty",
    "sofa upholstery kondotty",
    "sofa cleaning kondotty",
    "furniture repair kondotty",
    "sofa customization kondotty",
    "made to order sofa kondotty",
    "curtain installation kondotty",
    "home furnishing kondotty",
    "interior design kondotty",
    "bespoke furniture kondotty",
    "teak wood sofa kondotty",
    "velvet sofa kondotty",
    "luxury sofa kondotty",
    "premium furniture kondotty",
    "designer sofa kondotty",
    "modern sofa kondotty",
    "contemporary furniture kondotty",
    "traditional sofa kondotty",
    "sofa manufacturers malappuram",
    "furniture showroom malappuram",
    "sofa near malappuram",
    "best furniture showroom in malappuram",
    "furniture manufacturers malappuram",
    "sofa manufacturers kozhikode",
    "furniture showroom calicut",
    "sofa near kozhikode",
    "furniture stores calicut",
    "sofa manufacturers kerala",
    "furniture manufacturers kerala",
    "top sofa manufacturers in kerala",
    "best furniture showroom kerala",
    "premium sofa kerala",
    "buy sofa kondotty",
    "sofa price kondotty",
    "cheap sofa kondotty",
    "affordable furniture kondotty",
    "sofa on emi kondotty",
    "sofa offers kondotty",
    "furniture deals kondotty",
    "wholesale furniture kondotty",
    "best price sofa kondotty",
    "magnat sofa",
    "magnat kondotty",
    "magnat showroom",
    "magnat curtains",
    "magnat.in",
  ],
  authors: [{ name: "Magnat Furniture & Interiors" }],
  creator: "Magnat Furniture",
  publisher: "Magnat Furniture",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://magnat.in",
    siteName: "Magnat Furniture",
    title: "Magnat Furniture | Best Sofa Manufacturers & Showroom in Kondotty, Kerala",
    description: "Leading sofa manufacturers in Kondotty. Custom sofas, L-shape, recliners, curtains & complete interior solutions across Malappuram & Kerala.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Magnat Furniture Showroom – Kondotty, Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnat Furniture | Sofa Manufacturers in Kondotty",
    description: "Premium sofa manufacturers in Kondotty. Custom sofas, curtains & interior solutions. 25+ years of excellence.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://magnat.in",
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  verification: {
    google: ["-5B831SDmmqEdpt_x36lJrytP0KOfXmnBKoFHxHlojw", "GQyq1DTvGuhE4QxjoN3KEG27jjirbdLDhrXA3TMg3pI"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} ${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />


        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Kondotty, Malappuram, Kerala" />
        <meta name="geo.position" content="11.2188;75.9965" />
        <meta name="ICBM" content="11.2188, 75.9965" />
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F7F4F0] antialiased">
        <VisitTracker />
        <FavoritesProvider>
          <Preloader />

          <AdminExclusionWrapper>
            <Navbar />
            <FavoritesDrawer />
          </AdminExclusionWrapper>

          <MainContentWrapper>{children}</MainContentWrapper>

          <AdminExclusionWrapper>
            <Footer />
            <WhatsAppFloating />
          </AdminExclusionWrapper>
        </FavoritesProvider>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}