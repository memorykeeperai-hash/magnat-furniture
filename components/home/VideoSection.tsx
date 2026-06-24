"use client";

import Image from "next/image";
import FadeInView from "@/components/ui/FadeInView";

const craftStories = [
  {
    thumbnail: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2064&auto=format&fit=crop",
    title: "Master Craftsmanship",
    description: "Every joint, every curve is shaped by decades of expertise passed down through generations of master artisans.",
    stat: "200+",
    statLabel: "Expert Artisans",
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1616137422495-1e96aadd3461?q=80&w=2000&auto=format&fit=crop",
    title: "Premium Materials",
    description: "We source only the finest sustainably harvested teak, rosewood, and imported hardwoods for lasting structural integrity.",
    stat: "100%",
    statLabel: "Sustainably Sourced",
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1634643836960-c345b3c3e998?q=80&w=1964&auto=format&fit=crop",
    title: "Design Philosophy",
    description: "Where classical woodcraft traditions meet contemporary minimalism — furniture that transcends passing trends.",
    stat: "25+",
    statLabel: "Years of Legacy",
  },
];

export default function VideoSection() {
  return (
    <section className="bg-[#f5f2ee] py-24 lg:py-32 px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <FadeInView className="mb-20">
          <span className="text-[#c9a96e] text-[9px] font-bold tracking-[0.45em] uppercase mb-4 block" >
            The Artisan Way
          </span>
          <h2 className="text-[#1a1a1a] leading-none mb-6" style={{  fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600 }}>
            Stories Behind <span className="italic">The Design</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#c9a96e] mb-6" />
        </FadeInView>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 min-h-[600px]">
          {craftStories.map((story, index) => (
            <FadeInView key={story.title} delay={index * 0.2} className="group relative overflow-hidden h-full">
              <Image
                src={story.thumbnail}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-[#0d0d0d]/30 to-transparent transition-opacity duration-700" />
              
              <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end h-full">
                {/* Stat */}
                <div className="mb-8 overflow-hidden">
                  <span className="text-[#c9a96e] text-5xl font-bold block leading-none translate-y-2 group-hover:translate-y-0 transition-transform duration-700" >
                    {story.stat}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mt-2 block" >
                    {story.statLabel}
                  </span>
                </div>
                
                {/* Divider */}
                <div className="h-[1px] w-12 bg-[#c9a96e]/40 mb-8 transition-all duration-700 group-hover:w-full" />
                
                {/* Title & Description */}
                <h3 className="text-white text-2xl font-semibold mb-4 leading-tight" >
                  {story.title}
                </h3>
                <p className="text-white/50 text-[13px] leading-relaxed font-light max-w-xs transition-colors group-hover:text-white/70" >
                  {story.description}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>

      </div>
    </section>
  );
}
