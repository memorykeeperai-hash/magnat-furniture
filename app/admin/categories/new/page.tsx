import CategoryForm from "../CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl  font-bold text-[#1A1A1A]">Create New Collection</h2>
        <p className="text-xs text-body uppercase tracking-[0.2em] mt-2">Define a new category to organize your premium inventory</p>
      </div>
      
      <CategoryForm />
    </div>
  );
}
