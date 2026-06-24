"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Star, Quote, Image as ImageIcon } from "lucide-react";
import { saveTestimonial } from "@/app/actions/cms";
import { Testimonial } from "@/lib/types";
import ImageUpload from "@/components/ui/ImageUpload";
import Link from "next/link";

interface TestimonialFormProps {
  testimonial?: Testimonial;
}

export default function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(testimonial?.rating || 5);
  const [clientImage, setClientImage] = useState(testimonial?.client_image || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUploadingImage) return;

    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("rating", rating.toString());
    formData.set("client_image", clientImage);

    const result = await saveTestimonial(formData);

    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    } else {
      router.push("/admin/testimonials");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 z-30 bg-[#F0F2F5]/80 backdrop-blur-md py-6 border-b border-[#eeeeee]">
        <div className="flex items-center gap-6">
          <Link href="/admin/testimonials" className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-xl font-playfair font-black text-[#111111]">
              {testimonial?.id ? `Edit Review: ${testimonial.client_name}` : "Create New Testimonial"}
            </h2>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending || isUploadingImage}
          className="bg-[#111111] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-[#C0001A] transition-all flex items-center gap-3 shadow-lg disabled:opacity-50"
        >
          {isPending ? "Saving..." : isUploadingImage ? "Uploading..." : <><Save size={16} /> Save Review</>}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-[#C0001A] px-6 py-4 text-[10px] font-bold uppercase tracking-widest">
          {error}
        </div>
      )}

      <input type="hidden" name="id" value={testimonial?.id || "new"} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Core Review Column */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-none border border-[#eeeeee] shadow-sm relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <Quote size={120} />
            </div>

            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C0001A] mb-2">Client Experience</h3>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/60">The Customer Quote</label>
                <textarea
                  name="quote"
                  defaultValue={testimonial?.quote}
                  rows={6}
                  required
                  placeholder="e.g., The craftsmanship and attention to detail is exceptional..."
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#eeeeee] rounded-none focus:outline-none focus:border-[#C0001A] transition-all text-sm font-light resize-none relative z-10"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/60">Experience Rating</label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="group transition-transform active:scale-90"
                    >
                      <Star
                        size={24}
                        className={`${star <= rating ? "fill-[#C0001A] text-[#C0001A]" : "text-[#eeeeee]"} transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-4 text-[10px] font-black text-[#C0001A] uppercase tracking-widest">{rating}/5 EXCELLENCE</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-none border border-[#eeeeee] shadow-sm space-y-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C0001A] mb-2">Client Identity</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/60">Full Name</label>
                <input
                  type="text"
                  name="client_name"
                  defaultValue={testimonial?.client_name}
                  required
                  placeholder="e.g., Abdul Rahman"
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#eeeeee] rounded-none focus:outline-none focus:border-[#C0001A] transition-all text-sm font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/60">Designation / Location</label>
                <input
                  type="text"
                  name="client_role"
                  defaultValue={testimonial?.client_role || ""}
                  placeholder="e.g., Kondotty"
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#eeeeee] rounded-none focus:outline-none focus:border-[#C0001A] transition-all text-sm font-light"
                />
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-[#f5f5f5]">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 block mb-4">Client Portrait</label>

              <ImageUpload
                isUploading={isUploadingImage}
                setIsUploading={setIsUploadingImage}
                onUploadSuccess={(url) => setClientImage(url)}
              />

              {clientImage && (
                <div className="relative group border border-[#eeeeee] bg-[#F9F9F9] p-4 flex items-center gap-6">
                  <div className="h-16 w-16 overflow-hidden bg-white border border-[#eeeeee] flex-shrink-0">
                    <img src={clientImage} className="w-full h-full object-cover" alt="Client portrait" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] block mb-1">Authenticated Portrait</span>
                    <span className="text-[9px] font-mono text-[#666666] truncate block">{clientImage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setClientImage("")}
                    className="p-3 text-[#111111]/20 hover:text-[#C0001A] transition-all"
                  >
                    <ImageIcon size={18} />
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-none border border-[#eeeeee] shadow-sm space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C0001A]">Visibility</h3>

            <div className="space-y-6">
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  name="is_active_check"
                  defaultChecked={testimonial?.is_active ?? true}
                  className="w-4 h-4 accent-[#C0001A] border-[#eeeeee] rounded-none"
                  onChange={(e) => {
                    const hiddenInput = document.getElementById('is_active_hidden') as HTMLInputElement;
                    hiddenInput.value = e.target.checked ? "true" : "false";
                  }}
                />
                <input type="hidden" id="is_active_hidden" name="is_active" value={testimonial ? String(testimonial.is_active) : "true"} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] group-hover:text-[#C0001A] transition-colors">Visible on Site</span>
              </label>

              <div className="pt-6 border-t border-[#F0F2F5]">
                <p className="text-[10px] text-[#666] italic leading-relaxed uppercase tracking-wider">
                  Testimonials with 5-star ratings are automatically prioritized in the homepage carousel to demonstrate peak satisfaction.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
