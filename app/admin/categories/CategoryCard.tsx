"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, ListTree } from "lucide-react";
import { deleteCategory } from "@/app/actions/cms";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { Categories } from "@/lib/types";

interface CategoryCardProps {
  category: Categories;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    toast.warning(`Delete "${category.name}"?`, {
      description: "This will affect linked products.",
      action: {
        label: "Delete",
        onClick: async () => {
          setIsDeleting(true);
          const result = await deleteCategory(category.id);
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
      className="bg-white border border-[#eeeeee] rounded-none overflow-hidden hover:border-[#C0001A] transition-all group shadow-sm flex flex-col h-full"
    >
      <div className="relative h-48 bg-[#F7F4F0]">
        {category.image_url ? (
          <img src={category.image_url} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-body/20">
            <ListTree size={48} />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-[#111111] text-white text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Order: {category.sort_order}
          </span>
        </div>
        {category.is_featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-[#C0001A] text-white text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-playfair text-xl font-bold text-[#111111] mb-2">{category.name}</h3>
        <p className="text-xs text-body leading-relaxed font-light mb-6 opacity-60 italic line-clamp-2">
          {category.description || "No description provided for this collection."}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#F0F2F5]">
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#C0001A] font-mono">
            /{category.slug}
          </span>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/categories/${category.id}`}
              className="p-2 text-body/40 hover:text-[#C0001A] transition-colors"
            >
              <Edit2 size={16} />
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 text-body/40 hover:text-[#C0001A] transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
