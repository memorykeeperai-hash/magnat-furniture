"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";

const collections = [
  { 
    title: "Sofas & Sectionals", 
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#2b2b2b] to-[#C0001A]"
  },
  { 
    title: "Chairs & Recliners", 
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop",
    gradient: "from-[#3d2b1f] to-[#111111]"
  },
  { 
    title: "Dining Sets", 
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#111111] to-[#4a3a2a]"
  },
  { 
    title: "Curtains & Blinds", 
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#C0001A] to-[#2b2b2b]"
  },
  { 
    title: "Bedroom Furniture", 
    image: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#4a3a2a] to-[#111111]"
  },
  { 
    title: "Full Interior Projects", 
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#111111] to-[#C0001A]"
  },
];

export default function KondottyCollection() {
  return (
    <section id="collection" className="bg-[#F7F4F0] py-32 overflow-hidden">
      <div className="max-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <FadeInView className="max-w-2xl">
              <span className="text-[#C0001A] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block" >
                The Portfolio
              </span>
              <h2 className="text-[20px] md:text-[24px] lg:text-[30px] font-semibold text-[#111111] leading-tight mb-4 md:mb-5 lg:mb-6" >
                Our <span className="italic">Collection.</span>
              </h2>
           </FadeInView>
           <FadeInView delay={0.2}>
              <button className="btn-ghost-dark">View Catalogue</button>
           </FadeInView>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item, index) => (
            <FadeInView key={item.title} delay={index * 0.1} direction="up" className="group">
               <div className="relative aspect-[4/5] bg-[#111] overflow-hidden">
                  {/* Image Placeholder with Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 opacity-20 group-hover:opacity-10 ${item.gradient}`} />
                  
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                  {/* Red Overlay Slide-up */}
                  <motion.div 
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="absolute inset-0 bg-[#C0001A]/90 p-10 flex flex-col justify-end pointer-events-none"
                  >
                     <div className="space-y-4">
                        <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Inquire Now</span>
                        <div className="flex items-center gap-4 text-white">
                           <span className="text-xl font-bold tracking-wider uppercase">Explore</span>
                           <ArrowRight size={24} />
                        </div>
                     </div>
                  </motion.div>

                  {/* Static Label */}
                  <div className="absolute inset-x-0 bottom-0 p-10 group-hover:opacity-0 transition-opacity duration-300">
                     <h3 className="text-3xl font-bold text-white leading-tight" >
                        {item.title}
                     </h3>
                  </div>
               </div>
            </FadeInView>
          ))}
        </div>

      </div>
    </section>
  );
}
