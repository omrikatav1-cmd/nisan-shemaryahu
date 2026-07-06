import { getSupabaseAdmin } from "@/lib/supabase";
import type { Lead } from "@/lib/supabase";

export const dynamic = "force-dynamic"; // always show fresh leads, never cache this page

export default async function LeadsPage() {
  const { data, error } = await getSupabaseAdmin()
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = (data as Lead[] | null) ?? [];

  return (
    <main dir="rtl" style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>לידים — ניסן שמריהו</h1>

      {error && <p style={{ color: "#c23b3b" }}>שגיאה בטעינת הלידים: {error.message}</p>}

      {!error && leads.length === 0 && <p>אין עדיין לידים.</p>}

      {!error && leads.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ textAlign: "right", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "0.5rem" }}>תאריך</th>
              <th style={{ padding: "0.5rem" }}>שם</th>
              <th style={{ padding: "0.5rem" }}>טלפון</th>
              <th style={{ padding: "0.5rem" }}>מה צריך</th>
              <th style={{ padding: "0.5rem" }}>שירות</th>
              <th style={{ padding: "0.5rem" }}>עמוד מקור</th>
              <th style={{ padding: "0.5rem" }}>סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.5rem" }}>{lead.created_at ? new Date(lead.created_at).toLocaleString("he-IL") : "—"}</td>
                <td style={{ padding: "0.5rem" }}>{lead.name}</td>
                <td style={{ padding: "0.5rem" }} dir="ltr">{lead.phone}</td>
                <td style={{ padding: "0.5rem" }}>{lead.issue}</td>
                <td style={{ padding: "0.5rem" }}>{lead.service ?? "—"}</td>
                <td style={{ padding: "0.5rem" }}>{lead.source_page ?? "—"}</td>
                <td style={{ padding: "0.5rem" }}>{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
