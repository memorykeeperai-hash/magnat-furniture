import { getProducts } from "@/lib/api/products";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProductTable from "./ProductTable";

export default async function AdminProductsPage() {
  const products = await getProducts(true);

  return (
    <div className="p-10 ">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl  font-bold text-[#1A1A1A]">Product Inventory</h2>
          <p className="text-xs text-[#1A1A1A]/50 uppercase tracking-widest mt-1 font-bold">Manage your catalog items</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[#1A1A1A] text-white px-6 py-3 text-[0.65rem] font-bold uppercase tracking-widest rounded-lg hover:bg-[#8B1E1E] transition-all flex items-center gap-2 shadow-md"
        >
          <Plus size={14} /> Add New Product
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
