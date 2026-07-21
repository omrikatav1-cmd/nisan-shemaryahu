-- ============================================================================
-- ניסן שמריהו — הקמת טבלת לידים ב-Supabase
-- ============================================================================
-- מתי מריצים: אחרי שניסן פותח פרויקט Supabase חדש (על החשבון שלו), נכנסים
-- ל-SQL Editor בדשבורד, מדביקים את כל הקובץ הזה, ולוחצים Run.
--
-- מה זה עושה: יוצר טבלת `leads` עם RLS מופעל, ומאפשר רק INSERT אנונימי
-- (הטופס באתר) — קריאת הלידים נעשית רק עם ה-service_role key מצד השרת
-- (לוח /leads), אף פעם לא מהדפדפן.
-- ============================================================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  issue TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'completed')),
  service TEXT,       -- מנעולן / אינסטלטור / הנדימן — משווה בין 3 הקמפיינים
  source_page TEXT    -- עמוד הנחיתה שממנו הגיע הליד — משווה בין הערים
);

-- מפתח על created_at — לוח הלידים ממיין לפי תאריך יורד.
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- Row Level Security: אף אחד לא קורא/מעדכן/מוחק דרך ה-anon key.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- מותר רק להוסיף ליד (הטופס הציבורי). בלי SELECT/UPDATE/DELETE לאנונימי.
DROP POLICY IF EXISTS "Allow insert from anon" ON leads;
CREATE POLICY "Allow insert from anon" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- אם הטבלה כבר קיימת מגרסה ישנה (לפני פיצול 3 הקמפיינים), אין צורך ליצור
-- מחדש — מריצים רק את שתי השורות הבאות כדי להוסיף את עמודות הייחוס:
-- ----------------------------------------------------------------------------
-- ALTER TABLE leads ADD COLUMN IF NOT EXISTS service TEXT;
-- ALTER TABLE leads ADD COLUMN IF NOT EXISTS source_page TEXT;
