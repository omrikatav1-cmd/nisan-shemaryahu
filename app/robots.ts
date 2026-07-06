import type { MetadataRoute } from "next";

const SITE_URL = "https://nisan-shemaryahu.vercel.app"; // TODO: swap to the real domain once purchased (brief §11.1)

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/leads"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
