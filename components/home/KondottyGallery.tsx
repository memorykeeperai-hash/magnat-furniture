"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeInView from "@/components/ui/FadeInView";
import SectionHeading from "@/components/ui/SectionHeading";
import { Instagram } from "lucide-react";
import { InstagramPost, HomepageSection } from "@/lib/types";

// Local fallback — used until backend instagram_posts table is populated
const FALLBACK_ITEMS = [
   { id: "f1", image_url: "/images/bedroom-001.jpg",    caption: "Royal Living",    post_url: null },
   { id: "f2", image_url: "/images/dining-001.jpg",     caption: "Classic Dining",  post_url: null },
   { id: "f3", image_url: "/images/insta-post-001.jpg", caption: "Studio Vibe",     post_url: null },
   { id: "f4", image_url: "/images/living-chairs.jpg",  caption: "Lounge Area",     post_url: null },
   { id: "f5", image_url: "/images/kids-room.jpg",      caption: "Kids Space",      post_url: null },
   { id: "f6", image_url: "/images/outdoor.jpg",        caption: "Outdoor Decor",   post_url: null },
   { id: "f7", image_url: "/images/sofa-002.jpg",       caption: "Modern Comfort",  post_url: null },
] satisfies Pick<InstagramPost, "id" | "image_url" | "caption" | "post_url">[];

interface Props {
   posts?: InstagramPost[];
   section?: HomepageSection;
}

export default function KondottyGallery({ posts, section }: Props) {
   const [isPaused, setIsPaused] = useState(false);

   // Use backend data when available, otherwise use local fallback
   const items = posts && posts.length > 0 ? posts : FALLBACK_ITEMS;

   // Duplicate for seamless infinite loop
   const displayItems = [...items, ...items];

   // Extract handle from subtitle for the cards
   const fullSubtitle = section?.subtitle || "@magnat_furniture_.kondotty — Follow us for the latest in architectural furniture trends and studio masterpieces.";
   const handleWithAt = fullSubtitle.split(" ")[0];
   const handle = handleWithAt.startsWith("@") ? handleWithAt.slice(1) : handleWithAt;
   const location = section?.description || "Kondotty, Kerala";

   return (
      <section className="bg-[#FCFCFC] py-12 md:py-20 overflow-hidden">
         <div className="max-container px-4 mb-10 md:mb-16">
            <SectionHeading 
               label="Visual Journey"
               titlePart1={section?.title?.split(" ").slice(0, 2).join(" ") || "We're on"}
               titlePart2={section?.title?.split(" ").slice(2).join(" ") || "Instagram"}
               subtitle={
                  <a 
                     href="https://www.instagram.com/magnat_furniture_.kondotty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="hover:text-[#C0001A] transition-colors"
                  >
                     {fullSubtitle}
                  </a>
               }
            />
         </div>

         {/* Marquee Container */}
         {/* ... (rest of the component) */}
         <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ contain: "layout style paint" }}
         >
            {/* Left fade */}
            <div
               className="absolute left-0 top-0 bottom-0 w-32 lg:w-40 z-10 pointer-events-none"
               style={{ background: "linear-gradient(to right, #FAF9F6 0%, transparent 100%)" }}
               aria-hidden="true"
            />
            {/* Right fade */}
            <div
               className="absolute right-0 top-0 bottom-0 w-32 lg:w-40 z-10 pointer-events-none"
               style={{ background: "linear-gradient(to left, #FAF9F6 0%, transparent 100%)" }}
               aria-hidden="true"
            />

            {/* Scrolling track */}
            <div
               className={`marquee-track${isPaused ? " paused" : ""}`}
               style={{
                  display: "flex",
                  gap: "24px",
                  width: "max-content",
                  paddingInline: "24px",
                  willChange: "transform",
               }}
            >
               {displayItems.map((item, index) => (
                  <a
                     key={`${item.id}-${index}`}
                     href={item.post_url || "https://www.instagram.com/magnat_furniture_.kondotty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-[280px] md:w-[320px] flex-shrink-0 bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-black/5 cursor-pointer block hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 group"
                  >
                     {/* Feed Header */}
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-red-600 p-[2px]">
                           <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                              {section?.image_url ? (
                                 <img 
                                    src={section.image_url} 
                                    alt={handle} 
                                    className="w-full h-full object-cover"
                                 />
                              ) : (
                                 <span className="text-[10px] font-bold text-red-600">
                                    {handle.charAt(0).toUpperCase()}
                                 </span>
                              )}
                           </div>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[12px] font-bold tracking-tight">{handle}</span>
                           <span className="text-[10px] text-gray-400">{location}</span>
                        </div>
                     </div>

                     {/* Image */}
                     <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-100 mb-4">
                        <img
                           src={item.image_url}
                           alt={item.caption ?? "Magnat Furniture"}
                           decoding="async"
                           fetchPriority="low"
                           width={320}
                           height={320}
                           className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
                        />
                     </div>

                     {/* Feed Footer */}
                     <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-gray-500">
                           {item.caption ?? "Magnat Furniture"}
                        </span>
                        <div className="text-gray-400 group-hover:text-black transition-colors">
                           <Instagram size={18} />
                        </div>
                     </div>
                  </a>
               ))}
            </div>
         </div>
      </section>
   );
}