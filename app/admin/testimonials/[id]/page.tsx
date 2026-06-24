import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import TestimonialForm from "../TestimonialForm";

export default async function EditTestimonialPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: testimonial, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !testimonial) {
    notFound();
  }

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl  font-bold text-[#1A1A1A]">Edit Review</h2>
        <p className="text-xs text-body uppercase tracking-[0.2em] mt-2">Update client feedback or adjust the rating</p>
      </div>
      
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
