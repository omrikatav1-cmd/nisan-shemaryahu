# nisan-shemaryahu — Tasks

## Sprint Status
6.7.2026 — שאלון איפיון סגור, 3 דפי נחיתה בנויים ורצים (build+lint נקיים), חבילות קמפיין כתובות. ממתין למשימות פתוחות של ניסן/עומרי לפני עלייה לאוויר בפועל.

## Completed
- שאלון איפיון מלא (14 סקציות) + ניתוח מתחרה (ביו ישראל) + תכנית רכש — `docs/nisan-full-brief.html`
- 3 דפי נחיתה חיים: `/מנעולן`, `/אינסטלטור`, `/הנדימן` (ASCII routes + rewrites, ר' context.md)
- פלטת עיצוב בהירה חדשה (`--color-l-*`), לא פוגעת בעמוד הבית הכהה הקיים
- `lib/siteConfig.ts`, `lib/serviceContent.ts`, `lib/schema.ts` (JSON-LD), `lib/whatsapp.ts` מפורמטים לפי שירות
- `leads` מורחב עם `service`+`source_page`; לוח `/leads` פנימי מוגן סיסמה (`proxy.ts`)
- `sitemap.ts`, `robots.ts`, `metadata` לכל עמוד, `public/llms.txt` (AEO)
- `docs/campaign-packages.md` — 3 חבילות קמפיין מוכנות לאדיר

## Pending — חוסם עלייה לאוויר
- [ ] אישור לוגו סופי מבין 2 האופציות ב-`public/brand/` (logo-v1 מעוגל/פתוח, logo-v2 עיגול מלא) + סקיצת חולצה — ניסן/עומרי לבחור, לא משולב עדיין בקוד האתר (Navbar/Footer עדיין טקסט בלבד)
- [ ] וואטסאפ עסקי (יעדכן את `OWNER_PHONE_INTL` ב-`lib/siteConfig.ts`)
- [ ] דומיין אמיתי + חיבור Vercel
- [ ] משתני סביבה בפרויקט Vercel בפועל: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `LEADS_DASHBOARD_PASSWORD`
- [ ] הרצת ה-SQL המעודכן ל-`leads` (עמודות `service`/`source_page`) בפרויקט Supabase האמיתי
- [ ] רשימת 10-15 לקוחות לביקורות גוגל אמיתיות
- [ ] תעודת מנעולן + אישור משטרה לאימות ב-GBP
- [ ] יום צילום עם ללב מדיה (תמונות אמיתיות יחליפו placeholder)
- [ ] עדכון כשתעודת האינסטלטור מגיעה — להסיר את חסימת "מוסמך" ב-`lib/siteConfig.ts` (`COMPLIANCE.plumbingCertified`)
- [ ] אדיר: פתיחת Google Ads/Meta מאפס והעלאת 3 הקמפיינים לפי `docs/campaign-packages.md`

## Flagged for follow-up (not blocking)
- באג קיים בעמוד הבית הכהה: `ContactForm.tsx` מפעיל `nameRef.current?.focus()` ב-mount, מה שגורם לדפדפן לגלול אוטומטית לטופס בטעינת הדף (אותה בעיה תוקנה ב-`LightContactForm.tsx` החדש). לא טופל בעמוד הבית הישן כי לא נגענו בו במכוון.
