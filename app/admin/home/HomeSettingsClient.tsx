"use client";

import { useState } from "react";
import { 
  Image as ImageIcon, 
  Settings, 
  Instagram, 
  Plus, 
  Trash2, 
  Save, 
  Layers, 
  ArrowRight,
  ExternalLink,
  PlusCircle,
  LayoutGrid
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HomepageSection, HeroSlide, InstagramPost, Categories } from "@/lib/types";
import { saveHomepageSection, updateFeaturedCategories, deleteInstagramPost, saveInstagramPost, saveHeroSlide, deleteHeroSlide } from "@/app/actions/cms";
import Link from "next/link";
import ImageUploadField from "@/components/ui/ImageUploadField";
import { toast } from "sonner";

interface Props {
  initialSections: HomepageSection[];
  heroSlides: HeroSlide[];
  categories: Categories[];
  instagramPosts: InstagramPost[];
}

export default function HomeSettingsClient({ 
  initialSections, 
  heroSlides, 
  categories, 
  instagramPosts 
}: Props) {
  const [activeTab, setActiveTab] = useState<"hero" | "elite" | "curtains" | "instagram">("hero");
  const [isSaving, setIsSaving] = useState(false);
  const getSection = (key: string) => initialSections.find(s => s.section_key === key);

  // ─── TABS DEFINITION ───
  const tabs = [
    { id: "hero", label: "Hero Banner", icon: ImageIcon },
    { id: "elite", label: "Elite Collections", icon: LayoutGrid },
    { id: "curtains", icon: Layers, label: "Curtains & Blinds" },
    { id: "instagram", label: "Instagram", icon: Instagram },
  ] as const;

  return (
    <div className="bg-white border border-[#eeeeee] rounded-none shadow-sm min-h-[600px] flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 bg-[#F9F9F9] border-r border-[#eeeeee] py-6 flex flex-col">
        <div className="px-6 mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Content Sections</span>
        </div>
        
        <div className="flex-1 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 transition-all relative ${
                  isActive 
                    ? "bg-white text-[#111] border-y border-[#eeeeee] shadow-[4px_0_0_#C0001A_inset]" 
                    : "text-gray-500 hover:text-[#111] hover:bg-gray-100/50"
                }`}
              >
                <tab.icon size={18} className={isActive ? "text-[#C0001A]" : "text-gray-400"} />
                <span className="text-[11px] font-bold uppercase tracking-widest">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 mt-auto">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C0001A] hover:bg-[#C0001A]/5 p-2 transition-colors"
          >
            Preview Site <ExternalLink size={12} />
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 md:p-10 bg-white">
        <AnimatePresence mode="wait">
          {activeTab === "hero" && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <HeroManagement 
                slides={heroSlides} 
                onSaveSuccess={() => toast.success("Hero slides updated successfully.")} 
              />
            </motion.div>
          )}

          {activeTab === "elite" && (
            <motion.div
              key="elite"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <EliteSectionForm 
                section={getSection("elite-home-collections")} 
                categories={categories}
                onSaveSuccess={() => toast.success("Elite section updated successfully")}
              />
            </motion.div>
          )}

          {activeTab === "curtains" && (
            <motion.div
              key="curtains"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <CurtainsSectionForm 
                sections={initialSections}
                onSaveSuccess={() => toast.success("Curtain spotlight updated successfully")}
              />
            </motion.div>
          )}

          {activeTab === "instagram" && (
            <motion.div
              key="instagram"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <InstagramManagement 
                posts={instagramPosts}
                section={getSection("instagram-header")}
                onSaveSuccess={() => toast.success("Instagram section updated")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback Message (Removed in favor of sonner) */}
      </div>
    </div>
  );
}

// ─── ELITE SECTION FORM ───
function EliteSectionForm({ section, categories, onSaveSuccess }: { section?: HomepageSection, categories: Categories[], onSaveSuccess: () => void }) {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    // 1. Save Section Headings
    const sectionResult = await saveHomepageSection(formData);
    
    // 2. Save Featured Categories
    const checkedCategories = Array.from(formData.getAll("featured_categories") as string[]);
    await updateFeaturedCategories(checkedCategories);
    
    setIsSaving(false);
    if (!sectionResult.error) {
      onSaveSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-xl font-playfair font-black text-[#111] mb-2">Elite Home Collections</h3>
        <p className="text-[11px] text-gray-500 max-w-xl leading-relaxed">
          Manage the heading and featured categories in the "Signature Showcase" section.
        </p>
      </div>

      <input type="hidden" name="section_key" value="elite-home-collections" />
      <input type="hidden" name="id" value={section?.id || "new"} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Heading Part 1</label>
          <input 
            name="title" 
            defaultValue={section?.title || "Elite Home"} 
            className="w-full p-4 border border-[#eeeeee] focus:outline-none focus:border-[#C0001A] text-[13px]"
            placeholder="Elite Home"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Heading Part 2</label>
          <input 
            name="subtitle" 
            defaultValue={section?.subtitle || "Collections"} 
            className="w-full p-4 border border-[#eeeeee] focus:outline-none focus:border-[#C0001A] text-[13px]"
            placeholder="Collections"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</label>
        <textarea 
          name="description" 
          defaultValue={section?.description || "Explore our signature collections tailored for every corner of your home, from architectural sofas to serene bedroom suites."} 
          rows={3}
          className="w-full p-4 border border-[#eeeeee] focus:outline-none focus:border-[#C0001A] text-[13px] resize-none"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Featured Categories (Max 6 recommeded)</label>
          <Link href="/admin/categories" className="text-[9px] font-bold uppercase tracking-widest text-[#C0001A]">Manage All Categories</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map(cat => (
            <label 
              key={cat.id} 
              className="flex items-center gap-3 p-4 border border-[#eeeeee] cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <input 
                type="checkbox" 
                name="featured_categories" 
                value={cat.id} 
                defaultChecked={cat.is_featured} 
                className="w-4 h-4 accent-[#C0001A]"
              />
              <span className="text-[11px] font-bold text-[#111] group-hover:text-[#C0001A] transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="bg-[#111] text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 w-fit hover:bg-[#C0001A] transition-all disabled:opacity-50 shadow-xl"
      >
        {isSaving ? "Publishing Changes..." : "Secure Save & Publish"} <Save size={16} />
      </button>
    </form>
  );
}

// ─── CURTAINS SECTION FORM ───
function CurtainsSectionForm({ sections, onSaveSuccess }: { sections: HomepageSection[], onSaveSuccess: () => void }) {
  const [isSaving, setIsSaving] = useState(false);
  
  const header = sections.find(s => s.section_key === "curtain-spotlight-header");
  const card1 = sections.find(s => s.section_key === "curtain-spotlight-1");
  const card2 = sections.find(s => s.section_key === "curtain-spotlight-2");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    // We'll need to send multiple update requests or a combined one.
    // For simplicity, let's use a server action that handles multiple entries if needed, 
    // but here we'll do them sequentially in the client for now OR better, one action.
    
    // For this specific task, let's assume we handle card data in JSON or multiple hidden fields.
    // I'll implement a 'saveCurtainSpotlights' action.
    const result = await saveHomepageSection(formData); // This will be multi-purpose
    
    setIsSaving(false);
    if (!result.error) {
      onSaveSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div>
        <h3 className="text-xl font-playfair font-black text-[#111] mb-2">Curtains & Roman Blinds</h3>
        <p className="text-[11px] text-gray-500 max-w-xl leading-relaxed">
          Manage the editorial focus of your custom window treatments. This section allows exactly two featured items.
        </p>
      </div>

      <div className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#C0001A] border-b border-[#C0001A] pb-1 w-fit block">Section Branding</label>
        <input type="hidden" name="is_multi" value="true" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Heading</label>
            <input 
              name="curtain-spotlight-header_title" 
              defaultValue={header?.title || "Curtains & Roman Blinds"} 
              className="w-full p-4 border border-[#eeeeee] focus:outline-none focus:border-[#C0001A] text-[13px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subtitle</label>
            <input 
              name="curtain-spotlight-header_subtitle" 
              defaultValue={header?.subtitle || "Elevate your windows with our custom-made treatments."} 
              className="w-full p-4 border border-[#eeeeee] focus:outline-none focus:border-[#C0001A] text-[13px]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Card 1 */}
        <div className="space-y-6 p-6 border border-[#eeeeee] bg-[#F9F9F9]">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#111]">Spotlight Card 01</label>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Title</label>
              <input 
                name="curtain-spotlight-1_title" 
                defaultValue={card1?.title || "Premium Drapes"} 
                className="w-full p-4 border border-[#eeeeee] bg-white text-[13px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</label>
              <textarea 
                name="curtain-spotlight-1_description" 
                defaultValue={card1?.description || "Custom floor-to-ceiling drapes tailored to your window size."} 
                rows={2}
                className="w-full p-4 border border-[#eeeeee] bg-white text-[13px] resize-none"
              />
            </div>
            <ImageUploadField 
              name="curtain-spotlight-1_image_url" 
              defaultValue={card1?.image_url || "/images/curtain-1.jpg"} 
              label="Image URL"
              dimensions="1280 x 720px (16:9)"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="space-y-6 p-6 border border-[#eeeeee] bg-[#F9F9F9]">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#111]">Spotlight Card 02</label>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Title</label>
              <input 
                name="curtain-spotlight-2_title" 
                defaultValue={card2?.title || "Roman Blinds"} 
                className="w-full p-4 border border-[#eeeeee] bg-white text-[13px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</label>
              <textarea 
                name="curtain-spotlight-2_description" 
                defaultValue={card2?.description || "Modern and space-saving window solutions."} 
                rows={2}
                className="w-full p-4 border border-[#eeeeee] bg-white text-[13px] resize-none"
              />
            </div>
            <ImageUploadField 
              name="curtain-spotlight-2_image_url" 
              defaultValue={card2?.image_url || "/images/curtain-2.jpg"} 
              label="Image URL"
              dimensions="1280 x 720px (16:9)"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="bg-[#111] text-white px-10 py-5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 w-fit hover:bg-[#C0001A] transition-all disabled:opacity-50 shadow-xl"
      >
        {isSaving ? "Updating Spotlight..." : "Update Curtains Section"} <Save size={16} />
      </button>
    </form>
  );
}

// ─── INSTAGRAM MANAGEMENT ───
function InstagramManagement({ posts, section, onSaveSuccess }: { posts: InstagramPost[], section?: HomepageSection, onSaveSuccess: () => void }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);

  const handleSubmitHeader = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    await saveHomepageSection(formData);
    setIsSaving(false);
    onSaveSuccess();
  };

  const handleDelete = async (id: string) => {
    toast.warning("Remove post?", {
      action: {
        label: "Remove",
        onClick: async () => {
          await deleteInstagramPost(id);
          onSaveSuccess();
          toast.success("Removed");
        },
      },
    });
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmitHeader} className="space-y-8">
        <div>
          <h3 className="text-xl font-playfair font-black text-[#111] mb-2">We're on Instagram</h3>
          <p className="text-[11px] text-gray-500 max-w-xl leading-relaxed">
            Manage the visual journey header and the curated feed from your Instagram.
          </p>
        </div>

        <input type="hidden" name="section_key" value="instagram-header" />
        <input type="hidden" name="id" value={section?.id || "new"} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Heading</label>
            <input 
              name="title" 
              defaultValue={section?.title || "We're on Instagram"} 
              className="w-full p-4 border border-[#eeeeee] focus:outline-none focus:border-[#C0001A] text-[13px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subtitle/Handle</label>
            <input 
              name="subtitle" 
              defaultValue={section?.subtitle || "@magnat_furniture.kondotty"} 
              className="w-full p-4 border border-[#eeeeee] focus:outline-none focus:border-[#C0001A] text-[13px]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location (Displayed on cards)</label>
          <input 
            name="description" 
            defaultValue={section?.description || "Kondotty, Kerala"} 
            className="w-full p-4 border border-[#eeeeee] focus:outline-none focus:border-[#C0001A] text-[13px]"
            placeholder="Kondotty, Kerala"
          />
        </div>

        <div className="max-w-xs">
          <ImageUploadField 
            name="image_url" 
            defaultValue={section?.image_url || undefined} 
            label="Profile Picture"
            dimensions="500 x 500px (1:1)"
          />
        </div>

        <button
          type="submit"
          className="bg-[#111] text-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest w-fit hover:bg-[#C0001A] transition-all"
        >
          Update Header
        </button>
      </form>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Featured Feed Content</label>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C0001A] border border-[#C0001A]/20 px-4 py-2 hover:bg-[#C0001A] hover:text-white transition-all"
          >
            <Plus size={14} /> Add Post
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {posts.map(post => (
            <div key={post.id} className="relative aspect-square group border border-[#eeeeee] overflow-hidden">
              <img src={post.image_url} alt={post.caption || ""} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                <button 
                  onClick={() => setEditingPost(post)}
                  className="text-[9px] font-bold uppercase tracking-widest text-white border border-white/30 px-3 py-1.5 hover:bg-white hover:text-black transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="text-[9px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      {(isAdding || editingPost) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white p-8 max-w-md w-full animate-in zoom-in-95 duration-200 my-8">
            <h4 className="text-xl font-playfair font-black text-[#111] mb-6">{editingPost ? "Edit Instagram Post" : "Add Instagram Post"}</h4>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await saveInstagramPost(formData);
              setIsAdding(false);
              setEditingPost(null);
              onSaveSuccess();
            }} className="space-y-4">
              <input type="hidden" name="id" value={editingPost?.id || "new"} />
              <ImageUploadField 
                name="image_url" 
                defaultValue={editingPost?.image_url} 
                label="Image URL"
                dimensions="1080 x 1080px (1:1 Square)"
              />
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Post URL (Link)</label>
                <input name="post_url" defaultValue={editingPost?.post_url || ""} className="w-full p-4 border border-[#eeeeee] text-[13px]" placeholder="https://instagram.com/p/..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Caption</label>
                <input name="caption" defaultValue={editingPost?.caption || ""} className="w-full p-4 border border-[#eeeeee] text-[13px]" placeholder="Modern Comfort" />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-[#111] text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C0001A]">Save Post</button>
                <button type="button" onClick={() => { setIsAdding(false); setEditingPost(null); }} className="flex-1 bg-gray-100 text-gray-500 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HERO MANAGEMENT ───
function HeroManagement({ slides, onSaveSuccess }: { slides: HeroSlide[], onSaveSuccess: () => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const handleDelete = async (id: string) => {
    toast.warning("Remove slide?", {
      action: {
        label: "Remove",
        onClick: async () => {
          await deleteHeroSlide(id);
          onSaveSuccess();
          toast.success("Removed");
        },
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-playfair font-black text-[#111] mb-2">Main Cinematic Hero</h3>
          <p className="text-[11px] text-gray-500 max-w-xl leading-relaxed">
            Manage the primary banners displayed at the top of your homepage.
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#111] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#C0001A] transition-all w-fit"
        >
          <Plus size={14} /> Add Slide
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {slides.length > 0 ? (
          slides.map((slide) => (
            <div key={slide.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-[#eeeeee] bg-[#F9F9F9] gap-6">
              <div className="flex items-center gap-6">
                <div className="w-32 h-20 bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                  <img src={slide.image_url} alt={slide.heading} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#111]">{slide.heading}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Order: {slide.sort_order}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setEditingSlide(slide)}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#111] border border-[#eeeeee] bg-white px-6 py-3 hover:border-[#111] transition-all"
                >
                  Edit Details
                </button>
                <button 
                  onClick={() => handleDelete(slide.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border border-dashed border-[#eeeeee]">
            <p className="text-[11px] text-gray-400">No slides configured.</p>
          </div>
        )}
      </div>

      {/* Slide Modal */}
      {(isAdding || editingSlide) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white p-8 max-w-2xl w-full animate-in zoom-in-95 duration-200 my-8">
            <h4 className="text-xl font-playfair font-black text-[#111] mb-6">{editingSlide ? "Edit Hero Slide" : "Add Hero Slide"}</h4>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await saveHeroSlide(formData);
              setIsAdding(false);
              setEditingSlide(null);
              onSaveSuccess();
            }} className="space-y-6">
              <input type="hidden" name="id" value={editingSlide?.id || "new"} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ImageUploadField 
                    name="image_url" 
                    defaultValue={editingSlide?.image_url} 
                    label="Desktop Image"
                    dimensions="2560 x 1440px (16:9)"
                  />
                  <ImageUploadField 
                    name="mobile_image_url" 
                    defaultValue={editingSlide?.mobile_image_url || ""} 
                    label="Mobile Image (Optional)"
                    dimensions="1080 x 1920px (9:16)"
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Heading</label>
                    <input name="heading" defaultValue={editingSlide?.heading} required className="w-full p-4 border border-[#eeeeee] text-[13px] bg-[#F9F9F9]" placeholder="Living Architecture" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description (Optional)</label>
                    <textarea name="description" defaultValue={editingSlide?.description || ""} rows={3} className="w-full p-4 border border-[#eeeeee] text-[13px] bg-[#F9F9F9] resize-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sort Order</label>
                      <input type="number" name="sort_order" defaultValue={editingSlide?.sort_order || 0} className="w-full p-4 border border-[#eeeeee] text-[13px] bg-[#F9F9F9]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* is_active implicit true for simplicity unless needed, or just hidden field */}
              <input type="hidden" name="is_active" value="true" />
              <input type="hidden" name="alt_text" value="" />

              <div className="flex gap-4 pt-6 border-t border-[#eeeeee]">
                <button type="submit" className="flex-1 bg-[#111] text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#C0001A] transition-colors gap-2 flex justify-center items-center">
                  <Save size={14}/> Save Slide
                </button>
                <button type="button" onClick={() => { setIsAdding(false); setEditingSlide(null); }} className="flex-1 bg-gray-100 text-[#111] py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
