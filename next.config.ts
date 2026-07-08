import type { NextConfig } from "next";
import { CITIES } from "./lib/cities";

// Hebrew service slugs → ASCII route folders. Turbopack can't statically
// prerender non-ASCII route directories, so folders stay ASCII and the
// Hebrew, SEO-friendly URLs are served via rewrites. path-to-regexp doesn't
// reliably match raw Unicode, so every `source` is percent-encoded.
const SERVICE_SLUGS: Record<string, string> = {
  locksmith: "מנעולן",
  plumbing: "אינסטלטור",
  handyman: "הנדימן",
};

function buildRewrites() {
  const rules: { source: string; destination: string }[] = [];
  for (const [key, hebrew] of Object.entries(SERVICE_SLUGS)) {
    // Main service page: /מנעולן → /locksmith
    rules.push({ source: `/${encodeURIComponent(hebrew)}`, destination: `/${key}` });
    // City pages: /מנעולן-בחולון → /locksmith/holon
    for (const city of CITIES) {
      const hebrewPath = `${hebrew}-${city.prefixed.replace(/ /g, "-")}`;
      rules.push({
        source: `/${encodeURIComponent(hebrewPath)}`,
        destination: `/${key}/${city.slug}`,
      });
    }
  }
  return rules;
}

const nextConfig: NextConfig = {
  turbopack: {
    root: "..",
  },
  async rewrites() {
    return buildRewrites();
  },
};

export default nextConfig;
