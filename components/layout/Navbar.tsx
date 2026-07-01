"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, ChevronDown, ArrowRight, Instagram, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/lib/context/FavoritesContext";

const EXPLORE_DATA = {
  categories: [
    { name: "Sofas", href: "/products/sofas", image: "/images/sofa3d.png" },
    { name: "Chairs", href: "/products/chairs", image: "/images/chair.png" },
    { name: "Dining", href: "/products/dining", image: "/images/dining-001.jpg" },
    { name: "Curtains", href: "/products/curtains", image: "/images/curtains_nav.png" },
  ],

  rooms: [
    { name: "Living Room", href: "/rooms/living-room" },
    { name: "Dining Room", href: "/rooms/dining-room" },
    { name: "Bedroom", href: "/rooms/bedroom" },
    { name: "Office", href: "/rooms/office" },
    { name: "Sitout", href: "/rooms/sitout" },
  ]
};

function NavbarContent() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const pathname = usePathname();
  const { favoritesCount, setDrawerOpen } = useFavorites();

  // Scroll lock on mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  return (
    <div className="max-container h-20 flex items-center justify-between">
      {/* Brand Identity */}
      <Link href="/" className="flex items-center group relative z-[210] hover:opacity-95 transition-opacity">
        <img
          src="/images/magnat-logo-header.png"
          alt="Magnat Logo"
          width={205}
          height={48}
          className="h-12 w-auto object-contain"
        />
      </Link>

      {/* Primary Navigation (Desktop) */}
      <nav className="hidden md:flex items-center gap-10">
        <Link
          href="/products"
          className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/80 hover:text-[#C0001A] transition-colors"
        >
          Shop
        </Link>

        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => setActiveMenu('explore')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className={`flex items-center gap-1 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors ${activeMenu === 'explore' ? "text-[#C0001A]" : "text-black/80 hover:text-[#C0001A]"}`}>
            Explore <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'explore' ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {activeMenu === 'explore' && (
              <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }} className="absolute top-full left-[-150px] w-[600px] pt-5">
                <div className="bg-white p-8 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-black/5 grid grid-cols-12 gap-10">
                  <div className="col-span-7">
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 block mb-6 px-1">Furniture Categories</span>
                    <div className="grid grid-cols-2 gap-4">
                      {EXPLORE_DATA.categories.map((item) => (
                        <Link key={item.name} href={item.href} className="group block space-y-2 p-1" onClick={() => setActiveMenu(null)}>
                          <div className="aspect-[4/3] bg-[#f9f9f9] rounded-lg overflow-hidden border border-black/[0.03]">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <span className="text-[12px] font-bold text-black group-hover:text-[#C0001A] transition-colors">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-5 border-l border-black/5 pl-10">
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 block mb-6 text-nowrap">Shop by Room</span>
                    <div className="flex flex-col gap-4">
                      {EXPLORE_DATA.rooms.map((item) => (
                        <Link key={item.name} href={item.href} className="text-[14px] font-bold text-black hover:text-[#C0001A] transition-colors whitespace-nowrap" onClick={() => setActiveMenu(null)}>
                          {item.name}
                        </Link>
                      ))}
                      <div className="mt-8 pt-8 border-t border-black/5">
                        <Link href="/rooms/all-pieces" className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C0001A] hover:underline" onClick={() => setActiveMenu(null)}>
                          View All Pieces
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link href="/showrooms" className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/80 hover:text-[#C0001A] transition-colors">Showrooms</Link>
        <Link href="/about" className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/80 hover:text-[#C0001A] transition-colors">About Us</Link>
      </nav>

      {/* Desktop Interaction Icons */}
      <div className="flex items-center gap-4 lg:gap-6 relative z-[210]">
        <button onClick={() => setDrawerOpen(true)} className="relative text-black/80 hover:text-[#C0001A] transition-colors p-2" aria-label="Favorites">
          <Heart size={20} strokeWidth={1.5} />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C0001A] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favoritesCount}</span>
          )}
        </button>
        <Link href="/contact" className="hidden lg:block bg-[#111] text-white px-8 py-3 rounded-md text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-[#C0001A] transition-colors shadow-sm">Enquire</Link>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-black/80 bg-black/5 rounded-full" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Immersive Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col pt-20"
          >
            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12">
              {/* Primary Links */}
              <nav className="flex flex-col gap-8">
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                  <Link href="/products" className="text-4xl font-bold font-playfair hover:text-[#C0001A] transition-colors" onClick={() => setMobileOpen(false)}>Shop</Link>
                </motion.div>

                {/* Explore Accordion */}
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
                  <button
                    onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                    className="w-full flex items-center justify-between text-4xl font-bold font-playfair hover:text-[#C0001A]"
                  >
                    Explore <ChevronDown size={28} className={`transition-transform duration-300 ${mobileExploreOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobileExploreOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          {EXPLORE_DATA.categories.map(c => (
                            <Link key={c.name} href={c.href} className="text-lg font-bold font-playfair py-2 text-black/60 border-b border-black/5" onClick={() => setMobileOpen(false)}>{c.name}</Link>
                          ))}
                          {EXPLORE_DATA.rooms.map(r => (
                            <Link key={r.name} href={r.href} className="text-lg font-bold font-playfair py-2 text-black/60 border-b border-black/5" onClick={() => setMobileOpen(false)}>{r.name}</Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                  <Link href="/showrooms" className="text-4xl font-bold font-playfair hover:text-[#C0001A]" onClick={() => setMobileOpen(false)}>Showrooms</Link>
                </motion.div>
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                  <Link href="/about" className="text-4xl font-bold font-playfair hover:text-[#C0001A]" onClick={() => setMobileOpen(false)}>About Us</Link>
                </motion.div>
              </nav>

              {/* Mobile Contact Footer */}
              <div className="space-y-6 pt-10 border-t border-black/5">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/30">Get in touch</span>
                <div className="flex flex-col gap-4">
                  <a href="tel:+919446516395" className="text-xl font-bold flex items-center gap-3">
                    <Phone size={18} className="text-[#C0001A]" />
                    +91 94465 16395
                  </a>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/magnat_furniture_.kondotty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#C0001A]/5 text-[#C0001A] rounded-full flex items-center justify-center"><Instagram size={20} /></a>
                    <Link href="/contact" className="flex-1 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full flex items-center justify-center" onClick={() => setMobileOpen(false)}>Book Visit</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Mobile CTA */}
            <div className="p-6 bg-white border-t border-black/5">
              <a
                href="https://wa.me/919446516395"
                target="_blank"
                className="w-full bg-[#111] hover:bg-[#C0001A] text-white h-14 rounded-full flex items-center justify-center gap-3 text-[11px] font-black tracking-[0.2em] uppercase transition-colors"
              >
                WhatsApp Consultation
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  return (
    <header className="fixed top-0 z-[100] w-full bg-white border-b border-black/5">
      <Suspense fallback={<div className=" bg-white" />}>
        <NavbarContent />
      </Suspense>
    </header>
  );
}
