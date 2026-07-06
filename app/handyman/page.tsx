import type { Metadata } from "next";
import { SERVICES } from "@/lib/serviceContent";
import LightServicePage from "@/components/light/LightServicePage";

const service = SERVICES.handyman;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  openGraph: { title: service.metaTitle, description: service.metaDescription, locale: "he_IL", type: "website" },
};

export default function Page() {
  return <LightServicePage service={service} />;
}
