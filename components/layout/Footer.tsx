"use client";

import { Instagram, Facebook, Youtube, MessageSquare } from "lucide-react";
import Link from "next/link";

const footNav = [
  {
    title: "Collections",
    links: [
      { label: "Bespoke Sofas", href: "/products/sofas" },
      { label: "Designer Chairs", href: "/products/chairs" },
      { label: "Luxury Dining", href: "/products/dining" },
      { label: "Custom Curtains", href: "/products/curtains" },
    ]
  },
  {
    title: "Shop by Room",
    links: [
      { label: "Living Room", href: "/rooms/living-room" },
      { label: "Dining Room", href: "/rooms/dining-room" },
      { label: "Master Bedroom", href: "/rooms/bedroom" },
      { label: "Executive Office", href: "/rooms/office" },
    ]
  },
  {
    title: "The Brand",
    links: [
      { label: "Our Showrooms", href: "/showrooms" },
      { label: "About Magnat", href: "/about" },
      { label: "Bespoke Enquiries", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ]
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#0A0A0A] text-[#F7F4F0] border-t border-white/5 pt-16 pb-8">
      <div className="max-container px-6">

        {/* Brand Logo */}
        <div className="mb-12">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <img
              src="/images/magnat-logo-footer.png"
              alt="Magnat Logo"
              width={188}
              height={44}
              className="h-11 w-auto object-contain"
            />
          </Link>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">

          {/* Navigation Columns */}
          {footNav.map((column, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <h4 className="text-white text-[11px] font-bold tracking-[0.25em] uppercase flex items-center gap-2">
                <span className="w-1 h-1 bg-[#C0001A] rounded-full" /> {/* Premium Accent Dot */}
                {column.title}
              </h4>
              <div className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-[14px] text-white/60 hover:text-white transition-all duration-300 font-normal hover:translate-x-1 ${link.label === "Privacy Policy" ? "hidden md:inline-block" : "inline-block"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Social Media Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white text-[11px] font-bold tracking-[0.25em] uppercase flex items-center gap-2">
              <span className="w-1 h-1 bg-[#C0001A] rounded-full" />
              Follow Us
            </h4>
            <div className="flex items-center gap-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full sm:border sm:border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/magnat_furniture_.kondotty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full sm:border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="https://youtube.com/@magnat_furniture" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full sm:border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all">
                <Youtube size={18} strokeWidth={1.5} />
              </a>
              {/* WhatsApp Icon remains untouched but fits in the grid circle style */}
              <a href="https://wa.me/919446516395" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full sm:border border-white/10 flex items-center justify-center text-white/40 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all">
                <MessageSquare size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Attribution Bar ── */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright Section */}
          <div className="text-center md:text-left">
            <p className="text-[10px] md:text-[11px] text-white/30 font-medium tracking-[0.15em] uppercase">
              © {currentYear} MAGNAT FURNITURE. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Attribution Section */}
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] text-white/30 tracking-[0.1em] uppercase">
            <span>Crafted by</span>
            <a
              href="https://www.ekodrix.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#C0001A] font-bold transition-colors underline underline-offset-4 decoration-white/10"
            >
              ekodrix
            </a>
          </div>

          {/* Quick Legal Links */}
          <div className="flex gap-6">
            <Link href="/privacy" className="hidden md:inline-block text-[10px] text-white/20 hover:text-white transition-colors uppercase tracking-widest font-bold">Privacy</Link>
            <Link href="/terms" className="hidden md:inline-block text-[10px] text-white/20 hover:text-white transition-colors uppercase tracking-widest font-bold">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}