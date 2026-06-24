import { createClient } from "@/lib/supabase-server";
import { Image as ImageIcon, Plus } from "lucide-react";
import Link from "next/link";
import HeroSlideCard from "./HeroSlideCard";

export default async function AdminHeroPage() {
  const supabase = await createClient();
  const { data: slides, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching hero slides:", error);
  }

  return (
    <div className="p-4 md:p-10 font-inter max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-2xl font-playfair font-black text-[#111111] tracking-tight">Main Showcase Cinematic</h2>
          <p className="text-[10px] text-[#C0001A] uppercase tracking-[0.2em] mt-2 font-bold">Manage the first impression of your luxury brand</p>
        </div>
        <Link
          href="/admin/hero-slides/new"
          className="bg-[#111111] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-[#C0001A] transition-all flex items-center gap-3 shadow-lg group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Add New Slide
        </Link>
      </div>

      <div className="space-y-8">
        {slides && slides.length > 0 ? (
          slides.map((slide) => (
            <HeroSlideCard key={slide.id} slide={slide} />
          ))
        ) : (
          <div className="py-32 text-center border border-[#eeeeee] bg-white">
            <ImageIcon size={40} className="mx-auto text-[#111111]/10 mb-6" strokeWidth={1} />
            <h3 className="text-xl font-playfair font-black text-[#111111] mb-2">No Cinematic Slides</h3>
            <p className="text-[10px] text-[#666666] uppercase tracking-widest leading-relaxed">You are currently using the default placeholders. Add custom slides to personalize the hero section.</p>
          </div>
        )}
      </div>
    </div>
  );
}
