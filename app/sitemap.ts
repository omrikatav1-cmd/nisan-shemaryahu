import type { MetadataRoute } from "next";
import { SERVICE_LIST } from "@/lib/serviceContent";
import { CITIES, cityUrl } from "@/lib/cities";
import { SITE_URL, SITE_SERVICE } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
  ];

  // A deployment dedicated to one trade should only ever advertise its own
  // pages — the other 2 services' pages aren't this domain's identity.
  const services = SITE_SERVICE
    ? SERVICE_LIST.filter((s) => s.key === SITE_SERVICE)
    : SERVICE_LIST;

  for (const service of services) {
    // On a locked deployment, root `/` already IS this service's page — the
    // `/slug` URL would just be duplicate-content noise in the sitemap.
    if (!SITE_SERVICE) {
      entries.push({
        url: `${SITE_URL}/${service.slug}`,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
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
