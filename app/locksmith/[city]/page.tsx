import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/serviceContent";
import { CITY_BY_SLUG, CITY_SLUGS } from "@/lib/cities";
import CityServicePage from "@/components/light/CityServicePage";

const service = SERVICES.locksmith;

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) return {};
  const title = `מנעולן ${city.prefixed} | ניסן שמריהו — מוסמך ומאושר משטרה`;
  const description = `מנעולן מוסמך עם אישור משטרה ${city.prefixed} — פריצת דלתות, החלפת צילינדרים ומנעולי ביטחון, מחיר סגור מראש.`;
  return { title, description, openGraph: { title, description, locale: "he_IL", type: "website" } };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) notFound();
  return <CityServicePage service={service} city={city} />;
}
