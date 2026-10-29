import type { MetadataRoute } from "next";
import fr from "../../messages/fr.json";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pages = ["", "/works", "/about", "/lab", "/contact"];
  const cases = fr.projects.items.map((project) => "/case-study/" + project.slug);
  return ["fr", "en"].flatMap((locale) => [...pages, ...cases].map((path) => ({
    url: base + "/" + locale + path,
    alternates: { languages: { fr: base + "/fr" + path, en: base + "/en" + path } },
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/case-study/") ? 0.7 : 0.8,
  })));
}