import type { MetadataRoute } from "next";

import {
  getAllNames,
  getDiscoverySeoValues,
  type DiscoverySeoType,
} from "@/lib";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const seoTypes: DiscoverySeoType[] = [
  "collection",
  "theme",
  "origin",
  "length",
];

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

  const seoPages: MetadataRoute.Sitemap = seoTypes.flatMap((type) =>
    getDiscoverySeoValues(type).map((value) => ({
      url: `${baseUrl}/names/${type}/${slugify(value)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...namePages, ...seoPages];
}
