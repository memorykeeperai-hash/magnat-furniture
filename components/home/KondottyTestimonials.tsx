"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";

const reviews = [
  {
    name: "Abdul Rahman",
    location: "Kondotty",
    text: "The sectional sofa we ordered fits perfectly in our new home. The quality of the fabric and the framing is world-class, but with a local soul.",
    rating: 5
  },
  {
    name: "Sana Fathima",
    location: "Calicut",
    text: "Magnat handled our entire interior project. Their curtains and blinds collection is unmatched in Malappuram. Professional and timely.",
    rating: 5
  },
  {
    name: "Rishi Kumar",
    location: "Malappuram",
    text: "I visited their Kondotty showroom and was impressed by the manufacturing process. Buying local never felt this luxury. Outstanding support.",
    rating: 5
  }
];

export default function KondottyTestimonials() {
  return (
    <section className="bg-[#111111] py-32 overflow-hidden border-t border-white/5">
      <div className="max-container">
        
        {/* Header */}
        <div className="text-center mb-24">
           <FadeInView>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-none mb-6" >
                Trusted by <span className="italic text-[#C0001A]">Families.</span>
              </h2>
              <div className="w-16 h-[2px] bg-[#C0001A] mx-auto mb-6" />
              <p className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">Testimonials from across Kerala</p>
           </FadeInView>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {reviews.map((rev, index) => (
             <FadeInView key={rev.name} delay={index * 0.1} className="bg-white/5 p-10 lg:p-12 relative flex flex-col group shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                
                {/* Large Red Quote Mark */}
                <span 
                  className="absolute top-6 right-8 text-[#C0001A] opacity-20 text-8xl font-black select-none pointer-events-none"
                  
                >
                   &ldquo;
                </span>

                <div className="flex gap-1 mb-8">
                   {[...Array(rev.rating)].map((_, i) => (
                     <Star key={i} size={14} className="fill-[#C0001A] text-[#C0001A]" />
                   ))}
                </div>

                <p className="text-[#F7F4F0]/80 text-lg leading-relaxed italic mb-10 flex-grow" >
                   &ldquo;{rev.text}&rdquo;
                </p>

                <div className="pt-8 border-t border-white/5 space-y-1">
                   <h4 className="text-[#F7F4F0] font-bold text-sm tracking-widest uppercase">{rev.name}</h4>
                   <span className="text-[#C0001A] text-[10px] font-bold tracking-[0.2em] uppercase">{rev.location}</span>
                </div>
             </FadeInView>
           ))}
        </div>

      </div>
    </section>
  );
}
