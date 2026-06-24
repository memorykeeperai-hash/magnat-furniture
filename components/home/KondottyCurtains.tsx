"use client";

import { motion } from "framer-motion";
import FadeInView from "@/components/ui/FadeInView";

const swatches = [
  { name: "Cream", hex: "#F5F5DC" },
  { name: "Slate", hex: "#708090" },
  { name: "Nutmeg", hex: "#7E5E52" },
  { name: "Cloud", hex: "#F8F8F8" },
  { name: "Indigo", hex: "#1A237E" },
  { name: "Oatmeal", hex: "#D2B48C" },
];

export default function KondottyCurtains() {
  return (
    <section id="curtains" className="bg-[#F7F4F0] py-32 overflow-hidden border-t border-black/5">
      <div className="max-container">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          
          {/* Left: Editorial Image */}
          <FadeInView direction="right" className="lg:w-1/2 w-full aspect-[4/5] relative">
             <div className="absolute inset-0 border-[1.5rem] border-white shadow-2xl z-20 pointer-events-none" />
             <img 
               src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop" 
               alt="Bespoke Curtains and Blinds"
               className="w-full h-full object-cover z-10"
             />
             <div className="absolute top-10 left-10 w-24 h-24 bg-[#C0001A] z-0 blur-[80px] opacity-20" />
          </FadeInView>

          {/* Right: Text & Swatches */}
          <div className="lg:w-1/2 space-y-12">
             <FadeInView>
                <h4 className="text-[#C0001A] text-[10px] font-bold tracking-[0.45em] uppercase mb-6" >
                   Custom Window Solutions
                </h4>
                <h2 className="text-5xl lg:text-7xl font-bold text-[#111] leading-none mb-8" >
                   Dress Every <span className="italic">Window.</span>
                </h2>
                <div className="w-20 h-[2px] bg-[#C0001A] mb-10" />
                <p className="text-xl text-black/55 font-light leading-relaxed max-w-xl">
                   From ethereal sheers that capture the morning light to professional blackout solutions 
                   for total privacy. Zebra blinds, roller blinds, and floor-to-ceiling drapes — 
                   all custom manufactured to the exact measurements of your home.
                </p>
             </FadeInView>

             <div className="space-y-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/30">Available Texture Palette</span>
                <div className="flex flex-wrap gap-4">
                   {swatches.map((color, i) => (
                     <FadeInView key={color.name} delay={i * 0.1} className="group relative">
                        <div 
                          className="w-12 h-12 rounded-full border border-black/5 cursor-pointer transition-transform hover:scale-110 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold uppercase tracking-widest text-[#C0001A] whitespace-nowrap">
                           {color.name}
                        </span>
                     </FadeInView>
                   ))}
                </div>
             </div>

             <FadeInView delay={0.4} className="pt-6">
                <button className="btn-red">Request a Site Measurement</button>
             </FadeInView>
          </div>

        </div>
      </div>
    </section>
  );
}
