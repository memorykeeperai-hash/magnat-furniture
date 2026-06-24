"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, MessageSquare, Clock } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { useState } from "react";
import { submitInquiry } from "@/app/actions/contact";

export default function ContactPage() {
   const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
   const [errorMsg, setErrorMsg] = useState("");

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormState("submitting");
      setErrorMsg("");

      const formData = new FormData(e.currentTarget);
      const result = await submitInquiry(formData);

      if (result.error) {
         setFormState("error");
         setErrorMsg(result.error);
      } else {
         setFormState("success");
      }
   };

   return (
      <main className="pt-24 min-h-screen bg-white">
         {/* ── Page Header ── */}
         <section className="py-32 bg-[#f9f9f9]">
            <div className="max-container">
               <FadeInView className="max-w-4xl space-y-6">
                  <span className="heading-label">Channel Excellence</span>
                  <h1 className="heading-title" >
                     Get in <span className="italic font-normal">Touch.</span>
                  </h1>
                  <p className="text-xl text-black/40 font-light max-w-2xl leading-relaxed">
                     Whether you are a discerning homeowner or a professional architect, our team
                     is ready to assist your inquiry.
                  </p>
               </FadeInView>
            </div>
         </section>

         {/* ── Contact Grid ── */}
         <section className="py-40">
            <div className="max-container grid grid-cols-1 lg:grid-cols-2 gap-32">

               {/* Left: Global Inquiries Form */}
               <div className="space-y-16">
                  <div className="space-y-4">
                     <h2 className="text-4xl font-bold" >Start a Design Dialogue.</h2>
                     <div className="h-px w-20 bg-[#C0001A]" />
                  </div>

                  {formState !== "success" ? (
                     <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30">Your Name</label>
                              <input type="text" name="fullName" required className="w-full bg-transparent border-b border-black/10 py-4 text-sm focus:outline-none focus:border-[#C0001A] transition-colors" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30">Your Email</label>
                              <input type="email" name="email" required className="w-full bg-transparent border-b border-black/10 py-4 text-sm focus:outline-none focus:border-[#C0001A] transition-colors" />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30">Inquiry Type</label>
                           <select name="subject" className="w-full bg-transparent border-b border-black/10 py-4 text-sm focus:outline-none focus:border-[#C0001A] transition-colors appearance-none">
                              <option value="Residential Project">Residential Project</option>
                              <option value="Commercial Unit">Commercial Unit</option>
                              <option value="Signature Model Inquiry">Signature Model Inquiry</option>
                              <option value="Curtains & Blinds">Curtains & Blinds</option>
                           </select>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30">Detailed Message</label>
                           <textarea name="message" rows={5} className="w-full bg-transparent border-b border-black/10 py-4 text-sm focus:outline-none focus:border-[#C0001A] transition-colors resize-none"></textarea>
                        </div>

                        {formState === "error" && (
                           <div className="p-4 bg-red-50 text-[#C0001A] border border-[#C0001A]/20 text-xs font-bold text-center">
                              {errorMsg}
                           </div>
                        )}

                        <button disabled={formState === "submitting"} type="submit" className="btn-primary w-full lg:w-fit py-5 px-16 disabled:opacity-50 h-[60px] flex items-center justify-center">
                           {formState === "submitting" ? (
                              <span className="flex items-center gap-2">
                                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                 Transmitting...
                              </span>
                           ) : "Submit Inquiry"}
                        </button>
                     </form>
                  ) : (
                     <div className="bg-[#f9f9f9] p-16 border border-black/5 text-center space-y-6">
                        <div className="w-16 h-16 bg-[#111] rounded-full flex items-center justify-center mx-auto text-white">
                           <MessageSquare size={32} />
                        </div>
                        <h3 className="text-3xl font-bold" >Engagement Received.</h3>
                        <p className="text-black/50">Our Kondotty desk will respond to your invitation within 24 business hours.</p>
                     </div>
                  )}
               </div>

               {/* Right: Studio Credentials */}
               <div className="space-y-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                     <div className="space-y-6">
                        <h4 className="heading-label">Kondotty Studio</h4>
                        <div className="space-y-4 text-sm text-[#111]/70 leading-relaxed font-light">
                           <p className="flex items-start gap-3">
                              <MapPin size={18} className="text-[#C0001A] mt-1 shrink-0" />
                              Kondotty — Areekode Road,<br />Chungam Junction,<br />Kerala 673638
                           </p>
                           <p className="flex items-center gap-3">
                              <Clock size={16} className="text-[#C0001A]" />
                              09:30 AM — 08:30 PM
                           </p>
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h4 className="heading-label">Direct Lines</h4>
                        <div className="space-y-4 text-sm text-[#111]/70 font-light">
                           <a href="tel:9446516395" className="flex items-center gap-3 hover:text-[#C0001A] transition-colors">
                              <Phone size={16} className="text-[#C0001A]" />
                              +91 9446516395
                           </a>
                           <a href="mailto:info@magnat.in" className="flex items-center gap-3 hover:text-[#C0001A] transition-colors">
                              <Mail size={16} className="text-[#C0001A]" />
                              info@magnat.in
                           </a>
                           <a href="https://www.instagram.com/magnat_furniture_.kondotty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#C0001A] transition-colors">
                              <Instagram size={16} className="text-[#C0001A]" />
                              @magnat_furniture_.kondotty
                           </a>
                        </div>
                     </div>
                  </div>

                  {/* Interactive Google Map */}
                  <div className="aspect-video bg-[#f9f9f9] border border-black/5 relative overflow-hidden">
                     <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.577732999317!2d75.9678667!3d11.1447936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64ee03d3e05f3%3A0x895ea8e05f23c7d8!2sMagnat%20Furniture%20and%20Interiors!5e0!3m2!1sen!2sin!4v1775902098710!5m2!1sen!2sin"
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                     ></iframe>
                  </div>
               </div>

            </div>
         </section>
      </main>
   );
}
