import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── All bots: allow site, block admin & API ──────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
      },
      // ── Googlebot: no crawl delay, full access ───────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // ── Googlebot Image: allow all images ────────────────────────────────
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      // ── Bing / MSN Bot ───────────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
        crawlDelay: 1,
      },
    ],
    sitemap: "https://magnat.in/sitemap.xml",
    host: "https://magnat.in",
  };
}
