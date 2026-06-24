"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, MessageSquare, Users, ImageIcon, ArrowUpRight, ArrowDownRight, ChevronRight, ShieldCheck, Copy } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface AdminDashboardClientProps {
  stats: any[];
  recentInquiries: any[];
}

const IconMap: Record<string, any> = {
  ShoppingBag,
  Eye,
  MessageSquare,
  Users,
};

export default function AdminDashboardClient({ stats, recentInquiries }: AdminDashboardClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="font-inter space-y-10">

      {/* ── STATS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = IconMap[stat.icon] || ShoppingBag;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: "easeOut" }}
              className="bg-white p-7 border border-[#eeeeee] relative overflow-hidden group hover:border-[#111] transition-colors"
            >
              {/* Subtle accent line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#111] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-[#F7F4F0] text-[#111]">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${stat.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] mb-2">{stat.label}</span>
              <span className="text-4xl tracking-tight font-black text-[#111]">{stat.value}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

        {/* ── RECENT INQUIRIES ── */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-[#eeeeee] pb-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#111]">Recent Lead Inquiries</h3>
            <Link href="/admin/inquiries" className="text-[10px] font-bold uppercase tracking-widest text-[#C0001A] hover:text-[#111] transition-colors flex items-center gap-1 group">
              View All <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white border border-[#eeeeee]">
            {recentInquiries.length > 0 ? (
              <div className="divide-y divide-[#eeeeee]">
                {recentInquiries.map((inquiry, i) => (
                  <motion.div
                    key={inquiry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="p-5 flex items-center justify-between hover:bg-[#F9F9F9] transition-colors group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-10 w-10 bg-[#111] text-white flex items-center justify-center text-xs font-bold uppercase">
                        {inquiry.full_name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#111] group-hover:text-[#C0001A] transition-colors line-clamp-1">{inquiry.full_name}</h4>
                        <p className="text-[11px] text-[#666] mt-1">{inquiry.subject || inquiry.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${inquiry.status === "new" ? "bg-[#C0001A] text-white" :
                          inquiry.status === "contacted" ? "bg-[#111] text-white" : "bg-[#F7F4F0] text-[#111]"
                        }`}>
                        {inquiry.status || "New"}
                      </span>
                      <span className="text-[10px] text-[#666] uppercase tracking-widest">
                        {mounted ? new Date(inquiry.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ""}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-[#666] text-xs uppercase tracking-widest">
                No recent inquiries found.
              </div>
            )}
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="space-y-6">
          <div className="border-b border-[#eeeeee] pb-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#111]">Quick Actions</h3>
          </div>

          <div className="grid gap-3">
            <Link href="/admin/products/new" className="flex items-center p-5 bg-[#111] text-white group hover:bg-[#C0001A] transition-colors">
              <div className="bg-white/10 p-2 mr-4">
                <ShoppingBag size={18} strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest">New Product</span>
            </Link>

            <Link href="/admin/media" className="flex items-center p-5 bg-white border border-[#eeeeee] text-[#111] group hover:border-[#111] transition-colors">
              <div className="bg-[#F7F4F0] p-2 mr-4">
                <ImageIcon size={18} strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest">Upload Media</span>
            </Link>

            <Link href="/admin/testimonials" className="flex items-center p-5 bg-white border border-[#eeeeee] text-[#111] group hover:border-[#111] transition-colors">
              <div className="bg-[#F7F4F0] p-2 mr-4">
                <Users size={18} strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest">Manage Testimonials</span>
            </Link>
          </div>

          {/* ── EXCLUSIVE SHOWROOM QUICK SHARE ── */}
          <div className="pt-6">
            <div className="border-b border-[#eeeeee] pb-4 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#111]">Exclusive Showroom</h3>
            </div>
            
            <div className="bg-[#111] p-6 border border-[#eeeeee] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck size={40} className="text-white" />
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#C0001A] mb-2 font-bold">
                Private Gallery Access
              </p>
              <p className="text-[11px] text-[#999] leading-relaxed mb-6">
                Share the entire private collection with VIP clients via a single secure link.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    const link = `${window.location.origin}/exclusive`;
                    navigator.clipboard.writeText(link);
                    toast.success("Showroom link copied!");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white text-[#111] py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C0001A] hover:text-white transition-all"
                >
                  <Copy size={12} /> Copy Showroom Link
                </button>
                <Link 
                  href="/admin/exclusive"
                  className="w-full flex items-center justify-center gap-2 border border-white/20 text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                  Go to Exclusive Section
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
