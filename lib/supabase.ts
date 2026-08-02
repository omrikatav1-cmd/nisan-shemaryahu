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

let _adminClient: SupabaseClient | null = null;

// Server-only client for the /leads dashboard — uses the service role key so
// it can read all leads without opening up RLS to the public anon key.
// Never import this from a "use client" component.
export function getSupabaseAdmin(): SupabaseClient {
  if (!_adminClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.");
    }
    _adminClient = createClient(url, serviceKey);
  }
  return _adminClient;
}

export type LeadStatus = "new" | "in-progress" | "completed";

export interface Lead {
  id?: string;
  created_at?: string;
  name: string;
  phone: string;
  issue: string;
  status: LeadStatus;
  service?: string; // which vertical: locksmith / plumbing / handyman — lets us compare the 3 parallel campaigns
  source_page?: string; // which landing page the lead came from
}

// SQL to create leads table (run in Supabase SQL editor):
// CREATE TABLE leads (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   created_at TIMESTAMPTZ DEFAULT NOW(),
//   name TEXT NOT NULL,
//   phone TEXT NOT NULL,
//   issue TEXT NOT NULL,
//   status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'completed')),
//   service TEXT,
//   source_page TEXT
// );
// ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Allow insert from anon" ON leads FOR INSERT TO anon WITH CHECK (true);
//
// If the table already exists from before the 3-campaign split, run instead:
// ALTER TABLE leads ADD COLUMN IF NOT EXISTS service TEXT;
// ALTER TABLE leads ADD COLUMN IF NOT EXISTS source_page TEXT;
