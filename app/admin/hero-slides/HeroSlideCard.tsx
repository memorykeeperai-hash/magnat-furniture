"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteHeroSlide, saveHeroSlide } from "@/app/actions/cms";
import { HeroSlide } from "@/lib/types";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface HeroSlideCardProps {
  slide: HeroSlide;
}

export default function HeroSlideCard({ slide }: HeroSlideCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActive, setIsActive] = useState(slide.is_active);

  const handleDelete = async () => {
    toast.warning(`Delete slide?`, {
      description: slide.heading,
      action: {
        label: "Delete",
        onClick: async () => {
          setIsDeleting(true);
          const result = await deleteHeroSlide(slide.id);
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

  const toggleStatus = async () => {
    const newStatus = !isActive;
    const formData = new FormData();
    formData.append("id", slide.id);
    formData.append("heading", slide.heading);
    formData.append("description", slide.description || "");
    formData.append("image_url", slide.image_url);
    formData.append("is_active", newStatus.toString());

    setIsActive(newStatus);
    const result = await saveHeroSlide(formData);
    if (result?.error) {
      toast.error("Failed to update status", { description: result.error });
      setIsActive(isActive); // Revert
    } else {
      toast.success(newStatus ? "Slide is now active" : "Slide is now hidden");
    }
  };

  if (isDeleting) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-[#eeeeee] rounded-none overflow-hidden hover:border-[#C0001A] transition-all group flex flex-col md:flex-row h-auto md:h-56 relative shadow-sm"
    >
      <div className="w-full md:w-96 h-48 md:h-full relative shrink-0 overflow-hidden">
        <img src={slide.image_url} alt={slide.heading} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className={`absolute inset-0 transition-all duration-500 ${isActive ? "bg-black/5" : "bg-black/70 backdrop-blur-sm"}`} />
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white border border-white/20 px-4 py-2 bg-black/40">Inactive Canvas</span>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col justify-center flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C0001A] bg-[#F7F4F0] px-3 py-1">SEQUENCE {slide.sort_order + 1}</span>
        </div>
        <h3 className="font-playfair text-2xl font-black text-[#111111] mb-3 tracking-tight">{slide.heading}</h3>
        <p className="text-xs text-[#111111]/60 line-clamp-2 max-w-xl font-light italic leading-relaxed">
          {slide.description}
        </p>
      </div>

      <div className="px-8 py-6 md:py-0 flex flex-row md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-[#f5f5f5] bg-[#fafafa]/50 md:bg-transparent">
        <button
          onClick={toggleStatus}
          className={`p-4 transition-all rounded-none border ${isActive ? "text-[#111111]/30 border-[#eeeeee] hover:text-[#111111] hover:bg-white" : "text-white bg-[#C0001A] border-[#C0001A]"}`}
          title={isActive ? "Hide Slide" : "Show Slide"}
        >
          {isActive ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        <Link
          href={`/admin/hero-slides/${slide.id}`}
          className="p-4 text-[#111111]/30 hover:text-[#C0001A] border border-[#eeeeee] hover:bg-white transition-all rounded-none"
          title="Edit Slide"
        >
          <Edit2 size={18} />
        </Link>

        <button
          onClick={handleDelete}
          className="p-4 text-[#111111]/30 hover:text-[#C0001A] border border-[#eeeeee] hover:bg-white transition-all rounded-none"
          title="Delete Slide"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
  