import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/serviceContent";
import { CITY_BY_SLUG, CITY_SLUGS } from "@/lib/cities";
import CityServicePage from "@/components/light/CityServicePage";

const service = SERVICES.plumbing;

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) return {};
  const title = `אינסטלטור ${city.prefixed} | ניסן שמריהו — סתימות, צנרת, חירום`;
  const description = `אינסטלטור מנוסה ${city.prefixed} — פתיחת סתימות, החלפת צנרת, דודי שמש וטיפול בחירום. קריאה 350₪ מתקזזת מהעבודה. מגיע עד שעתיים.`;
  return { title, description, openGraph: { title, description, locale: "he_IL", type: "website" } };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) notFound();
  return <CityServicePage service={service} city={city} />;
}
