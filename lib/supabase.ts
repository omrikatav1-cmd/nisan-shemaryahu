import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars. " +
          "Copy .env.local.example to .env.local and fill in your Supabase credentials."
      );
    }
    _client = createClient(url, key);
  }
  return _client;
}

export type LeadStatus = "new" | "in-progress" | "completed";

export interface Lead {
  id?: string;
  created_at?: string;
  name: string;
  phone: string;
  issue: string;
  status: LeadStatus;
}

// SQL to create leads table (run in Supabase SQL editor):
// CREATE TABLE leads (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   name TEXT NOT NULL,
//   phone TEXT NOT NULL,
//   issue TEXT NOT NULL,
//   status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'completed'))
// );
// ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Allow insert from anon" ON leads FOR INSERT TO anon WITH CHECK (true);
