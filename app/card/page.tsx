import type { Metadata } from "next";
import BusinessCard from "@/components/light/BusinessCard";
import { BRAND_NAME, CARD_URL } from "@/lib/siteConfig";

const TITLE = `${BRAND_NAME} — כרטיס ביקור דיגיטלי`;
const DESCRIPTION =
  "מנעולן, אינסטלטור והנדימן באור יהודה והסביבה. שמרו את ניסן לאנשי הקשר או שתפו את הכרטיס.";
// Branded 1200×630 share preview (public/card-og.png) — the first thing people
// see when Nisan sends the card in WhatsApp. Resolved absolute via metadataBase.
const OG_IMAGE = "/card-og.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Utility/share page, not an SEO target — deliberately kept out of the sitemap.
  alternates: { canonical: CARD_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "he_IL",
    type: "profile",
    url: CARD_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${BRAND_NAME} — כרטיס ביקור` }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function Page() {
  return <BusinessCard />;
}
