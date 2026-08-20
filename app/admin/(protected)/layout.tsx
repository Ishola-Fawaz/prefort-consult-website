import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

// The proxy (proxy.ts) already redirects unauthenticated requests before
// they reach this layout — this check is a defensive second layer, not the
// primary gate.
export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-full">
      <div className="border-b border-rule bg-paper-raised">
        <div className="mx-auto flex max-w-295 items-center justify-between px-5 py-4 md:px-7">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">Admin</p>
            <p className="text-sm text-ink">{user.email}</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-medium text-slate underline underline-offset-2 transition-colors duration-200 hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}
