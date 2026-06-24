"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInView from "@/components/ui/FadeInView";

const highlights = [
  {
    title: "The Lounge Suite",
    description: "Sculptural forms designed for the modern architectural home.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    href: "/products?category=sofas",
    size: "lg:col-span-3",
  },
  {
    title: "Executive Objects",
    description: "Functionality meet the aesthetic of leadership.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
    href: "/products?category=chairs",
    size: "lg:col-span-2",
  },
];

export default function HighlightCards() {
  return (
    <section className="bg-[#f5f2ee] py-24 lg:py-32 px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        <FadeInView className="mb-16">
           <span className="text-[#c9a96e] text-[9px] font-bold tracking-[0.45em] uppercase mb-4 block" >
            Curated Spaces
          </span>
          <h2 className="text-[#1a1a1a] leading-none" style={{  fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
             Articulated <span className="italic">Lifestyles</span>
          </h2>
          <div className="mt-6 w-12 h-[1px] bg-[#c9a96e]" />
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {highlights.map((item, i) => (
            <FadeInView key={item.title} delay={i * 0.2} className={`${item.size}`}>
              <Link href={item.href} className="group relative block h-[500px] lg:h-[650px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale-[0.5] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-700" />

                {/* Content Box — Editorial Vertical Layout */}
                <div className="absolute inset-0 p-10 lg:p-14 flex flex-col items-start justify-end pointer-events-none">
                   <div className="bg-white/95 backdrop-blur-sm p-8 lg:p-10 max-w-sm border border-black/5 translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                      <h3 className="text-[#1a1a1a] text-2xl lg:text-3xl font-semibold mb-3 leading-tight" >
                        {item.title}
                      </h3>
                      <p className="text-[#1a1a1a]/60 text-sm font-light leading-relaxed mb-8" >
                        {item.description}
                      </p>
                      <span className="text-[#c9a96e] text-[9px] font-bold tracking-[0.3em] uppercase flex items-center gap-3">
                         Explore Gallery
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                         </svg>
                      </span>
                   </div>
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
