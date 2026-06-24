// app/locations/[location]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY_KEYWORDS } from "@/lib/keywords";
import FAQSchema, { HOMEPAGE_FAQS } from "@/components/schemas/FAQSchema";
import BreadcrumbSchema from "@/components/schemas/BreadcrumbSchema";

// ─── All serviceable locations ───────────────────────────────────────────────
const LOCATIONS = [
  { slug: "kondotty",        name: "Kondotty",        district: "Malappuram", pincode: "673638", nearbyAreas: ["Malappuram", "Manjeri", "Angadipuram", "Perinthalmanna", "Kozhikode"] },
  { slug: "malappuram",      name: "Malappuram",       district: "Malappuram", pincode: "676505", nearbyAreas: ["Kondotty", "Manjeri", "Perinthalmanna", "Tirur"] },
  { slug: "kozhikode",       name: "Kozhikode",        district: "Kozhikode",  pincode: "673001", nearbyAreas: ["Kondotty", "Calicut", "Feroke", "Ramanattukara", "Beypore"] },
  { slug: "calicut",         name: "Calicut",          district: "Kozhikode",  pincode: "673001", nearbyAreas: ["Kozhikode", "Kondotty", "Feroke", "Beypore"] },
  { slug: "manjeri",         name: "Manjeri",          district: "Malappuram", pincode: "676121", nearbyAreas: ["Malappuram", "Kondotty", "Perinthalmanna"] },
  { slug: "perinthalmanna",  name: "Perinthalmanna",   district: "Malappuram", pincode: "679322", nearbyAreas: ["Manjeri", "Malappuram", "Kondotty", "Nilambur"] },
  { slug: "angadipuram",     name: "Angadipuram",      district: "Malappuram", pincode: "679321", nearbyAreas: ["Perinthalmanna", "Kondotty", "Malappuram"] },
  { slug: "nilambur",        name: "Nilambur",         district: "Malappuram", pincode: "679329", nearbyAreas: ["Perinthalmanna", "Manjeri", "Malappuram"] },
  { slug: "tirur",           name: "Tirur",            district: "Malappuram", pincode: "676101", nearbyAreas: ["Malappuram", "Tanur", "Kondotty"] },
  { slug: "tanur",           name: "Tanur",            district: "Malappuram", pincode: "676302", nearbyAreas: ["Tirur", "Ponnani", "Malappuram"] },
  { slug: "ponnani",         name: "Ponnani",          district: "Malappuram", pincode: "679577", nearbyAreas: ["Tanur", "Malappuram", "Thrissur"] },
  { slug: "kottakkal",       name: "Kottakkal",        district: "Malappuram", pincode: "676503", nearbyAreas: ["Malappuram", "Manjeri", "Kondotty"] },
  { slug: "wandoor",         name: "Wandoor",          district: "Malappuram", pincode: "679328", nearbyAreas: ["Nilambur", "Malappuram", "Kondotty"] },
  { slug: "edappal",         name: "Edappal",          district: "Malappuram", pincode: "679576", nearbyAreas: ["Ponnani", "Malappuram", "Thrissur"] },
  { slug: "feroke",          name: "Feroke",           district: "Kozhikode",  pincode: "673631", nearbyAreas: ["Kozhikode", "Kondotty", "Ramanattukara"] },
  { slug: "ramanattukara",   name: "Ramanattukara",    district: "Kozhikode",  pincode: "673633", nearbyAreas: ["Kozhikode", "Feroke", "Kondotty"] },
  { slug: "beypore",         name: "Beypore",          district: "Kozhikode",  pincode: "673015", nearbyAreas: ["Kozhikode", "Calicut", "Feroke"] },
  { slug: "chaliyam",        name: "Chaliyam",         district: "Kozhikode",  pincode: "673301", nearbyAreas: ["Beypore", "Kozhikode", "Kondotty"] },
  { slug: "parappanangadi",  name: "Parappanangadi",   district: "Malappuram", pincode: "676303", nearbyAreas: ["Tirur", "Tanur", "Malappuram"] },
  { slug: "tirurangadi",     name: "Tirurangadi",      district: "Malappuram", pincode: "676306", nearbyAreas: ["Malappuram", "Tirur", "Kondotty"] },
  { slug: "valanchery",      name: "Valanchery",       district: "Malappuram", pincode: "676552", nearbyAreas: ["Malappuram", "Kuttippuram", "Kondotty"] },
];

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ location: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { location: string };
}): Promise<Metadata> {
  const loc = LOCATIONS.find((l) => l.slug === params.location);
  if (!loc) return {};

  const title = `Best Sofa Manufacturers & Furniture Showroom Near ${loc.name} | Magnat Furniture`;
  const desc = `Premium sofa manufacturers near ${loc.name}, ${loc.district}. Custom sofas, L-shape, recliners, curtains & interior solutions. Free home consultation & delivery to ${loc.name}. Visit Magnat Furniture Kondotty.`;

  return {
    title,
    description: desc,
    keywords: [
      `sofa manufacturers ${loc.slug}`,
      `furniture showroom ${loc.slug}`,
      `sofa near ${loc.slug}`,
      `furniture near ${loc.slug}`,
      `custom sofa ${loc.slug}`,
      `l shape sofa ${loc.slug}`,
      `recliner sofa ${loc.slug}`,
      `curtain shops ${loc.slug}`,
      `furniture stores ${loc.slug}`,
      `best sofa ${loc.slug}`,
      `sofa price ${loc.slug}`,
      `sofa delivery ${loc.slug}`,
      ...loc.nearbyAreas.map((area) => `sofa near ${area.toLowerCase()}`),
      ...CATEGORY_KEYWORDS.sofas,
    ],
    openGraph: {
      title,
      description: desc,
      url: `https://magnat.in/locations/${loc.slug}`,
    },
    alternates: {
      canonical: `https://magnat.in/locations/${loc.slug}`,
    },
  };
}

export default function LocationPage({
  params,
}: {
  params: { location: string };
}) {
  const loc = LOCATIONS.find((l) => l.slug === params.location);
  if (!loc) notFound();

  const breadcrumbs = [
    { name: "Home", url: "https://magnat.in" },
    { name: "Locations", url: "https://magnat.in/locations" },
    { name: loc!.name, url: `https://magnat.in/locations/${loc!.slug}` },
  ];

  // Location-specific FAQs
  const locationFAQs = [
    {
      question: `Is there a Magnat Furniture showroom near ${loc!.name}?`,
      answer: `Yes! Magnat Furniture is conveniently located in Kondotty, just a short drive from ${loc!.name}. We are the nearest premium sofa manufacturer serving ${loc!.name} and all of ${loc!.district}. Call +91-9876543210 for directions.`,
    },
    {
      question: `Do you deliver sofas to ${loc!.name}?`,
      answer: `Absolutely! Magnat Furniture offers free delivery to ${loc!.name} and all areas of ${loc!.district}. EMI options are also available. Call us or visit our Kondotty showroom today.`,
    },
    {
      question: `What sofas are available for customers in ${loc!.name}?`,
      answer: `We offer custom L-shape sofas, corner sofas, recliner sofas, fabric sofas, leather sofas, 3- and 5-seater sets, sofa cum beds, and modular sofas — all available for delivery to ${loc!.name}.`,
    },
    {
      question: `Do you offer home consultation in ${loc!.name}?`,
      answer: `Yes, our designers offer free home consultation visits to ${loc!.name} and surrounding areas in ${loc!.district}. Book your slot by calling +91-9876543210.`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={locationFAQs} />

      {/*
        ── NOTE TO DEVELOPER ────────────────────────────────────────────────────
        This page provides full SEO value via:
        1. generateMetadata() — keyword-rich title, description, canonical
        2. BreadcrumbSchema — structured navigation signals to Google
        3. FAQSchema       — FAQ rich results in Google SERPs
        4. Keyword-dense semantic HTML below

        The <article> content below is intentionally rich with location + product
        keyword combinations. You can wrap this inside your existing UI layout/
        page template without changing any visual components.
        ─────────────────────────────────────────────────────────────────────── */}

      <main>
        <article itemScope itemType="https://schema.org/WebPage">
          {/* ── H1: Primary keyword target ── */}
          <h1>
            Best Sofa Manufacturers & Furniture Showroom near {loc!.name},{" "}
            {loc!.district}
          </h1>

          <p>
            Looking for premium quality sofas near <strong>{loc!.name}</strong>?{" "}
            <strong>Magnat Furniture</strong> is the leading sofa manufacturer
            and furniture showroom serving {loc!.name}, {loc!.district}, and all
            of Kerala. Located in Kondotty — just minutes away — we craft
            bespoke sofas, curtains, and interior solutions to transform your home.
          </p>

          <h2>Custom Sofa Manufacturers Near {loc!.name}</h2>
          <p>
            We design and manufacture custom sofas tailored to your exact
            specifications. Customers from {loc!.name} choose Magnat for our
            25+ years of craftsmanship, premium materials, and competitive pricing.
            Whether you need an L-shape sofa, corner sofa, recliner, or a
            full living room set — we deliver to {loc!.name} with free installation.
          </p>

          <h2>Our Products Available for {loc!.name} Customers</h2>
          <ul>
            <li>L-Shape Sofas — custom sized for your living room in {loc!.name}</li>
            <li>Corner Sofas & Sectional Sets near {loc!.name}</li>
            <li>Recliner Sofas — single, double, and triple recliner options</li>
            <li>Leather Sofas — Italian and bonded leather, delivered to {loc!.name}</li>
            <li>Fabric Sofas — 50+ fabric options, mold resistant for Kerala climate</li>
            <li>Wooden Sofas — teak and rosewood frames with custom cushions</li>
            <li>Sofa Cum Beds — space-saving designs for {loc!.name} apartments</li>
            <li>3-Seater & 5-Seater Sofa Sets near {loc!.name}</li>
            <li>Curtains & Drapes — premium fabric with professional installation in {loc!.name}</li>
            <li>Dining Chairs & Tables — custom matching sets</li>
            <li>Office Furniture — ergonomic chairs and workstation sets</li>
          </ul>

          <h2>Why Customers from {loc!.name} Choose Magnat Furniture</h2>
          <ul>
            <li>✅ 25+ Years of Manufacturing Experience</li>
            <li>✅ Free Home Consultation in {loc!.name} & {loc!.district}</li>
            <li>✅ Free Delivery & Professional Installation</li>
            <li>✅ 100% Custom — your design, your size, your fabric</li>
            <li>✅ EMI with 0% Interest (up to 12 months)</li>
            <li>✅ 1-Year Warranty on all products</li>
            <li>✅ After-sales repair & upholstery service</li>
          </ul>

          <h2>Areas We Serve Near {loc!.name}</h2>
          <p>
            In addition to <strong>{loc!.name}</strong>, Magnat Furniture
            provides sofa delivery and home consultation across:{" "}
            <strong>{loc!.nearbyAreas.join(", ")}</strong>, and all towns across
            Malappuram and Kozhikode districts.
          </p>

          <h2>Contact Magnat Furniture — Serving {loc!.name}</h2>
          <address itemScope itemType="https://schema.org/LocalBusiness">
            <meta itemProp="name" content="Magnat Furniture" />
            <p>
              📍 <span itemProp="address">Kondotty Main Road, Kondotty, Malappuram, Kerala – 673638</span>
            </p>
            <p>
              📞 <a href="tel:+919876543210" itemProp="telephone">+91-9876543210</a>
            </p>
            <p>
              🕒 Mon–Sat: 9:00 AM – 8:00 PM | Sun: 10:00 AM – 6:00 PM
            </p>
            <p>
              🚚 Free delivery to {loc!.name} & all of {loc!.district}
            </p>
          </address>
        </article>
      </main>
    </>
  );
}
