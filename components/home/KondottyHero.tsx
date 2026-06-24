"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function KondottyHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center bg-[#111111]">
      
      {/* ── Background: Thematic Gradient ── */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background: "linear-gradient(135deg, #111111 0%, #2b2b2b 40%, #5a3e10 100%)",
        }}
      />
      
      {/* ── Overlay Textures ── */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111]/90 via-[#111]/40 to-transparent z-[2]" />

      <div className="max-container relative z-10 w-full pt-20">
        <div className="max-w-4xl space-y-10">
          
          <div className="space-y-4">
             <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="block text-[#C0001A] font-bold text-[10px] tracking-[0.5em] uppercase"
             >
                Established 2001 | Kondotty
             </motion.span>
             
             <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#F7F4F0] leading-[1.05] font-bold tracking-tight"
              style={{  fontSize: "clamp(3rem, 12vw, 7.5rem)" }}
             >
                Crafted for Kerala.<br />
                <span className="italic font-normal text-white/90">Built to Last.</span>
             </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#F7F4F0]/60 text-lg lg:text-2xl font-light leading-relaxed max-w-2xl border-l-[3px] border-[#C0001A]/40 pl-6 lg:pl-10"
          >
             Sofas, Dining, Curtains & Full Interiors — 
             <span className="text-white font-semibold"> Manufactured in Kondotty</span> for the modern Kerala home.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6 pt-6"
          >
             <Link href="#collection" className="btn-red group">
                Explore Collection
                <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link href="#showroom" className="btn-ghost-white">
                Visit Showroom
             </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Subtle Texture ── */}
      <div className="absolute bottom-0 right-0 p-20 opacity-10 pointer-events-none select-none">
         <span className="text-[180px] font-black leading-none text-white italic">M</span>
      </div>
    </section>
  );
}
