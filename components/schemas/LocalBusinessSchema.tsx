// components/schemas/LocalBusinessSchema.tsx
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://magnat.in/#localbusiness",
    name: "Magnat Furniture Kondotty",
    image: [
      "https://magnat.in/showroom-exterior.jpg",
      "https://magnat.in/showroom-interior.jpg",
      "https://magnat.in/manufacturing-unit.jpg",
      "https://magnat.in/sofa-collection.jpg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kondotty - Malappuram Road",
      addressLocality: "Kondotty",
      addressRegion: "KL",
      postalCode: "673638",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.1447936,
      longitude: 75.9678667,
    },
    url: "https://magnat.in",
    telephone: "+91-9446516395",
    email: "info@magnat.in",
    priceRange: "₹₹–₹₹₹",
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
    hasMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.577732999317!2d75.9678667!3d11.1447936",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, EMI",
    areaServed: "Kondotty, Malappuram, Kozhikode, Kerala",
    // Keywords for rich results
    keywords:
      "sofa manufacturers kondotty, furniture showroom kondotty, custom sofa kondotty, l shape sofa kondotty, recliner kondotty, curtains kondotty",

    // Service catalog
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Sofa Manufacturing",
          description:
            "Bespoke sofa design and manufacturing tailored to your space and style preferences.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free Home Consultation",
          description:
            "Our design experts visit your home to suggest the perfect furniture for your space.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Curtain Design & Installation",
          description:
            "Premium curtains, drapes, and blinds with professional installation across Kerala.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sofa Repair & Upholstery",
          description:
            "Expert repair and reupholstery service for all sofa brands and models.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Furniture Delivery & Installation",
          description:
            "Free delivery and professional installation across Malappuram and Kozhikode districts.",
        },
      },
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
