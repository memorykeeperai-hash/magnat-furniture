import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F3EF] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        {/* Large decorative number */}
        <div className="relative inline-block mb-8 select-none">
          <span
            className=" font-black text-[180px] md:text-[220px] leading-none"
            style={{
              background: "linear-gradient(160deg, #B82222 0%, #8B1E1E 55%, #5C1010 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.15,
            }}
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <h1 className=" text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-2">
                Page Not Found
              </h1>
              <div className="h-[2px] w-16 bg-[#C6A969] mx-auto" />
            </div>
          </div>
        </div>

        <p className="text-[#5A5A5A] font-light text-lg leading-relaxed mb-12 max-w-md mx-auto">
          The page you&apos;re looking for has been moved, renamed, or may never have existed. Let us guide you back to our world of premium furniture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/"
            className="btn-primary"
          >
            Back to Home
            <ArrowRight size={16} className="ml-3" />
          </Link>
          <Link
            href="/products"
            className="btn-ghost-dark"
          >
            Browse Shop
          </Link>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-20 flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-[#C6A969] opacity-40" />
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[#C6A969]">
            Magnat Furniture
          </span>
          <span className="h-[1px] w-12 bg-[#C6A969] opacity-40" />
        </div>
      </div>
    </div>
  );
}
