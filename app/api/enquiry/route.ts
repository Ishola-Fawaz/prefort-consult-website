import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/schemas";
import { isRateLimited } from "@/lib/rate-limit";
import { saveSubmission } from "@/lib/submissions";
import { sendEnquiryNotification, sendEnquiryAutoresponder } from "@/lib/email";

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
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
