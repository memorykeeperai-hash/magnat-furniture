import { getProducts } from "@/lib/api/products";
import { createClient } from "@/lib/supabase-server";
import ProductsListClient from "@/components/products/ProductsListClient";
import FadeInView from "@/components/ui/FadeInView";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProductsPage() {
  const products = await getProducts();

  // Fetch categories for the filter
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <main className=" min-h-screen bg-white">

      {/* Hero Header */}
      <section className="relative md:py-20 overflow-hidden border-b border-[#eeeeee]">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111111' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-container relative z-10">
          <FadeInView className="max-w-4xl ">
            <div className="flex items-center gap-4">
              <span className="heading-label">Kondotty Craftsmanship</span>
              <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-[#C0001A]/30 to-transparent"></div>
            </div>

            <h1
              className="text-[26px] md:text-[34px] lg:text-[44px] font-semibold leading-tight tracking-tight mb-4 md:mb-3 lg:mb-6"

            >
              Signature <span className="italic font-normal text-[#C0001A]">Collection</span>
            </h1>

            <p className="text-md md:text-md text-[#666666] font-light max-w-3xl leading-relaxed">
              Each piece tells a story of 25 years of manufacturing excellence. Handcrafted in Kondotty,
              designed to become part of your family's legacy.
            </p>

            <div className="flex flex-wrap gap-8 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#C0001A] rounded-full"></div>
                <span className="text-sm text-[#111111] font-medium">{products.length} Pieces Available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#C0001A] rounded-full"></div>
                <span className="text-sm text-[#111111] font-medium">Custom Manufacturing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#C0001A] rounded-full"></div>
                <span className="text-sm text-[#111111] font-medium">Direct Factory Pricing</span>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Dynamic Products List */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading collection...</div>}>
        <ProductsListClient initialProducts={products} categories={categories || []} />
      </Suspense>

      {/* Custom Design CTA */}
      <section className="relative py-32 md:py-40 bg-[#111111] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0001A]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="max-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <FadeInView className="flex-1 max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-[#C0001A] text-white text-[9px] font-bold tracking-[0.3em] uppercase mb-6">
                Bespoke Manufacturing
              </span>
              <h2 className="heading-title" >
                Can&apos;t find the exact piece?
              </h2>
              <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
                Our Kondotty studio specializes in bespoke furniture design. Share your inspiration
                and we&apos;ll manufacture it tailored to your home. From concept to installation,
                we bring your vision to life with Kerala&apos;s finest craftsmanship.
              </p>

              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-[#C0001A] mb-1" >25+</div>
                  <div className="text-xs uppercase tracking-widest text-white/60">Years Experience</div>
                </div>
                <div className="w-px bg-white/20"></div>
                <div>
                  <div className="text-3xl font-bold text-[#C0001A] mb-1" >500+</div>
                  <div className="text-xs uppercase tracking-widest text-white/60">Custom Pieces</div>
                </div>
                <div className="hidden sm:block w-px bg-white/20"></div>
                <div>
                  <div className="text-3xl font-bold text-[#C0001A] mb-1" >100%</div>
                  <div className="text-xs uppercase tracking-widest text-white/60">Satisfaction</div>
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={0.2} className="lg:text-right">
              <Link href="/contact">
                <button className="group relative px-10 py-5 bg-white text-[#111111] font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#C0001A] hover:text-white overflow-hidden">
                  <span className="relative z-10">Request Custom Design</span>
                  <div className="absolute inset-0 bg-[#C0001A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </Link>
              <p className="text-sm text-white/50 mt-4">
                Or call us at <a href="tel:+919446516395" className="text-white hover:text-[#C0001A] transition-colors">+91 94465 16395</a>
              </p>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 md:py-32 bg-[#f9f9f9]">
        <div className="max-container">
          <FadeInView className="text-center mb-16">
            <span className="heading-label">The MAGNAT™ Difference</span>
            <h2 className="heading-title mt-4" >
              Why Kondotty Families Trust Us
            </h2>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Factory Direct",
                desc: "No middlemen. You buy directly from our Kondotty manufacturing unit at honest prices.",
                icon: "🏭"
              },
              {
                title: "Lifetime Support",
                desc: "Every piece comes with our commitment. We're here for repairs, refinishing, or advice—always.",
                icon: "🤝"
              },
              {
                title: "Kerala Craftsmanship",
                desc: "Made by local artisans who've perfected their craft over generations. Supporting local talent.",
                icon: "🎨"
              }
            ].map((item, i) => (
              <FadeInView key={item.title} delay={i * 0.1}>
                <div className="p-8 bg-white hover:shadow-xl transition-all duration-500 group">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3" >
                    {item.title}
                  </h3>
                  <p className="text-[#666666] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}