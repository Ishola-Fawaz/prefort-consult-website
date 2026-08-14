import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Prefort Consult about a risk assessment, gap analysis, network protection or training engagement.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-24">
      <SectionHeading
        eyebrow="Get in touch"
        title="Tell us what you're dealing with"
        lede="Fill in the form and we'll come back to you — usually within a business day."
      />

      <div className="mt-10 grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <EnquiryForm />

        <aside className="flex flex-col gap-6">
          <div className="rounded-md border border-rule bg-paper-raised p-6">
            <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">
              Other ways to reach us
            </p>
            {SITE.contactEmail ? (
              <p className="mt-3 text-sm text-ink">
                <a href={`mailto:${SITE.contactEmail}`} className="underline underline-offset-2">
                  {SITE.contactEmail}
                </a>
              </p>
            ) : (
              <p className="mt-3 text-sm text-slate">
                Email address pending confirmation — see scope §11, item 5.
              </p>
            )}
            {SITE.whatsappNumber ? (
              <p className="mt-2 text-sm text-ink">
                <a
                  href={`https://wa.me/${SITE.whatsappNumber}`}
                  className="underline underline-offset-2"
                >
                  WhatsApp
                </a>
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate">
                WhatsApp number pending confirmation — see scope §11, item 6.
              </p>
            )}
          </div>

          <div className="rounded-md border border-rule bg-paper-raised p-6">
            <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">
              What happens next
            </p>
            <p className="mt-3 text-sm text-slate">
              We read every enquiry personally. If it&apos;s a good fit, we&apos;ll propose a
              short scoping call — no obligation, no sales pitch.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
