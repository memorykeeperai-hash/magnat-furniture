"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInView from "@/components/ui/FadeInView";

export default function BannerSection() {
  return (
    <section className="relative h-[650px] overflow-hidden bg-[#1a1a1a]">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2560&auto=format&fit=crop"
          alt="Luxury Interior Design Consultation"
          fill
          sizes="100vw"
          className="object-cover opacity-60 grayscale-[0.3]"
        />
        {/* Deep, nuanced gradient for editorial texture */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d0d0d]/80 via-[#0d0d0d]/40 to-transparent" />
      </div>

      {/* Content Area */}
      <div className="relative z-10 w-full h-full flex items-center px-8 lg:px-24">
        <div className="max-w-4xl pt-12">
          
          <FadeInView direction="up">
            <span className="text-[#c9a96e] text-[9px] font-bold tracking-[0.5em] uppercase mb-8 block" >
              The Concierge Service
            </span>
            
            <h2 className="text-white leading-[1.05] mb-8" style={{  fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", fontWeight: 600 }}>
              Design Your <span className="italic text-[#dfc08a]">Private Sanctuary</span>
            </h2>
            
            <div className="w-20 h-[1px] bg-[#c9a96e] mb-10" />
            
            <p className="text-white/60 text-lg lg:text-xl font-light leading-relaxed max-w-2xl mb-12" >
              Consult with our master designers to create a bespoke living environment that becomes an extension of your legacy. Every detail is a testament to your taste.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                href="/contact"
                className="bg-[#c9a96e] hover:bg-[#b8976a] text-[#1a1a1a] px-10 py-4 text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300"
                
              >
                Book a Consultation
              </Link>
              <Link
                href="/about"
                className="border border-white/20 text-white hover:border-white px-10 py-4 text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300"
                
              >
                Our Legacy
              </Link>
            </div>
          </FadeInView>

        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-12 bottom-0 w-px h-32 bg-gradient-to-t from-[#c9a96e]/40 to-transparent hidden lg:block" />
      
    </section>
  );
}
