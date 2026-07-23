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

// Which trade this deployment is locked to (build-time env, set per Vercel
// project). Undefined = the combined hub (local dev): all 3 trades are local.
const SITE_SERVICE = process.env.SITE_SERVICE as
  | "locksmith"
  | "plumbing"
  | "handyman"
  | undefined;

// Canonical domain per trade. Keep in sync with SERVICE_SITE_URLS in
// lib/siteConfig.ts — duplicated here so this config stays free of the "@/..."
// path alias, which isn't resolved when Next loads next.config.ts.
const SERVICE_DOMAINS: Record<string, string> = {
  locksmith: "https://nisan-shemaryahu.vercel.app",
  plumbing: "https://nisan-plumbing.vercel.app",
  handyman: "https://nisan-handyman.vercel.app",
};

// "/מנעולן-בחולון" — Hebrew public path for a service+city (mirrors cityUrl).
function hebrewCityPath(hebrew: string, prefixed: string): string {
  return `${hebrew}-${prefixed.replace(/ /g, "-")}`;
}

function buildRewrites() {
  const rules: { source: string; destination: string }[] = [];
  for (const [key, hebrew] of Object.entries(SERVICE_SLUGS)) {
    // Main service page: /מנעולן → /locksmith
    rules.push({ source: `/${encodeURIComponent(hebrew)}`, destination: `/${key}` });
    // City pages: /מנעולן-בחולון → /locksmith/holon
    for (const city of CITIES) {
      rules.push({
        source: `/${encodeURIComponent(hebrewCityPath(hebrew, city.prefixed))}`,
        destination: `/${key}/${city.slug}`,
      });
    }
  }
  return rules;
}

// Kills duplicate-content URLs. Redirects run BEFORE rewrites, so a 301 to the
// Hebrew slug still resolves through the Hebrew→ASCII rewrite afterwards (no
// loop). Two cases per trade:
//   • Local trade (own trade, or all 3 on the hub): the ASCII folder URL
//     (/locksmith, /locksmith/holon) 301s to the canonical Hebrew slug.
//   • Foreign trade on a locked deployment: both the ASCII and Hebrew routes
//     301 to that trade's own domain, preserving the city so intent survives.
function buildRedirects() {
  const rules: { source: string; destination: string; permanent: boolean }[] = [];
  for (const [key, hebrew] of Object.entries(SERVICE_SLUGS)) {
    const isForeign = SITE_SERVICE !== undefined && key !== SITE_SERVICE;
    const hebrewMain = encodeURIComponent(hebrew);

    if (isForeign) {
      const domain = SERVICE_DOMAINS[key];
      rules.push({ source: `/${key}`, destination: `${domain}/${hebrewMain}`, permanent: true });
      rules.push({ source: `/${hebrewMain}`, destination: `${domain}/${hebrewMain}`, permanent: true });
      for (const city of CITIES) {
        const hpath = encodeURIComponent(hebrewCityPath(hebrew, city.prefixed));
        rules.push({ source: `/${key}/${city.slug}`, destination: `${domain}/${hpath}`, permanent: true });
        rules.push({ source: `/${hpath}`, destination: `${domain}/${hpath}`, permanent: true });
      }
    } else {
      rules.push({ source: `/${key}`, destination: `/${hebrewMain}`, permanent: true });
      for (const city of CITIES) {
        const hpath = encodeURIComponent(hebrewCityPath(hebrew, city.prefixed));
        rules.push({ source: `/${key}/${city.slug}`, destination: `/${hpath}`, permanent: true });
      }
    }
  }
  return rules;
}

const nextConfig: NextConfig = {
  async rewrites() {
    return buildRewrites();
  },
  async redirects() {
    return buildRedirects();
  },
};

export default nextConfig;
