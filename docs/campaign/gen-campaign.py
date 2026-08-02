#!/usr/bin/env python3
"""Generate the Google Ads Editor import set for Nisan's 3 funnels.

Why a script and not hand-written CSVs: 3 services x 12 cities x 2 service nouns
x 2 Hebrew forms (bare + fused ב) x 2 match types. Typing that by hand guarantees
a missing ב-form, and the ב-form is the one people actually type.

Structure decision (budget-driven, see PLAYBOOK-AUDIT.md §2):
  - one campaign per service (~833 NIS/month each)
  - three ad groups per campaign: Core-Intent, Geo-Heartland, Geo-Extended
  - NOT one ad group per city. 12 city ad groups on 833 NIS/month = ~69 NIS each,
    which never exits Learning. Clusters learn; per-city groups starve.
  - message match is preserved anyway via KEYWORD-LEVEL Final URLs — each city
    keyword points at its own /<service>-ב<city> page, which already exists.

Compliance is enforced in code, not by memory. See BANNED below: the plumbing
certificate is not in hand, so מוסמך/רישיון/מורשה must never appear in the
plumbing campaign; there are no arrival-time promises anywhere; 24/6 not 24/7.

Run:  python3 gen-campaign.py
"""
import csv
import pathlib
import re
import sys

OUT = pathlib.Path(__file__).parent

# Each trade is its own Vercel project on its own domain — mirrors SERVICE_DOMAINS in
# next.config.ts. This matters more than it looks: next.config 301-redirects a foreign
# trade's path to that trade's own domain, so pointing the plumbing campaign at the
# locksmith host would put a redirect hop in front of every paid click and risk the
# gclid. Final URLs must serve 200 directly.
# TODO(domain): still on vercel.app. When nisan-shemaryahu.co.il and its subdomains go
# live, update these three values and re-run — Final URLs must match the live host
# exactly, and a switch after launch resets nothing but must be done in one pass.
SERVICE_DOMAINS = {
    "locksmith": "https://nisan-shemaryahu.vercel.app",
    "plumbing": "https://nisan-plumbing.vercel.app",
    "handyman": "https://nisan-handyman.vercel.app",
}

# --- Cities. Mirrors lib/cities.ts exactly; `prefixed` is the fused ב form. -----------
# Heartland = the Or Yehuda core, cheapest CPC and highest close rate expected.
HEARTLAND = [
    ("אור יהודה", "באור יהודה", "or-yehuda"),
    ("יהוד", "ביהוד", "yehud"),
    ("קרית אונו", "בקרית אונו", "kiryat-ono"),
    ("אזור", "באזור", "azor"),
    ("סביון", "בסביון", "savyon"),
    ("גני תקווה", "בגני תקווה", "ganei-tikva"),
]
EXTENDED = [
    ("לוד", "בלוד", "lod"),
    ("פתח תקווה", "בפתח תקווה", "petah-tikva"),
    ("ראשון לציון", "בראשון לציון", "rishon"),
    ("חולון", "בחולון", "holon"),
    ("בת ים", "בבת ים", "bat-yam"),
    ("רמת גן", "ברמת גן", "ramat-gan"),
]

# --- Services -------------------------------------------------------------------------
# geo_nouns: the two words people actually type before a city name.
# core: non-geo, high-intent queries. These carry the campaign early on.
SERVICES = {
    "locksmith": {
        "campaign": "NS-SRCH-Locksmith",
        "he": "מנעולן",
        "url_slug": "מנעולן",
        "budget": 28,          # ~833/month
        "max_cpc": 18,
        "geo_nouns": ["מנעולן", "פורץ מנעולים"],
        "core": [
            "מנעולן קרוב אלי", "נעלתי את עצמי בחוץ", "ננעלתי מחוץ לבית",
            "פריצת דלת", "פורץ דלתות", "החלפת צילינדר", "החלפת מנעול",
            "מנעולן דחוף", "דלת נטרקה", "אבדתי מפתחות", "מנעולן מוסמך",
            "פתיחת דלת נעולה", "תיקון מנעול דלת",
        ],
    },
    "plumbing": {
        "campaign": "NS-SRCH-Plumbing",
        "he": "אינסטלטור",
        "url_slug": "אינסטלטור",
        "budget": 28,
        "max_cpc": 15,
        "geo_nouns": ["אינסטלטור", "שרברב"],
        "core": [
            "אינסטלטור קרוב אלי", "פתיחת סתימה", "פתיחת סתימות", "סתימה בביוב",
            "נזילת מים", "פיצוץ צנרת", "נזילה בצנרת", "אינסטלטור דחוף",
            "תיקון דוד שמש", "החלפת ניאגרה", "סתימה במטבח", "סתימה באסלה",
            "איתור נזילות",
        ],
    },
    "handyman": {
        "campaign": "NS-SRCH-Handyman",
        "he": "הנדימן",
        "url_slug": "הנדימן",
        "budget": 28,
        "max_cpc": 10,
        "geo_nouns": ["הנדימן", "איש תחזוקה"],
        "core": [
            "הנדימן קרוב אלי", "תיקונים קטנים בבית", "איש תחזוקה לבית",
            "הרכבת רהיטים", "החלפת ברז", "תיקון ברז מטפטף", "צביעת דירה",
            "תליית מדפים", "הרכבת ארון", "תיקוני בית קטנים",
        ],
    },
}


def city_url(service_key: str, slug_he: str, prefixed: str) -> str:
    """<trade domain>/<service>-ב<city> — matches lib/cities.ts cityUrl()."""
    return f"{SERVICE_DOMAINS[service_key]}/{slug_he}-{prefixed.replace(' ', '-')}"


# --- RSA copy -------------------------------------------------------------------------
# Every line below traces to docs/google-ads-market-and-abc-plan.md (approved copy) or
# to a verified fact in nisan-full-brief.html. Nothing invented.
#
# TWO RSAs per ad group — variant A and variant B, per the A/B plan in
# google-ads-market-and-abc-plan.md §4 (which also says: run two variants at once, not
# three). Two RSAs is also the playbook minimum; a single RSA per ad group is the #1
# cause of "Poor" ad strength.
#
# The variant differs in the ANGLE (the pinned H1/H2 and the descriptions). The neutral
# trust lines are shared, so the test measures the angle rather than random copy drift.
# Handyman variant C ("בלי דמי ייעוץ") is deliberately NOT built — the source doc marks
# it "לוודא עם ניסן לפני שימוש" and unverified pricing copy is a Consumer Protection
# exposure, not just a policy risk.
SHARED_TAIL = [
    "ניסן שמריהו — בעל מקצוע אחד",
    "מדברים איתי, לא עם מוקד",
    "זמין 24/6 לתקלות",
    "עבודה נקייה ומסודרת",
    "חייגו או שלחו וואטסאפ",
]

RSA = {
    "locksmith": {
        "geo_noun": "מנעולן",
        "A": {
            "angle": "הסמכה + אישור משטרה",
            "path2": "מוסמך",   # visible in the ad
            "hypothesis": "אות אמון רשמי מנצח מול מתחרים שמובילים במהירות בלבד",
            "geo_h": ["מנעולן ב{LOCATION(City):אור יהודה}",
                      "מנעולן מוסמך ב{LOCATION(City):אור יהודה}"],
            "core_h": ["מנעולן מוסמך + אישור משטרה", "ננעלתם בחוץ? ניסן בדרך"],
            "body": ["פריצת דלת בלי לשבור", "פתיחה בלי נזק לדלת",
                     "החלפת צילינדר במקום", "אישור משטרה — לא שכיח",
                     "ננעלתם בחוץ?", "פותח כל סוג מנעול",
                     "התקנת מנעול רב בריח", "מנעולן אמין ומקצועי"],
            "desc": [
                "פריצת דלתות בלי לשבור. מנעולן מוסמך ומאושר משטרה. המחיר נסגר בטלפון מראש",
                "ננעלתם בחוץ או שהדלת נטרקה? ניסן מגיע, פותח נקי ומחליף צילינדר במקום",
                "מנעולן מוסמך עם אישור משטרה — אות אמון שלא לכל אחד יש. עבודה נקייה",
                "זמין 24/6 לכל תקלת נעילה. בעל מקצוע אחד, מדברים איתו ישירות",
            ],
        },
        "B": {
            "angle": "שקיפות מחיר",
            "path2": "מחיר-סגור",   # visible in the ad
            "hypothesis": "מתמודד ישירות מול פיתיון ה-79 ₪ של המתחרים",
            "geo_h": ["מנעולן ב{LOCATION(City):אור יהודה}",
                      "מחיר סגור מראש בטלפון"],
            "core_h": ["מחיר סגור מראש בטלפון", "אין הפתעות בסוף העבודה"],
            "body": ["הדלת נטרקה?", "פריצת דלת מ-250 ₪",
                     "המחיר נסגר לפני שיוצאים", "מה שסיכמנו זה מה שתשלמו",
                     "ננעלתם בחוץ?", "בלי תוספות באמצע",
                     "יודעים כמה עוד לפני", "מחיר הוגן ושקוף"],
            "desc": [
                "המחיר נסגר בטלפון לפני שיוצאים אליכם. מה שסיכמנו זה מה שתשלמו, בלי תוספות",
                "פריצת דלת מ-250 ₪, מחיר מלא סגור מראש. בלי תוספות שצצות בסוף העבודה",
                "לא נוקבים מחיר נמוך בטלפון ומעלים אותו בדלת. מחיר אחד, סגור, מראש",
                "זמין 24/6 לכל תקלת נעילה. בעל מקצוע אחד, מדברים איתו ישירות",
            ],
        },
    },
    "plumbing": {
        # NO מוסמך / רישיון / מורשה — certificate not in hand. Enforced in verify().
        "geo_noun": "אינסטלטור",
        "A": {
            "angle": "קריאת אבחון מתקזזת",
            "path2": "קריאה-מתקזזת",   # visible in the ad
            "hypothesis": "הבידול החזק ביותר שכבר קיים בקופי — נבדק ראשון",
            "geo_h": ["אינסטלטור ב{LOCATION(City):אור יהודה}",
                      "קריאה 350 ₪ — מתקזזת"],
            "core_h": ["קריאה 350 ₪ — מתקזזת", "נזילה או סתימה? מטפל"],
            "body": ["קריאת אבחון 350 ₪", "מתקזזת במלואה בתיקון",
                     "מחיר ברור לפני העבודה", "סתימות, צנרת ודודים",
                     "נזילה או סתימה?", "משלמים פעם אחת",
                     "אבחון מדויק לפני תיקון", "פתיחת סתימות מקצועית"],
            "desc": [
                "ביקור אבחון 350 ₪, ומתקזז במלואו אם ממשיכים לתיקון. מחיר ברור לפני העבודה",
                "לא משלמים פעמיים. דמי הקריאה יורדים מהמחיר הסופי אם ממשיכים לתיקון",
                "ניסן מגיע, מאבחן ואומר בדיוק מה צריך ומה זה עולה, לפני שמתחילים",
                "זמין 24/6 לתקלות דחופות. מדברים ישירות עם בעל המקצוע, לא עם מוקד",
            ],
        },
        "B": {
            "angle": "חירום",
            "path2": "חירום",   # visible in the ad
            "hypothesis": "מושך את כוונת החיפוש החמה ביותר — CPC גבוה יותר, המרה גבוהה יותר",
            "geo_h": ["אינסטלטור ב{LOCATION(City):אור יהודה}",
                      "שרברב ב{LOCATION(City):אור יהודה}"],
            "core_h": ["פיצוץ צנרת? מטפל עכשיו", "סתימה דחופה? התקשרו"],
            "body": ["הצפה בבית?", "נזילה שלא נעצרת",
                     "סתימה שחוזרת שוב ושוב", "אינסטלטור מנוסה ואזורי",
                     "סתימה או נזילה?", "לא מחכים לבוקר",
                     "פתיחת סתימות דחופה", "מגיע עם כל הציוד"],
            "desc": [
                "סתימה, נזילה או פיצוץ צנרת. ניסן מגיע, מאבחן ואומר בדיוק מה צריך, בלי לנחש",
                "תקלת חירום לא מחכה לבוקר. ניסן מטפל בזה עכשיו, נקי ומסודר",
                "ניסיון רב בכל סוגי תקלות האינסטלציה. עובד נקי ומשאיר את הבית מסודר",
                "זמין 24/6 לתקלות דחופות. מדברים ישירות עם בעל המקצוע, לא עם מוקד",
            ],
        },
    },
    "handyman": {
        "geo_noun": "הנדימן",
        "A": {
            "angle": "איש אחד לכל הרשימה",
            "path2": "כל-הבית",   # visible in the ad
            "hypothesis": "הזווית החוצה-שירות שאף מתחרה מקומי לא מציע",
            "geo_h": ["הנדימן ב{LOCATION(City):אור יהודה}",
                      "איש תחזוקה ב{LOCATION(City):אור יהודה}"],
            "core_h": ["איש אחד לכל הבית", "רשימת תיקונים? סוגר הכל"],
            "body": ["רשימת התיקונים מתארכת?", "במקום 3 בעלי מקצוע",
                     "הרכבות, צבע ותיקונים", "מחיר לפי גודל העבודה",
                     "תיקון קטן? מטפל", "הרכבת רהיטים ומדפים",
                     "צביעה ותיקוני גבס", "ביקור אחד, רשימה סגורה"],
            "desc": [
                "במקום לתאם שלושה בעלי מקצוע — מתקשרים לאחד. מחיר נקבע לפי היקף העבודה",
                "רשימת התיקונים הקטנים שרק מתארכת? ניסן מגיע פעם אחת וסוגר את כולה",
                "הרכבת רהיטים, תליית מדפים, צביעה והחלפת ברזים. איש אחד, ביקור אחד",
                "מדברים ישירות עם בעל המקצוע. מחיר סגור בטלפון לפני שמתחילים לעבוד",
            ],
        },
        "B": {
            "angle": "שירות ספציפי — ברזים",
            "path2": "ברזים",   # visible in the ad
            "hypothesis": "לפי ניסן זה השירות המבוקש ביותr; בודק אם ממוקד ממיר טוב מרחב",
            "geo_h": ["הנדימן ב{LOCATION(City):אור יהודה}",
                      "החלפת ברזים ב{LOCATION(City):אור יהודה}"],
            "core_h": ["החלפת ברזים מהירה", "ברז מטפטף? מחליף היום"],
            "body": ["ברז מטפטף?", "ברז ישן החוצה, חדש פנימה",
                     "בלי טפטופים ובלי בלגן", "גם ניאגרות וסיפונים",
                     "רשימת תיקונים? סוגר", "ניאגרה שלא נסגרת?",
                     "מגיע עם הברז המתאים", "מסיים באותו ביקור"],
            "desc": [
                "ברז מטפטף או ישן? החלפה מהירה ונקייה, בלי טפטופים ובלי בלגן במטבח",
                "החלפת ברזים במטבח ובאמבטיה, ניאגרות וסיפונים. עבודה נקייה ומסודרת",
                "השירות המבוקש ביותר אצל ניסן. מגיע עם הברז המתאים ומסיים באותו ביקור",
                "מדברים ישירות עם בעל המקצוע. מחיר סגור בטלפון לפני שמתחילים לעבוד",
            ],
        },
    },
}
VARIANTS = ("A", "B")

# --- Negatives ------------------------------------------------------------------------
# Aggregators are the #1 junk source in Israeli trades: they outrank everyone, so people
# search THEM by name. Confirmed on the live SERP for all three trades, 31.7.2026.
AGGREGATORS = [
    "מידרג", "midrag", "b144", "בזק 144", "זאפ", "zap", "פרו קום", "pro.co.il",
    "המקצוענים", "easy.co.il", "איזי", "t.co.il", "רוטר", "נבחרי רוטר",
    "אולגוד", "all good", "יצאת צדיק", "דירוג בעלי מקצוע", "השוואת מחירים",
    "3 הצעות מחיר", "קבלת הצעות מחיר", "בעלי מקצוע מומלצים",
]
NOT_CUSTOMERS = [
    "דרושים", "דרוש", "משרה", "שכר", "משכורת", "כמה מרוויח",
    "קורס", "קורסים", "לימודי", "הכשרה", "תעודה", "רישיון עבודה",
    "איך ל", "בעצמי", "diy", "מדריך", "הסבר", "ויקיפדיה", "wikipedia",
    "חינם", "בחינם", "youtube", "סרטון", "pdf",
]
OUT_OF_AREA = [
    "תל אביב", "תל-אביב", "ירושלים", "חיפה", "באר שבע", "אילת", "נתניה",
    "אשדוד", "אשקלון", "רעננה", "הרצליה", "כפר סבא", "מודיעין", "בית שמש",
    "טבריה", "צפת", "עכו", "נהריה", "חדרה", "רחובות", "נס ציונה",
]
PER_SERVICE_NEG = {
    "locksmith": ["שכפול מפתחות", "מפתח לרכב", "מנעולן רכב", "כספת", "כספות",
                  "מנעול אופניים", "מנעול תיק", "צילינדר לקנות", "מנעולים למכירה"],
    "plumbing": ["חומרי בניין", "כלים סניטריים", "אמבטיה למכירה", "לקנות ברז",
                 "חנות אינסטלציה", "מחירון משרד השיכון", "דוד חשמלי לקנות"],
    "handyman": ["דרוש הנדימן", "עבודות בניה", "קבלן שיפוצים", "שיפוץ מטבח",
                 "אדריכל", "מעצב פנים", "רהיטים למכירה", "איקאה"],
}

# Never block these — they are the client's own identity or real buying intent.
NEVER_BLOCK = ["ניסן", "שמריהו", "אור יהודה"]

BANNED_GLOBAL = ["24/7", "אחריות בכתב", "מילואים", "מילואימניק", "תוך שעה",
                 "עד שעתיים", "הגעה מיידית", "מבוטח", "ביטוח"]
BANNED_PLUMBING = ["מוסמך", "רישיון", "מורשה"]

LOCATION_RE = re.compile(r"\{LOCATION\(City\)(?::([^}]*))?\}")
ALL_CITIES = [c[0] for c in HEARTLAND + EXTENDED]


def rendered_max(text: str) -> int:
    """Longest this asset can render at, across every service-area city."""
    if not LOCATION_RE.search(text):
        return len(text)
    return max(len(LOCATION_RE.sub(c, text)) for c in ALL_CITIES)


def build():
    campaigns, adgroups, keywords, rsas, negatives = [], [], [], [], []

    for key, s in SERVICES.items():
        camp, slug, copy = s["campaign"], s["url_slug"], RSA[key]
        main_url = f"{SERVICE_DOMAINS[key]}/{slug}"

        campaigns.append([
            camp, "Search", "Paused", s["budget"], "Daily", "Maximize clicks",
            "Google search", "Hebrew;English",
            ";".join(ALL_CITIES), "Presence",
            "Sun-Fri 00:00-23:59", "",
        ])

        groups = [
            ("Core-Intent", None, s["core"], main_url),
            ("Geo-Heartland", HEARTLAND, None, None),
            ("Geo-Extended", EXTENDED, None, None),
        ]

        for gname, cities, core_kws, url in groups:
            adgroups.append([camp, gname, "Enabled", s["max_cpc"], "Standard"])

            if core_kws:
                for kw in core_kws:
                    for mt in ("Phrase", "Exact"):
                        keywords.append([camp, gname, kw, mt, "Enabled", s["max_cpc"], url])
            else:
                for name, prefixed, city_slug in cities:
                    target = city_url(key, slug, prefixed)
                    for noun in s["geo_nouns"]:
                        # BOTH Hebrew forms. The fused ב form is the one people type,
                        # and phrase-matching the bare form does not reliably catch it.
                        for form in (f"{noun} {name}", f"{noun} {prefixed}"):
                            for mt in ("Phrase", "Exact"):
                                keywords.append([camp, gname, form, mt, "Enabled",
                                                 s["max_cpc"], target])

            # One RSA per variant, both live in the same ad group so they compete on
            # identical keywords and identical geo — the only difference is the angle.
            for variant in VARIANTS:
                v = copy[variant]
                if core_kws:
                    heads = v["core_h"] + v["body"] + SHARED_TAIL
                    pins = ["1", ""] + [""] * (len(heads) - 2)
                    final = url
                else:
                    anchor = cities[0][0]
                    heads = [h.replace("אור יהודה", anchor) for h in v["geo_h"]]
                    heads += v["body"] + SHARED_TAIL
                    pins = ["1", "2"] + [""] * (len(heads) - 2)
                    final = city_url(key, slug, cities[0][1])

                heads, pins = heads[:15], pins[:15]
                row = [camp, gname, "Responsive search ad", final]
                for i in range(15):
                    row += [heads[i] if i < len(heads) else "",
                            pins[i] if i < len(pins) else ""]
                for i in range(4):
                    row += [v["desc"][i], "1" if i == 0 else ""]
                # Path 2 is VISIBLE to the customer in the ad's display URL, so it
                # carries a Hebrew descriptor of the angle — never "variant-A". It
                # still identifies the variant at a glance in the ads report.
                row += [slug, v["path2"], "Enabled"]
                rsas.append(row)

        for term in AGGREGATORS:
            negatives.append([camp, "", term, "Negative phrase", "Enabled", "NEG_מתווכים"])
        for term in NOT_CUSTOMERS:
            negatives.append([camp, "", term, "Negative phrase", "Enabled", "NEG_לא_לקוחות"])
        for term in OUT_OF_AREA:
            negatives.append([camp, "", term, "Negative phrase", "Enabled", "NEG_מחוץ_לאזור"])
        for term in PER_SERVICE_NEG[key]:
            negatives.append([camp, "", term, "Negative phrase", "Enabled", f"NEG_{key}"])

    return campaigns, adgroups, keywords, rsas, negatives


def verify(rsas, negatives, keywords):
    errors = []
    hdr = ["Headline"] * 15
    for row in rsas:
        camp, ag = row[0], row[1]
        for i in range(15):
            t = row[4 + i * 2]
            if t and rendered_max(t) > 30:
                errors.append(f"{camp}/{ag} H{i+1}: {rendered_max(t)}/30 worst-case — {t}")
        for i in range(4):
            d = row[34 + i * 2]
            if len(d) > 90:
                errors.append(f"{camp}/{ag} D{i+1}: {len(d)}/90 — {d}")
        blob = " ".join(str(x) for x in row)
        for bad in BANNED_GLOBAL:
            if bad in blob:
                errors.append(f"{camp}/{ag}: banned claim '{bad}'")
        if "Plumbing" in camp:
            for bad in BANNED_PLUMBING:
                if bad in blob:
                    errors.append(f"{camp}/{ag}: '{bad}' — plumbing certificate not in hand")

    for row in negatives:
        for safe in NEVER_BLOCK:
            if safe in row[2]:
                errors.append(f"negative '{row[2]}' contains protected term '{safe}'")

    # Every city must appear in BOTH forms. Note "בת ים" already starts with ב, so a
    # regex for "space + ב" also matches its bare form — compare against the real city
    # strings instead, and require an exact per-city, per-noun, per-match-type balance.
    geo = [k for k in keywords if k[1].startswith("Geo")]
    for name, prefixed, _slug in HEARTLAND + EXTENDED:
        bare = sum(1 for k in geo if k[2].endswith(" " + name))
        fused = sum(1 for k in geo if k[2].endswith(" " + prefixed))
        if bare != fused or bare == 0:
            errors.append(f"ב-form imbalance for {name}: {bare} bare vs {fused} fused")
    return errors


def main():
    campaigns, adgroups, keywords, rsas, negatives = build()
    errors = verify(rsas, negatives, keywords)
    if errors:
        for e in errors:
            print(f"ERROR {e}")
        sys.exit(1)

    files = {
        "01-campaigns.csv": (
            ["Campaign", "Campaign Type", "Campaign Status", "Budget", "Budget Type",
             "Bid Strategy Type", "Networks", "Languages", "Location",
             "Location Target Type", "Ad Schedule", "Campaign Start Date"], campaigns),
        "02-adgroups.csv": (
            ["Campaign", "Ad Group", "Status", "Default max. CPC", "Ad group type"], adgroups),
        "03-keywords.csv": (
            ["Campaign", "Ad Group", "Keyword", "Match Type", "Status", "Max CPC",
             "Final URL"], keywords),
        "05-negatives.csv": (
            ["Campaign", "Ad Group", "Negative keyword", "Match Type", "Status",
             "Shared Set Name"], negatives),
    }
    rsa_hdr = ["Campaign", "Ad Group", "Ad Type", "Final URL"]
    for i in range(1, 16):
        rsa_hdr += [f"Headline {i}", f"Headline {i} position"]
    for i in range(1, 5):
        rsa_hdr += [f"Description {i}", f"Description {i} position"]
    rsa_hdr += ["Path 1", "Path 2", "Status"]
    files["04-rsas.csv"] = (rsa_hdr, rsas)

    for name, (header, rows) in files.items():
        with (OUT / name).open("w", encoding="utf-8-sig", newline="") as fh:
            w = csv.writer(fh)
            w.writerow(header)
            w.writerows(rows)
        print(f"{name}: {len(rows)} rows")
    print("\nall compliance and length checks passed")


if __name__ == "__main__":
    main()
