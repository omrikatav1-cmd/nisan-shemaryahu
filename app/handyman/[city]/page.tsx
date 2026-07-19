import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/serviceContent";
import { CITY_BY_SLUG, CITY_SLUGS } from "@/lib/cities";
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
  const description = `הנדימן ${city.prefixed} לכל תיקון בבית — החלפת ברזים, צביעה, הרכבות, תליות וגבס. תיאום מהיר וגמיש, מחיר לפי גודל העבודה.`;
  return { title, description, openGraph: { title, description, locale: "he_IL", type: "website" } };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) notFound();
  return <CityServicePage service={service} city={city} />;
}
