import type { Metadata } from "next";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the Prefort Consult website.",
};

export default function TermsPage() {
  const registration = [
    SITE.registeredName,
    SITE.companyNumber ? `company number ${SITE.companyNumber}` : null,
    SITE.address ? `registered office: ${SITE.address}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-7 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">Legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
        Terms &amp; conditions
      </h1>
      <p className="mt-5 text-lg text-slate">
        These terms govern your use of this website. They don&apos;t cover the terms of any
        consulting engagement those are set out in a separate agreement signed before work
        begins.
      </p>

      <div className="mt-10 flex flex-col gap-10 text-sm leading-relaxed text-ink">
        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Who we are</h2>
          <p className="mt-3 text-slate">
            This website is operated by {registration}. References to &quot;we&quot;,
            &quot;us&quot; or &quot;Prefort&quot; mean {SITE.registeredName}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Acceptance of terms</h2>
          <p className="mt-3 text-slate">
            By using this website, you accept these terms in full. If you disagree with any
            part of them, please don&apos;t use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">
            Use of this website
          </h2>
          <p className="mt-3 text-slate">
            You may browse this site and submit the enquiry form for legitimate business
            purposes. You must not:
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-slate">
            {[
              "Use the site in any way that breaches applicable law or regulation",
              "Attempt to gain unauthorised access to the site, our systems or any data",
              "Submit the enquiry form with false, misleading or malicious content, or attempt to disrupt it through automated means",
              "Reproduce, copy or exploit any part of this site for commercial purposes without our written permission",
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <Icon icon={CancelCircleIcon} size={16} className="mt-0.5 shrink-0 text-signal" />
                {rule}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Intellectual property</h2>
          <p className="mt-3 text-slate">
            Unless otherwise stated, the content on this site text, graphics, logos and
            design belongs to {SITE.registeredName} and is protected by copyright and
            trademark law. You may view and print pages for personal, non commercial reference,
            but may not otherwise copy, redistribute or republish content without our
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">No professional advice</h2>
          <p className="mt-3 text-slate">
            Content on this site including service descriptions, insights articles and
            training summaries is general information, not professional advice tailored to
            your organisation. It should not be relied on as a substitute for a formal risk
            assessment, gap analysis or other engagement scoped to your specific circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Third-party links</h2>
          <p className="mt-3 text-slate">
            This site may link to third-party websites (for example, WhatsApp). We&apos;re not
            responsible for the content, accuracy or practices of any site we don&apos;t
            operate, and linking to it doesn&apos;t imply endorsement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Availability</h2>
          <p className="mt-3 text-slate">
            We aim to keep this site available, but don&apos;t guarantee uninterrupted or
            error free access, and may suspend, withdraw or restrict access to all or part of it
            without notice for example, for maintenance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">
            Limitation of liability
          </h2>
          <p className="mt-3 text-slate">
            To the extent permitted by law, {SITE.registeredName} accepts no liability for any
            loss or damage arising from your use of this website, or reliance on its content,
            except for liability that cannot be excluded by law including death or personal
            injury caused by our negligence, or fraud.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Changes to these terms</h2>
          <p className="mt-3 text-slate">
            We may update these terms from time to time. Continued use of the site after a
            change means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Governing law</h2>
          <p className="mt-3 text-slate">
            These terms are governed by the law of England and Wales. Any dispute arising from
            them is subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Contact</h2>
          {SITE.contactEmail ? (
            <p className="mt-3 text-slate">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${SITE.contactEmail}`} className="text-ink underline underline-offset-2">
                {SITE.contactEmail}
              </a>
              , or by post to {SITE.address}.
            </p>
          ) : (
            <p className="mt-3 text-slate">Write to us at {SITE.address}.</p>
          )}
        </section>
      </div>
    </div>
  );
}
