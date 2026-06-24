import { createClient } from "@/lib/supabase-server";
import { Image as ImageIcon, ExternalLink, Trash2, Info } from "lucide-react";
import { deleteMediaAsset } from "@/app/actions/cms";

export default async function MediaAssetsPage() {
  const supabase = await createClient();

  const [
    { data: productImages },
    { data: heroImages },
    { data: categoryImages },
    { data: testimonialImages }
  ] = await Promise.all([
    supabase.from("products").select("images"),
    supabase.from("hero_slides").select("image_url"),
    supabase.from("categories").select("image_url"),
    supabase.from("testimonials").select("client_image")
  ]);

  const allImages = new Set<string>();
  productImages?.forEach(p => p.images?.forEach((img: string) => allImages.add(img)));
  heroImages?.forEach(h => h.image_url && allImages.add(h.image_url));
  categoryImages?.forEach(c => c.image_url && allImages.add(c.image_url));
  testimonialImages?.forEach(t => t.client_image && allImages.add(t.client_image));

  const library = Array.from(allImages).map((url, i) => ({ id: i, url }));

  return (
    <div className="p-4 md:p-10 font-inter max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h2 className="text-2xl font-playfair font-black text-[#111111] tracking-tight">Media Library</h2>
          <p className="text-[10px] text-[#C0001A] uppercase tracking-[0.2em] mt-2 font-bold">Manage the premium visual assets of the brand</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#C0001A] text-white px-6 py-4 rounded-none flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest shadow-lg">
            <Info size={16} /> Cloud Sync Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {library.length > 0 ? library.map((item) => (
          <div key={item.id} className="group relative bg-[#F9F9F9] rounded-none border border-[#eeeeee] overflow-hidden aspect-square flex items-center justify-center hover:border-[#C0001A] transition-all shadow-sm">
            <img
              src={item.url}
              alt="Asset"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-[#111111]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-none bg-white text-[#111111] flex items-center justify-center hover:bg-[#C0001A] hover:text-white transition-all shadow-xl"
              >
                <ExternalLink size={20} />
              </a>
              <form action={deleteMediaAsset}>
                <input type="hidden" name="url" value={item.url} />
                <button
                  type="submit"
                  className="w-12 h-12 rounded-none bg-white text-[#C0001A] flex items-center justify-center hover:bg-[#C0001A] hover:text-white transition-all shadow-xl"
                >
                  <Trash2 size={20} />
                </button>
              </form>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/95 px-3 py-2 rounded-none border border-[#eeeeee] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              <p className="text-[9px] font-mono text-[#111111] truncate font-bold">{item.url}</p>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-40 text-center bg-white border border-[#eeeeee]">
            <ImageIcon className="mx-auto text-[#111111]/10 mb-6" size={48} strokeWidth={1} />
            <h3 className="text-xl font-playfair font-black text-[#111111] mb-2">No Curated Media</h3>
            <p className="text-[10px] text-[#666666] uppercase tracking-widest leading-relaxed">Your media library is currently empty. Upload assets to begin.</p>
          </div>
        )}
      </div>

      <div className="mt-20 p-12 bg-[#111111] rounded-none text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C0001A] mb-4 block">Native Architecture</span>
          <h3 className="font-playfair text-3xl font-black mb-6 tracking-tight">Direct Cloud Integration</h3>
          <p className="text-[11px] text-white/60 leading-relaxed font-light mb-8 uppercase tracking-wider">Currently, your media library automatically orchestrates unique assets from across the platform. For direct file management, the native **Supabase Storage** engine is fully wired and ready for enterprise-scale imagery.</p>
          <a
            href="https://supabase.com/docs/guides/storage"
            target="_blank"
            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C0001A] hover:text-white transition-colors"
          >
            System Documentation <ExternalLink size={14} />
          </a>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <ImageIcon size={200} />
        </div>
      </div>
    </div>
  );
}
