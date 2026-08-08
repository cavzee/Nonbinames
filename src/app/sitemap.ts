import type { MetadataRoute } from "next";
import { getAllNames } from "@/lib";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nonbinames.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const namePages: MetadataRoute.Sitemap = getAllNames().map((name) => ({
    url: `${baseUrl}/name/${name.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...namePages];
}
