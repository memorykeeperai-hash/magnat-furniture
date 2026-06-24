"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";

const testimonials = [
  {
    name: "Riya Roy",
    quote: "Recently ordered a custom made furniture set for my living room from Magnat Furniture and couldn't be more impressed with the results. Every detail was tailored to my preferences — the craftsmanship is truly second to none.",
    role: "Architect",
  },
  {
    name: "Sreenath Menon",
    quote: "We had a very warm experience buying a teak almirah and a queen size bed from Magnat. The showroom has an incredible range of options, beautifully displayed. The staff guided us patientsly through every choice.",
    role: "Home Owner",
  },
  {
    name: "Anjali Sharma",
    quote: "The quality of the wood and the precision of the polish is simply unmatched. It has been 5 years since my first purchase, and the pieces still look brand new. Truly a premium furniture experience.",
    role: "Interior Designer",
  },
  {
    name: "Priya Nair",
    quote: "From the first design consultation to final delivery, every step was handled with professionalism and transparency. The bespoke dining table they created is now the heart of our home.",
    role: "Restaurateur",
  },
];

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", slidesToScroll: 1 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="bg-[#f5f2ee] py-24 lg:py-32 px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <FadeInView className="mb-20 text-center">
          <span className="text-[#c9a96e] text-[9px] font-bold tracking-[0.45em] uppercase mb-4 block" >
            Perspectives
          </span>
          <h2 className="text-[#1a1a1a] leading-none mb-6" style={{  fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600 }}>
            Curated <span className="italic">Experiences</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto" />
        </FadeInView>

        <FadeInView direction="up">
          <div className="relative group">
            <div className="embla overflow-hidden px-4" ref={emblaRef}>
              <div className="embla__container flex gap-6 lg:gap-8">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-h-[400px]"
                  >
                    <div className="h-full bg-[#f9f9f9] p-10 lg:p-14 flex flex-col justify-between border border-transparent hover:border-[#c9a96e]/20 transition-all duration-500">
                      
                      <div className="mb-8">
                        <Quote size={32} strokeWidth={1} className="text-[#c9a96e]/30 mb-8" />
                        <p className="text-[#1a1a1a]/70 text-base leading-relaxed font-light italic" >
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-auto">
                         <div className="w-8 h-[1px] bg-[#c9a96e]/30" />
                         <div>
                            <h4 className="text-[#1a1a1a] text-[11px] font-bold tracking-[0.2em] uppercase" >
                              {testimonial.name}
                            </h4>
                            <span className="text-[#c9a96e] text-[9px] uppercase tracking-widest mt-1 block" >
                              {testimonial.role}
                            </span>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows — Refined Gold Circles */}
            <div className="hidden lg:flex justify-center gap-6 mt-16">
               <button 
                  onClick={scrollPrev}
                  className="w-12 h-12 flex items-center justify-center border border-[#1a1a1a]/10 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 rounded-full"
                  aria-label="Previous Testimonial"
               >
                 <ChevronLeft size={18} strokeWidth={1.5} />
               </button>
               <button 
                  onClick={scrollNext}
                  className="w-12 h-12 flex items-center justify-center border border-[#1a1a1a]/10 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 rounded-full"
                  aria-label="Next Testimonial"
               >
                 <ChevronRight size={18} strokeWidth={1.5} />
               </button>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
