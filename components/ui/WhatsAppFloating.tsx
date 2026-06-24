// components/ui/WhatsAppFloating.tsx
"use client";

import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function WhatsAppFloating() {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = "919446516395";
  const message = "Hello MAGNAT Furniture Kondotty, I'd like to enquire about your premium furniture and interior solutions.";

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            />

            {/* Expanded Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-28 right-6 z-[102] w-80 bg-white rounded-2xl shadow-2xl border border-[#C0001A]/10 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#111111] to-[#2a2a2a] p-4 relative">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                    <MessageCircle size={24} className="text-white" fill="white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">MAGNAT Furniture</h3>
                    <p className="text-white/70 text-xs">Kondotty Showroom</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <p className="text-sm text-[#111111]/80 leading-relaxed">
                  Need expert consultation for your dream interiors? Our team is ready to assist you.
                </p>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-medium text-center transition-all duration-300 hover:shadow-lg"
                  >
                    Start WhatsApp Chat
                  </a>
                  
                  <a
                    href="tel:+919446516395"
                    className="block w-full bg-[#111111] hover:bg-[#C0001A] text-white py-3 px-4 rounded-xl font-medium text-center transition-all duration-300"
                  >
                    Call Now
                  </a>
                </div>

                {/* Info */}
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-[#111111]/60 text-center">
                    <span className="inline-block w-2 h-2 bg-[#25D366] rounded-full mr-2 animate-pulse"></span>
                    Typically replies within minutes
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-8 right-6 z-[101] group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact on WhatsApp"
      >
        {/* Pulse Animation Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>
        
        {/* Outer Glow */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 blur-xl group-hover:bg-[#25D366]/30 transition-all duration-500"></span>
        
        {/* Main Button */}
        <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#20bd5a] text-white p-4 md:pl-5 md:pr-6 md:py-4 rounded-full shadow-2xl border-2 border-white/30 backdrop-blur-sm">
          <MessageCircle size={24} fill="currentColor" className="animate-pulse" />
          <span className="font-semibold text-sm whitespace-nowrap hidden md:block">
            Chat with Us
          </span>
        </div>

      </motion.button>
    </>
  );
}