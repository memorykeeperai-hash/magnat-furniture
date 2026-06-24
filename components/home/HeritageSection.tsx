"use client";

import React from "react";
import { motion } from "framer-motion";
import FadeInView from "@/components/ui/FadeInView";
import SectionHeading from "@/components/ui/SectionHeading";

const trustStats = [
   {
      icon: (
         <svg viewBox="0 0 24 24" fill="none" stroke="#C0001A" strokeWidth={1.8} width={18} height={18}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
         </svg>
      ),
      number: "25",
      suffix: " + Yrs",
      label: "Manufacturing Experience",
   },
   {
      icon: (
         <svg viewBox="0 0 24 24" fill="none" stroke="#C0001A" strokeWidth={1.8} width={18} height={18}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
         </svg>
      ),
      number: "5000",
      suffix: " +",
      label: "Homes Transformed",
   },
   {
      icon: (
         <svg viewBox="0 0 24 24" fill="none" stroke="#C0001A" strokeWidth={1.8} width={18} height={18}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
         </svg>
      ),
      number: "10",
      suffix: " yr",
      label: "Product Warranty",
   },
   {
      icon: (
         <svg viewBox="0 0 24 24" fill="none" stroke="#C0001A" strokeWidth={1.8} width={18} height={18}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
         </svg>
      ),
      number: "100",
      suffix: " %",
      label: "Wood Guaranteed",
   },
];

export default function HeritageSection() {
   return (
      <section className="bg-[#FCFCFC] py-12 md:py-20 relative overflow-hidden">
         <div className="max-container flex flex-col items-center relative z-10 px-4">
            <SectionHeading 
               label="Our Heritage"
               titlePart1="A Legacy of"
               titlePart2="Excellence"
               subtitle="For over 25 years, Magnat has been the benchmark for premium furniture craftsmanship in Kerala, blending traditional artistry with modern design."
               className="mb-12 md:mb-16"
            />
            
            <FadeInView className="w-full max-w-5xl">
               <div className="border-t border-[#eee] pt-10 text-nowrap">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6  md:gap-0 items-start">
                     {trustStats.map((stat, i) => (
                        <div
                           key={i}
                           className={`
                              flex items-start gap-3 text-left justify-start
                              ${i !== 0 ? "md:border-l md:border-[#eee] md:pl-5" : ""}
                              ${i === 1 || i === 3 ? "justify-start sm:justify-start" : ""}
                           `}
                        >
                           {/* Icon */}
                           <div
                              className="w-[40px]  h-[40px] min-w-[40px] rounded-full flex items-center justify-center"
                              style={{
                                 background: "#fff5f5",
                                 border: "1px solid rgba(192,0,26,0.15)",
                              }}
                           >
                              {stat.icon}
                           </div>

                           {/* Text */}
                           <div>
                              <p
                                 className="text-[#111] leading-tight"
                                 style={{
                                    fontFamily: "var(--font-outfit)",
                                    fontSize: "20px",
                                    fontWeight: 900,
                                    letterSpacing: "-0.02em",
                                 }}
                              >
                                 {stat.number}
                                 <span
                                    className="text-[#C0001A]"
                                    style={{ fontSize: "14px", fontWeight: 700 }}
                                 >
                                    {stat.suffix}
                                 </span>
                              </p>
                              <p
                                 className="text-[#666] mt-0.5"
                                 style={{
                                    fontSize: "10px",
                                    lineHeight: "1.3",
                                 }}
                              >
                                 {stat.label}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </FadeInView>
         </div>
      </section>
   );
}