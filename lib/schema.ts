import { BRAND_NAME, BUSINESS_ADDRESS, OWNER_PHONE_INTL, SERVICE_AREA_CITIES, SITE_URL } from "@/lib/siteConfig";
import type { ServiceConfig, FaqItem } from "@/lib/serviceContent";
import { cityArrivalFaq } from "@/lib/serviceContent";
import type { City } from "@/lib/cities";
import { cityUrl } from "@/lib/cities";

function localBusinessSchema(service: ServiceConfig, pageUrl: string, areaCity?: City) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": service.schemaType,
    name: `${BRAND_NAME} — ${service.navLabel}${areaCity ? ` ${areaCity.prefixed}` : ""}`,
    url: pageUrl,
    telephone: `+${OWNER_PHONE_INTL}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_ADDRESS.street,
      addressLocality: BUSINESS_ADDRESS.city,
      addressCountry: "IL",
    },
    areaServed: areaCity
      ? { "@type": "City", name: areaCity.name }
      : SERVICE_AREA_CITIES.map((c) => ({ "@type": "City", name: c })),
    priceRange: "$$",
  };
  // AggregateRating only when real reviews exist — never fabricate rating data.
  if (service.reviews.length > 0) {
    const avg = service.reviews.reduce((s, r) => s + r.rating, 0) / service.reviews.length;
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: service.reviews.length,
    };
  }
  return schema;
}

function faqSchema(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function breadcrumbSchema(service: ServiceConfig, pageUrl: string, areaCity?: City) {
  const items: Record<string, unknown>[] = [
    { "@type": "ListItem", position: 1, name: "ראשי", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: service.navLabel, item: `${SITE_URL}/${service.slug}` },
  ];
  if (areaCity) {
    items.push({ "@type": "ListItem", position: 3, name: areaCity.name, item: pageUrl });
  }
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}

export function buildPageSchemas(service: ServiceConfig) {
  const pageUrl = `${SITE_URL}/${service.slug}`;
  return [localBusinessSchema(service, pageUrl), faqSchema(service.faq), breadcrumbSchema(service, pageUrl)];
}

// Brand-root schema — the homepage lists all 3 trades, so it can't use one
// service's narrow schemaType (Locksmith/Plumber/etc.) without misrepresenting
// the business. Generic LocalBusiness covers the shared identity correctly.
export function buildHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND_NAME,
    url: SITE_URL,
    telephone: `+${OWNER_PHONE_INTL}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_ADDRESS.street,
      addressLocality: BUSINESS_ADDRESS.city,
      addressCountry: "IL",
    },
    areaServed: SERVICE_AREA_CITIES.map((c) => ({ "@type": "City", name: c })),
    priceRange: "$$",
  };
}

export function buildCityPageSchemas(service: ServiceConfig, city: City) {
  const pageUrl = `${SITE_URL}${cityUrl(service.slug, city)}`;
  const cityFaq: FaqItem[] = [
    cityArrivalFaq(service.key, city.name, city.prefixed),
    ...service.faq,
  ];
  return [
    localBusinessSchema(service, pageUrl, city),
    faqSchema(cityFaq),
    breadcrumbSchema(service, pageUrl, city),
  ];
}
