-- Run once against the provisioned Supabase project (SQL editor, or via the
-- Supabase CLI) before the enquiry API route can persist submissions.
-- See lib/submissions.ts.
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  org TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  message TEXT,
  band TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- The API route writes with the service role key, which bypasses RLS, so no
-- policies are defined here. RLS is enabled regardless to keep the table
-- inaccessible to the anon/public key by default.
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
