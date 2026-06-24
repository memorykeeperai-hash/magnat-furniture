import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import CategoryForm from "../CategoryForm";

export default async function EditCategoryPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !category) {
    notFound();
  }

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl  font-bold text-[#1A1A1A]">Modify Collection</h2>
        <p className="text-xs text-body uppercase tracking-[0.2em] mt-2">Update collection metadata, imagery, or homepage visibility</p>
      </div>
      
      <CategoryForm category={category} />
    </div>
  );
}
