import type { MetadataRoute } from "next";
import { SERVICE_LIST } from "@/lib/serviceContent";
import { CITIES, cityUrl } from "@/lib/cities";

const SITE_URL = "https://nisan-shemaryahu.vercel.app"; // TODO: swap to the real domain once purchased (brief §11.1)

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
  ];

  for (const service of SERVICE_LIST) {
    entries.push({
      url: `${SITE_URL}/${service.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const city of CITIES) {
      entries.push({
        url: `${SITE_URL}${cityUrl(service.slug, city)}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
