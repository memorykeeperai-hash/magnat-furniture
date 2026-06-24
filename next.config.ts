// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // ═══════════════════════════════════════════════════════════
  // IMAGE OPTIMIZATION — FASTEST LOADING + BEST SEO
  // ═══════════════════════════════════════════════════════════
  images: {
    // Modern formats (AVIF is smallest, WebP is fallback)
    formats: ["image/avif", "image/webp"],

    // Allowed remote image sources
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "www.storieshomes.com" },
      { protocol: "https", hostname: "www.vilangadanfurniture.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for different layouts
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache images for 1 year (31536000 seconds) — major Core Web Vitals boost
    minimumCacheTTL: 31536000,

    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // In production always optimize; skip in dev for faster builds
    unoptimized: process.env.NODE_ENV === "development",
  },

  // ═══════════════════════════════════════════════════════════
  // PERFORMANCE OPTIMIZATIONS
  // ═══════════════════════════════════════════════════════════

  // Default optimizations apply

  // Compress pages
  compress: true,

  // Enable React strict mode (catches bugs)
  reactStrictMode: true,

  // Optimize CSS
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
    // optimizeCss requires the 'critters' package — omit until installed
  },

  // ═══════════════════════════════════════════════════════════
  // HEADERS FOR CACHING & SECURITY
  // ═══════════════════════════════════════════════════════════
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Turbopack handles optimization automatically.

  // ═══════════════════════════════════════════════════════════
  // POWEREDBYHEADER (Remove X-Powered-By for security)
  // ═══════════════════════════════════════════════════════════
  poweredByHeader: false,

  // ═══════════════════════════════════════════════════════════
  // TRAILING SLASH (SEO)
  // ═══════════════════════════════════════════════════════════
  trailingSlash: false,

  // ═══════════════════════════════════════════════════════════
  // REDIRECTS (If needed)
  // ═══════════════════════════════════════════════════════════
  async rewrites() {
    return [
      {
        source: "/category/dining-sets",
        destination: "/products/dining",
      },
      {
        source: "/category/:slug",
        destination: "/products/:slug",
      },
    ];
  },
};

export default nextConfig;