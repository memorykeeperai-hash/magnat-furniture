import { createClient } from "@/lib/supabase-server";
import { Users, Plus } from "lucide-react";
import Link from "next/link";
import TestimonialCard from "./TestimonialCard";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
  }

  return (
    <div className="p-4 md:p-10 font-inter max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-2xl font-playfair font-black text-[#111111] tracking-tight">Client Testimonials</h2>
          <p className="text-[10px] text-[#C0001A] uppercase tracking-[0.2em] mt-2 font-bold">Manage public reviews and feedback</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="bg-[#111111] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-[#C0001A] transition-all flex items-center gap-3 shadow-lg group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Add New Review
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))
        ) : (
          <div className="col-span-full py-32 text-center border border-[#eeeeee] bg-white">
            <Users size={40} className="mx-auto text-[#111111]/10 mb-6" strokeWidth={1} />
            <h3 className="text-xl font-playfair font-black text-[#111111] mb-2">No Reviews Yet</h3>
            <p className="text-[10px] text-[#666666] uppercase tracking-widest leading-relaxed">Share customer feedback on your homepage to build trust.</p>
          </div>
        )}
      </div>
    </div>
  );
}
