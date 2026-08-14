import { neon } from "@neondatabase/serverless";
import type { EnquiryInput } from "@/lib/schemas";

// Schema in lib/submissions.sql — run once against the provisioned database.
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export async function saveSubmission(data: EnquiryInput) {
  if (!sql) {
    throw new Error("DATABASE_URL is not configured");
  }

  await sql`
    INSERT INTO enquiries (name, org, email, phone, service, message)
    VALUES (${data.name}, ${data.org}, ${data.email}, ${data.phone ?? null}, ${data.service}, ${data.message ?? null})
  `;
}
