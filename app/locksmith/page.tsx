import type { Metadata } from "next";
import { SERVICES } from "@/lib/serviceContent";
import { canonicalFor } from "@/lib/siteConfig";
import { SERVICE_PHOTO } from "@/lib/theme";
import LightServicePage from "@/components/light/LightServicePage";

const service = SERVICES.locksmith;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: canonicalFor("locksmith") },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    locale: "he_IL",
    type: "website",
    images: [{ url: SERVICE_PHOTO.locksmith, width: 1200, height: 630, alt: service.metaTitle }],
  },
};

export default function Page() {
  return <LightServicePage service={service} />;
}
