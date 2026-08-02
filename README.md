# ניסן שמריהו — Website

הנדימן, אינסטלטור ומנעולן באור יהודה והסביבה. שלושה דפי נחיתה נפרדים (אחד לכל שירות), כל אחד עם קמפיין ממומן משלו.

**Status:** 🟡 בפיתוח — 3 דפי השירות בנויים ונבדקו (build+lint נקיים), ממתין למשימות פתוחות לפני עלייה לאוויר (ר' `tasks.md`).

**Stack:** Next.js 16 (App Router, Turbopack) · Framer Motion · Tailwind v4 · Supabase (לידים)

**Live URL:** `nisan-shemaryahu.vercel.app` (זמני — דומיין אמיתי טרם נרכש)

## עמודים

| URL בעברית | Route פנימי | שירות |
|---|---|---|
| `/מנעולן` | `app/locksmith` | מנעולנות |
| `/אינסטלטור` | `app/plumbing` | אינסטלציה |
| `/הנדימן` | `app/handyman` | הנדימן |

ה-routes הפנימיים הם ASCII (Turbopack לא מצליח לבנות סטטית תיקיות עם שם עברי) — ה-URL הציבורי נשאר בעברית דרך `rewrites()` ב-`next.config.ts`.

## הרצה מקומית

```bash
cp .env.local.example .env.local   # למלא את פרטי ה-Supabase
npm install
npm run dev
```

פתחו [http://localhost:3000](http://localhost:3000).

## מסמכי עבודה

- `docs/nisan-full-brief.html` — שאלון איפיון מלא, ניתוח מתחרה, תכנית רכש
- `docs/campaign-packages.md` — 3 חבילות קמפיין מוכנות להעלאה
- `context.md` / `tasks.md` / `memory.md` — הקשר ומצב פרויקט שוטף
