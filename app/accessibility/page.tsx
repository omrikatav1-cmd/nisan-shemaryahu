import type { Metadata } from "next";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF, BRAND_NAME, SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `הצהרת נגישות | ${BRAND_NAME}`,
  description: "הצהרת נגישות לאתר ניסן שמריהו, בהתאם לתקן הישראלי 5568.",
  alternates: { canonical: `${SITE_URL}/accessibility` },
};

export default function AccessibilityPage() {
  return (
    <main id="main-content" dir="rtl" className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-right leading-relaxed">
      <h1 className="text-3xl font-black mb-6">הצהרת נגישות</h1>

      <p className="mb-4">
        אנו ב{BRAND_NAME} מחויבים להנגשת האתר לאנשים עם מוגבלויות, בהתאם לתקן הישראלי (ת&quot;י) 5568
        ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">אמצעי נגישות באתר</h2>
      <ul className="list-disc pr-5 space-y-1.5">
        <li>ניווט מלא באמצעות מקלדת, כולל קישור דילוג לתוכן הראשי</li>
        <li>תמיכה בכיווניות RTL ובקוראי מסך (NVDA, JAWS, VoiceOver)</li>
        <li>תפריט נגישות צף (כפתור בפינת המסך, או מקש Alt+A) המאפשר: הגדלת טקסט, שינוי ניגודיות, הדגשת קישורים, פונט קריא, ריווח שורות מוגדל, הדגשת כותרות ועצירת אנימציות</li>
        <li>ניגודיות צבעים העומדת ביחס של 4.5:1 לפחות בטקסט רגיל</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">מגבלות נגישות ידועות</h2>
      <p className="mb-4">
        האתר עבר בדיקה עצמית (ניווט מקלדת, בדיקת קורא מסך נקודתית) אך טרם עבר ביקורת נגישות מקצועית
        על ידי מורשה נגישות שירות מוסמך. אם נתקלתם ברכיב שאינו נגיש, נשמח לדעת ולתקן.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">פנייה בנושא נגישות</h2>
      <p className="mb-1">
        לפניות בנושא נגישות ניתן לפנות ישירות: {BRAND_NAME}
      </p>
      <p className="mb-1">
        טלפון: <a href={OWNER_PHONE_HREF} className="underline" dir="ltr">{OWNER_PHONE_DISPLAY}</a>
      </p>

      <p className="mt-8 text-sm text-gray-500">תאריך עדכון ההצהרה: 24.7.2026</p>
    </main>
  );
}
