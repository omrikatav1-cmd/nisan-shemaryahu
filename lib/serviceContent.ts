import { ARRIVAL_TIME } from "@/lib/siteConfig";

export type ServiceItem = {
  title: string;
  description: string;
  price?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServiceKey = "locksmith" | "plumbing" | "handyman";

export type ServiceConfig = {
  key: ServiceKey;
  slug: string; // Hebrew route segment
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  schemaType: "Locksmith" | "Plumber" | "HomeAndConstructionBusiness";
  heroEyebrow: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroSub: string;
  heroBadges: string[];
  trustItems: string[];
  services: ServiceItem[];
  offer: string;
  faq: FaqItem[];
  whatsappIssueLabel: string; // used to pre-fill the WhatsApp message
};

export const SERVICES: Record<ServiceKey, ServiceConfig> = {
  locksmith: {
    key: "locksmith",
    slug: "מנעולן",
    navLabel: "מנעולנות",
    metaTitle: "מנעולן באור יהודה והסביבה | ניסן שמריהו — מוסמך ומאושר משטרה",
    metaDescription:
      "מנעולן מוסמך עם אישור משטרה באור יהודה, יהוד, קרית אונו וראשון לציון. פריצת דלתות, החלפת צילינדרים ומנעולי ביטחון. מגיע עד שעתיים.",
    schemaType: "Locksmith",
    heroEyebrow: "מנעולן מוסמך · אישור משטרה",
    heroHeadline: "ננעלת בחוץ?",
    heroHeadlineAccent: "ניסן בדרך אליך",
    heroSub: `פריצת דלתות, החלפת צילינדרים ומנעולי ביטחון — באור יהודה והסביבה. מגיע ${ARRIVAL_TIME}, מחיר סגור לפני שמתחילים.`,
    heroBadges: ["מוסמך + אישור משטרה", "מגיע עד שעתיים", "מחיר לפני העבודה"],
    trustItems: ["מנעולן מוסמך", "אישור משטרה", "ביטוח מלא", `הגעה ${ARRIVAL_TIME}`, "מחיר סגור מראש"],
    services: [
      { title: "פריצת דלתות (נעילה בחוץ)", description: "פתיחה נקייה בלי לשבור את המנעול, בכל שעה.", price: "החל מ-250 ש\"ח" },
      { title: "החלפת צילינדרים ומנעולים", description: "החלפה מהירה, כולל מנעולים חדשים ואבטחה משודרגת." },
      { title: "מנעולי ביטחון ורב-בריח", description: "התקנת מנעולי ביטחון לדלת הכניסה." },
      { title: "פריצת רכב", description: "נעלת מפתחות ברכב? פותחים בלי לפגוע בדלת." },
    ],
    offer: "מחיר סגור בטלפון לפני שמתחילים — בלי הפתעות בסוף.",
    faq: [
      { question: "כמה עולה פריצת דלת?", answer: "בין 250 ל-550 ש\"ח, תלוי בסוג המנעול ומורכבות העבודה. המחיר נסגר בטלפון לפני שמתחילים — לא משתנה באמצע." },
      { question: `תוך כמה זמן מגיעים?`, answer: `${ARRIVAL_TIME} מרגע הפנייה, בכל אזור השירות (אור יהודה והסביבה, ברדיוס של כ-15 ק"מ).` },
      { question: "האם המנעולן מוסמך?", answer: "כן — ניסן הוא מנעולן מוסמך עם אישור משטרה, כפי שנדרש בחוק לעבודות פריצה ונעילה." },
      { question: "עובדים בלילה?", answer: "כן, זמינות 24/6 (יום מנוחה קבוע בשבוע). בשעות 18:00–00:00 ו-00:00–08:00 חל תעריף SOS." },
    ],
    whatsappIssueLabel: "מנעולנות",
  },
  plumbing: {
    key: "plumbing",
    slug: "אינסטלטור",
    navLabel: "אינסטלציה",
    metaTitle: "אינסטלטור באור יהודה והסביבה | ניסן שמריהו — פתיחת סתימות, צנרת, חירום",
    metaDescription:
      "אינסטלטור מנוסה באור יהודה, יהוד, קרית אונו וראשון לציון. פתיחת סתימות, החלפת צנרת, דודי שמש, טיפול בחירום ופיצוצי צנרת. קריאה 350₪ מתקזזת מהעבודה.",
    schemaType: "Plumber",
    heroEyebrow: "טיפול מהיר בכל תקלת אינסטלציה",
    heroHeadline: "נזילה, סתימה או חירום?",
    heroHeadlineAccent: "ניסן פותר את זה",
    heroSub: `פתיחת סתימות, החלפת צנרת, דודי שמש וטיפול בחירום — באור יהודה והסביבה. מגיע ${ARRIVAL_TIME}. קריאה 350 ש"ח, מתקזזת מהעבודה.`,
    heroBadges: ["קריאה 350₪ מתקזזת", "מגיע עד שעתיים", "טיפול חירום"],
    trustItems: ["ניסיון רב בתחום", "ביטוח מלא", `הגעה ${ARRIVAL_TIME}`, "קריאה מתקזזת מהעבודה", "עובד נקי ומסודר"],
    services: [
      { title: "פתיחת סתימות", description: "סתימה בכיור, אמבטיה או ביוב — פותחים בלי לשבור כלום." },
      { title: "תיקון והחלפת צנרת", description: "צנרת ישנה או פגומה מוחלפת בשיטות מוכחות." },
      { title: "דודי שמש וחשמל", description: "התקנה, תיקון ותחזוקה של דודים." },
      { title: "ברזים, ניאגרות וכלים סניטריים", description: "החלפה והתקנה של ברזים, ניאגרות ואביזרים." },
      { title: "הצפות ופיצוצי צנרת (חירום)", description: "טיפול מהיר בתקלות דחופות שלא יכולות לחכות." },
    ],
    offer: "קריאה 350 ש\"ח — מתקזזת במלואה מעלות העבודה בפועל.",
    faq: [
      { question: "כמה עולה קריאת אינסטלטור?", answer: "350 ש\"ח לביקור אבחון, מתקזזים במלואם מעלות העבודה אם מזמינים תיקון." },
      { question: `תוך כמה זמן מגיעים במקרה חירום?`, answer: `${ARRIVAL_TIME} מרגע הפנייה, בכל אזור השירות סביב אור יהודה.` },
      { question: "יש אחריות על העבודה?", answer: "כל עבודה נעשית במקצועיות ובקפידה. פרטי המחיר וההיקף נסגרים מראש בשיחה, כדי שלא יהיו הפתעות." },
      { question: "עובדים גם בלילה?", answer: "כן, זמינות 24/6 — כולל תעריפי SOS בשעות המאוחרות." },
    ],
    whatsappIssueLabel: "אינסטלציה",
  },
  handyman: {
    key: "handyman",
    slug: "הנדימן",
    navLabel: "הנדימן",
    metaTitle: "הנדימן באור יהודה והסביבה | ניסן שמריהו — הכל בית אחד, איש אחד",
    metaDescription:
      "הנדימן לכל תיקון בבית באור יהודה, יהוד, קרית אונו וראשון לציון: הרכבות, תליות, צבע, גבס והחלפת ברזים. מגיע עד שעתיים.",
    schemaType: "HomeAndConstructionBusiness",
    heroEyebrow: "כל תיקון בבית, איש אחד",
    heroHeadline: "רשימת דברים לתקן בבית?",
    heroHeadlineAccent: "ניסן עושה הכל",
    heroSub: `הרכבות, תליות, צבע, גבס והחלפת ברזים — באור יהודה והסביבה. מגיע ${ARRIVAL_TIME}, עובד לפי גודל העבודה.`,
    heroBadges: ["טווח שירותים רחב", "מגיע עד שעתיים", "עובד מסודר ונקי"],
    trustItems: ["ידיים של זהב", "ביטוח מלא", `הגעה ${ARRIVAL_TIME}`, "מתאים לבתים ולעסקים קטנים", "בלי מינימום נוקשה"],
    services: [
      { title: "החלפת ברזים", description: "השירות שהכי מבוקש — החלפה מהירה ונקייה." },
      { title: "צביעה", description: "צביעת קירות, תיקוני צבע נקודתיים וריענון חדרים." },
      { title: "הרכבות ותליות", description: "רהיטים, מדפים, תמונות וכל מה שצריך להרכיב או לתלות." },
      { title: "עבודות גבס ותיקונים קטנים", description: "תיקוני גבס, דלתות ותקלות בית שוטפות." },
    ],
    offer: "הצעת מחיר טלפונית לפני שמתחילים — לפי גודל העבודה בפועל.",
    faq: [
      { question: "אילו עבודות אתה מבצע?", answer: "כמעט הכל בבית: החלפת ברזים, צביעה, הרכבות, תליות ותיקוני גבס. אם לא בטוחים אם זה מתאים — פשוט להתקשר ולשאול." },
      { question: "יש מינימום הזמנה?", answer: "אין מחירון קבוע — כל עבודה מוערכת לגופה בשיחה קצרה, כדי שהמחיר יתאים בדיוק להיקף." },
      { question: `תוך כמה זמן אפשר לתאם?`, answer: `הגעה תוך ${ARRIVAL_TIME} מרגע התיאום, באזור אור יהודה והסביבה.` },
      { question: "עובד גם עם עסקים קטנים?", answer: "כן, גם בתים פרטיים וגם עסקים ומשרדים קטנים." },
    ],
    whatsappIssueLabel: "הנדימן",
  },
};

export const SERVICE_LIST = Object.values(SERVICES);
