import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "..",
  },
  // Keep Hebrew, SEO-friendly URLs in the address bar while the actual route
  // folders stay ASCII (Turbopack fails to prerender non-ASCII route dirs).
  async rewrites() {
    // path-to-regexp (used internally for rewrites) doesn't reliably match
    // raw Unicode literals here — percent-encoded source strings work.
    return [
      { source: "/%D7%9E%D7%A0%D7%A2%D7%95%D7%9C%D7%9F", destination: "/locksmith" }, // /מנעולן
      { source: "/%D7%90%D7%99%D7%A0%D7%A1%D7%98%D7%9C%D7%98%D7%95%D7%A8", destination: "/plumbing" }, // /אינסטלטור
      { source: "/%D7%94%D7%A0%D7%93%D7%99%D7%9E%D7%9F", destination: "/handyman" }, // /הנדימן
    ];
  },
};

export default nextConfig;
