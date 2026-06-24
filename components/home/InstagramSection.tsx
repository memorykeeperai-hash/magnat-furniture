"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";

import { InstagramPost } from "@/lib/types";

const FALLBACK_POSTS: InstagramPost[] = [
  { id: "1", image_url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop", is_active: true, sort_order: 0, caption: null, post_url: null },
  { id: "2", image_url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop", is_active: true, sort_order: 1, caption: null, post_url: null },
  { id: "3", image_url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2064&auto=format&fit=crop", is_active: true, sort_order: 2, caption: null, post_url: null },
  { id: "4", image_url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070&auto=format&fit=crop", is_active: true, sort_order: 3, caption: null, post_url: null },
  { id: "5", image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop", is_active: true, sort_order: 4, caption: null, post_url: null },
  { id: "6", image_url: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2070&auto=format&fit=crop", is_active: true, sort_order: 5, caption: null, post_url: null },
];

export default function InstagramSection({ posts }: { posts?: InstagramPost[] }) {
  const activePosts = posts && posts.length > 0 ? posts : FALLBACK_POSTS;
  return (
    <section className="bg-white py-32 border-t border-black/5">
      <div className="max-container">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <FadeInView className="max-w-2xl">
            <span className="heading-label">Follow Perspective</span>
            <h2 className="heading-title" >
              Magnat on <br />
              <span className="italic font-normal">Instagram.</span>
            </h2>
            <p className="text-black/50 text-base font-light max-w-xl leading-relaxed">
              A daily diary of interior excellence. Join our community of designers and homeowners 
              discovering the world&apos;s finest handcrafted furniture.
            </p>
          </FadeInView>
          
          <FadeInView delay={0.4}>
            <a
              href="https://www.instagram.com/magnat_furniture_.kondotty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Follow Us
            </a>
          </FadeInView>
        </div>

        {/* Gallery Grid (Grayscale to Color) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {activePosts.map((post, index) => (
            <FadeInView key={index} delay={index * 0.1} className="group relative aspect-square overflow-hidden bg-white">
              <a href={post.post_url || "https://www.instagram.com/magnat_furniture_.kondotty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <Image
                  src={post.image_url}
                  alt={post.caption || `Instagram Post ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#111111]/30 opacity-0 transition-opacity duration-700 group-hover:opacity-100 flex items-center justify-center">
                  <div className="border border-white/40 p-5 rounded-full backdrop-blur-sm">
                    <Instagram size={20} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </a>
            </FadeInView>
          ))}
        </div>

      </div>
    </section>
  );
}
