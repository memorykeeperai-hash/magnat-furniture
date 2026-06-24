"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

import { HeroSlide } from "@/lib/types";
import { getHeroSlides } from "@/lib/api/hero";
import Button from "@/components/ui/Button";

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: "fallback-1",
    image_url: "/images/hero-section.png",
    mobile_image_url: "/images/hero-section.png",
    alt_text: "MAGNAT Sofa Collection",
    heading: "Sofa Collection",
    description:
      "Sink into comfort without sacrificing style. Exclusive sofa collections redefined.",
    sort_order: 0,
    is_active: true,
  },
  {
    id: "fallback-2",
    image_url:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2600&auto=format&fit=crop",
    mobile_image_url:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop",
    alt_text: "MAGNAT Luxury Interior",
    heading: "Luxury Spaces",
    description:
      "From timeless classics to contemporary masterpieces — every piece tells a story.",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "fallback-3",
    image_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2600&auto=format&fit=crop",
    mobile_image_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    alt_text: "MAGNAT Contemporary Design",
    heading: "Contemporary Design",
    description:
      "Bold lines, rich textures, and thoughtful detail — modern elegance for Kerala homes.",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "fallback-4",
    image_url: "/images/hero-section.png",
    mobile_image_url: "/images/hero-section-mobile.png",
    alt_text: "MAGNAT Premium Living Room",
    heading: "Living Room",
    description:
      "A quarter-century legacy of handcrafted excellence. Kerala's finest interiors.",
    sort_order: 3,
    is_active: true,
  },
];

const INTERVAL = 6500;

const contentSpring = {
  type: "spring",
  stiffness: 60,
  damping: 18,
  mass: 1,
} as const;

export default function HomeHero({
  slides: initialSlides,
}: {
  slides?: HeroSlide[];
}) {
  const [slides, setSlides] = useState<HeroSlide[]>(
    (initialSlides as HeroSlide[]) || FALLBACK_SLIDES,
  );
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const isPausedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slidesLengthRef = useRef(slides.length);
  const touchStartX = useRef(0);

  // ── Detect mobile viewport ──
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    slidesLengthRef.current = slides.length;
  }, [slides.length]);

  useEffect(() => {
    async function loadSlides() {
      if (!initialSlides) {
        const fetched = await getHeroSlides();
        setSlides(fetched as HeroSlide[]);
      }
    }
    loadSlides();
  }, [initialSlides]);

  const activeSlides = slides;

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slidesLengthRef.current);
      }
    }, INTERVAL);
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      startInterval();
    },
    [current, startInterval],
  );

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + slidesLengthRef.current) % slidesLengthRef.current,
    );
    startInterval();
  }, [startInterval]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slidesLengthRef.current);
    startInterval();
  }, [startInterval]);

  // ── Zoom-in transition variants ──
  // Mobile : subtle 1.06 enter scale + faster 1.0s transition → no jarring zoom
  // Desktop: full  1.30 enter scale + slower 1.4s transition → cinematic effect
  const bgVariants = {
    enter: { scale: isMobile ? 1.06 : 1.30, opacity: 0 },
    center: { scale: 1, opacity: 1 },
    exit: { scale: 0.98, opacity: 0 },
  };

  // Ken Burns end scale — also toned down on mobile
  const kenBurnsEndScale = isMobile ? 1.04 : 1.09;

  return (
    <section className="relative w-full bg-white select-none pb-3 md:pb-4 md:px-6 lg:px-8 mt-[-58px] sm:mt-[-10px]  md:py-15">
      {/* ── Dot fill bar animation ── */}
      <style>{`
        @keyframes dotFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .dot-fill-bar {
          animation: dotFill ${INTERVAL}ms linear forwards;
        }
      `}</style>

      <div className="md:px-10 ">
        {/*
          ── Responsive aspect ratio ──
          mobile  (< md) : 9/9.5 portrait → tall, fills phone screen nicely
          tablet  (md)   : 4/3            → balanced landscape
          desktop (lg+)  : 16/6           → wide cinematic banner
        */}
        <div
          className="hero-aspect relative w-full overflow-hidden lg:rounded-[20px] aspect-[9/9.5] md:aspect-[4/3] lg:aspect-[16/6]"
          style={{ marginBottom: "0" }}
        >
          {/* ── Clipping wrapper for the carousel images ── */}
          <div
            className="absolute inset-0 overflow-hidden"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 40) {
                diff > 0 ? goNext() : goPrev();
              }
            }}
          >
            {/* ── Image Carousel ── */}
            <AnimatePresence initial={false}>
              <motion.div
                key={`bg-${current}`}
                variants={bgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: isMobile ? 1.0 : 1.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0"
              >
                {/* ── Ken Burns zoom continues on top of entry animation ── */}
                <motion.div
                  key={`zoom-${current}`}
                  initial={{ scale: 1.0 }}
                  animate={{ scale: kenBurnsEndScale }}
                  transition={{
                    duration: INTERVAL / 1000 + 1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative w-full h-full"
                  style={{ transformOrigin: "center center" }}
                >
                  {/* Desktop image — shown on md and above */}
                  <img
                    src={activeSlides[current].image_url}
                    alt={
                      activeSlides[current].alt_text ||
                      activeSlides[current].heading
                    }
                    className="w-full h-full object-cover hidden md:block"
                    draggable={false}
                  />

                  {/*
                    Mobile image — shown below md.
                    Uses mobile_image_url (portrait/square crop) when available,
                    falls back to the desktop image.
                    object-position: top keeps the focal point visible on tall crops.
                  */}
                  <img
                    src={
                      activeSlides[current].mobile_image_url ||
                      activeSlides[current].image_url
                    }
                    alt={
                      activeSlides[current].alt_text ||
                      activeSlides[current].heading
                    }
                    className="w-full h-full object-cover object-top block md:hidden"
                    draggable={false}
                  />
                </motion.div>

                {/* ── Left-aligned content (Restored Design) ── */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end items-start text-[#FCFCFC] p-8 md:p-12 lg:p-24 mb-3 sm:mb-0">
                  <div className="max-w-[95%] md:max-w-xl">
                    <motion.div
                      key={`content-${current}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...contentSpring, delay: 0.2 }}
                    >
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-2 block text-[#FCFCFC]/90">
                        Signature Furniture
                      </span>

                      <h1 className="!md:text-6xl !font-extrabold ">
                        {activeSlides[current].heading}
                      </h1>

                      <p className="text-[15px] text-[#FCFCFC]/80  mb-3 mt-[-15px]">
                        {activeSlides[current].description}
                      </p>

                      <div className="flex flex-row items-center md:gap-4 gap-2">
                        <Button className="text-[10px] md:text-[15px]">
                          Explores
                        </Button>
                        <Button
                          variant="outline"
                          className="!border-[#FCFCFC] !text-[#FCFCFC] hover:!bg-[#FCFCFC] hover:!text-[#111] md:px-10 text-nowrap text-[10px] md:text-[15px]"
                        >
                          Contact Us
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── EST. badge ── */}
            <div className="absolute bottom-2 right-4 z-20 hidden lg:block">
              <span className="text-[9px] font-bold tracking-[0.5em] uppercase text-white/20 whitespace-nowrap">
                EST. 2001 · KONDOTTY · KERALA
              </span>
            </div>
          </div>

          {/* ── Bottom center dot navigation — outside overflow-hidden so arrows are never clipped ── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-row items-center gap-3">
            {/* Prev arrow */}
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="hidden md:flex items-center justify-center w-7 h-7 text-white/70 hover:text-white transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 2L4 7L9 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dot indicators */}
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="flex items-center justify-center"
              >
                {i === current ? (
                  <span className="relative block w-7 h-[5px] rounded-full overflow-hidden bg-white/30">
                    <span
                      key={`fill-${current}`}
                      className="dot-fill-bar absolute left-0 top-0 h-full bg-white rounded-full"
                      style={{ width: "0%" }}
                    />
                  </span>
                ) : (
                  <span className="block w-[5px] h-[5px] rounded-full bg-white/40 hover:bg-white/70 transition-colors duration-200" />
                )}
              </button>
            ))}

            {/* Next arrow */}
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="hidden md:flex items-center justify-center w-7 h-7 text-white/70 hover:text-white transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 2L10 7L5 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}