"use client";

import { Award, ShieldCheck, PencilRuler, Truck } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Award,
    title: "Heritage Quality",
    description: "Rigorous standards for lasting beauty and structural integrity.",
  },
  {
    icon: ShieldCheck,
    title: "Rare Materials",
    description: "The finest sustainably sourced solid hardwoods and full-grain leathers.",
  },
  {
    icon: PencilRuler,
    title: "Bespoke Design",
    description: "Furniture tailored to the unique geometry of your architectural space.",
  },
  {
    icon: Truck,
    title: "White Glove Delivery",
    description: "Expert installation and placement by our master logistics team.",
  },
];

export default function ExperienceSection() {
  return (
    <section className="bg-[#FAF8F6] py-12 md:py-20 relative overflow-hidden">
      <div className="max-container px-4">
        <SectionHeading 
          label="Our Experience"
          titlePart1="A Quarter Century of"
          titlePart2="Timeless Design"
          subtitle="For 25 years, we have mastered the delicate balance between heritage woodcraft and contemporary vision—defining a legacy in every home we transform."
          className="mb-12 md:mb-16"
        />

        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          {/* ── Left: Images/Stats ── */}
          <div className="w-full lg:w-1/2">
            <FadeInView direction="right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-8">
                <img src="/images/living-chairs.jpg" alt="Magnat Heritage" className="w-full h-full object-cover" />
              </div>

                {/* Enhanced 25y Highlight Badge */}
                <div className="flex items-center gap-10 justify-center lg:justify-start">
                   <div className="flex flex-col items-start border-l-2 border-[#C0001A] pl-6">
                      <span className="text-[#C0001A] text-[32px] font-bold leading-none mb-2" >25+</span>
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]" >Years Experience</span>
                   </div>
                   <div className="flex flex-col items-start border-l-2 border-[#C0001A] pl-6">
                      <span className="text-[#111] text-[32px] font-bold leading-none mb-2" >5000+</span>
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]" >Homes Transformed</span>
                   </div>
                </div>
            </FadeInView>
          </div>

          {/* ── Right: Refined Features ── */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
              {features.map((feature, i) => (
                <FadeInView key={feature.title} delay={0.2 + i * 0.1}>
                  <div className="group flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
                    {/* Architectural icon framing */}
                    <div className="relative w-14 h-14 flex items-center justify-center border border-gray-100 rounded-full transition-all duration-700 bg-[#FCFCFC] group-hover:bg-[#C0001A] shadow-sm">
                      <feature.icon size={22} className="text-[#111] group-hover:text-[#FCFCFC] transition-colors duration-500" />
                    </div>
                    
                    <div>
                      <h4 className="text-[#111] text-[12px] font-bold tracking-[0.25em] uppercase mb-4" >
                        {feature.title}
                      </h4>
                      <p className="text-gray-500 text-[14px] leading-relaxed" >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}