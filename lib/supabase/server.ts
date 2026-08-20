import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Anon-key client bound to the request's auth cookies. Reads run under RLS
// as the logged-in admin, not as a service role — see lib/submissions.sql
// for the policy that allows authenticated reads on `enquiries`.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component that can't set cookies —
            // the proxy's session refresh (lib/supabase/proxy.ts) covers it.
          }
        },
      },
    }
  );
}
