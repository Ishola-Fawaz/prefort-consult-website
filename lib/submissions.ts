import { supabase } from "@/lib/supabase";
import type { EnquiryInput } from "@/lib/schemas";

// Schema in lib/submissions.sql — run once against the provisioned Supabase project.
export async function saveSubmission(data: EnquiryInput) {
  if (!supabase) {
    throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not configured");
  }

  const { error } = await supabase.from("enquiries").insert({
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
