import type { ServiceConfig } from "@/lib/serviceContent";
import { buildPageSchemas } from "@/lib/schema";
import { STATS_BASE, SERVICE_AREA_CITIES } from "@/lib/siteConfig";
import { SERVICE_THEME } from "@/lib/theme";
import LightNavbar from "@/components/light/LightNavbar";
import LocksmithHero from "@/components/light/heroes/LocksmithHero";
import PlumbingHero from "@/components/light/heroes/PlumbingHero";
import HandymanHero from "@/components/light/heroes/HandymanHero";
import LightTrustBar from "@/components/light/LightTrustBar";
import LightServices from "@/components/light/LightServices";
import LightStats from "@/components/light/LightStats";
import LightWhyUs from "@/components/light/LightWhyUs";
import LightProblemSolution from "@/components/light/LightProblemSolution";
import LightReviews from "@/components/light/LightReviews";
import LightServiceAreas from "@/components/light/LightServiceAreas";
import LightCTABanner from "@/components/light/LightCTABanner";
import LightFAQ from "@/components/light/LightFAQ";
import LightContactForm from "@/components/light/LightContactForm";
import LightFooter from "@/components/light/LightFooter";

function ServiceHero({ service }: { service: ServiceConfig }) {
  if (service.key === "locksmith") return <LocksmithHero service={service} />;
  if (service.key === "plumbing") return <PlumbingHero service={service} />;
  return <HandymanHero service={service} />;
}

export default function LightServicePage({ service }: { service: ServiceConfig }) {
  const schemas = buildPageSchemas(service);

  return (
    // Per-service theme recolors every --color-l-* token in this subtree,
    // so the three funnels are genuinely distinct, not one recolored template.
    <div className="light-page" style={SERVICE_THEME[service.key]}>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <LightNavbar service={service} />
      <main>
        <ServiceHero service={service} />
        <LightTrustBar items={service.trustItems} />
        <LightServices items={service.services} offer={service.offer} />
        <LightStats
          stats={[...STATS_BASE, service.statHighlight, { value: `${SERVICE_AREA_CITIES.length}`, label: "ערים באזור השירות" }]}
        />
        <LightWhyUs items={service.whyUs} />
        <LightProblemSolution problem={service.problem} icon={service.services[0].icon} />
        <LightReviews reviews={service.reviews} />
        <LightServiceAreas service={service} />
        <LightFAQ items={service.faq} />
        <LightContactForm service={service} />
      </main>
      <LightCTABanner whatsappLabel={service.whatsappIssueLabel} />
      <LightFooter service={service} />
    </div>
  );
}
