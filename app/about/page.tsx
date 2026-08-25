import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
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
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-295 gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:gap-12 md:px-7 md:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">About</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary md:text-5xl">
              Assessment, not theatre.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate">
              Prefort Consult runs risk assessments, closes compliance gaps and trains staff for
              organisations operating in the UK. The output of every engagement is something
              written down a register, a report, a closure statement not a slide deck.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-rule">
            <Image
              src="/About-us.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

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
