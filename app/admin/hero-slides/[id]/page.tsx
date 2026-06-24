import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import HeroSlideForm from "../HeroSlideForm";

export default async function EditHeroSlidePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: slide, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !slide) {
    notFound();
  }

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl  font-bold text-[#1A1A1A]">Edit Hero Slide</h2>
        <p className="text-xs text-body uppercase tracking-[0.2em] mt-2">Modify the headline and imagery for your cinematic intro</p>
      </div>
      
      <HeroSlideForm slide={slide} />
    </div>
  );
}
