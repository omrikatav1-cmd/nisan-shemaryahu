import { STATS_BASE, SERVICE_AREA_CITIES } from "@/lib/siteConfig";

export type ServiceIcon =
  | "DoorOpen" | "KeyRound" | "ShieldCheck" | "Car"
  | "Droplets" | "Wrench" | "Flame" | "ShowerHead" | "AlertTriangle"
  | "PaintRoller" | "Hammer" | "Construction"
  | "Clock" | "BadgeCheck" | "Umbrella" | "Sparkles" | "Building2";

// No price field by design — zero prices/price-claims anywhere on the site
// (Omri, 23.7.2026), same enforcement style as the arrival-time/insurance ban.
export type ServiceItem = {
  title: string;
  description: string;
  icon: ServiceIcon;
};

export type WhyUsItem = {
  icon: ServiceIcon;
  title: string;
  description: string;
};

export type ProblemSolution = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

// Real customer reviews only. Empty until Nisan supplies verified ones —
// never fabricate a named/starred review card (Google policy + consumer law).
export type Review = {
  name: string;
  text: string;
  rating: number;
  city?: string;
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
  // This service's own real differentiator, shown as the 3rd stat in
  // LightStats — no arrival-time or insurance claims anywhere (Omri/Nisan,
  // 19.7.2026).
  statHighlight: { value: string; label: string };
  services: ServiceItem[];
  whyUs: WhyUsItem[];
  problem: ProblemSolution;
  offer: string;
  faq: FaqItem[];
  reviews: Review[]; // real reviews only — see Review type; empty renders no reviews section
  whatsappIssueLabel: string; // used to pre-fill the WhatsApp message
};

export const SERVICES: Record<ServiceKey, ServiceConfig> = {
  locksmith: {
    key: "locksmith",
    slug: "מנעולן",
    navLabel: "מנעולנות",
    metaTitle: "מנעולן באור יהודה והסביבה | ניסן שמריהו — מוסמך ומאושר משטרה",
    metaDescription:
      "מנעולן מוסמך עם אישור משטרה באור יהודה, יהוד, קרית אונו וראשון לציון. פריצת דלתות, החלפת צילינדרים ומנעולי ביטחון — עבודה נקייה ובלי נזק.",
    schemaType: "Locksmith",
    heroEyebrow: "מנעולן מוסמך · אישור משטרה",
    heroHeadline: "ננעלתם בחוץ?",
    heroHeadlineAccent: "ניסן בדרך אליכם",
    heroSub: "פריצת דלתות, החלפת צילינדרים ומנעולי ביטחון באור יהודה והסביבה. פותח בעדינות, בלי לשבור ובלי נזק לדלת.",
    heroBadges: ["מוסמך + אישור משטרה", "זמין 24/6", "עבודה נקייה ומקצועית"],
    trustItems: ["מנעולן מוסמך", "אישור משטרה", "פותח בלי נזק", "עבודה נקייה", "זמין 24/6"],
    statHighlight: { value: "מוסמך", label: "אישור משטרה" },
    services: [
      { title: "פריצת דלתות (נעילה בחוץ)", description: "נפתח בעדינות, בלי להרוס את המנעול או הדלת. גם באמצע הלילה.", icon: "DoorOpen" },
      { title: "החלפת צילינדרים ומנעולים", description: "צילינדר שנתקע, מפתח שמסתובב באוויר או מנעול שכבר עייף. מחליפים במקום.", icon: "KeyRound" },
      { title: "מנעולי ביטחון ורב-בריח", description: "רוצים לישון בשקט? מתקינים רב-בריח ומנעולי ביטחון לדלת הכניסה.", icon: "ShieldCheck" },
      { title: "פריצת רכב", description: "המפתחות נשארו בפנים? קורה. פותחים בזהירות, בלי נזק לדלת.", icon: "Car" },
    ],
    whyUs: [
      { icon: "ShieldCheck", title: "מוסמך + אישור משטרה", description: "פריצה ונעילה דורשות רישיון לפי חוק. יש לי תעודה ואישור משטרה, ומוזמנים לבקש לראות." },
      { icon: "BadgeCheck", title: "מצויד לכל תרחיש", description: "צילינדרים ומנעולים בסטוק — מחליפים ומתקינים באותו ביקור, בלי סיבוב שני." },
      { icon: "Sparkles", title: "עבודה נקייה ומקצועית", description: "פותח בעדינות, בלי לשבור ובלי ללכלך אחריי." },
      { icon: "Building2", title: "זמין 24/6", description: "גם בשעות המאוחרות וגם באמצע הלילה. יום מנוחה אחד בשבוע." },
    ],
    problem: {
      eyebrow: "זה קורה לכולם, גם בשתיים בלילה",
      headline: "הדלת נטרקה ברגע הכי לא נכון?",
      headlineAccent: "בדיוק בשביל זה אני כאן.",
      body: "דלת שנטרקה באמצע הלילה, מפתח שנשבר בפנים — זה תמיד קורה כשממהרים. קחו נשימה והתקשרו. אני פותח בלי לקלקל, ואתם חוזרים הביתה.",
    },
    offer: "שיחה אחת ואני יוצא אליכם — פותח, מחליף או מתקין, ומשאיר את הדלת שלמה ונקייה.",
    faq: [
      { question: "פריצת הדלת תגרום נזק?", answer: "ברוב המקרים לא. אני פותח בכלים מקצועיים ובעדינות, והמטרה תמיד שהדלת והמנעול יישארו כמו שהיו." },
      { question: "מה אזור השירות?", answer: "אור יהודה והסביבה, ברדיוס של כ-15 ק\"מ." },
      { question: "האם המנעולן מוסמך?", answer: "כן. מנעולן מוסמך עם אישור משטרה, מה שהחוק דורש בשביל עבודות פריצה ונעילה." },
      { question: "עובדים בלילה?", answer: "כן, 24/6 (יום מנוחה אחד בשבוע), גם בשעות הלילה המאוחרות." },
    ],
    reviews: [], // TODO: populate with real reviews once Nisan supplies them
    whatsappIssueLabel: "מנעולנות",
  },
  plumbing: {
    key: "plumbing",
    slug: "אינסטלטור",
    navLabel: "אינסטלציה",
    metaTitle: "אינסטלטור באור יהודה והסביבה | ניסן שמריהו — פתיחת סתימות, צנרת, חירום",
    metaDescription:
      "אינסטלטור מנוסה באור יהודה, יהוד, קרית אונו וראשון לציון. פתיחת סתימות, החלפת צנרת, דודי שמש, טיפול בחירום ופיצוצי צנרת — אבחון וטיפול במקום.",
    schemaType: "Plumber",
    heroEyebrow: "טיפול מקצועי בכל תקלת אינסטלציה",
    heroHeadline: "נזילה, סתימה או חירום?",
    heroHeadlineAccent: "ניסן כבר יוצא אליכם",
    heroSub: "סתימות, צנרת, דודי שמש וכל תקלה דחופה, באור יהודה והסביבה. מאבחן במקום, מסביר מה צריך, ומטפל בלי לפרק חצי בית.",
    heroBadges: ["אבחון וטיפול במקום", "טיפול חירום", "עובד נקי ומסודר"],
    trustItems: ["מנוסה בסתימות, צנרת ודודים", "אבחון וטיפול במקום", "עובד נקי ומסודר", "זמין 24/6"],
    statHighlight: { value: "חירום", label: "הצפות ופיצוצי צנרת" },
    services: [
      { title: "פתיחת סתימות", description: "כיור, אמבטיה או ביוב. פותחים בציוד מקצועי, בלי לפרק חצי מטבח.", icon: "Droplets" },
      { title: "תיקון והחלפת צנרת", description: "צינור ישן, חלוד או מטפטף? מאתרים את הבעיה ומחליפים רק את מה שצריך.", icon: "Wrench" },
      { title: "דודי שמש וחשמל", description: "דוד שהפסיק לחמם? מתקנים. ואם הגיע זמנו, מתקינים חדש.", icon: "Flame" },
      { title: "ברזים, ניאגרות וכלים סניטריים", description: "ברז שמטפטף כל הלילה, ניאגרה שלא מפסיקה לזרום. דברים קטנים שמעצבנים בגדול. מסדרים.", icon: "ShowerHead" },
      { title: "הצפות ופיצוצי צנרת (חירום)", description: "פיצוץ צנרת או הצפה? תתקשרו עכשיו. זה לא משהו שדוחים.", icon: "AlertTriangle" },
    ],
    whyUs: [
      { icon: "Wrench", title: "ראיתי כבר הכל בצנרת", description: "מסתימה עקשנית ועד פיצוץ באמצע הלילה. אין תקלה שתפתיע אותי." },
      { icon: "BadgeCheck", title: "אבחון במקום", description: "בודק, מאתר את מקור הבעיה ומסביר בדיוק מה צריך — לפני שנוגעים בצנרת." },
      { icon: "Sparkles", title: "מסיים ומנקה אחריי", description: "לפני שאני הולך. הבית נשאר כמו שהיה, רק בלי הנזילה." },
      { icon: "Building2", title: "זמין 24/6", description: "גם בתקלת חירום באמצע הלילה. יום מנוחה אחד בשבוע." },
    ],
    problem: {
      eyebrow: "קודם כל, סוגרים את המים",
      headline: "משהו מטפטף? עולה? נשפך?",
      headlineAccent: "תנשמו. זה מטופל.",
      body: "זה תמיד מתחיל בקטן: כתם רטוב בתקרה או טפטוף שלא נותן לישון. מרגיש כמו סוף העולם, אבל ברוב המקרים הפתרון פשוט ממה שנדמה. אני בודק מה קרה, ואומר לכם בדיוק מה צריך.",
    },
    offer: "מתקשרים, מתארים את התקלה, ואני מגיע עם הציוד — מאבחן במקום ומטפל בלי לפרק חצי בית.",
    faq: [
      { question: "מה עושים עד שאתה מגיע?", answer: "קודם כל סוגרים את ברז המים הראשי. זה עוצר את הנזק ונותן לטפל בבעיה בראש שקט." },
      { question: "מה אזור השירות?", answer: "אור יהודה והסביבה, וכל האזור סביבה." },
      { question: "יש אחריות על העבודה?", answer: "אני עומד מאחורי כל עבודה שיוצאת מתחת לידיים שלי, ומסביר מראש בדיוק מה הולך להיעשות." },
      { question: "עובדים גם בלילה?", answer: "כן, 24/6, כולל תקלות חירום בשעות הלילה." },
    ],
    reviews: [], // TODO: populate with real reviews once Nisan supplies them
    whatsappIssueLabel: "אינסטלציה",
  },
  handyman: {
    key: "handyman",
    slug: "הנדימן",
    navLabel: "הנדימן",
    metaTitle: "הנדימן באור יהודה והסביבה | ניסן שמריהו — איש אחד לכל התיקונים בבית",
    metaDescription:
      "הנדימן לכל תיקון בבית באור יהודה, יהוד, קרית אונו וראשון לציון: הרכבות, תליות, צבע, גבס והחלפת ברזים — כל הרשימה בביקור אחד.",
    schemaType: "HomeAndConstructionBusiness",
    heroEyebrow: "מהרכבה ועד צבע, באותה קריאה",
    heroHeadline: "רשימת התיקונים בבית רק מתארכת?",
    heroHeadlineAccent: "ניסן מגיע וסוגר את כולה",
    heroSub: "הרכבות, תליות, צבע, גבס, החלפת ברזים ועוד — באור יהודה והסביבה. מכינים רשימה אחת, ואני סוגר את כולה בביקור אחד.",
    heroBadges: ["כמעט הכל בבית", "ביקור אחד לכל הרשימה", "עובד מסודר ונקי"],
    trustItems: ["ידי זהב", "ביקור אחד לכל הרשימה", "בלי לתאם כמה בעלי מקצוע", "מתאים לבתים ולעסקים קטנים", "בלי מינימום נוקשה"],
    statHighlight: { value: "0", label: "מינימום הזמנה" },
    services: [
      { title: "החלפת ברזים", description: "ברז ישן החוצה, ברז חדש פנימה. עבודה נקייה, ובלי טפטופים אחרי.", icon: "Wrench" },
      { title: "צביעה", description: "קיר אחד שהתקלף או רענון לכל החדר. צבע מקצועי, בלי כתמים על הרצפה.", icon: "PaintRoller" },
      { title: "הרכבות ותליות", description: "ארון מאיקאה, מדפים, תמונות, טלוויזיה על הקיר. אתם מצביעים, אני מרכיב ותולה.", icon: "Hammer" },
      { title: "עבודות גבס ותיקונים קטנים", description: "חור בקיר, פינה שנסדקה, תיקונים שנגררים חודשים. מסדרים ושוכחים מזה.", icon: "Construction" },
    ],
    whyUs: [
      { icon: "Wrench", title: "ידי זהב", description: "במקום לתאם שלושה בעלי מקצוע, מתקשרים לאחד. מהחלפת ברז ועד צביעה והרכבות." },
      { icon: "Clock", title: "תיאום נוח וגמיש", description: "קובעים יום ושעה שנוחים לכם, בלי לחכות שבועות לבעל מקצוע." },
      { icon: "Building2", title: "בתים ועסקים קטנים", description: "בית פרטי, משרד או חנות קטנה. אותה עבודה מסודרת בכל מקום." },
      { icon: "BadgeCheck", title: "בלי מינימום נוקשה", description: "גם עבודה של שעה מקבלת יחס רציני. משלמים על מה שנעשה, לא על מינימום." },
    ],
    problem: {
      eyebrow: "כל הקטנות, במכה אחת",
      headline: "כל תיקון קטן מחכה לבעל מקצוע אחר?",
      headlineAccent: "ניסן עושה את כולם באותו ביקור.",
      body: "יש לכם רשימה כזאת. לכולם יש: דברים קטנים שנדחים כבר חודשים, כי חבל להזמין בעל מקצוע בשביל כל אחד לבד. אז תכינו אותה, ואני עובר עליה סעיף-סעיף ומסיים בביקור אחד.",
    },
    offer: "מספרים לי בטלפון מה צריך, מתאמים ביקור, ואני עובר על הרשימה סעיף-סעיף עד הסוף.",
    faq: [
      { question: "אילו עבודות אתה מבצע?", answer: "כמעט הכל בבית: ברזים, צביעה, הרכבות, תליות, גבס ותיקונים שוטפים. לא בטוחים אם זה מתאים? תתקשרו ותשאלו. זה לוקח דקה." },
      { question: "יש מינימום הזמנה?", answer: "אין. גם עבודה של שעה מקבלת יחס רציני. שיחה קצרה וסגרנו." },
      { question: "תוך כמה זמן אפשר לתאם?", answer: "בדרך כלל נקבע ביקור תוך יום-יומיים, לפי היומן שלכם. עבודות קטנות אפשר לפעמים לשלב גם מוקדם יותר." },
      { question: "עובד גם עם עסקים קטנים?", answer: "כן, גם משרדים וחנויות קטנות באזור. מכינים רשימה ואני סוגר אותה בביקור אחד." },
    ],
    reviews: [], // TODO: populate with real reviews once Nisan supplies them
    whatsappIssueLabel: "הנדימן",
  },
};

export const SERVICE_LIST = Object.values(SERVICES);

// Shared stat set for both the hero mini-row and the page-body LightStats
// section — one source so the two never drift.
export function buildServiceStats(service: ServiceConfig): { value: string; label: string }[] {
  return [...STATS_BASE, service.statHighlight, { value: `${SERVICE_AREA_CITIES.length}`, label: "ערים באזור השירות" }];
}

// City-page scheduling FAQ, per service — no arrival-time promise anywhere.
export function cityArrivalFaq(key: ServiceKey, cityName: string, cityPrefixed: string): FaqItem {
  if (key === "handyman") {
    return {
      question: `תוך כמה זמן אפשר לתאם ביקור ב${cityName}?`,
      answer: `בדרך כלל נקבע ביקור ${cityPrefixed} תוך יום-יומיים, לפי היומן שלכם.`,
    };
  }
  return {
    question: `אתם נותנים שירות ב${cityName}?`,
    answer: `כן, ${cityPrefixed} וגם בכל הישובים הסמוכים.`,
  };
}
