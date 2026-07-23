import type { Metadata } from "next";
import BusinessCard from "@/components/light/BusinessCard";
import { BRAND_NAME, CARD_URL } from "@/lib/siteConfig";

const TITLE = `${BRAND_NAME} — כרטיס ביקור דיגיטלי`;
const DESCRIPTION =
  "מנעולן, אינסטלטור והנדימן באור יהודה והסביבה. שמרו את ניסן לאנשי הקשר או שתפו את הכרטיס.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Utility/share page, not an SEO target — deliberately kept out of the sitemap.
  alternates: { canonical: CARD_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, locale: "he_IL", type: "profile", url: CARD_URL },
};

export default function Page() {
  return <BusinessCard />;
}
