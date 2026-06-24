// components/products/FilterSection.tsx
"use client";

import { X } from "lucide-react";

interface FilterSectionProps {
  types: string[];
  activeType: string;
  onTypeChange: (type: string) => void;
  onClose?: () => void;
}

export default function FilterSection({
  types,
  activeType,
  onTypeChange,
  onClose,
}: FilterSectionProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-[#f0f0f0]">
        <h2 className="text-[18px] font-normal text-[#111]">
          Filter By <em className="text-[#C0001A]" style={{ fontStyle: "italic" }}>Type</em>
        </h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-[#111] hover:text-[#C0001A] transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onTypeChange("All")}
            className={`flex items-center justify-between px-5 py-4 rounded-[4px] text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
              activeType === "All"
                ? "bg-[#C0001A] text-white shadow-md shadow-red-900/10"
                : "bg-[#f9f9f9] text-[#666] border border-[#f0f0f0] hover:border-[#C0001A] hover:text-[#C0001A]"
            }`}
          >
            <span>All Products</span>
            {activeType === "All" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
          </button>
          
          {types.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`flex items-center justify-between px-5 py-4 rounded-[4px] text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                activeType === type
                  ? "bg-[#C0001A] text-white shadow-md shadow-red-900/10"
                  : "bg-[#f9f9f9] text-[#666] border border-[#f0f0f0] hover:border-[#C0001A] hover:text-[#C0001A]"
              }`}
              
            >
              <span>{type}</span>
              {activeType === type && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="px-6 py-6 border-t border-[#f0f0f0] bg-white">
        <button
          onClick={onClose}
          className="w-full bg-[#111] text-white text-[10px] font-bold tracking-[0.2em] uppercase py-4 rounded-[4px] hover:bg-[#C0001A] transition-colors"
        >
          View Results
        </button>
      </div>
    </div>
  );
}
