import type { Metadata } from "next";
import { Rubik, Assistant } from "next/font/google";
import { A11Y_BOOTSTRAP_SCRIPT } from "@/lib/a11y-prefs/core";
import MotionA11yProvider from "@/components/accessibility/MotionA11yProvider";
import AccessibilityWidget from "@/components/accessibility/AccessibilityWidget";
import { GTM_ID } from "@/lib/analytics";
import { SITE_URL, SITE_SERVICE } from "@/lib/siteConfig";
import { SERVICE_PHOTO } from "@/lib/theme";
import "./globals.css";

// Each dedicated deployment shares its own trade's hero as the social card;
// the combined hub (local dev) falls back to the locksmith hero. Swap all to a
// branded card / Nisan's photo after the shoot.
const OG_IMAGE = SERVICE_PHOTO[SITE_SERVICE ?? "locksmith"];

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["400", "500", "700", "800", "900"],
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "\u05E0\u05D9\u05E1\u05DF \u05E9\u05DE\u05E8\u05D9\u05D4\u05D5 \u2014 \u05DE\u05E0\u05E2\u05D5\u05DC\u05DF, \u05D0\u05D9\u05E0\u05E1\u05D8\u05DC\u05D8\u05D5\u05E8 \u05D5\u05D4\u05E0\u05D3\u05D9\u05DE\u05DF \u05D1\u05D0\u05D5\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05D5\u05D4\u05E1\u05D1\u05D9\u05D1\u05D4",
  description:
    "\u05D1\u05E2\u05DC \u05DE\u05E7\u05E6\u05D5\u05E2 \u05D0\u05D7\u05D3 \u05DC\u05E9\u05DC\u05D5\u05E9\u05D4 \u05EA\u05D7\u05D5\u05DE\u05D9\u05DD: \u05DE\u05E0\u05E2\u05D5\u05DC\u05E0\u05D5\u05EA, \u05D0\u05D9\u05E0\u05E1\u05D8\u05DC\u05E6\u05D9\u05D4 \u05D5\u05D4\u05E0\u05D3\u05D9\u05DE\u05DF. \u05D0\u05D5\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4, \u05D9\u05D4\u05D5\u05D3, \u05E7\u05E8\u05D9\u05EA \u05D0\u05D5\u05E0\u05D5 \u05D5\u05E8\u05D0\u05E9\u05D5\u05DF \u05DC\u05E6\u05D9\u05D5\u05DF. \u05E2\u05D1\u05D5\u05D3\u05D4 \u05DE\u05E1\u05D5\u05D3\u05E8\u05EA \u05D5\u05E0\u05E7\u05D9\u05D9\u05D4. 050-9911241",
  keywords: ["\u05DE\u05E0\u05E2\u05D5\u05DC\u05DF \u05D0\u05D5\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4", "\u05D0\u05D9\u05E0\u05E1\u05D8\u05DC\u05D8\u05D5\u05E8 \u05D0\u05D5\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4", "\u05D4\u05E0\u05D3\u05D9\u05DE\u05DF \u05D0\u05D5\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4", "\u05E0\u05D9\u05E1\u05DF \u05E9\u05DE\u05E8\u05D9\u05D4\u05D5"],
  openGraph: {
    title: "\u05E0\u05D9\u05E1\u05DF \u05E9\u05DE\u05E8\u05D9\u05D4\u05D5 \u2014 \u05DE\u05E0\u05E2\u05D5\u05DC\u05DF, \u05D0\u05D9\u05E0\u05E1\u05D8\u05DC\u05D8\u05D5\u05E8 \u05D5\u05D4\u05E0\u05D3\u05D9\u05DE\u05DF",
    description: "\u05D1\u05E2\u05DC \u05DE\u05E7\u05E6\u05D5\u05E2 \u05D0\u05D7\u05D3 \u05DC\u05E9\u05DC\u05D5\u05E9\u05D4 \u05EA\u05D7\u05D5\u05DE\u05D9\u05DD, \u05D1\u05D0\u05D5\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05D5\u05D4\u05E1\u05D1\u05D9\u05D1\u05D4. \u05E2\u05D1\u05D5\u05D3\u05D4 \u05DE\u05E1\u05D5\u05D3\u05E8\u05EA \u05D5\u05E0\u05E7\u05D9\u05D9\u05D4.",
    locale: "he_IL",
    type: "website",
    url: SITE_URL,
    siteName: "ניסן שמריהו",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "ניסן שמריהו — מנעולן, אינסטלטור והנדימן" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ניסן שמריהו — מנעולן, אינסטלטור והנדימן",
    description: "בעל מקצוע אחד לשלושה תחומים, באור יהודה והסביבה. עבודה מסודרת ונקייה.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${rubik.variable} ${assistant.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: A11Y_BOOTSTRAP_SCRIPT }} />
        {/* Google Tag Manager — inert until NEXT_PUBLIC_GTM_ID is set on Vercel. */}
        {GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[100] focus:bg-l-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
        >
          דילוג לתוכן הראשי
        </a>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <MotionA11yProvider>
          {children}
          <AccessibilityWidget />
        </MotionA11yProvider>
      </body>
    </html>
  );
}
