// components/schemas/OrganizationSchema.tsx
export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": "https://magnat.in/#organization",
    name: "Magnat Furniture",
    alternateName: ["Magnat Sofa Manufacturing", "Magnat Kondotty", "Magnat Furniture & Interiors"],
    url: "https://magnat.in",
    logo: {
      "@type": "ImageObject",
      url: "https://magnat.in/logo.png",
      width: 400,
      height: 120,
    },
    image: "https://magnat.in/showroom.jpg",
    description:
      "Magnat Furniture is Kondotty's leading sofa manufacturer and furniture showroom offering premium custom sofas, L-shape sofas, recliners, chairs, curtains, and complete interior solutions. 25+ years of manufacturing excellence serving Kondotty, Malappuram, Kozhikode, and all of Kerala.",
    telephone: "+91-9446516395",
    email: "info@magnat.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kondotty - Malappuram Road",
      addressLocality: "Kondotty",
      addressRegion: "Kerala",
      postalCode: "673638",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.1447936",
      longitude: "75.9678667",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    priceRange: "₹₹–₹₹₹",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, EMI",
    currenciesAccepted: "INR",
    hasMap: "https://maps.google.com/?q=Magnat+Furniture+Kondotty",
    areaServed: [
      { "@type": "City", name: "Kondotty" },
      { "@type": "City", name: "Malappuram" },
      { "@type": "City", name: "Kozhikode" },
      { "@type": "City", name: "Calicut" },
      { "@type": "City", name: "Manjeri" },
      { "@type": "City", name: "Perinthalmanna" },
      { "@type": "City", name: "Angadipuram" },
      { "@type": "City", name: "Nilambur" },
      { "@type": "City", name: "Tirur" },
      { "@type": "State", name: "Kerala" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Magnat Furniture Products & Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Sofas" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "L-Shape Sofas" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Recliner Sofas" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Leather Sofas" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fabric Sofas" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corner Sofas" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Living Room Sets" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dining Chairs" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Curtains & Drapes" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sofa Repair & Upholstery" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Free Home Consultation" } },
      ],
    },
    sameAs: [
      "https://www.facebook.com/magnatfurniture",
      "https://www.instagram.com/magnatfurniture",
      "https://www.youtube.com/@magnatfurniture",
      "https://www.linkedin.com/company/magnatfurniture",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
