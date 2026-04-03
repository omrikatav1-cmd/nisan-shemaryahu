import type { Metadata } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["400", "500", "700", "800", "900"],
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ניסן שמריהו – כשהנדסה פוגשת שירות | אינסטלציה ותשתיות",
  description:
    'פתרונות תשתית מתקדמים ואיתור נזילות בטכנולוגיה הגבוהה ביותר. אור יהודה ומרכז הארץ (20 ק"מ). 050-9911241',
  keywords: ["אינסטלציה", "תשתיות", "איתור נזילות", "הדמיה תרמית", "אור יהודה"],
  openGraph: {
    title: "ניסן שמריהו – אינסטלציה ותשתיות",
    description: "פתרונות תשתית מתקדמים | איתור נזילות | חירום 24/7",
    locale: "he_IL",
    type: "website",
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
      className={`${heebo.variable} ${assistant.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased">{children}</body>
    </html>
  );
}
