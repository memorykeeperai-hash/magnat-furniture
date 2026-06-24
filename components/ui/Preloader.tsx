// components/ui/Preloader.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const luxuryEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  // Check if already loaded this session (enabled for production feel)
  useEffect(() => {
    if (sessionStorage.getItem("magnat-preloaded") === "true") {
      setIsLoading(false);
    }
  }, []);

  // Main Loading Timer
  useEffect(() => {
    if (!isLoading) return;

    // Smooth timer - long enough to see the elegant drawing
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Save it so it never runs again this session
      sessionStorage.setItem("magnat-preloaded", "true");
    }, 2400);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              if (sessionStorage.getItem("magnat-preloaded") === "true") {
                document.documentElement.classList.add('hide-preloader');
              }
            } catch (e) {}
          `,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html.hide-preloader #global-preloader {
              display: none !important;
              opacity: 0 !important;
              pointer-events: none !important;
              visibility: hidden !important;
            }
          `,
        }}
      />
      <AnimatePresence mode="wait">
        {isLoading && (
        <motion.div
          id="global-preloader"
          key="preloader-overlay"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.2, ease: "easeInOut" }
          }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-6">

            {/* ── Line Art Sofa Reveal ── */}
            <div className="mb-6 opacity-90">
              <svg width="68" height="auto" viewBox="0 0 120 50" fill="none" stroke="#F7F4F0" xmlns="http://www.w3.org/2000/svg">
                {/* Backrest */}
                <motion.path
                  d="M24 20C24 11.1634 31.1634 4 40 4H80C88.8366 4 96 11.1634 96 20V32H24V20Z"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: luxuryEase }}
                />
                {/* Armrests & Seat */}
                <motion.path
                  d="M10 22C10 17.5817 13.5817 14 18 14H24V32H96V14H102C106.418 14 110 17.5817 110 22V36C110 38.2091 108.209 40 106 40H14C11.7909 40 10 38.2091 10 36V22Z"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: luxuryEase }}
                />
                {/* Legs */}
                <motion.path
                  d="M24 40L20 48M96 40L100 48"
                  strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1.0, ease: luxuryEase }}
                />
              </svg>
            </div>

            {/* ── LOGO REVEAL ── */}
            <div className="overflow-hidden mb-6 relative">
              <motion.span
                className="block text-[#F7F4F0] font-black tracking-[0.25em] text-3xl md:text-5xl"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: luxuryEase }}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                MAGNAT
              </motion.span>
            </div>

            {/* ── PROGRESS BAR (Ultra Smooth Tween) ── */}
            <div className="w-full flex flex-col items-center max-w-[120px]">
              {/* Bar Container */}
              <motion.div
                className="w-full h-[1px] bg-[#F7F4F0]/20 relative overflow-hidden"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: luxuryEase }}
              >
                {/* Fill Line */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#F7F4F0] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.4, delay: 1.0, ease: "easeInOut" }} // Syncs with total unmount time
                />
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}