import { createClient } from "@/lib/supabase-server";
import { ListTree, Plus } from "lucide-react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl  font-bold text-[#1A1A1A]">Collection Categories</h2>
          <p className="text-xs text-body uppercase tracking-widest mt-1">Organize your product catalog</p>
        </div>
        <Link 
          href="/admin/categories/new"
          className="bg-[#1A1A1A] text-white px-6 py-3 text-[0.65rem] font-bold uppercase tracking-widest rounded-lg hover:bg-[#8B1E1E] transition-all flex items-center gap-2 shadow-md"
        >
          <Plus size={14} /> Add Category
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-[#E5DED6] rounded-3xl">
            <ListTree size={48} className="mx-auto text-body/20 mb-6" />
            <h3 className="text-xl  font-bold text-[#1A1A1A] mb-2">No Categories Defined</h3>
            <p className="text-xs text-body uppercase tracking-widest">Create categories to start grouping your products.</p>
          </div>
        )}
      </div>
    </div>
  );
}
