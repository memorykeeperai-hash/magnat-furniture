"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import FadeInView from "@/components/ui/FadeInView";

function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function KondottyStats() {
  return (
    <section className="bg-white py-32 overflow-hidden border-b border-black/5">
      <div className="max-container">
        <div className="flex flex-col lg:flex-row gap-20 lg:items-center">
          
          {/* Left: Branding Block */}
          <div className="lg:w-1/2 space-y-8">
             <div className="w-16 h-1 bg-[#C0001A] mb-8" />
             <FadeInView>
                <h2 className="text-5xl lg:text-7xl font-bold text-[#111] leading-none mb-8" >
                   Kerala&apos;s Own.<br />
                   <span className="italic text-[#C0001A]">Crafted With Pride.</span>
                </h2>
                <p className="text-xl text-black/55 font-light leading-relaxed max-w-lg">
                   At Magnat, every sofa, chair and curtain is manufactured right here in Kondotty — 
                   designed for Kerala homes, climate and culture. We don&apos;t just sell furniture; 
                   we build the centerpieces of your family life.
                </p>
             </FadeInView>
          </div>

          {/* Right: Modern Stats Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-10">
             
             <FadeInView delay={0.1} className="flex flex-col">
                <span className="text-6xl font-black text-[#111] mb-2" >
                   <CountUp end={500} suffix="+" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C0001A]">Happy Homes</span>
                <div className="mt-4 h-px w-8 bg-black/10" />
             </FadeInView>

             <FadeInView delay={0.2} className="flex flex-col">
                <span className="text-6xl font-black text-[#111] mb-2" >
                   <CountUp end={10} suffix="+" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C0001A]">Years Experience</span>
                <div className="mt-4 h-px w-8 bg-black/10" />
             </FadeInView>

             <FadeInView delay={0.3} className="flex flex-col">
                <span className="text-6xl font-black text-[#111] mb-2" >
                   <CountUp end={1000} suffix="+" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C0001A]">Products Made</span>
                <div className="mt-4 h-px w-8 bg-black/10" />
             </FadeInView>

          </div>
        </div>
      </div>
    </section>
  );
}
