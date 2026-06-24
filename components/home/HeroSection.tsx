"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

/* ── Gold Art Frame ──────────────────────────────────────── */
function GoldArtFrame() {
  return (
    <div className="absolute top-[13%] right-[8%] z-10 hidden lg:block">
      <div
        style={{
          width: "140px",
          height: "112px",
          border: "3px solid rgba(201,169,110,0.6)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "4px",
            background:
              "linear-gradient(148deg,#7a5c1e 0%,#c9a020 22%,#e8c84a 38%,#f0d870 50%,#c8a030 68%,#7a5a18 85%,#5a3e10 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "3px",
            border: "1px solid rgba(201,169,110,0.3)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

/* ── Floor Lamp ──────────────────────────────────────────── */
function FloorLamp() {
  return (
    <div className="absolute top-[4%] right-[5.5%] z-10 hidden xl:block" aria-hidden="true">
      <svg width="28" height="210" viewBox="0 0 28 210" fill="none">
        <path d="M2 23 Q14 5 26 23" stroke="#c9a96e" strokeWidth="1.5" fill="none" opacity="0.7" />
        <ellipse cx="14" cy="23" rx="13" ry="6" fill="#c9a96e" opacity="0.55" />
        <rect x="13" y="26" width="2" height="168" fill="#8a7a6a" opacity="0.65" rx="1" />
        <ellipse cx="14" cy="197" rx="11" ry="4" fill="#6a5a4a" opacity="0.75" />
      </svg>
    </div>
  );
}

/* ── Mushroom Lamp ───────────────────────────────────────── */
function MushroomLamp() {
  return (
    <div className="absolute bottom-[14%] left-[6%] z-10 hidden lg:block" aria-hidden="true">
      <svg width="80" height="105" viewBox="0 0 80 105" fill="none">
        <ellipse cx="40" cy="42" rx="38" ry="38" fill="#c9a96e" opacity="0.45" />
        <ellipse cx="40" cy="38" rx="34" ry="30" fill="#d4b270" opacity="0.3" />
        <ellipse cx="40" cy="46" rx="24" ry="20" fill="#e8c882" opacity="0.25" />
        <ellipse cx="32" cy="28" rx="9" ry="7" fill="#fff" opacity="0.08" />
        <rect x="34" y="76" width="12" height="22" rx="5" fill="#b8a878" opacity="0.6" />
        <ellipse cx="40" cy="99" rx="19" ry="5" fill="#a89868" opacity="0.5" />
      </svg>
    </div>
  );
}

/* ── Text Variants ───────────────────────────────────────── */
const textVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.3, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function HeroSection() {
  const [slide, setSlide] = useState(0);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]">
      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2560&auto=format&fit=crop"
          alt="Magnat Furniture — luxury living room"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        {/* Primary dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d]/65 via-[#0d0d0d]/40 to-[#0d0d0d]/20" />
        {/* Bottom fade for polish */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d]/50 to-transparent" />
      </div>

      {/* ── Decoration ── */}
      <GoldArtFrame />
      <FloorLamp />
      <MushroomLamp />

      {/* ── 25 Years Stamp ── */}
      <motion.div
        className="absolute top-[20%] left-16 z-10 hidden lg:flex flex-col items-start pointer-events-none"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span
          className="text-white/35 text-[10px] italic tracking-widest mb-1"
          
        >
          Est. 2001 — Celebrating
        </span>
        <span
          className="text-[#c9a96e] leading-none font-bold"
          style={{  fontSize: "62px", lineHeight: 0.9 }}
        >
          25
        </span>
        <span
          className="text-white/35 text-[9px] uppercase tracking-[0.5em] mt-2 ml-1"
          
        >
          YEARS
        </span>
      </motion.div>

      {/* ── Carousel Controls ── */}
      <button
        onClick={() => setSlide((s) => Math.max(0, s - 1))}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
        aria-label="Previous"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
          <path d="M15 18 9 12l6-6" />
        </svg>
      </button>
      <button
        onClick={() => setSlide((s) => Math.min(2, s + 1))}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
        aria-label="Next"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* ── Hero Text ── */}
      <div className="absolute inset-0 flex items-center z-10 pointer-events-none px-12 lg:px-20">
        <div className="max-w-2xl pt-16">
          {/* Eyebrow */}
          <motion.span
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="block mb-6 text-[#c9a96e] text-[9px] font-bold tracking-[0.45em] uppercase"
            
          >
            Twenty-Five Years of Excellence
          </motion.span>

          {/* H1 */}
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-white leading-[1.12] tracking-tight"
            style={{
              
              fontWeight: 600,
              fontSize: "clamp(46px, 6.5vw, 92px)",
            }}
          >
            Live at the very
            <br />
            <span className="italic text-[#dfc08a] mt-2 block">top of your world</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-8 text-white/60 font-light leading-loose max-w-lg"
            style={{
              
              fontSize: "clamp(15px, 1.6vw, 18px)",
            }}
          >
            Discover 25 years of curated luxury. From sculptural sofas to
            bespoke interiors — furniture designed to move you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-14 flex flex-wrap gap-8 pointer-events-auto"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-[#c9a96e] hover:bg-[#dfc08a] text-[#1a1a1a] text-[10.5px] font-bold tracking-[0.25em] uppercase px-9 py-4 transition-all duration-300 shadow-xl"
              
            >
              Shop Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/40 text-white hover:border-white hover:bg-white/5 text-[10.5px] font-bold tracking-[0.25em] uppercase px-9 py-4 transition-all duration-300"
              
            >
              Visit Showroom
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Slide Dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              slide === i ? "w-6 h-2 bg-[#c9a96e]" : "w-2 h-2 bg-white/30 hover:bg-white/55"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}