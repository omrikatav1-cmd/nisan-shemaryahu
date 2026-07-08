// City data for the per-service SEO clusters (Bio Israel model: one service ×
// many cities). Neighborhoods are real, public area names — used to write
// genuine local intro copy per page, not find-and-replace filler.
// `nearby` (slugs) powers within-service internal linking only.

export type City = {
  slug: string; // ASCII route segment
  name: string; // Hebrew display name
  prefixed: string; // Hebrew "in <city>" form, e.g. "בחולון"
  neighborhoods: string[];
  nearby: string[]; // adjacent city slugs, same service only
};

export const CITIES: City[] = [
  { slug: "or-yehuda", name: "אור יהודה", prefixed: "באור יהודה",
    neighborhoods: ["נווה רבין", "רמת פנקס", "סקיה", "נווה סביון"],
    nearby: ["yehud", "kiryat-ono", "azor", "ramat-gan"] },
  { slug: "yehud", name: "יהוד", prefixed: "ביהוד",
    neighborhoods: ["נווה מונוסון", "יהוד הירוקה", "רמות יהוד", "מרכז העיר"],
    nearby: ["or-yehuda", "kiryat-ono", "savyon", "ganei-tikva"] },
  { slug: "kiryat-ono", name: "קרית אונו", prefixed: "בקרית אונו",
    neighborhoods: ["לב הפארק", "רמת אונו", "גבעת השלושה", "נווה נאמן"],
    nearby: ["or-yehuda", "yehud", "ramat-gan", "ganei-tikva"] },
  { slug: "savyon", name: "סביון", prefixed: "בסביון",
    neighborhoods: ["סביון הוותיקה", "סביון החדשה", "גני יהודה"],
    nearby: ["yehud", "ganei-tikva", "kiryat-ono", "or-yehuda"] },
  { slug: "azor", name: "אזור", prefixed: "באזור",
    neighborhoods: ["מרכז אזור", "שכונת רסקו", "האזור הישן"],
    nearby: ["or-yehuda", "holon", "ramat-gan", "bat-yam"] },
  { slug: "ganei-tikva", name: "גני תקווה", prefixed: "בגני תקווה",
    neighborhoods: ["סביוני גנים", "מרכז גני תקווה", "רמות גנים"],
    nearby: ["savyon", "yehud", "kiryat-ono", "petah-tikva"] },
  { slug: "lod", name: "לוד", prefixed: "בלוד",
    neighborhoods: ["גני אביב", "רמת אשכול", "נאות שיר", "העיר העתיקה"],
    nearby: ["or-yehuda", "yehud", "rishon", "ganei-tikva"] },
  { slug: "petah-tikva", name: "פתח תקווה", prefixed: "בפתח תקווה",
    neighborhoods: ["כפר גנים", "הדר גנים", "אם המושבות", "נווה עוז", "קרית מטלון"],
    nearby: ["ganei-tikva", "kiryat-ono", "yehud", "ramat-gan"] },
  { slug: "rishon", name: "ראשון לציון", prefixed: "בראשון לציון",
    neighborhoods: ["רמת אליהו", "נחלת יהודה", "נאות שקמה", "קרית גנים", "המערב החדש"],
    nearby: ["holon", "lod", "bat-yam", "or-yehuda"] },
  { slug: "holon", name: "חולון", prefixed: "בחולון",
    neighborhoods: ["קרית שרת", "ג'סי כהן", "נאות רחל", "קרית בן גוריון", "ח-500"],
    nearby: ["bat-yam", "azor", "rishon", "ramat-gan"] },
  { slug: "bat-yam", name: "בת ים", prefixed: "בבת ים",
    neighborhoods: ["רמת הנשיא", "פארק הים", "עמידר", "מרכז העיר"],
    nearby: ["holon", "rishon", "azor", "or-yehuda"] },
  { slug: "ramat-gan", name: "רמת גן", prefixed: "ברמת גן",
    neighborhoods: ["מרום נווה", "רמת חן", "הגפן", "שכונת התקווה"],
    nearby: ["kiryat-ono", "or-yehuda", "petah-tikva", "holon"] },
];

export const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(
  CITIES.map((c) => [c.slug, c]),
);

export const CITY_SLUGS = CITIES.map((c) => c.slug);

// Hebrew public URL for a service+city page, e.g. "/מנעולן-בחולון".
// Multiword city names get spaces → hyphens (like Bio Israel's /הדברה-בראשון-לציון/).
export function cityUrl(serviceSlug: string, city: City): string {
  return `/${serviceSlug}-${city.prefixed.replace(/ /g, "-")}`;
}
