"use client";

import { useState } from "react";
import { MessageSquare, Inbox, Clock, CheckCircle, Archive } from "lucide-react";
import InquiryCard from "./InquiryCard";
import { motion, AnimatePresence } from "framer-motion";

interface InquiriesDashboardProps {
  initialInquiries: any[];
}

const TABS = [
  { id: "all", label: "All Inquiries", icon: Inbox },
  { id: "new", label: "New Leads", icon: MessageSquare },
  { id: "contacted", label: "Contacted", icon: Clock },
  { id: "resolved", label: "Resolved", icon: CheckCircle },
  { id: "archived", label: "Archived", icon: Archive },
];

export default function InquiriesDashboard({ initialInquiries }: InquiriesDashboardProps) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [activeTab, setActiveTab] = useState("all");

  const handleStatusChange = (id: string, newStatus: string) => {
    setInquiries(prev => prev.map(inq => 
      inq.id === id ? { ...inq, status: newStatus } : inq
    ));
  };

  const filteredInquiries = inquiries.filter(inq => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return inq.status === "new" || !inq.status;
    return inq.status === activeTab;
  });

  return (
    <div className="font-inter">
      {/* ── Tabs Navigation ── */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10 pb-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = inquiries.filter(inq => {
             if (tab.id === "all") return true;
             if (tab.id === "new") return inq.status === "new" || !inq.status;
             return inq.status === tab.id;
          }).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 border transition-all whitespace-nowrap relative ${
                isActive 
                  ? "border-[#111] bg-white text-[#111]" 
                  : "border-[#eeeeee] bg-white text-[#666] hover:border-[#111]/30 hover:text-[#111]"
              }`}
            >
              <tab.icon size={14} className={isActive ? "text-[#C0001A]" : "text-[#999]"} />
              <span className="text-[10px] uppercase font-bold tracking-widest">{tab.label}</span>
              <span className={`text-[9px] font-bold font-number px-2 py-0.5 rounded-none ${
                isActive ? "bg-[#111] text-white" : "bg-[#F7F4F0] text-[#666]"
              }`}>
                {count}
              </span>
              
              {isActive && (
                 <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C0001A]" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Inquiry List ── */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredInquiries.length > 0 ? (
            filteredInquiries.map((inquiry) => (
              <InquiryCard 
                key={inquiry.id} 
                inquiry={inquiry} 
                onStatusChange={handleStatusChange} 
              />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center border border-[#eeeeee] bg-white"
            >
              <MessageSquare size={32} className="mx-auto text-[#111]/20 mb-6" strokeWidth={1} />
              <h3 className="text-xl font-playfair font-black text-[#111] mb-2">No {activeTab !== "all" ? activeTab : ""} inquiries found</h3>
              <p className="text-[10px] text-[#666] uppercase tracking-widest">When customers contact you, they'll appear here.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
