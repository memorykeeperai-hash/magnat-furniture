import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import ProductForm from "../ProductForm";

import { Suspense } from "react";

export default async function EditProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const supabase = await createClient();
  
  // Fetch product data
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Fetch categories for the dropdown
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <Suspense fallback={<div>Loading form...</div>}>
        <ProductForm 
          product={product} 
          categories={categories || []} 
        />
      </Suspense>
    </div>
  );
}
