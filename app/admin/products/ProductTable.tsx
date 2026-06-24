"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, ExternalLink, Database, Terminal, MessageCircle, Copy, Check, Layers, Globe, Lock } from "lucide-react";
import { deleteProduct } from "@/app/actions/cms";
import { Product } from "@/lib/types";
import { toast } from "sonner";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "public" | "exclusive">("all");

  const filteredProducts = products.filter(product => {
    if (activeTab === "all") return true;
    if (activeTab === "public") return !product.is_private;
    if (activeTab === "exclusive") return product.is_private;
    return true;
  });

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleDelete = async (id: string, name: string) => {
    if (!id || id.length < 10) { // Safety check to prevent deleting fallback items which use slugs as IDs
      toast.info("Local fallback item", {
        description: "These must be managed in the source code."
      });
      return;
    }

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
        onClick: () => { },
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Enhanced UX Tabs */}
      <div className="flex items-center gap-2 border-b border-[#eeeeee] pb-px">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-6 py-4 text-[0.65rem] font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === "all" ? "border-[#111] text-[#111]" : "border-transparent text-[#999] hover:text-[#666]"
            }`}
        >
          <Layers size={14} />
          All <span className="opacity-40 ml-1">({products.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("public")}
          className={`flex items-center gap-2 px-6 py-4 text-[0.65rem] font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === "public" ? "border-[#111] text-[#111]" : "border-transparent text-[#999] hover:text-[#666]"
            }`}
        >
          <Globe size={14} />
          Public <span className="opacity-40 ml-1">({products.filter(p => !p.is_private).length})</span>
        </button>
        <button
          onClick={() => setActiveTab("exclusive")}
          className={`flex items-center gap-2 px-6 py-4 text-[0.65rem] font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === "exclusive" ? "border-[#930011] text-[#930011]" : "border-transparent text-[#999] hover:text-[#666]"
            }`}
        >
          <Lock size={14} />
          Exclusive <span className="opacity-40 ml-1">({products.filter(p => p.is_private).length})</span>
        </button>
      </div>

      <div className="flex items-center justify-between border-b border-[#eeeeee] pb-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#111]">
          {activeTab === "all" ? "Full Collection" : activeTab === "public" ? "Public Collection" : "Exclusive Collection"}{" "}
          <span className="opacity-40 ml-2">({filteredProducts.length})</span>
        </h3>
      </div>

        <div className="overflow-x-auto ">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#eeeeee] text-left">
                <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] pl-4">Product</th>
                <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666]">Category</th>
                <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666]">Price</th>
                <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666]">Status</th>
                <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666]">Source</th>
                <th className="pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eeeeee]">
              {filteredProducts.map((product, i) => {
                const isLocal = !product.id || product.id === product.slug;

                return (
                  <tr
                    key={product.id || i}
                    className={`group transition-colors ${product.is_private ? "bg-[#111111]/[0.02] hover:bg-[#111111]/[0.04]" : "hover:bg-[#F9F9F9]"
                      } ${isDeleting === product.id ? "opacity-30" : ""}`}
                  >
                    <td className="py-6 pl-4">
                      <div className="flex items-center gap-5">
                        <div className="h-14 w-14 bg-[#F7F4F0] overflow-hidden border border-[#eeeeee] flex-shrink-0">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#C0001A] font-bold text-[9px] uppercase tracking-widest">No Img</div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-[#111] group-hover:text-[#C0001A] transition-colors">{product.name}</h4>
                          <p className="text-[11px] text-[#666] font-medium truncate max-w-[200px] Tracking-wide mt-1">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#111] border border-[#eeeeee] px-3 py-1.5 rounded-none whitespace-nowrap">
                        {typeof product.categories?.base_category === 'string' ? product.categories?.base_category : "Uncategorized"}
                      </span>
                    </td>
                    <td className="py-6 text-sm font-bold text-[#111] whitespace-nowrap">
                      {product.price || "N/A"}
                    </td>
                    <td className="py-6">
                      <div className="flex flex-wrap gap-1.5">
                        {product.is_featured && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-[#930011] text-white">
                            ★ Signature
                          </span>
                        )}
                        {product.is_bestseller && (
                          <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-[#111] text-white">
                            Best Seller
                          </span>
                        )}
                        {product.is_new && (
                          <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-widest px-2 py-1 border border-[#930011] text-[#930011]">
                            New
                          </span>
                        )}
                        {product.is_private && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-black text-[#C0001A] border border-[#C0001A]">
                            Private
                          </span>
                        )}
                        {!product.is_featured && !product.is_bestseller && !product.is_new && !product.is_private && (
                          <span className="text-[9px] text-[#bbb] uppercase tracking-widest">—</span>
                        )}
                      </div>
                    </td>
                    <td className="py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 border ${isLocal ? 'bg-[#F7F4F0] border-[#eeeeee] text-[#111]' : 'border-[#111] bg-[#111] text-white'}`}>
                        {isLocal ? <Terminal size={12} strokeWidth={1.5} /> : <Database size={12} strokeWidth={1.5} />}
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                          {isLocal ? 'Local Code' : 'Database'}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 pr-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={product.is_private ? `/exclusive/${product.access_token}` : `/products/${product.slug}`}
                          target="_blank"
                          className={`p-2 transition-colors ${product.is_private ? "text-[#C0001A] hover:text-[#930011]" : "text-[#b0b0b0] hover:text-[#111]"}`}
                          title={product.is_private ? "View Secret Link" : "View on Site"}
                        >
                          <ExternalLink size={16} strokeWidth={1.5} />
                        </Link>
                        {product.is_private && (
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(`Hello! I've prepared a private viewing of our latest piece for you. You can view it here: ${baseUrl}/exclusive/${product.access_token}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#25D366] hover:bg-[#25D366]/10 transition-all rounded-full"
                            title="Share via WhatsApp"
                          >
                            <MessageCircle size={16} strokeWidth={1.5} />
                          </a>
                        )}
                        {product.is_private && (
                          <button
                            onClick={() => {
                              const link = `${baseUrl}/exclusive/${product.access_token}`;
                              navigator.clipboard.writeText(link);
                              setCopiedId(product.id);
                              setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className={`p-2 transition-all rounded-full ${copiedId === product.id ? "text-green-600" : "text-[#b0b0b0] hover:text-[#111] hover:bg-gray-100"}`}
                            title="Copy Secret Link"
                          >
                            {copiedId === product.id ? <Check size={16} strokeWidth={1.5} /> : <Copy size={16} strokeWidth={1.5} />}
                          </button>
                        )}
                        {!isLocal && (
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-2 text-[#b0b0b0] hover:text-[#111] transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 size={16} strokeWidth={1.5} />
                          </Link>
                        )}
                        {!isLocal && (
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            disabled={isDeleting === product.id}
                            className="p-2 text-[#b0b0b0] hover:text-[#C0001A] transition-colors disabled:opacity-50"
                            title="Delete Product"
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

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center border-t border-[#eeeeee]">
            <p className="text-xs text-[#999] uppercase tracking-[0.2em]">No products found</p>
          </div>
        )}
      </div>
      );
}
