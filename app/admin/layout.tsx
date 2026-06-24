"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ListTree, MessageSquare, Image as ImageIcon, Users, LogOut, ExternalLink, ShieldCheck, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { handleLogout } from "@/app/actions/auth";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Home Page", href: "/admin/home", icon: ImageIcon },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Exclusive", href: "/admin/exclusive", icon: ShieldCheck },
  { label: "Categories", href: "/admin/categories", icon: ListTree },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Testimonials", href: "/admin/testimonials", icon: Users },
  { label: "Media Assets", href: "/admin/media", icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#F7F4F0] flex items-center justify-center">
        {children}
      </div>
    );
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex min-h-screen bg-[#F7F4F0] font-inter max-w-[100vw] overflow-x-hidden">

      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#eeeeee] z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck size={20} strokeWidth={1.5} className="text-[#C0001A]" />
          <span className="font-playfair text-lg font-black tracking-tighter text-[#111111] leading-none">
            MAGNAT
          </span>
        </Link>
        <button onClick={toggleMenu} className="p-2 text-[#111] bg-[#F7F4F0]">
          {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#111111]/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`w-72 bg-white flex flex-col fixed inset-y-0 z-50 border-r border-[#eeeeee] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-8 pb-10">
          <Link href="/" className="flex items-center gap-3 mb-10 group relative pb-2 border-b border-[#eeeeee] md:border-transparent md:pb-0">
            <ShieldCheck size={26} strokeWidth={1.5} className="text-[#C0001A]" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl font-black tracking-tighter text-[#111111] leading-none">
                MAGNAT
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#C0001A] mt-1">Admin Portal</span>
            </div>
            {/* Close button inside sidebar for mobile */}
            <button onClick={toggleMenu} className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#111]">
              <X size={18} strokeWidth={1.5} />
            </button>
          </Link>

          <nav className="space-y-1.5 mt-6 md:mt-0">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex flex-col relative px-4 py-3.5 transition-all group ${isActive
                    ? "text-[#111111]"
                    : "text-[#666666] hover:text-[#111111] hover:bg-[#F9F9F9]"
                    }`}
                >
                  <div className="flex items-center gap-4 z-10 w-full">
                    <item.icon size={18} className={isActive ? "text-[#C0001A]" : "text-[#111111]/30 group-hover:text-[#C0001A] transition-colors"} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] mt-0.5">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-[#F9F9F9] border-r-2 border-[#C0001A] pointer-events-none"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-4">
          <div className="bg-[#F7F4F0] p-6 rounded-none border border-[#eeeeee] mb-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#111] group-hover:bg-[#C0001A] transition-colors" />
            <p className="text-[9px] uppercase tracking-widest text-[#111] mb-2 font-bold flex items-center gap-2">
              Enterprise CMS
            </p>
            <p className="text-[11px] text-[#666] leading-relaxed mb-4">
              Optimized for production deployments.
            </p>
            <a
              href="https://wa.me/917736767759?text=Hi%2C%20I%20need%20support%20with%20the%20Magnat%20Enterprise%20CMS."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase font-bold text-[#C0001A] hover:text-[#111] transition-colors flex items-center gap-2 tracking-widest"
            >
              Support <ExternalLink size={12} />
            </a>
          </div>

          <form action={handleLogout} className="w-full">
            <button
              type="submit"
              className="flex items-center gap-4 px-4 py-4 w-full text-[10px] font-bold uppercase tracking-[0.15em] text-[#C0001A] hover:bg-[#C0001A]/5 transition-all group"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              Terminate Session
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 w-full md:w-[calc(100%-18rem)]">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 md:px-12 py-8 md:py-10 bg-white border-b border-[#eeeeee]">
          <div>
            <h1 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#C0001A] mb-2">Back-Office Infrastructure</h1>
            <h2 className="font-playfair text-2xl md:text-3xl font-black text-[#111] tracking-tight">Management Dashboard</h2>
          </div>

          <div className="flex items-center gap-4 md:gap-5 self-end md:self-auto">
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-widest">Admin User</span>
              <span className="text-[8px] md:text-[9px] text-[#C0001A] uppercase tracking-[0.2em] font-bold mt-1">Authorized</span>
            </div>
            <div className="h-8 w-8 md:h-10 md:w-10 border border-[#eeeeee] bg-[#F7F4F0] flex items-center justify-center text-[10px] md:text-xs font-bold text-[#111]">
              AD
            </div>
          </div>
        </header>

        <div className="p-4 md:p-10 w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
