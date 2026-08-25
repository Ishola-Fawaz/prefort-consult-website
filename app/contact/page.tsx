import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { EnquiryForm } from "@/components/forms/enquiry-form";

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
        lede="Fill in the form and we'll come back to you usually within a business day."
      />

      <div className="mt-10">
        <EnquiryForm />
      </div>
    </div>
  );
}
