"use client";

import { useEffect, useRef } from "react";
import FadeInView from "@/components/ui/FadeInView";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: 1,
    category: "Design",
    date: "April 2025",
    title: "The New Sofa Rules: Why Curves Are Dominating 2025 Interiors",
    excerpt:
      "From kidney-shaped conversation pieces to sinuous sectionals, the straight line is surrendering. We trace the arc of furniture's most significant shift in a generation.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=900&auto=format&fit=crop",
    href: "/news/sofa-curves-2025",
  },
  {
    id: 2,
    category: "Brand Spotlight",
    date: "March 2025",
    title: "Inside Minotti: Where Craft Meets the Contemporary Italian Ideal",
    excerpt:
      "A rare studio visit with the design team behind Minotti's celebrated Lawrence collection — and a look at what happens when tailoring meets upholstery.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
    href: "/news/minotti-studio-visit",
  },
  {
    id: 3,
    category: "Living Guide",
    date: "February 2025",
    title: "The Art of Doing Less: A Masterclass in Considered Living Rooms",
    excerpt:
      "Great rooms don't accumulate; they edit. Our stylist's guide to pairing one statement sofa with exactly the right three supporting pieces.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=900&auto=format&fit=crop",
    href: "/news/considered-living-rooms",
  },
];

export default function NewsTrendsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 130);
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 px-4 bg-[#FAF8F6]"
    >
      <div className="max-container">
        <SectionHeading 
          label="Editorial Highlights"
          titlePart1="News &"
          titlePart2="Trends"
          subtitle="Stay updated with the latest in luxury furniture design, material innovations, and architectural living trends curated by our studio team."
          className="mb-10 md:mb-16"
        />
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, i) => (
          <Link
            key={article.id}
            href={article.href}
            className="news-card reveal group block bg-[#FCFCFC] border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {/* Image */}
            <div className="news-card-img-wrap aspect-[16/10] overflow-hidden bg-gray-100">
              <Image
                src={article.image}
                alt={article.title}
                width={900}
                height={675}
                className="news-card-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="p-6 text-center">
              {/* Meta */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-[#C0001A] text-[9px] font-bold tracking-[0.3em] uppercase">
                  {article.category}
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-400 text-[9px] font-medium tracking-[0.1em] uppercase">
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[#111] text-xl font-bold leading-tight mb-4 group-hover:text-[#C0001A] transition-colors duration-300">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>

              {/* Read more */}
              <div className="mt-8 flex items-center justify-center gap-2 text-[#C0001A] font-bold text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                <span>Read Story</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-10 text-center md:hidden">
        <Link href="/news" className="arrow-link">
          All Stories
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
