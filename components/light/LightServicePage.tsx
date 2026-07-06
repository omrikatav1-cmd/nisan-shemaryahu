import type { ServiceConfig } from "@/lib/serviceContent";
import { buildPageSchemas } from "@/lib/schema";
import LightNavbar from "@/components/light/LightNavbar";
import LightHero from "@/components/light/LightHero";
import LightTrustBar from "@/components/light/LightTrustBar";
import LightServices from "@/components/light/LightServices";
import LightFAQ from "@/components/light/LightFAQ";
import LightContactForm from "@/components/light/LightContactForm";
import LightFooter from "@/components/light/LightFooter";

export default function LightServicePage({ service }: { service: ServiceConfig }) {
  const schemas = buildPageSchemas(service);

  return (
    <div className="light-page">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <LightNavbar activeSlug={service.slug} whatsappLabel={service.whatsappIssueLabel} />
      <main>
        <LightHero service={service} />
        <LightTrustBar items={service.trustItems} />
        <LightServices items={service.services} offer={service.offer} />
        <LightFAQ items={service.faq} />
        <LightContactForm service={service} />
      </main>
      <LightFooter activeSlug={service.slug} />
    </div>
  );
}
