import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/serviceContent";
import { CITY_BY_SLUG, CITY_SLUGS } from "@/lib/cities";
import { canonicalFor } from "@/lib/siteConfig";
import { SERVICE_PHOTO } from "@/lib/theme";
import CityServicePage from "@/components/light/CityServicePage";

const service = SERVICES.handyman;

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) return {};
  const title = `הנדימן ${city.prefixed} | ניסן שמריהו — הכל בבית, איש אחד`;
  const description = `הנדימן ${city.prefixed} לכל תיקון בבית — החלפת ברזים, צביעה, הרכבות, תליות וגבס. תיאום נוח וגמיש — כל הרשימה בביקור אחד.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalFor("handyman", city) },
    openGraph: {
      title,
      description,
      locale: "he_IL",
      type: "website",
      images: [{ url: SERVICE_PHOTO.handyman, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) notFound();
  return <CityServicePage service={service} city={city} />;
}
