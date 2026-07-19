import type { ServiceConfig } from "@/lib/serviceContent";
import { cityArrivalFaq } from "@/lib/serviceContent";
import type { City } from "@/lib/cities";
import { buildCityPageSchemas } from "@/lib/schema";
import { SERVICE_THEME } from "@/lib/theme";
import LightNavbar from "@/components/light/LightNavbar";
import LocksmithHero from "@/components/light/heroes/LocksmithHero";
import PlumbingHero from "@/components/light/heroes/PlumbingHero";
import HandymanHero from "@/components/light/heroes/HandymanHero";
import LightLocalIntro from "@/components/light/LightLocalIntro";
import LightTrustBar from "@/components/light/LightTrustBar";
import LightServices from "@/components/light/LightServices";
import LightWhyUs from "@/components/light/LightWhyUs";
import LightReviews from "@/components/light/LightReviews";
import LightServiceAreas from "@/components/light/LightServiceAreas";
import LightCTABanner from "@/components/light/LightCTABanner";
import LightFAQ from "@/components/light/LightFAQ";
import LightContactForm from "@/components/light/LightContactForm";
import LightFooter from "@/components/light/LightFooter";
import LightStickyCTA from "@/components/light/LightStickyCTA";

function CityHero({ service, cityName }: { service: ServiceConfig; cityName: string }) {
  if (service.key === "locksmith") return <LocksmithHero service={service} cityName={cityName} />;
  if (service.key === "plumbing") return <PlumbingHero service={service} cityName={cityName} />;
  return <HandymanHero service={service} cityName={cityName} />;
}

export default function CityServicePage({ service, city }: { service: ServiceConfig; city: City }) {
  const schemas = buildCityPageSchemas(service, city);
  const cityFaq = [cityArrivalFaq(service.key, city.name, city.prefixed), ...service.faq];

  return (
    <div className="light-page" style={SERVICE_THEME[service.key]}>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <LightNavbar service={service} />
      <main className="pb-16 sm:pb-0">
        <CityHero service={service} cityName={city.name} />
        <LightLocalIntro service={service} city={city} />
        <LightTrustBar items={service.trustItems} />
        <LightServices items={service.services} offer={service.offer} />
        <LightWhyUs items={service.whyUs} />
        <LightReviews reviews={service.reviews} />
        <LightFAQ items={cityFaq} heading={`שאלות נפוצות על ${service.navLabel} ${city.prefixed}`} />
        <LightServiceAreas service={service} currentCitySlug={city.slug} />
        <LightContactForm service={service} city={city} />
      </main>
      <LightCTABanner whatsappLabel={service.whatsappIssueLabel} />
      <LightFooter service={service} />
      <LightStickyCTA service={service} />
    </div>
  );
}
