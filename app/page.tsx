import type { Metadata } from "next";
import HomeHub from "@/components/light/HomeHub";
import { buildHomeSchema } from "@/lib/schema";
import { SERVICES } from "@/lib/serviceContent";
import LightServicePage from "@/components/light/LightServicePage";
import { SITE_SERVICE } from "@/lib/siteConfig";

// Dedicated single-trade Vercel deployments (SITE_SERVICE set) need the root
// page's own <title>/OG to match that trade, same as its /locksmith etc. page —
// otherwise the bare domain would show the generic 3-trade brand title.
export function generateMetadata(): Metadata {
  if (!SITE_SERVICE) return {};
  const service = SERVICES[SITE_SERVICE];
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: { title: service.metaTitle, description: service.metaDescription, locale: "he_IL", type: "website" },
  };
}

export default function Home() {
  // A deployment locked to one trade shows that trade's own funnel at the
  // root — not the 3-trade hub — so a Google Ads click lands directly on the
  // matching landing page at the bare domain. LightServicePage already
  // builds its own JSON-LD via buildPageSchemas, so no separate schema here.
  if (SITE_SERVICE) {
    return <LightServicePage service={SERVICES[SITE_SERVICE]} />;
  }

  const schema = buildHomeSchema();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HomeHub />
    </>
  );
}
