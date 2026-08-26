import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { AboutSection } from "@/components/sections/about-section";
import { Credentials } from "@/components/sections/credentials";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Prefort Consult is, the credentials behind the work, and how to reach the company directly.",
};

export default function AboutPage() {
  const registration = [
    SITE.registeredName,
    SITE.companyNumber ? `Company No. ${SITE.companyNumber}` : null,
    SITE.address,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div>
      <AboutSection headingLevel="h1" />

      <Credentials />

      <section>
        <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-20">
          <SectionHeading eyebrow="Company" title="Registration and contact details" />
          <p className="mt-8 text-sm text-ink">{registration}</p>
        </div>
      </section>
    </div>
  );
}
