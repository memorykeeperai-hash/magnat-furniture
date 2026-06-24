"use client";

import FadeInView from "@/components/ui/FadeInView";
import Image from "next/image";

export default function ShowroomsPage() {
  return (
    <main className="pb-5 md:py-15 min-h-[80vh] bg-white">
      <div className="max-container">
        
        <FadeInView className="text-center mb-10">
          <h1 
            className="text-3xl md:text-4xl font-bold text-[#e81111] uppercase tracking-[0.2em]" 
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Showrooms
          </h1>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-7xl mx-auto">
          
          {/* Left Column: Showroom Image */}
          <FadeInView direction="right" className="w-full h-full flex flex-col justify-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl group">
              <Image 
                src="/images/showroom-demo.png" 
                alt="MAGNAT Furniture Showroom"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeInView>

          {/* Right Column: Simple Details */}
          <FadeInView direction="left" className="space-y-8 flex flex-col justify-center h-full">
            <div className="space-y-6 text-[#666666] text-base md:text-lg leading-relaxed text-start md:text-center lg:text-left">
              <p>
                Welcome to the MAGNAT Showroom. Step inside to experience a curated selection of our finest luxury home furniture, where quality materials meet exceptional craftsmanship. 
              </p>
              
              <p>
                Browse through our latest arrivals, feel the premium fabrics, and discover how our bespoke collections can transform your living spaces. Our dedicated team is always ready to guide you in choosing the perfect pieces that reflect your style and comfort.
              </p>

              <div className="pt-8">
                <p className="font-semibold text-[#111111]">
                  Talk to us or book an appointment for a personalized tour of the showroom, product demo or consultation on home furnishing.
                </p>
                <p className="font-bold text-[#111111] mt-4 tracking-wide uppercase text-sm">
                  We deliver across Kerala.
                </p>
              </div>
            </div>
          </FadeInView>

        </div>
      </div>
    </main>
  );
}
