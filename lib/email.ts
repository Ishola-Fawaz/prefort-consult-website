import { Resend } from "resend";
import type { EnquiryInput } from "@/lib/schemas";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Requires the sending domain to be verified in Resend before this can
// actually deliver — blocked on a working business domain/email, scope §11
// item 5.
const FROM = "Prefort Consult <enquiries@prefortconsult.com>";

export async function sendEnquiryNotification(data: EnquiryInput) {
  if (!resend || !process.env.ENQUIRY_NOTIFY_EMAIL) return;

  await resend.emails.send({
    from: FROM,
    to: process.env.ENQUIRY_NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `New enquiry — ${data.service}`,
    text: [
      `Name: ${data.name}`,
      `Organisation: ${data.org}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      `Service: ${data.service}`,
      data.message ? `\nMessage:\n${data.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

export async function sendEnquiryAutoresponder(data: EnquiryInput) {
  if (!resend) return;

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: "We've received your enquiry",
    text: `Hi ${data.name},\n\nThanks for reaching out to Prefort Consult. We've received your enquiry and will get back to you shortly.\n\n— Prefort Consult`,
  });
}
