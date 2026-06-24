"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const swatches = [
  { name: "Dove Grey Linen", color: "#b2b0aa" },
  { name: "Ivory Silk", color: "#e8d5b7" },
  { name: "Pearl Cotton", color: "#ede9e2" },
  { name: "Ocean Teal Velvet", color: "#2a6667" },
  { name: "Burnished Caramel", color: "#c4874a" },
  { name: "Forest Boucle", color: "#3d5a3e" },
  { name: "Dusty Rose Jacquard", color: "#c4958a" },
  { name: "Graphite Linen", color: "#3a3a3a" },
];

export default function CurtainsSection() {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 140);
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 lg:px-14 bg-[#f5f2ee] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Left: Editorial Copy ── */}
        <div>
          <div className="reveal">
            <span className="section-eyebrow">Curtains &amp; Soft Furnishings</span>
          </div>
          <div className="reveal">
            <h2
              className="section-title leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Dress Your Windows
              <span
                className="block italic text-[#c9a96e]"
                
              >
                Like Your Sofas Deserve
              </span>
            </h2>
          </div>

          <div className="reveal">
            <div className="mt-6 w-12 h-[1px] bg-[#c9a96e]" />
          </div>

          <div className="reveal">
            <p className="section-subtitle mt-6 max-w-md">
              The finest sofa demands a window worthy
              of it. Our soft furnishings collection — from floor-to-ceiling
              linen panels to hand-embroidered silk drapes — completes your
              interior story with the same rigour we bring to every cushion and
              curve.
            </p>
          </div>

          <div className="reveal mt-10 flex flex-wrap gap-4">
            <Link href="/products?category=curtains" className="btn-gold-outline">
              Explore Fabrics
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#1a1a1a] border-b border-[#1a1a1a]/20 pb-[2px] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
              
            >
              Request a Swatch Pack
            </Link>
          </div>
        </div>

        {/* ── Right: Swatch Grid ── */}
        <div className="reveal">
          <p
            className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#5a5a5a] mb-8"
            
          >
            Select a Fabric
          </p>

          <div className="grid grid-cols-4 gap-4">
            {swatches.map((swatch, i) => (
              <div
                key={i}
                className="swatch-wrap relative flex flex-col items-center gap-3 cursor-pointer group"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Tooltip */}
                <div className="swatch-tooltip">
                  {swatch.name}
                </div>

                {/* Circle */}
                <div
                  className="w-14 h-14 rounded-full border-2 transition-all duration-300"
                  style={{
                    backgroundColor: swatch.color,
                    borderColor:
                      active === i ? "#c9a96e" : "transparent",
                    transform: active === i ? "scale(1.12)" : "scale(1)",
                    boxShadow:
                      active === i
                        ? `0 0 0 3px #f5f2ee, 0 0 0 4px #c9a96e`
                        : "none",
                  }}
                />

                {/* Name below */}
                <span
                  className={`text-center text-[8px] font-semibold tracking-[0.15em] uppercase leading-tight transition-colors ${
                    active === i ? "text-[#c9a96e]" : "text-[#5a5a5a]"
                  }`}
                  
                >
                  {swatch.name.split(" ").slice(0, 2).join("\n")}
                </span>
              </div>
            ))}
          </div>

          {/* Active swatch detail */}
          <div
            className="mt-8 h-10 flex items-center transition-all duration-300"
          >
            {active !== null && (
              <div className="flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-full border border-[#c9a96e]/40"
                  style={{ backgroundColor: swatches[active].color }}
                />
                <div>
                  <p
                    className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#1a1a1a]"
                    
                  >
                    {swatches[active].name}
                  </p>
                  <p
                    className="text-[9px] tracking-wider text-[#5a5a5a] mt-[2px]"
                    
                  >
                    Available in custom widths &amp; lengths
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
