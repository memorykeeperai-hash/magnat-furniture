import { getProducts } from "@/lib/api/products";
import ExclusiveTable from "./ExclusiveTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusive Showroom | Admin Portal",
  description: "Manage private collections and exclusive client access.",
};

export default async function AdminExclusivePage() {
  // Fetch all products, we'll filter for private ones in the client component or here
  const products = await getProducts(true);
  const exclusiveProducts = products.filter(p => p.is_private);

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-playfair font-black text-[#111] tracking-tight">Private Showroom</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-1 w-1 bg-[#C0001A] rounded-full" />
            <p className="text-[10px] text-[#666] uppercase tracking-[0.2em] font-bold">VIP Collection Management</p>
          </div>
        </div>
      </div>

      <ExclusiveTable products={exclusiveProducts} />
    </div>
  );
}
