import type { Metadata } from "next";
import { Rubik, Assistant } from "next/font/google";
import "./globals.css";

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
  title: "\u05E0\u05D9\u05E1\u05DF \u05E9\u05DE\u05E8\u05D9\u05D4\u05D5 \u2013 \u05DB\u05E9\u05D4\u05E0\u05D3\u05E1\u05D4 \u05E4\u05D5\u05D2\u05E9\u05EA \u05E9\u05D9\u05E8\u05D5\u05EA | \u05D0\u05D9\u05E0\u05E1\u05D8\u05DC\u05E6\u05D9\u05D4 \u05D5\u05EA\u05E9\u05EA\u05D9\u05D5\u05EA",
  description:
    '\u05E4\u05EA\u05E8\u05D5\u05E0\u05D5\u05EA \u05EA\u05E9\u05EA\u05D9\u05EA \u05DE\u05EA\u05E7\u05D3\u05DE\u05D9\u05DD \u05D5\u05D0\u05D9\u05EA\u05D5\u05E8 \u05E0\u05D6\u05D9\u05DC\u05D5\u05EA \u05D1\u05D8\u05DB\u05E0\u05D5\u05DC\u05D5\u05D2\u05D9\u05D4 \u05D4\u05D2\u05D1\u05D5\u05D4\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8. \u05D0\u05D5\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4 \u05D5\u05DE\u05E8\u05DB\u05D6 \u05D4\u05D0\u05E8\u05E5 (20 \u05E7"\u05DE). 050-9911241',
  keywords: ["\u05D0\u05D9\u05E0\u05E1\u05D8\u05DC\u05E6\u05D9\u05D4", "\u05EA\u05E9\u05EA\u05D9\u05D5\u05EA", "\u05D0\u05D9\u05EA\u05D5\u05E8 \u05E0\u05D6\u05D9\u05DC\u05D5\u05EA", "\u05D4\u05D3\u05DE\u05D9\u05D4 \u05EA\u05E8\u05DE\u05D9\u05EA", "\u05D0\u05D5\u05E8 \u05D9\u05D4\u05D5\u05D3\u05D4"],
  openGraph: {
    title: "\u05E0\u05D9\u05E1\u05DF \u05E9\u05DE\u05E8\u05D9\u05D4\u05D5 \u2013 \u05D0\u05D9\u05E0\u05E1\u05D8\u05DC\u05E6\u05D9\u05D4 \u05D5\u05EA\u05E9\u05EA\u05D9\u05D5\u05EA",
    description: "\u05E4\u05EA\u05E8\u05D5\u05E0\u05D5\u05EA \u05EA\u05E9\u05EA\u05D9\u05EA \u05DE\u05EA\u05E7\u05D3\u05DE\u05D9\u05DD | \u05D0\u05D9\u05EA\u05D5\u05E8 \u05E0\u05D6\u05D9\u05DC\u05D5\u05EA | \u05D7\u05D9\u05E8\u05D5\u05DD 24/7",
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
      className={`${rubik.variable} ${assistant.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased">{children}</body>
    </html>
  );
}
