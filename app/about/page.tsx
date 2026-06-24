// app/about/page.tsx
"use client";

import FadeInView from "@/components/ui/FadeInView";
import { motion } from "framer-motion";
import {
  Ruler, Hammer, Truck, Home, Heart, Users, MapPin, Phone, Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="pt-0 min-h-screen bg-white">

      {/* ============================================
          HERO — SIMPLE & HONEST INTRODUCTION
          ============================================ */}
      <section className="relative py-6 md:py-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111111'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className=" relative z-10">
          <FadeInView className="max-w-4xl mx-auto text-center space-y-10">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C0001A]"></div>
              <span className="heading-label">Our Story</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C0001A]"></div>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#111111] tracking-tight leading-[1.05]"

            >
              Made in Kondotty,{" "}
              <span className="italic font-normal text-[#C0001A]">
                Crafted for Your Home
              </span>
            </h1>

            <p className="text-xl md:text-lg text-[#666666] font-light leading-relaxed px-5 md:px-0  text-start md:text-center">
              For over 25 years, we've been manufacturing premium furniture right here in Kondotty.
              No middlemen. No showroom markups. Just honest craftsmanship, direct from our workshop to your home.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
              {[
                { value: "25+", label: "Years in Business" },
                { value: "1000s", label: "Happy Families" },
                { value: "100%", label: "Custom Made" },
                { value: "Kerala", label: "Proudly Local" }
              ].map((stat, i) => (
                <FadeInView key={stat.label} delay={i * 0.1}>
                  <div className="text-center">
                    <div
                      className="text-4xl md:text-5xl font-bold text-[#C0001A] mb-2"

                    >
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[#666666]">
                      {stat.label}
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ============================================
          THE SIMPLE STORY
          ============================================ */}
      <section className="py-24 md:py-32 bg-[#f9f9f9]">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <FadeInView direction="right">
              <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                <Image
                  src="/images/aboutmagnat.png"
                  alt="MAGNAT Workshop in Kondotty"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute bottom-8 left-8 bg-white p-6 shadow-xl max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <Home className="text-[#C0001A]" size={24} />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                      Est. 2001
                    </span>
                  </div>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    Same location, same dedication, 25 years later
                  </p>
                </div>
              </div>
            </FadeInView>

            <FadeInView direction="left" className="space-y-8">
              <div className="space-y-4">
                <h2
                  className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight"

                >
                  We Started with One Simple Idea
                </h2>
              </div>

              <div className="space-y-6 text-[#666666] text-lg leading-relaxed">
                <p>
                  Back in 2001, we opened a small furniture workshop in Kondotty with a simple belief:
                  <strong className="text-[#111111]"> families deserve furniture that's made exactly for their homes</strong>,
                  not generic pieces that almost fit.
                </p>

                <p>
                  So we started doing something different. We'd visit homes, measure the exact space,
                  understand how the family lives, and then manufacture each piece custom in our workshop.
                  No catalogs. No "one-size-fits-all." Just furniture that <strong className="text-[#111111]">fits perfectly</strong>.
                </p>

                <p>
                  Today, we still do it the same way. When you choose MAGNAT, you're not buying from a showroom.
                  You're working directly with the people who will craft your furniture, stitch your curtains,
                  and deliver it to your doorstep.
                </p>
              </div>

              <div className="flex items-center gap-8 pt-6 border-t border-[#eeeeee]">
                <div className="flex items-center gap-3">
                  <Heart className="text-[#C0001A]" size={24} />
                  <div>
                    <div className="text-sm font-bold text-[#111111]">Family-Owned</div>
                    <div className="text-xs text-[#666666]">Run by people, not corporations</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-[#eeeeee]"></div>
                <div className="flex items-center gap-3">
                  <Users className="text-[#C0001A]" size={24} />
                  <div>
                    <div className="text-sm font-bold text-[#111111]">Local Team</div>
                    <div className="text-xs text-[#666666]">Same craftsmen for 20+ years</div>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW WE WORK — THE 3-STEP PROCESS
          ============================================ */}
      <section className="py-24 md:py-32">
        <div className="max-container">
          <FadeInView className="text-center mb-20">
            <span className="heading-label mx-auto">Our Simple Process</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#111111] mt-4 max-w-3xl mx-auto"

            >
              From Your Living Room to Our Workshop, and Back
            </h2>
            <p className="text-lg text-[#666666] mt-6 max-w-2xl mx-auto">
              We keep it simple. Three steps, and you get furniture made exactly for your space.
            </p>
          </FadeInView>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                icon: Ruler,
                title: "We Visit & Measure",
                description: "Our team visits your home, measures the exact space, and discusses what you need. We check doorways, ceiling height, and how you use the room. Everything is noted down with precision.",
                details: ["Free home visit", "Detailed measurements", "Design consultation", "Material selection"]
              },
              {
                step: "02",
                icon: Hammer,
                title: "We Manufacture",
                description: "Back at our Kondotty workshop, our craftsmen start building your furniture. We cut, sand, stitch, and finish everything by hand. You can visit anytime to see the progress.",
                details: ["Made in Kondotty", "Hand-crafted quality", "Regular updates", "Factory visit welcome"]
              },
              {
                step: "03",
                icon: Truck,
                title: "We Deliver & Install",
                description: "Once ready, we carefully transport your furniture and install it in your home. We make sure everything fits perfectly, is level, and looks exactly as you imagined.",
                details: ["Careful delivery", "Professional installation", "Perfect fit guaranteed", "Lifetime support"]
              }
            ].map((process, i) => (
              <FadeInView key={process.step} delay={i * 0.15}>
                <div className="group relative bg-white border border-[#eeeeee] hover:border-[#C0001A]/30 p-8 md:p-10 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">

                  {/* Step Number */}
                  <div className="absolute top-8 right-8 text-7xl font-bold text-[#C0001A]/5 group-hover:text-[#C0001A]/10 transition-all" >
                    {process.step}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#C0001A]/10 group-hover:bg-[#C0001A] flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                      <process.icon className="text-[#C0001A] group-hover:text-white transition-colors" size={32} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl font-bold text-[#111111] mb-4 group-hover:text-[#C0001A] transition-colors relative z-10"

                  >
                    {process.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#666666] leading-relaxed mb-6 relative z-10 flex-grow">
                    {process.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2 relative z-10">
                    {process.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#666666]">
                        <div className="w-1 h-1 rounded-full bg-[#C0001A]"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow (except last item) */}
                  {i < 2 && (
                    <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-[#C0001A]/20">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </FadeInView>
            ))}
          </div>

          {/* Trust Statement */}
          <FadeInView className="text-center mt-16">
            <div className="inline-block px-6 py-3 bg-[#f9f9f9] border border-[#eeeeee]">
              <p className="text-sm text-[#666666]">
                <strong className="text-[#111111]">Average timeline:</strong> 3-6 weeks from measurement to installation
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ============================================
          TIMELINE — 25 YEARS OF JOURNEY
          ============================================ */}
      <section className="py-24 md:py-32 bg-[#111111] text-white">
        <div className="max-container">
          <FadeInView className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-[#C0001A] text-white text-[9px] font-bold tracking-[0.3em] uppercase mb-6">
              Our Journey
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold"

            >
              25 Years in Kondotty
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              From a small workshop to Kerala's trusted furniture name
            </p>
          </FadeInView>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>

            {[
              {
                year: "2001",
                title: "The Beginning",
                desc: "Started with a small workshop and 3 skilled craftsmen in Kondotty"
              },
              {
                year: "2008",
                title: "Growing Trust",
                desc: "Word spread. Families started coming from across Malappuram district"
              },
              {
                year: "2015",
                title: "Bigger Workshop",
                desc: "Expanded to a larger facility to handle growing demand"
              },
              {
                year: "2020",
                title: "Going Digital",
                desc: "Launched online consultations for families who couldn't visit in person"
              },
              {
                year: "2026",
                title: "25 Years Strong",
                desc: "Celebrating a quarter-century of serving Kerala families"
              },
            ].map((milestone, i) => (
              <FadeInView
                key={milestone.year}
                delay={i * 0.1}
                className={`relative mb-16 last:mb-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto md:text-left"
                  } md:w-1/2`}
              >
                <div className="absolute left-1/2 top-0 w-4 h-4 bg-[#C0001A] rounded-full -translate-x-1/2 hidden md:block border-4 border-[#111111]"></div>

                <div className="bg-white/5 p-8 backdrop-blur-sm border border-white/10 hover:border-[#C0001A]/50 transition-all duration-500 group">
                  <div
                    className="text-5xl font-bold text-[#C0001A] mb-3 group-hover:scale-110 transition-transform inline-block"

                  >
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2" >
                    {milestone.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          WHY CHOOSE US — HONEST REASONS
          ============================================ */}
      <section className="py-24 md:py-32 bg-[#f9f9f9]">
        <div className="max-container">
          <FadeInView className="text-center mb-16">
            <span className="heading-label mx-auto">Why Families Choose Us</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#111111] mt-4"

            >
              What Makes Us Different
            </h2>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Perfect Fit, Always",
                desc: "Because we measure your actual space and manufacture accordingly, every piece fits perfectly. No guessing, no compromises.",
              },
              {
                title: "No Middleman Markup",
                desc: "You deal directly with us—the manufacturers. That means honest pricing without showroom margins.",
              },
              {
                title: "See Where It's Made",
                desc: "Our workshop is open. You're welcome to visit Kondotty and see your furniture being crafted.",
              },
              {
                title: "Local Craftsmen",
                desc: "Our team has been with us for decades. They take pride in every piece they build.",
              },
              {
                title: "We're Always Here",
                desc: "Need an adjustment years later? A cushion refilled? We're still here, and we still care.",
              },
              {
                title: "Truly Custom",
                desc: "Want different wood? Specific fabric? Extra cushions? We make it exactly how you want it.",
              },
            ].map((reason, i) => (
              <FadeInView key={reason.title} delay={i * 0.1}>
                <div className="bg-white p-8 hover:shadow-xl transition-all duration-500 h-full border border-transparent hover:border-[#C0001A]/20">
                  <div className="w-2 h-2 rounded-full bg-[#C0001A] mb-6"></div>
                  <h3
                    className="text-xl font-bold text-[#111111] mb-3"

                  >
                    {reason.title}
                  </h3>
                  <p className="text-[#666666] leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          VISIT US SECTION
          ============================================ */}
      <section className="py-24 md:py-32">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <FadeInView direction="right">
              <div className="space-y-8">
                <div>
                  <span className="heading-label">Come See Us</span>
                  <h2
                    className="text-4xl md:text-5xl font-bold text-[#111111] mt-4"

                  >
                    Visit Our Workshop in Kondotty
                  </h2>
                </div>

                <p className="text-lg text-[#666666] leading-relaxed">
                  The best way to understand what we do is to see it yourself. Drop by our workshop,
                  meet the craftsmen, touch the materials, and see furniture being made.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="text-[#C0001A] shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-[#111111] mb-1">Location</h4>
                      <p className="text-sm text-[#666666]">
                        Kondotty - Malappuram Road<br />
                        Kondotty, Kerala 673638
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="text-[#C0001A] shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-[#111111] mb-1">Call or WhatsApp</h4>
                      <a href="tel:+919446516395" className="text-sm text-[#666666] hover:text-[#C0001A] transition-colors">
                        +91 94465 16395
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock className="text-[#C0001A] shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-[#111111] mb-1">Working Hours</h4>
                      <p className="text-sm text-[#666666]">
                        Monday - Saturday: 9:00 AM - 7:00 PM<br />
                        Sunday: By appointment
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link href="/contact" className="btn-primary">
                    Schedule a Visit
                  </Link>
                  <a
                    href="https://wa.me/919446516395?text=Hi%20MAGNAT,%20I'd%20like%20to%20schedule%20a%20visit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-dark"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </FadeInView>

            <FadeInView direction="left" className="h-full w-full">
              <div className="relative aspect-[5/6] lg:aspect-auto lg:h-full min-h-[400px] overflow-hidden shadow-2xl border border-black/5 bg-[#f9f9f9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.577732999317!2d75.9678667!3d11.1447936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64ee03d3e05f3%3A0x895ea8e05f23c7d8!2sMagnat%20Furniture%20and%20Interiors!5e0!3m2!1sen!2sin!4v1775902098710!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="relative py-32 md:py-40 bg-[#C0001A] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl"></div>

        <div className="max-container relative z-10">
          <FadeInView className="max-w-3xl mx-auto text-center space-y-10">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"

            >
              Ready for Furniture That Fits Your Home Perfectly?
            </h2>

            <p className="text-xl text-white/90 leading-relaxed">
              Let's start with a simple conversation. Tell us what you need, and we'll take it from there.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="https://wa.me/919446516395?text=Hi%20MAGNAT,%20I'd%20like%20to%20discuss%20custom%20furniture%20for%20my%20home"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#C0001A] font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#111111] hover:text-white transition-all duration-300"
              >
                Chat on WhatsApp
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-[#C0001A] transition-all duration-300"
              >
                Request Home Visit
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

    </main>
  );
}