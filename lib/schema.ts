import { BRAND_NAME, BUSINESS_ADDRESS, OWNER_PHONE_INTL, SERVICE_AREA_CITIES } from "@/lib/siteConfig";
import type { ServiceConfig } from "@/lib/serviceContent";

const SITE_URL = "https://nisan-shemaryahu.vercel.app"; // TODO: swap to the real domain once purchased (brief §11.1)

function localBusinessSchema(service: ServiceConfig, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": service.schemaType,
    name: `${BRAND_NAME} — ${service.navLabel}`,
    url: pageUrl,
    telephone: `+${OWNER_PHONE_INTL}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_ADDRESS.street,
      addressLocality: BUSINESS_ADDRESS.city,
      addressCountry: "IL",
    },
    areaServed: SERVICE_AREA_CITIES.map((city) => ({ "@type": "City", name: city })),
    priceRange: "$$",
  };
}

function faqSchema(service: ServiceConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function breadcrumbSchema(service: ServiceConfig, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ראשי", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: service.navLabel, item: pageUrl },
    ],
  };
}

export function buildPageSchemas(service: ServiceConfig) {
  const pageUrl = `${SITE_URL}/${service.slug}`;
  return [localBusinessSchema(service, pageUrl), faqSchema(service), breadcrumbSchema(service, pageUrl)];
}
