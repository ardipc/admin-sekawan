import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export function supadmin() {
  const supa = createClient<Database>(
    "https://cymagsnihvppzuqevvge.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bWFnc25paHZwcHp1cWV2dmdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjkyOTg4NCwiZXhwIjoyMDAyNTA1ODg0fQ.1I_quwuJ_VZLlpKpnowuk69kCd5IiKKBbrdA6445iYM", 
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  );
  return supa;
}