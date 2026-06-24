"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Layers } from "lucide-react";
import { saveCategory } from "@/app/actions/cms";
import { Categories} from "@/lib/types";
import ImageUploadField from "@/components/ui/ImageUploadField";

import { toast } from "sonner";

interface CategoryFormProps {
  category?: Categories;
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await saveCategory(formData);

    if (result?.error) {
      setError(result.error);
      toast.error("Error saving category", { description: result.error });
      setLoading(false);
    } else {
      toast.success(category ? "Updated" : "Created");
      router.push("/admin/categories");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-body hover:text-[#111111] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Collections
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#111111] text-white px-8 py-3 rounded-none flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-[#C0001A] transition-all disabled:opacity-50"
        >
          <Save size={16} /> {loading ? "Saving..." : "Save Collection"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-[#C0001A]/5 border border-[#C0001A]/20 text-[#C0001A] rounded-none text-sm font-medium">
          {error}
        </div>
      )}

      <input type="hidden" name="id" value={category?.id || "new"} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Core Metadata Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-none border border-[#eeeeee] shadow-sm">
            <h3 className="text-xl font-playfair font-bold text-[#111111] mb-6">Collection Identification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-body mb-2">Collection Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={category?.name}
                  required
                  placeholder="e.g., Signature Sofas"
                  onChange={(e) => {
                    const name = e.target.value.toLowerCase();
                    const baseSelect = document.getElementsByName('base_category')[0] as HTMLSelectElement;
                    if (baseSelect) {
                      if (name.includes('chair')) baseSelect.value = 'chairs';
                      else if (name.includes('sofa')) baseSelect.value = 'sofas';
                      else if (name.includes('table')) baseSelect.value = 'tables';
                      else if (name.includes('curtain') || name.includes('drapery')) baseSelect.value = 'curtains';
                      else if (name.includes('bed')) baseSelect.value = 'beds';
                    }
                  }}
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#eeeeee] rounded-none focus:outline-none focus:border-[#C0001A] transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-body mb-2">Base Category</label>
                <select
                  name="base_category"
                  defaultValue={category?.base_category || ""}
                  required
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#eeeeee] rounded-none focus:outline-none focus:border-[#C0001A] transition-all text-sm appearance-none"
                >
                  <option value="" disabled>Select Base Category</option>
                  <option value="chairs">Chairs</option>
                  <option value="sofas">Sofas</option>
                  <option value="curtains">Curtains</option>

                  <option value="dining">Dining</option>
                  <option value="bedroom">Bedroom</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-body mb-2">Description</label>
              <textarea
                name="description"
                defaultValue={category?.description || ""}
                rows={3}
                placeholder="Brief summary of the collection..."
                className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#eeeeee] rounded-none focus:outline-none focus:border-[#C0001A] transition-all text-sm resize-none"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-none border border-[#eeeeee] shadow-sm">
            <h3 className="text-xl font-playfair font-bold text-[#111111] mb-6">Visual Identity</h3>

            <ImageUploadField
              name="image_url"
              defaultValue={category?.image_url || ""}
              label="Category Image"
              dimensions="800 x 1000px (4:5 Portrait)"
            />
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-none border border-[#eeeeee] shadow-sm sticky top-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C0001A] mb-6">Placement</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-body mb-2">Display Order</label>
                <input
                  type="number"
                  name="sort_order"
                  defaultValue={category?.sort_order || 0}
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#eeeeee] rounded-none focus:outline-none focus:border-[#C0001A] transition-all text-sm"
                />
              </div>

              <div className="pt-6 border-t border-[#F0F2F5] space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      name="is_featured_check"
                      defaultChecked={category?.is_featured ?? true}
                      className="sr-only peer"
                      onChange={(e) => {
                        const hiddenInput = document.getElementById('is_featured_hidden') as HTMLInputElement;
                        hiddenInput.value = e.target.checked ? "true" : "false";
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C0001A]"></div>
                  </div>
                  <input type="hidden" id="is_featured_hidden" name="is_featured" value={category ? String(category.is_featured) : "true"} />
                  <span className="text-xs font-bold uppercase tracking-widest text-body group-hover:text-[#111111] transition-colors">Feature on Home</span>
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#F9F9F9] rounded-none border border-dashed border-[#eeeeee] text-center">
            <Layers className="mx-auto text-body/20 mb-3" size={32} />
            <p className="text-[10px] text-body/60 font-medium leading-relaxed">
              Featured categories appear in the "Signature Canvas" section of your homepage.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
