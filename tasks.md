# nisan-shemaryahu — Tasks

## Sprint Status
8.7.2026 — שוכתב מ-3 עמודים בתבנית אחת ל-**3 משפכים אטומים ושונים ויזואלית** + אשכולות עמודי-עיר (מודל ביו-ישראל). 46 מסלולים, build+lint נקיים. ממתין למשימות פתוחות של ניסן/עומרי לפני עלייה לאוויר.

## ארכיטקטורה נוכחית (8.7.2026)
- 3 משפכים אטומים: `/מנעולן` `/אינסטלטור` `/הנדימן` — לכל אחד theme משלו (`lib/theme.ts`), hero נפרד (`components/light/heroes/`), ו-~12 עמודי עיר (`/[service]-ב[עיר]`, סה"כ ~36). אפס קישור בין-שירותי (נבדק).
- URL עברי דרך rewrites פרוגרמטיים ב-`next.config.ts` (מקודד) → תיקיות ASCII `app/{locksmith,plumbing,handyman}/[city]`.
- תוכן מ-`lib/serviceContent.ts` + `lib/cities.ts` (שכונות אמיתיות פר-עיר). schema city-aware (`lib/schema.ts`), sitemap ~40 URL.
- ביקורות: `LightReviews` מוצג רק עם reviews אמיתיים (ריק כרגע — אפס פברוק).
- מסמכים: `docs/bioisrael-teardown.html`, `docs/service-separation-tradeoffs.html`.

## Completed
- שאלון איפיון מלא (14 סקציות) + ניתוח מתחרה (ביו ישראל) + תכנית רכש — `docs/nisan-full-brief.html`
- 3 דפי נחיתה חיים: `/מנעולן`, `/אינסטלטור`, `/הנדימן` (ASCII routes + rewrites, ר' context.md)
- פלטת עיצוב בהירה חדשה (`--color-l-*`), לא פוגעת בעמוד הבית הכהה הקיים
- `lib/siteConfig.ts`, `lib/serviceContent.ts`, `lib/schema.ts` (JSON-LD), `lib/whatsapp.ts` מפורמטים לפי שירות
- `leads` מורחב עם `service`+`source_page`; לוח `/leads` פנימי מוגן סיסמה (`proxy.ts`)
- `sitemap.ts`, `robots.ts`, `metadata` לכל עמוד, `public/llms.txt` (AEO)
- `docs/campaign-packages.md` — 3 חבילות קמפיין מוכנות לאדיר

## Pending — חוסם עלייה לאוויר
- [ ] אישור לוגו סופי מבין האופציות ב-`public/brand/`:
      - `logo-general-v1.png` / `logo-general-v2.png` — לוגו כללי, פטיש+מפתח שבדי בלבד (בלי מפתח/מנעול, בכוונה, כדי לא להטות לשירות ספציפי) + "ניסן שמריהו" בלבד. **זה מה שעולה בפרופיל הוואטסאפ המשותף** לכל 3 הקמפיינים
      - `logo-locksmith.png` (מפתח+מגן), `logo-plumbing.png` (מפתח צנרת+ברז), `logo-handyman.png` (פטיש+ארגז כלים) — לוגו ספציפי לכל דף נחיתה בנפרד
      - `tshirt-back-sketch.png` — סקיצת הדפסת גב לחולצה
      - עדיין לא משולב בקוד האתר (Navbar/Footer בכל 3 הדפים עדיין טקסט בלבד) — ממתין לאישור ניסן/עומרי לפני שילוב בפועל
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
