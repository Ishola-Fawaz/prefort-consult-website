import { supabaseAdmin } from "@/lib/supabase/admin";
import type { EnquiryInput } from "@/lib/schemas";

export async function saveSubmission(data: EnquiryInput) {
  if (!supabaseAdmin) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not configured");
  }

  const { error } = await supabaseAdmin.from("enquiries").insert({
    name: data.name,
    org: data.org,
    email: data.email,
    phone: data.phone ?? null,
    service: data.service,
    message: data.message ?? null,
  });

  if (error) {
    throw error;
  }
}
