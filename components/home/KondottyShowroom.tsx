"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Clock, Phone, MessageSquare } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";

const features = [
  "Free Design Consultation",
  "Custom Manufacturing",
  "Free Home Delivery"
];

export default function KondottyShowroom() {
  return (
    <section id="showroom" className="bg-[#111111] py-32 overflow-hidden relative">
      {/* Decorative Background Text */}
      <div className="absolute top-10 right-0 opacity-5 select-none text-[200px] font-black leading-none text-white pointer-events-none italic">
         VISIT
      </div>

      <div className="max-container flex flex-col lg:flex-row items-center gap-20">
        
        {/* Left: Text & Features */}
        <div className="lg:w-1/2 space-y-12 relative z-10 text-center lg:text-left">
           <FadeInView>
              <h2 className="text-5xl lg:text-7xl font-bold text-white leading-none mb-8" >
                 Come See It.<br />
                 Feel It. <span className="text-[#C0001A] italic">Own It.</span>
              </h2>
              <p className="text-white/40 text-[15px] font-light max-w-md mx-auto lg:mx-0 leading-relaxed mb-10">
                 Experience the premium quality of our handcrafted furniture at our flagship Kondotty studio. 
                 See the textures, test the comfort, and consult with our experts.
              </p>
           </FadeInView>

           <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
              {features.map((feat, i) => (
                <FadeInView key={feat} delay={i * 0.1} className="flex items-center gap-3">
                   <CheckCircle2 size={18} className="text-[#C0001A]" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">{feat}</span>
                </FadeInView>
              ))}
           </div>
        </div>

        {/* Right: Modern Showroom Card */}
        <FadeInView delay={0.4} direction="left" className="lg:w-1/2 w-full">
           <div className="bg-white/5 border border-white/10 p-10 lg:p-16 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C0001A]/10 -mr-16 -mt-16 rounded-full blur-3xl" />
              
              <div className="space-y-12 relative z-10">
                 <div className="space-y-6">
                    <h4 className="text-[9px] font-bold text-[#C0001A] tracking-[0.4em] uppercase">The Flagship Studio</h4>
                    <div className="flex items-start gap-4 text-white">
                       <MapPin size={24} className="text-[#C0001A] shrink-0 mt-1" />
                       <p className="text-2xl font-semibold leading-tight" >
                          Kondotty — Malappuram Road,<br />Next to City Center, Kondotty
                       </p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="space-y-2">
                       <span className="text-white/30 text-[9px] uppercase tracking-widest flex items-center gap-2">
                          <Clock size={12} /> Studio Hours
                       </span>
                       <p className="text-white/70 text-sm font-medium">9:30 AM — 08:30 PM (Mon-Sat)</p>
                    </div>
                    <div className="space-y-2">
                       <span className="text-white/30 text-[9px] uppercase tracking-widest flex items-center gap-2">
                          <Phone size={12} /> Direct Line
                       </span>
                       <p className="text-white/70 text-sm font-medium">+91 9446516395</p>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/10">
                    <a 
                      href="https://wa.me/919446516395" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-red w-full flex items-center justify-center gap-3"
                    >
                       <MessageSquare size={20} />
                       Book Your Visit
                    </a>
                 </div>
              </div>
           </div>
        </FadeInView>

      </div>
    </section>
  );
}
