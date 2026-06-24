"use client";

import FadeInView from "@/components/ui/FadeInView";
import { ClientLogo } from "@/lib/types";

const FALLBACK_LOGOS: ClientLogo[] = [
  { id: "1", name: "PRESTIGE INTERIORS", logo_url: "", is_active: true, sort_order: 0 },
  { id: "2", name: "HILTON GROUP", logo_url: "", is_active: true, sort_order: 1 },
  { id: "3", name: "OBEROI HOTELS", logo_url: "", is_active: true, sort_order: 2 },
  { id: "4", name: "KOCHI METRO", logo_url: "", is_active: true, sort_order: 3 },
  { id: "5", name: "LULU MALL", logo_url: "", is_active: true, sort_order: 4 },
  { id: "6", name: "GRAND HYATT", logo_url: "", is_active: true, sort_order: 5 },
  { id: "7", name: "MARRIOTT INTERNATIONAL", logo_url: "", is_active: true, sort_order: 6 },
];

export default function ClientLogos({ logos }: { logos?: ClientLogo[] }) {
  const activeLogos = logos && logos.length > 0 ? logos : FALLBACK_LOGOS;
  const tickerItems = [...activeLogos, ...activeLogos];

  return (
    <section className="bg-[#f5f2ee] py-24 border-y border-[#1a1a1a]/5 overflow-hidden">
      <div className="container mx-auto px-8 lg:px-16 mb-12">
        <h4 className="text-center text-[9px] font-bold uppercase tracking-[0.45em] text-[#c9a96e]" >
          The Portfolio of Trust
        </h4>
      </div>
      
      <FadeInView delay={0.2} direction="none" duration={1.5}>
        <div className="relative flex items-center">
          
          <div className="flex animate-marquee hover:pause whitespace-nowrap">
            {tickerItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-6 mx-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
              >
                {item.logo_url ? (
                  <img src={item.logo_url} alt={item.name} className="h-8 w-auto object-contain" />
                ) : (
                  <span className="text-xl  font-black tracking-tighter whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#f5f2ee] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#f5f2ee] to-transparent z-10 pointer-events-none" />
        </div>
      </FadeInView>
    </section>
  );
}
