import { createClient } from "@/lib/supabase-server";
import ProductForm from "../ProductForm";
import { Suspense } from "react";

export default async function NewProductPage() {
  const supabase = await createClient();

  // Fetch categories for the dropdown
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("base_category");

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <Suspense fallback={<div>Loading form...</div>}>
        <ProductForm categories={categories || []} />
      </Suspense>
    </div>
  );
}
