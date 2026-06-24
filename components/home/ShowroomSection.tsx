"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function ShowroomSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 110);
          });
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#1e1e1e] py-0 overflow-hidden"
    >
      {/* ── Thin gold rule ── */}
      <div className="thin-gold-divider" />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

        {/* ── Left: Image / Ambient ── */}
        <div className="reveal relative overflow-hidden min-h-[260px] lg:min-h-0">
          {/* Warm interior gradient simulating showroom ambience */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #2a1f10 0%, #3d2e18 30%, #5a3f20 55%, #3a2c18 80%, #1e1810 100%)",
            }}
          />
          {/* Subtle gold light source */}
          <div
            className="absolute"
            style={{
              top: "30%",
              left: "55%",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,169,110,0.25) 0%, transparent 65%)",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Showroom room lines (architectural detail) */}
          <svg
            className="absolute inset-0 w-full h-full opacity-15"
            viewBox="0 0 600 480"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Floor perspective lines */}
            <line x1="0" y1="480" x2="300" y2="220" stroke="#c9a96e" strokeWidth="0.5" />
            <line x1="600" y1="480" x2="300" y2="220" stroke="#c9a96e" strokeWidth="0.5" />
            <line x1="0" y1="480" x2="600" y2="480" stroke="#c9a96e" strokeWidth="0.5" />
            {/* Ceiling */}
            <line x1="0" y1="0" x2="300" y2="220" stroke="#c9a96e" strokeWidth="0.5" />
            <line x1="600" y1="0" x2="300" y2="220" stroke="#c9a96e" strokeWidth="0.5" />
            {/* Horizon */}
            <line x1="0" y1="220" x2="600" y2="220" stroke="#c9a96e" strokeWidth="0.5" />
          </svg>

          {/* Gold badge overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="inline-flex flex-col border border-[#c9a96e]/30 px-5 py-4">
              <span
                className="text-[#c9a96e] text-[8px] tracking-[0.45em] uppercase mb-1"
                
              >
                Experience
              </span>
              <span
                className="text-white text-xl font-semibold leading-tight"
                
              >
                Our Flagship
                <br />
                <span className="italic text-[#c9a96e]">Showroom</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Right: Details ── */}
        <div className="reveal flex flex-col justify-center px-10 lg:px-16 py-16">

          <span
            className="text-[#c9a96e] text-[8px] font-bold tracking-[0.45em] uppercase mb-6 block"
            
          >
            Visit Us
          </span>

          <h2
            className="text-white font-semibold leading-[1.1] mb-2"
            style={{
              
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            }}
          >
            Kochi Design Studio
          </h2>

          <div className="w-10 h-[1px] bg-[#c9a96e] mb-8" />

          {/* Info rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 mb-10">
            <div>
              <p
                className="text-[8px] font-bold tracking-[0.35em] uppercase text-white/30 mb-2"
                
              >
                Address
              </p>
              <p
                className="text-white/65 text-sm leading-relaxed font-light"
                
              >
                123 Luxury Avenue
                <br />
                Design District
                <br />
                Kerala, India 682001
              </p>
            </div>

            <div>
              <p
                className="text-[8px] font-bold tracking-[0.35em] uppercase text-white/30 mb-2"
                
              >
                Opening Hours
              </p>
              <p
                className="text-white/65 text-sm leading-relaxed font-light"
                
              >
                Monday – Saturday
                <br />
                10:00 am – 7:00 pm
                <br />
                Sunday  11:00 am – 5:00 pm
              </p>
            </div>

            <div>
              <p
                className="text-[8px] font-bold tracking-[0.35em] uppercase text-white/30 mb-2"
                
              >
                Phone
              </p>
              <a
                href="tel:+919074477358"
                className="text-white/65 text-sm hover:text-[#c9a96e] transition-colors font-light"
                
              >
                +91 9074477358
              </a>
            </div>

            <div>
              <p
                className="text-[8px] font-bold tracking-[0.35em] uppercase text-white/30 mb-2"
                
              >
                Email
              </p>
              <a
                href="mailto:info@magnat.in"
                className="text-white/65 text-sm hover:text-[#c9a96e] transition-colors font-light"
                
              >
                info@magnat.in
              </a>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-gold-outline-light">
              Book a Visit
            </Link>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-[9px] font-semibold tracking-[0.25em] uppercase transition-colors border-b border-white/15 hover:border-white/45 pb-[2px]"
              
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* ── Thin gold rule ── */}
      <div className="thin-gold-divider" />
    </section>
  );
}
