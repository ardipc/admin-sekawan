import { createClient } from "@supabase/supabase-js";

export function supadmin() {
  const supa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string, 
    process.env.SUPABASE_ADMIN_KEY as string, 
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  );
  return supa;
}