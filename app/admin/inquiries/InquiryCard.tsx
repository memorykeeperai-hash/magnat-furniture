"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, MessageSquare, ArchiveRestore } from "lucide-react";
import { updateInquiryStatus } from "@/app/actions/cms";
import { motion } from "framer-motion";

interface InquiryCardProps {
  inquiry: any;
  onStatusChange: (id: string, newStatus: string) => void;
}

export default function InquiryCard({ inquiry, onStatusChange }: InquiryCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const currentStatus = inquiry.status || "new";

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    const result = await updateInquiryStatus(inquiry.id, newStatus);
    if (result.success) {
      onStatusChange(inquiry.id, newStatus);
    }
    setIsUpdating(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white border border-[#eeeeee] rounded-none p-8 hover:border-[#111] transition-all group shadow-sm font-inter"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-[#111] flex items-center justify-center text-white font-bold font-number">
              {inquiry.full_name?.charAt(0) || "Q"}
            </div>
            <div>
              <h3 className="font-bold text-[#111111] font-inter text-lg">{inquiry.full_name}</h3>
              <p className="text-[9px] text-[#666] uppercase tracking-widest font-bold mt-1">{inquiry.subject || "General Inquiry"}</p>
            </div>
          </div>

          <p className="text-sm text-[#111111]/80 leading-relaxed font-light italic bg-[#F7F4F0] p-6 border border-[#eeeeee]">
            "{inquiry.message}"
          </p>

          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2 text-[#666]">
              <Mail size={14} className="text-[#C0001A]" />
              <span className="text-xs">{inquiry.email}</span>
            </div>
            {inquiry.phone && (
              <div className="flex items-center gap-2 text-[#666]">
                <Phone size={14} className="text-[#C0001A]" />
                <span className="text-xs font-number tracking-wider">{inquiry.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[#666]">
              <Calendar size={14} className="text-[#111]" />
              <span className="text-xs tracking-wider">{new Date(inquiry.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className={`px-4 py-3 border text-center text-[9px] font-bold uppercase tracking-widest transition-colors ${currentStatus === "new" ? "bg-[#C0001A] border-[#C0001A] text-white" :
              currentStatus === "contacted" ? "bg-[#111] border-[#111] text-white" :
                currentStatus === "resolved" ? "bg-[#F7F4F0] border-[#eeeeee] text-[#111]" :
                  "bg-white border-[#eeeeee] text-[#999] strike-through line-through"
            }`}>
            {isUpdating ? "Updating..." : currentStatus}
          </div>

          {currentStatus === "new" && (
            <button
              onClick={() => handleStatusChange("contacted")}
              disabled={isUpdating}
              className="w-full py-3 border border-[#eeeeee] text-[#111111] text-[10px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all disabled:opacity-50"
            >
              Mark as Contacted
            </button>
          )}

          {currentStatus === "contacted" && (
            <button
              onClick={() => handleStatusChange("resolved")}
              disabled={isUpdating}
              className="w-full py-3 border border-[#eeeeee] text-[#111111] text-[10px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all disabled:opacity-50"
            >
              Mark as Resolved
            </button>
          )}

          {currentStatus !== "archived" ? (
            <button
              onClick={() => handleStatusChange("archived")}
              disabled={isUpdating}
              className="w-full py-3 border border-[#C0001A] text-[#C0001A] text-[10px] font-bold uppercase tracking-widest hover:bg-[#C0001A] hover:text-white transition-all disabled:opacity-50"
            >
              Archive
            </button>
          ) : (
            <button
              onClick={() => handleStatusChange("contacted")}
              disabled={isUpdating}
              className="w-full py-3 border border-[#eeeeee] text-[#111] text-[10px] font-bold uppercase tracking-widest hover:bg-[#111] hover:text-white transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              <ArchiveRestore size={14} /> Unarchive
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
