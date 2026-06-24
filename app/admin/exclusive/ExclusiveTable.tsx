"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, ExternalLink, Database, Terminal, MessageCircle, Copy, Check, Share2, Lock } from "lucide-react";
import { deleteProduct } from "@/app/actions/cms";
import { Product } from "@/lib/types";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ExclusiveTableProps {
  products: Product[];
}

export default function ExclusiveTable({ products }: ExclusiveTableProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedShowroom, setCopiedShowroom] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const showroomLink = `${baseUrl}/exclusive`;

  const handleDelete = async (id: string, name: string) => {
    toast.warning(`Delete "${name}"?`, {
      action: {
        label: "Delete",
        onClick: async () => {
          setIsDeleting(id);
          const result = await deleteProduct(id);
          if (result.error) {
            toast.error("Error", { description: result.error });
          } else {
            toast.success("Deleted");
          }
          setIsDeleting(null);
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      }
    });
  };

  const copyShowroomLink = () => {
    navigator.clipboard.writeText(showroomLink);
    setCopiedShowroom(true);
    toast.success("Showroom link copied!");
    setTimeout(() => setCopiedShowroom(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* ── SHOWROOM SHARING BANNER ── */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111] p-8 border border-[#eeeeee] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Lock size={120} strokeWidth={1} className="text-white" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-2 w-2 bg-[#C0001A] rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C0001A]">Global Access</span>
          </div>
          
          <h3 className="text-2xl font-playfair font-black text-white mb-4 tracking-tight">Digital Private Showroom</h3>
          <p className="text-[#999] text-sm max-w-xl mb-8 leading-relaxed font-medium">
            Share the entire private collection with your VIP clients. This link redirects to a curated gallery showing all exclusive items currently in the showroom.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white/5 border border-white/10 px-5 py-3 text-[11px] text-[#ccc] font-mono select-all flex-1 min-w-[250px]">
              {showroomLink}
            </div>
            
            <button 
              onClick={copyShowroomLink}
              className="flex items-center gap-2 bg-white text-[#111] px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C0001A] hover:text-white transition-all"
            >
              {copiedShowroom ? <Check size={14} /> : <Copy size={14} />}
              {copiedShowroom ? "Copied" : "Copy Showroom Link"}
            </button>
            
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Greetings! We are pleased to invite you to view our exclusive private collection at Magnat Furniture. Explore our latest limited-edition masterpieces here: ${showroomLink}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#1ebc5a] transition-all"
            >
              <MessageCircle size={14} />
              Share on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between border-b border-[#eeeeee] pb-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#111]">
          Individual Items <span className="opacity-40 ml-2">({products.length})</span>
        </h3>
        <Link 
          href="/admin/products/new?private=true"
          className="text-[10px] font-bold uppercase tracking-widest text-[#C0001A] hover:text-[#111] transition-colors"
        >
          + Add Private Item
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eeeeee] text-left">
              <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] pl-4">Exclusive Product</th>
              <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666]">Access Token</th>
              <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666]">Price</th>
              <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666]">Source</th>
              <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] text-right pr-4">Sharing Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eeeeee]">
            {products.map((product, i) => {
              const isLocal = !product.id || product.id === product.slug;
              const individualLink = `${baseUrl}/exclusive/${product.access_token}`;
              
              return (
                <tr 
                  key={product.id || i} 
                  className={`group transition-colors bg-[#111111]/[0.01] hover:bg-[#111111]/[0.03] ${isDeleting === product.id ? "opacity-30" : ""}`}
                >
                  <td className="py-6 pl-4">
                    <div className="flex items-center gap-5">
                      <div className="h-16 w-16 bg-[#F7F4F0] overflow-hidden border border-[#eeeeee] flex-shrink-0 relative">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#C0001A] font-bold text-[9px] uppercase tracking-widest">No Img</div>
                        )}
                        <div className="absolute top-0 left-0 bg-[#C0001A] text-white p-1">
                          <Lock size={10} />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#111] group-hover:text-[#C0001A] transition-colors">{product.name}</h4>
                        <p className="text-[11px] text-[#666] font-medium truncate max-w-[200px] Tracking-wide mt-1 uppercase tracking-widest">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <code className="text-[10px] bg-white border border-[#eeeeee] px-2 py-1 text-[#C0001A] font-mono">
                      {product.access_token || "no-token"}
                    </code>
                  </td>
                  <td className="py-6 text-sm font-bold text-[#111] whitespace-nowrap">
                    {product.price || "Custom Quote"}
                  </td>
                  <td className="py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 border ${isLocal ? 'bg-[#F7F4F0] border-[#eeeeee] text-[#111]' : 'border-[#111] bg-white text-[#111]'}`}>
                      {isLocal ? <Terminal size={12} strokeWidth={1.5} /> : <Database size={12} strokeWidth={1.5} />}
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                        {isLocal ? 'Code' : 'Database'}
                      </span>
                    </div>
                  </td>
                  <td className="py-6 pr-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Individual Sharing */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(individualLink);
                          setCopiedId(product.id);
                          toast.success(`${product.name} link copied!`);
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${copiedId === product.id ? "bg-green-600 text-white" : "bg-white border border-[#eeeeee] text-[#666] hover:text-[#111] hover:border-[#111]"}`}
                      >
                        {copiedId === product.id ? <Check size={12} /> : <Copy size={12} />}
                        Copy Link
                      </button>

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`Hello! I've prepared a private viewing of our latest piece for you. You can view it here: ${individualLink}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all border border-[#25D366]/20"
                        title="Share via WhatsApp"
                      >
                        <MessageCircle size={16} strokeWidth={1.5} />
                      </a>

                      <div className="w-px h-8 bg-[#eeeeee] mx-2" />

                      {/* Admin Actions */}
                      <Link 
                        href={`/exclusive/${product.access_token}`}
                        target="_blank"
                        className="p-2 text-[#b0b0b0] hover:text-[#111] transition-colors"
                        title="Preview Page"
                      >
                        <ExternalLink size={16} strokeWidth={1.5} />
                      </Link>
                      
                      {!isLocal && (
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-[#b0b0b0] hover:text-[#111] transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} strokeWidth={1.5} />
                        </Link>
                      )}
                      
                      {!isLocal && (
                        <button 
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={isDeleting === product.id}
                          className="p-2 text-[#b0b0b0] hover:text-[#C0001A] transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="py-32 text-center border border-dashed border-[#eeeeee]">
          <Lock className="mx-auto text-[#eee] mb-4" size={48} strokeWidth={1} />
          <p className="text-xs text-[#999] uppercase tracking-[0.2em]">No products in the private collection yet</p>
          <Link 
            href="/admin/products/new?private=true"
            className="inline-block mt-6 text-[10px] font-bold uppercase tracking-widest text-[#C0001A] underline"
          >
            Create your first exclusive piece
          </Link>
        </div>
      )}
    </div>
  );
}
