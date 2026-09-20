import type { MetadataRoute } from "next";
import { ministries, posts, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/ministries", "/leadership", "/events", "/blog", "/visit", "/prayer", "/give", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${site.domain}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...ministries.map((m) => ({ url: `${site.domain}/ministries/${m.slug}`, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${site.domain}/blog/${p.slug}`, priority: 0.6 })),
  ];
}
