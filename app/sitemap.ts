import type { MetadataRoute } from "next";
import { SERVICE_LIST } from "@/lib/serviceContent";

const SITE_URL = "https://nisan-shemaryahu.vercel.app"; // TODO: swap to the real domain once purchased (brief §11.1)

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...SERVICE_LIST.map((s) => ({
      url: `${SITE_URL}/${s.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
