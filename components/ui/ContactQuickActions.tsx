// components/ui/ContactQuickActions.tsx
"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactQuickActions() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden" // Mobile only
    >
      <div className="bg-white border-t border-gray-200 shadow-2xl">
        <div className="grid grid-cols-4 divide-x divide-gray-200">
          {/* WhatsApp */}
          <a
            href="https://wa.me/919446516395"
            className="flex flex-col items-center justify-center py-3 hover:bg-[#25D366] hover:text-white transition-all duration-300 group"
          >
            <MessageCircle size={20} className="mb-1" />
            <span className="text-[10px]  font-medium">WhatsApp</span>
          </a>

          {/* Call */}
          <a
            href="tel:+919446516395"
            className="flex flex-col items-center justify-center py-3 hover:bg-[#C0001A] hover:text-white transition-all duration-300 group"
          >
            <Phone size={20} className="mb-1" />
            <span className="text-[10px]  font-medium">Call</span>
          </a>

          {/* Email */}
          <a
            href="mailto:info@magnatfurniture.com"
            className="flex flex-col items-center justify-center py-3 hover:bg-[#111111] hover:text-white transition-all duration-300 group"
          >
            <Mail size={20} className="mb-1" />
            <span className="text-[10px]  font-medium">Email</span>
          </a>

          {/* Location */}
          <a
            href="https://maps.google.com/?q=Kondotty"
            className="flex flex-col items-center justify-center py-3 hover:bg-[#c9a96e] hover:text-white transition-all duration-300 group"
          >
            <MapPin size={20} className="mb-1" />
            <span className="text-[10px]  font-medium">Visit</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}