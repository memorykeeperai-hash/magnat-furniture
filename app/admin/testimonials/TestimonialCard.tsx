"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Edit2, Trash2, Quote } from "lucide-react";
import { deleteTestimonial } from "@/app/actions/cms";
import { Testimonial } from "@/lib/types";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    toast.warning(`Delete testimonial?`, {
      description: `From ${testimonial.client_name}`,
      action: {
        label: "Delete",
        onClick: async () => {
          setIsDeleting(true);
          const result = await deleteTestimonial(testimonial.id);
          if (result?.error) {
            toast.error("Error", { description: result.error });
            setIsDeleting(false);
          } else {
            toast.success("Deleted");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      }
    });
  };

  if (isDeleting) return null;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#eeeeee] rounded-none p-10 hover:border-[#C0001A] transition-all group relative flex flex-col h-full"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        <Quote size={80} />
      </div>

      <div className="flex items-start justify-between mb-8">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < (testimonial.rating || 5) ? "fill-[#C0001A] text-[#C0001A]" : "text-[#eeeeee]"} 
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href={`/admin/testimonials/${testimonial.id}`}
            className="p-2 text-[#111111]/20 hover:text-[#C0001A] hover:bg-[#F7F4F0] transition-all"
          >
            <Edit2 size={16} />
          </Link>
          <button 
            onClick={handleDelete}
            className="p-2 text-[#111111]/20 hover:text-[#C0001A] hover:bg-[#F7F4F0] transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <blockquote className="text-sm md:text-base text-[#111111]/80 leading-relaxed font-light italic mb-10 flex-1">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center gap-5 pt-8 border-t border-[#f5f5f5]">
        <div className="h-12 w-12 rounded-none bg-[#F7F4F0] flex items-center justify-center text-[#111111] font-black border border-[#eeeeee] overflow-hidden">
          {testimonial.client_image ? (
            <img src={testimonial.client_image} alt={testimonial.client_name} className="w-full h-full object-cover" />
          ) : (
            testimonial.client_name?.charAt(0) || "C"
          )}
        </div>
        <div>
          <h4 className="text-sm font-black text-[#111111] tracking-tight">{testimonial.client_name}</h4>
          <p className="text-[9px] text-[#C0001A] font-bold uppercase tracking-[0.2em] mt-0.5">{testimonial.client_role || "Exclusive Client"}</p>
        </div>
      </div>
    </motion.div>
  );
}
