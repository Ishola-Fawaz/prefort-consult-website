import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/schemas";
import { isRateLimited } from "@/lib/rate-limit";
import { saveSubmission } from "@/lib/submissions";
import { sendEnquiryNotification, sendEnquiryAutoresponder } from "@/lib/email";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const runtime = "nodejs";

const RECAPTCHA_V3_THRESHOLD = 0.5;
const RECAPTCHA_ACTION = "enquiry_submit";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

// v3 runs invisibly and scores every submission; a low score falls back to
// an explicit v2 checkbox instead of hard-rejecting the submission outright.
// Unset entirely (no keys configured yet) skips verification — the form
// keeps working before reCAPTCHA is set up.
async function passesRecaptcha(v3Token?: string, v2Token?: string): Promise<boolean> {
  const v3Secret = process.env.RECAPTCHA_V3_SECRET_KEY;
  const v2Secret = process.env.RECAPTCHA_V2_SECRET_KEY;

  if (!v3Secret && !v2Secret) return true;

  if (v3Token && v3Secret) {
    const result = await verifyRecaptcha(v3Token, v3Secret);
    if (
      result.success &&
      (result.score ?? 0) >= RECAPTCHA_V3_THRESHOLD &&
      (!result.action || result.action === RECAPTCHA_ACTION)
    ) {
      return true;
    }
  }

  if (v2Token && v2Secret) {
    const result = await verifyRecaptcha(v2Token, v2Secret);
    if (result.success) return true;
  }

  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _: "Invalid request body" } },
      { status: 400 }
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_";
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website) {
    // Honeypot tripped — pretend success so bots don't learn they were caught.
    return NextResponse.json({ ok: true });
  }

  if (!(await passesRecaptcha(data.recaptchaV3Token, data.recaptchaV2Token))) {
    return NextResponse.json({ ok: false, error: "recaptcha_challenge" }, { status: 400 });
  }

  try {
    await saveSubmission(data);
  } catch (err) {
    console.error("Failed to persist enquiry submission", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  try {
    await Promise.all([sendEnquiryNotification(data), sendEnquiryAutoresponder(data)]);
  } catch (err) {
    // Submission is already persisted — an email failure must not lose the lead.
    console.error("Failed to send enquiry emails", err);
  }

  return NextResponse.json({ ok: true });
}
