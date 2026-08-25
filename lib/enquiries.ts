import { createClient } from "@/lib/supabase/server";

export type Enquiry = {
  id: number;
  name: string;
  org: string;
  email: string;
  phone: string | null;
  service: string;
  message: string | null;
  band: string | null;
  created_at: string;
};

export async function listEnquiries(): Promise<Enquiry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getEnquiry(id: number): Promise<Enquiry | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}
