"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";
import { HomepageSection } from "@/lib/types";

interface Props {
  header?: HomepageSection;
  card1?: HomepageSection;
  card2?: HomepageSection;
}

const CurtainSpotlight = ({ header, card1, card2 }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const collections = [
    {
      title: card1?.title || "Premium Drapes",
      description: card1?.description || "Custom floor-to-ceiling drapes tailored to your window size and style preferences.",
      image: card1?.image_url || "/images/curtain-1.jpg",
      link: card1?.cta_url || "/products/curtains",
    },
    {
      title: card2?.title || "Roman Blinds",
      description: card2?.description || "Modern and space-saving window solutions available in a wide variety of fabrics.",
      image: card2?.image_url || "/images/curtain-2.jpg",
      link: card2?.cta_url || "/products/blinds",
    },
  ];

  return (
    <section ref={ref} className="py-12 md:py-20 px-4 bg-[#FAF8F6]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          label="Custom Window Works"
          titlePart1={header?.title?.split(" & ")[0] || "Curtains"}
          titlePart2={header?.title?.split(" & ")[1] || "Roman Blinds"}
          subtitle={header?.subtitle || "Elevate your windows with our custom-made treatments, tailored to your space with premium fabrics."}
          className="mb-10 md:mb-16"
        />

        {/* Clean 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-[#FCFCFC] border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Section */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-[#111] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  {item.description}
                </p>

                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 text-[#C0001A] font-bold text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action bar */}
        <div className="mt-12 p-8 bg-[#FCFCFC] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 shadow-sm">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg text-[#111]">Need a custom measurement?</h4>
            <p className="text-gray-500">Our experts can visit your site for precise curtain fittings.</p>
          </div>
          <a
            href={`https://wa.me/919446516395?text=${encodeURIComponent("Hi MAGNAT Furniture, I'd like to book an appointment for curtain measurements.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#111] text-[#FCFCFC] px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#C0001A] transition-colors"
          >
            Book an Appointment
          </a>
        </div>
      </div>
    </section>
  );
};

export default CurtainSpotlight;