"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveProduct } from "@/app/actions/cms";
import { Categories, Product } from "@/lib/types";
import { X, Plus, Save, ArrowLeft, Image as ImageIcon, Trash2, Copy, Check, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ui/ImageUpload";
import { toast } from "sonner";

interface ProductFormProps {
  product?: Partial<Product>;
  categories: Categories[];
}

// Slugify helper
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters (except spaces and hyphens)
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPrivateParam = searchParams.get("private") === "true";
  const [isPending, setIsPending] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for dynamic lists
  const [images, setImages] = useState<string[]>(product?.images || [""]);
  const [features, setFeatures] = useState<string[]>(product?.features || [""]);
  const [specifications, setSpecifications] = useState<{ label: string; value: string }[]>(
    product?.specifications?.length 
      ? product.specifications 
      : [{ label: "Dimensions", value: "" }, { label: "Weight", value: "" }]
  );

  // Featured & badge state
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [badgeType, setBadgeType] = useState<"bestseller" | "new" | "none">(
    product?.is_bestseller ? "bestseller" : product?.is_new ? "new" : "none"
  );
  const [isPrivate, setIsPrivate] = useState(product?.is_private ?? isPrivateParam);
  const [localToken, setLocalToken] = useState(product?.access_token || "");
  const [copied, setCopied] = useState(false);

  // State for name and slug auto-generation
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!product?.slug);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isSlugManuallyEdited) {
      setSlug(slugify(newName));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsSlugManuallyEdited(true);
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Add dynamic lists as JSON strings
    formData.append("features", JSON.stringify(features.filter(f => f.trim())));
    formData.append("specifications", JSON.stringify(specifications.filter(s => s.label.trim() && s.value.trim())));

    // Handle images (if using simple input fields)
    images.forEach(img => {
      if (img.trim()) formData.append("images", img.trim());
    });

    try {
      const result = await saveProduct(formData);
      if (result.error) {
        setError(result.error);
        toast.error("Failed to save", { description: result.error });
      } else {
        toast.success(product?.id ? "Updated" : "Created");
        router.push("/admin/products");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred while saving.");
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 z-30 bg-[#F0F2F5]/80 backdrop-blur-md py-6 border-b border-[#eeeeee]">
        <div className="flex items-center gap-6">
          <Link href="/admin/products" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-xl font-playfair font-bold text-[#111111]">
              {product?.id ? `Edit: ${product.name}` : "Create New Product"}
            </h2>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending || isUploadingImage}
          className="bg-[#111111] text-white px-8 py-3 text-[0.7rem] font-bold uppercase tracking-widest rounded-none hover:bg-[#C0001A] transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          {isPending ? "Saving..." : isUploadingImage ? "Upload in Progress..." : <><Save size={16} /> Save Product</>}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-none text-sm italic">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: General Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-none shadow-sm border border-[#eeeeee] space-y-6">
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#C0001A] mb-4">Core Essentials</h3>

            <div className="grid grid-cols-2 gap-6">
              <input type="hidden" name="id" value={product?.id || "new"} />

              <div className="space-y-2 col-span-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-body/60 pl-1">Product Title</label>
                <input
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  placeholder="e.g. Nordic Lounge Chair"
                  className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-body/60 pl-1">URL Slug</label>
                <input
                  name="slug"
                  value={slug}
                  onChange={handleSlugChange}
                  required
                  placeholder="nordic-lounge-chair"
                  className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A] transition-all font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-body/60 pl-1">Category</label>
                <select
                  name="category_id"
                  defaultValue={product?.category_id || ""}
                  className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A] transition-all appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.base_category}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-body/60 pl-1">Room</label>
                <select
                  name="room"
                  defaultValue={product?.room || ""}
                  className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A] transition-all appearance-none"
                >
                  <option value="">Select Room</option>
                  <option value="livingRoom">Living Room</option>
                  <option value="diningRoom">Dining Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="office">Office</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-body/60 pl-1">Detailed Description</label>
              <textarea
                name="description"
                defaultValue={product?.description || ""}
                rows={6}
                className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A] transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-body/60 pl-1">Excerpt (Short Description)</label>
              <textarea
                name="short_description"
                defaultValue={product?.short_description || ""}
                rows={2}
                className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A] transition-all resize-none"
              />
            </div>
          </section>

          {/* Specifications Section */}
          <section className="bg-white p-8 rounded-none shadow-sm border border-[#eeeeee]">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#C0001A]">Technical Specifications</h3>
                <p className="text-[9px] text-[#999] uppercase tracking-widest pl-1 font-medium">Define dimensions and weight for catalog display</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-[#f5f5f5]">
              {/* Specialized Dimensions Field */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#111] flex items-center gap-2">
                   Dimensions <span className="text-[#999] font-normal">(W × D × H)</span>
                </label>
                <input
                  value={specifications.find(s => s.label === "Dimensions")?.value || ""}
                  onChange={(e) => {
                    const newSpecs = [...specifications];
                    const idx = newSpecs.findIndex(s => s.label === "Dimensions");
                    if (idx > -1) {
                      newSpecs[idx].value = e.target.value;
                    } else {
                      newSpecs.push({ label: "Dimensions", value: e.target.value });
                    }
                    setSpecifications(newSpecs);
                  }}
                  placeholder="e.g. 210 × 95 × 85 cm"
                  className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3.5 text-sm focus:outline-none focus:border-[#C0001A] transition-all"
                />
              </div>

              {/* Specialized Weight Field */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#111] flex items-center gap-2">
                   Product Weight <span className="text-[#999] font-normal">(Approx)</span>
                </label>
                <input
                  value={specifications.find(s => s.label === "Weight")?.value || ""}
                  onChange={(e) => {
                    const newSpecs = [...specifications];
                    const idx = newSpecs.findIndex(s => s.label === "Weight");
                    if (idx > -1) {
                      newSpecs[idx].value = e.target.value;
                    } else {
                      newSpecs.push({ label: "Weight", value: e.target.value });
                    }
                    setSpecifications(newSpecs);
                  }}
                  placeholder="e.g. 45.0 kg"
                  className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3.5 text-sm focus:outline-none focus:border-[#C0001A] transition-all"
                />
              </div>
            </div>

            {/* Other Specs */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#999]">Additional Details</h4>
                 <button
                    type="button"
                    onClick={() => setSpecifications([...specifications, { label: "", value: "" }])}
                    className="text-[0.6rem] font-bold uppercase tracking-widest text-[#C0001A] flex items-center gap-1.5"
                  >
                    <Plus size={12} /> Add More
                  </button>
              </div>

              {specifications.filter(s => s.label !== "Dimensions" && s.label !== "Weight").map((spec, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-[0.15em] text-[#999] pl-1 font-bold">Attribute</label>
                      <input
                        value={spec.label}
                        onChange={(e) => {
                          const realIdx = specifications.indexOf(spec);
                          const newSpecs = [...specifications];
                          newSpecs[realIdx].label = e.target.value;
                          setSpecifications(newSpecs);
                        }}
                        placeholder="e.g. Material Grade"
                        className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A] transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-[0.15em] text-[#999] pl-1 font-bold">Value</label>
                      <div className="flex gap-3">
                        <input
                          value={spec.value}
                          onChange={(e) => {
                             const realIdx = specifications.indexOf(spec);
                             const newSpecs = [...specifications];
                             newSpecs[realIdx].value = e.target.value;
                             setSpecifications(newSpecs);
                          }}
                          placeholder="Enter detail..."
                          className="flex-1 bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setSpecifications(specifications.filter(s => s !== spec))}
                          className="p-3 text-[#ccc] hover:text-[#C0001A] transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-[#f5f5f5] bg-[#fcfcfc] -mx-8 px-8 -mb-8 pb-8">
               <p className="text-[9px] text-[#999] uppercase tracking-[0.2em] font-medium leading-relaxed">
                  These metrics generate the premium technical grid on the product page. <br/>
                  <span className="text-[#C0001A]">Dimensions and Weight are prioritized.</span>
               </p>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white p-8 rounded-none shadow-sm border border-[#eeeeee]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#C0001A]">Distinctive Features</h3>
              <button
                type="button"
                onClick={() => setFeatures([...features, ""])}
                className="text-[0.6rem] font-bold uppercase tracking-widest text-[#C0001A] flex items-center gap-1 hover:underline"
              >
                <Plus size={12} /> Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <input
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...features];
                      newFeatures[idx] = e.target.value;
                      setFeatures(newFeatures);
                    }}
                    placeholder="e.g. Hand-carved teak wood base"
                    className="flex-1 bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A]"
                  />
                  <button
                    type="button"
                    onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                    className="p-3 text-body/30 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="space-y-8">
          {/* Images Section */}
          <section className="bg-white p-8 rounded-none shadow-sm border border-[#eeeeee] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#C0001A]">Visual Assets</h3>
            </div>

            <ImageUpload
              isUploading={isUploadingImage}
              setIsUploading={setIsUploadingImage}
              onUploadSuccess={(url) => setImages(prev => [...prev.filter(img => img !== ""), url])}
            />

            <div className="space-y-4 pt-2">
              {images.filter(img => img).map((img, idx) => (
                <div key={idx} className="relative group border border-[#eeeeee] bg-[#F9F9F9] p-2 flex items-center justify-between">
                  <div className="h-12 w-12 overflow-hidden bg-gray-50 border border-[#eeeeee] flex-shrink-0">
                    <img src={img} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  <span className="text-[9px] font-mono text-[#666] truncate mx-4 flex-1">{img.split('/').pop()}</span>
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="p-2 text-[#666] hover:text-[#C0001A] hover:bg-white transition-colors border border-transparent hover:border-[#eeeeee]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing & Status */}
          <section className="bg-white p-8 rounded-none shadow-sm border border-[#eeeeee] space-y-6">
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#C0001A]">Market Positioning</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-body/60 pl-1">Base Price</label>
                <input
                  name="price"
                  defaultValue={product?.price || ""}
                  placeholder="e.g. ₹85,000 or Start from..."
                  className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-body/60 pl-1">Badge / Tag</label>
                <input
                  name="badge"
                  defaultValue={product?.badge || ""}
                  placeholder="e.g. Signature Series"
                  className="w-full bg-[#F9F9F9] border border-[#eeeeee] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#C0001A]"
                />
              </div>

              {/* ── Signature Collection Toggle ── */}
              <div className="pt-4 pb-2 border-t border-[#eeeeee]">
                <div className="flex items-center gap-3">
                  <input type="checkbox" name="is_featured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} value="true" className="w-4 h-4 accent-[#C0001A]" />
                  <div>
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-[#111111]">Signature Collection</label>
                  </div>
                </div>
              </div>

              {/* ── Badges (Best Seller & New Arrival) — Mutually Exclusive ── */}
              <div className="pt-4 pb-2 border-t border-[#eeeeee] space-y-3">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#999]">Badge type (pick one)</p>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="badge_selection"
                    checked={badgeType === "bestseller"}
                    onChange={() => setBadgeType("bestseller")}
                    className="w-3.5 h-3.5 accent-[#C0001A]"
                  />
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-[#111111]">Best Seller</label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="badge_selection"
                    checked={badgeType === "new"}
                    onChange={() => setBadgeType("new")}
                    className="w-3.5 h-3.5 accent-[#C0001A]"
                  />
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-[#111111]">New Arrival</label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="badge_selection"
                    checked={badgeType === "none"}
                    onChange={() => setBadgeType("none")}
                    className="w-3.5 h-3.5 accent-[#C0001A]"
                  />
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-[#999]">No Badge</label>
                </div>

                {/* Hidden inputs to pass booleans to the server action */}
                <input type="hidden" name="is_bestseller" value={badgeType === "bestseller" ? "true" : "false"} />
                <input type="hidden" name="is_new" value={badgeType === "new" ? "true" : "false"} />
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#eeeeee]">
                <input type="checkbox" name="is_active" defaultChecked={product?.is_active ?? true} value="true" className="w-4 h-4 accent-[#C0001A]" />
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-[#111111]">Published / Live</label>
              </div>
            </div>
          </section>

          {/* Exclusive Private Access */}
          <section className="bg-[#111111] p-8 rounded-none shadow-sm border border-[#333] space-y-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#C0001A]" />
              <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white">Private Viewing</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_private"
                  checked={isPrivate}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setIsPrivate(checked);
                    if (checked && !localToken) {
                      const newToken = `mag-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`;
                      setLocalToken(newToken);
                    }
                  }}
                  value="true"
                  className="w-4 h-4 accent-[#C0001A]"
                />
                <div>
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-white/90">Exclusive Only</label>
                  <p className="text-[9px] text-white/40 mt-0.5">Hide this product from all public listings. Accessible only via secret link.</p>
                </div>
              </div>

              {isPrivate && localToken && (
                <div className="pt-4 space-y-4 border-t border-white/10">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40 pl-1">Secret Access Link</label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-[0.7rem] text-white/60 font-mono truncate">
                        {`${baseUrl}/exclusive/${localToken}`}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(`${baseUrl}/exclusive/${localToken}`);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                        title="Copy Link"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Hello! I've prepared a private viewing of our latest piece for you. You can view it here: ${baseUrl}/exclusive/${localToken}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 text-[0.65rem] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`/exclusive/${localToken}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-white/10 text-white py-2.5 text-[0.65rem] font-bold uppercase tracking-wider hover:bg-white/20 transition-all border border-white/10"
                    >
                      <ExternalLink size={14} /> Preview
                    </a>
                  </div>

                  {/* Keep the token in form */}
                  <input type="hidden" name="access_token" value={localToken} />
                </div>
              )}

              {isPrivate && !localToken && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[9px] text-[#C0001A] italic font-medium uppercase tracking-wider">
                    Save product first to generate secret link
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
