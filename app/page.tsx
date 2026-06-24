import { getHeroSlides } from "@/lib/api/hero";
import { getTestimonials } from "@/lib/api/testimonials";
import { getFeaturedItems } from "@/lib/api/featured";
import { getProcessSteps } from "@/lib/api/process-steps";
import { getClientLogos } from "@/lib/api/client-logos";
import { getInstagramPosts } from "@/lib/api/instagram";
import { createClient } from "@/lib/supabase-server";

import HomeHero from "@/components/home/HomeHero";
import HeritageSection from "@/components/home/HeritageSection";
import SpecialModels from "@/components/home/SpecialModels";
import HomeCollection from "@/components/home/HomeCollection";
import CurtainSpotlight from "@/components/home/CurtainSpotlight";
import HomeCurtains from "@/components/home/HomeCurtains";
import KondottyGallery from "@/components/home/KondottyGallery";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import FAQSchema, { HOMEPAGE_FAQS } from "@/components/schemas/FAQSchema";

export default async function HomePage() {
  // Fetch everything in parallel
  const [
    heroSlides,
    testimonials,
    featuredItems,
    processSteps,
    clientLogos,
    instagramPosts
  ] = await Promise.all([
    getHeroSlides(),
    getTestimonials(),
    getFeaturedItems(),
    getProcessSteps(),
    getClientLogos(),
    getInstagramPosts()
  ]);

  // For categories and sections, we'll fetch from Supabase
  const supabase = await createClient();
  const [{ data: categories }, { data: sections }] = await Promise.all([
    supabase
      .from("categories")
      .select("*")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .limit(6),
    supabase
      .from("homepage_sections")
      .select("*")
      .eq("is_active", true)
  ]);

  const getSection = (key: string) => sections?.find(s => s.section_key === key);

  return (
    <main className="min-h-screen bg-[#FCFCFC]">
      {/* ── SEO Schema Injections (Invisible to users) ── */}
      <FAQSchema faqs={HOMEPAGE_FAQS} />

      {/* ── 1. Cinematic Hero (Premium Standards) ── */}
      <HomeHero slides={heroSlides} />

      {/* ── 3. The 25-Year Heritage (Legacy) ── */}
      <HeritageSection />

      {/* ── 2. Signature Showcase (Special Models) ── */}
      <SpecialModels
        categories={categories || undefined}
        section={getSection("elite-home-collections")}
      />

      {/* ── 4. Main Portfolio Grid (Full Color) ── */}
      <HomeCollection items={featuredItems} />

      {/* ── 4.5 Curtain Spotlight (Indian Style) ── */}
      <CurtainSpotlight
        header={getSection("curtain-spotlight-header")}
        card1={getSection("curtain-spotlight-1")}
        card2={getSection("curtain-spotlight-2")}
      />

      {/* ── 5. Editorial Curtains & Blinds ── */}
      <HomeCurtains steps={processSteps} />

      {/* ── 7. Visual Journey of Craft (Gallery) ── */}
      <KondottyGallery
        posts={instagramPosts}
        section={getSection("instagram-header")}
      />

      {/* ── 8. Trusted Chronicles (Testimonials) ── */}
      {/* <HomeTestimonials reviews={testimonials} /> */}
    </main>
  );
}
