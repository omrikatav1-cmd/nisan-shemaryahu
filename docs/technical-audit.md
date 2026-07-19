# אודיט טכני — nisan-shemaryahu.vercel.app

**תאריך:** 20.7.2026. מבוסס על קריאת קוד ישירה (Next.js 16 App Router, לא הערכה).

| ממצא | חומרה | המלצה |
|---|---|---|
| הפרודקשן רץ מ-branch `claude/elegant-sammet-10972f` בתוך worktree, **לא** מ-`main` (שהוא עדיין הגרסה הישנה) | 🟡 בינוני — סיכון תפעולי, לא סיכון-משתמש | למזג ל-`main` בשלב נוח, לפני שסשן/מפתח אחר מבלבל בין הענפים |
| תמונות Hero הן קבצי JPEG סטוק (Pexels/Pixabay, ~150-260KB כל אחת) עם `next/image` + `object-cover` — לא ה-AI-generation שתוכנן במקור | 🟢 נמוך | Next.js מבצע אופטימיזציה אוטומטית (resize/format) ב-`/_next/image` — נבדק ועובד (200 OK, responsive srcset). להחליף בתמונות אמיתיות של ניסן כשיום הצילום עם ללב מדיה קורה |
| אין GA4/GTM/שום תג מדידה באתר | 🔴 גבוה — חוסם קמפיינים | ר' `analytics-readiness-audit.md` — תלות קשיחה לפני הרצת קמפיינים |
| `.env.local` מכיל Supabase placeholder בלבד — טופס הלידים לא שומר שום דבר כרגע | 🔴 גבוה | ניסן חייב לפתוח חשבון Supabase משלו (כבר הוחלט) |
| `LEADS_DASHBOARD_PASSWORD` מוגדר ב-Vercel production — לוח הלידים מוגן, לא 503 | ✓ תקין | — |
| Sticky mobile CTA bar (טלפון+וואטסאפ) + widget נגישות — שניהם fixed-position בתחתית המסך; טופל collision (widget מוזז מעל ה-bar במובייל) | ✓ תקין, נבדק חזותית הערב | — |
| Middleware (`proxy.ts`) חוסם `/leads` "fail closed" — אם `LEADS_DASHBOARD_PASSWORD` לא מוגדר, מחזיר 503 במקום לפתוח לציבור | ✓ תקין — עיצוב אבטחה נכון | — |
| Build/lint/typecheck רצו הערב — 0 שגיאות, רק אזהרות pre-existing בתבניות PDF לא-קשורות (תיווך נדל"ן) | ✓ תקין | — |
| אין בדיקת ביצועים חיה (Lighthouse/PageSpeed) — לא בוצעה הערב | ⚪ לא נבדק | להריץ PageSpeed Insights ידנית כשה-classifier חוזר לפעול, או בסשן נפרד |

**מסקנה**: האתר טכנית תקין ובריא. הפערים האמיתיים הם *תשתית חסרה* (מדידה, DB אמיתי) לא *קוד שבור*.
