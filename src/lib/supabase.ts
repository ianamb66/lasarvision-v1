import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// IMPORTANT:
// This module is imported at startup. If env vars are missing, calling createClient("")
// can crash the app and render a blank page. We avoid that by creating a harmless
// dummy client (the UI shows a setup screen via EnvGate).

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

const safeUrl = supabaseUrl || "https://example.supabase.co";
const safeKey = supabaseAnonKey || "public-anon-key";

export const supabase = createClient(safeUrl, safeKey);
