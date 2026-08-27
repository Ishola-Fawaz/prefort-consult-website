import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2).max(100),
  org: z.string().min(2).max(150),
  email: z.email().max(150),
  phone: z.string().max(30).optional(),
  service: z.enum([
    "risk-assessment",
    "gap-analysis",
    "vulnerability-assessment",
    "network-protection",
    "training",
    "incident",
    "unsure",
  ]),
  message: z.string().max(2000).optional(),
  // Honeypot. Deliberately unconstrained: a `max(0)` here (as a literal
  // reading of spec §8.1 suggests) would make Zod reject a bot-filled field
  // with a 400 before the route handler ever reaches the silent-200 logic
  // in §8.2 step 3 — defeating the point of a honeypot. The route handler
  // checks this value after a successful parse instead.
  website: z.string().optional(),
  // reCAPTCHA v2 token — verified server-side in the route handler, not
  // treated as form data.
  recaptchaV2Token: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const SERVICE_OPTIONS: { value: EnquiryInput["service"]; label: string }[] = [
  { value: "risk-assessment", label: "Risk assessment" },
  { value: "gap-analysis", label: "Gap analysis" },
  { value: "vulnerability-assessment", label: "Vulnerability assessment" },
  { value: "network-protection", label: "Network protection" },
  { value: "training", label: "Training" },
  { value: "incident", label: "Incident response" },
  { value: "unsure", label: "Not sure yet" },
];
