import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, issue } = body;

    if (!name || !phone || !issue) {
      return NextResponse.json(
        { error: "שדות חסרים: שם, טלפון ותיאור הבעיה הם שדות חובה." },
        { status: 400 }
      );
    }

    const { data, error } = await getSupabase()
      .from("leads")
      .insert([{ name, phone, issue, status: "new" }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "שגיאה בשמירת הפנייה. נסה שוב." },
        { status: 500 }
      );
    }

    const whatsappUrl = getWhatsAppUrl(name, issue);

    return NextResponse.json({
      success: true,
      lead: data,
      whatsappUrl,
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "שגיאה פנימית." }, { status: 500 });
  }
}
