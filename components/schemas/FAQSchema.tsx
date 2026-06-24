// components/schemas/FAQSchema.tsx
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Pre-built FAQs for Homepage & Product Pages ─────────────────────────────
export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "Where is Magnat Furniture showroom located?",
    answer:
      "Magnat Furniture is located on Kondotty Main Road, Kondotty, Malappuram, Kerala – 673638. We are easily accessible from Kozhikode, Malappuram, Manjeri, and surrounding areas.",
  },
  {
    question: "Do you manufacture custom sofas in Kondotty?",
    answer:
      "Yes! Magnat Furniture is a leading custom sofa manufacturer in Kondotty. We design and manufacture sofas to your exact specifications including size, fabric, color, and style. L-shape, corner, recliner, and modular sofas are our specialty.",
  },
  {
    question: "What is the price range for sofas at Magnat Furniture?",
    answer:
      "Our sofa prices range from ₹15,000 for basic fabric sofas to ₹2,50,000+ for premium leather recliners and modular sets. We offer EMI options with 0% interest for up to 12 months.",
  },
  {
    question: "Do you offer free home delivery in Kondotty and Malappuram?",
    answer:
      "Yes, we offer free home delivery within 25 km of our Kondotty showroom, which covers all of Malappuram district and parts of Kozhikode. Delivery across Kerala is available at nominal charges.",
  },
  {
    question: "Do you provide free home consultation for furniture?",
    answer:
      "Absolutely! Our design experts provide free home consultation service across Kondotty, Malappuram, Kozhikode, and nearby areas. Book your consultation at +91-9876543210.",
  },
  {
    question: "What types of sofas do you manufacture at Magnat?",
    answer:
      "We manufacture L-shape sofas, corner sofas, recliner sofas, leather sofas, fabric sofas, wooden sofas, 3-seater and 5-seater sets, sofa cum beds, modular sofas, and custom bespoke designs.",
  },
  {
    question: "Do you offer curtain installation services in Kondotty?",
    answer:
      "Yes, Magnat Furniture offers complete curtain and drapes solutions including design consultation, supply of premium fabrics, and professional installation across Kondotty, Malappuram, and Kozhikode.",
  },
  {
    question: "How long does it take to manufacture a custom sofa?",
    answer:
      "Standard custom sofas take 10–15 working days. Complex designs or premium leather orders may take 20–25 working days. We keep you updated at every stage of manufacturing.",
  },
  {
    question: "Do you offer sofa repair and upholstery services in Kondotty?",
    answer:
      "Yes, Magnat Furniture provides sofa repair, reupholstery, and restoration services for all brands. We can pick up and deliver across Malappuram and Kozhikode districts.",
  },
  {
    question: "Do you serve areas other than Kondotty?",
    answer:
      "Yes, we serve customers across Malappuram District (Manjeri, Perinthalmanna, Angadipuram, Nilambur, Tirur), Kozhikode District (Calicut, Feroke, Ramanattukara), and all of Kerala.",
  },
];
