import type { Metadata } from "next";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_HREF, BRAND_NAME } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `מדיניות פרטיות | ${BRAND_NAME}`,
  description: "מדיניות הפרטיות של אתר ניסן שמריהו — אילו פרטים נאספים בטופס יצירת הקשר ולמה.",
};

export default function PrivacyPage() {
  return (
    <main dir="rtl" className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-right leading-relaxed">
      <h1 className="text-3xl font-black mb-6">מדיניות פרטיות</h1>

      <p className="mb-4">
        באתר {BRAND_NAME} יש טופס יצירת קשר אחד בלבד. מסמך זה מסביר אילו פרטים הוא אוסף, למה, ואיך אפשר לבקש למחוק אותם.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">מה נאסף</h2>
      <p className="mb-4">שם מלא, מספר טלפון, ותיאור קצר של התיקון או התקלה הנדרשת — רק מה שממלאים בטופס.</p>

      <h2 className="text-xl font-bold mt-8 mb-3">למה זה נאסף</h2>
      <p className="mb-4">
        אך ורק כדי ליצור קשר חזרה, לתאם ביקור ולספק את השירות המבוקש. הפרטים לא נמכרים, לא מועברים לצד שלישי, ולא משמשים לדיוור שיווקי.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">איפה זה נשמר</h2>
      <p className="mb-4">
        הפרטים נשמרים במסד נתונים מאובטח (Supabase), נגישים רק ל{BRAND_NAME} דרך לוח בקרה פנימי המוגן בסיסמה.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">הזכויות שלכם</h2>
      <p className="mb-4">
        בהתאם לחוק הגנת הפרטיות, ניתן בכל עת לבקש לעיין בפרטים שנשמרו עליכם או לבקש את מחיקתם — פשוט צרו קשר בטלפון או בוואטסאפ.
      </p>

      <p className="mb-1">
        טלפון: <a href={OWNER_PHONE_HREF} className="underline" dir="ltr">{OWNER_PHONE_DISPLAY}</a>
      </p>

      <p className="mt-8 text-sm text-gray-500">תאריך עדכון: 19.7.2026</p>
    </main>
  );
}
