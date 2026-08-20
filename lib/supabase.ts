import { createClient } from "@supabase/supabase-js";

// Server-side client using the service role key — bypasses RLS, so this
// module must never be imported from client components.
const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase =
  url && serviceRoleKey
    ? createClient(url, serviceRoleKey, {
        auth: { persistSession: false },
      })
    : null;
