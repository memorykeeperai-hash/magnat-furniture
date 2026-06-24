import { Metadata } from "next";
import { getPrivateProducts } from "@/lib/api/products";
import ExclusiveShowroomClient from "./ExclusiveShowroomClient";

export const metadata: Metadata = {
  title: "Private Showroom | MAGNAT™ Furniture",
  description: "An exclusive invitation to view our most prestigious, limited-edition furniture masterpieces.",
  robots: { index: false, follow: false },
};

export default async function ExclusiveShowroomPage() {
  const products = await getPrivateProducts();

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      {/* Header */}
      <div className="bg-[#111] border-b border-white/5 py-3 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C0001A]">
          Private Collection • Exclusive Access Only
        </span>
      </div>

      <ExclusiveShowroomClient products={products} />
      
      {/* Footer Branding */}
      <div className="py-20 text-center border-t border-white/5 mt-20">
        <div className="flex flex-col items-center gap-4">
          <span className="font-playfair text-2xl font-black tracking-tighter text-white">MAGNAT</span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#666]">Crafted for the Extraordinary</p>
        </div>
      </div>
    </div>
  );
}
