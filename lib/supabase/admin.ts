import { createClient } from "@supabase/supabase-js";

// Service-role client — bypasses RLS, so this module must never be
// imported from client components. Used only for the public enquiry form's
// write path (app/api/enquiry/route.ts via lib/submissions.ts), which has
// no user session to authenticate with.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  url && serviceRoleKey
    ? createClient(url, serviceRoleKey, {
        auth: { persistSession: false },
      })
    : null;
