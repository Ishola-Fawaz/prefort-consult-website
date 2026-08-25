import type { Metadata } from "next";
import { DotIcon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Prefort Consult collects, uses and protects personal data, in line with UK GDPR and the Data Protection Act 2018.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-7 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">Legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
        Privacy policy
      </h1>
      <p className="mt-5 text-lg text-slate">
        This policy explains what personal data Prefort Consult collects through this website,
        why, and what rights you have over it under the UK General Data Protection Regulation
        (UK GDPR) and the Data Protection Act 2018.
      </p>

      <div className="mt-10 flex flex-col gap-10 text-sm leading-relaxed text-ink">
        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Who we are</h2>
          <p className="mt-3 text-slate">
            {SITE.registeredName}
            {SITE.companyNumber ? `, company number ${SITE.companyNumber}` : ""}
            {SITE.address ? `, registered office: ${SITE.address}` : ""}. We are the data
            controller for personal data collected through this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">What we collect</h2>
          <p className="mt-3 text-slate">
            When you submit the enquiry form, we collect your name, organisation, work email,
            phone number (if you provide it), the service you selected, and any message you
            write.
          </p>
          <p className="mt-3 text-slate">
            We do not use cookies for advertising or cross-site tracking. Any analytics on this
            site is cookieless and does not identify you individually.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">
            Our lawful basis for processing
          </h2>
          <p className="mt-3 text-slate">
            We process enquiry data under two lawful bases set out in UK GDPR Article 6:
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-slate">
            <li className="flex items-start gap-2">
              <Icon icon={DotIcon} size={16} className="mt-0.5 shrink-0 text-slate" />
              <span>
                <span className="text-ink">Legitimate interests</span> (Article 6(1)(f)) — to
                respond to your enquiry and assess whether we&apos;re a good fit for your
                organisation.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon={DotIcon} size={16} className="mt-0.5 shrink-0 text-slate" />
              <span>
                <span className="text-ink">Consent</span> (Article 6(1)(a)) — where you&apos;ve
                submitted the form, you&apos;ve consented to us contacting you about it. You can
                withdraw this consent at any time by contacting us below.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-slate">
            If you go on to engage us, we process data under our contract with you (Article
            6(1)(b)) to deliver that work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">How long we keep it</h2>
          <p className="mt-3 text-slate">
            We keep enquiry submissions for as long as necessary to respond to you, and if we
            don&apos;t go on to work together for up to 12 months afterwards in case you get
            back in touch, then delete it. Where an enquiry becomes a client engagement, data is
            retained for the duration of that engagement plus any period required by our
            professional, tax or contractual obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Who we share it with</h2>
          <p className="mt-3 text-slate">
            Enquiry data is stored with our database provider and sent via our transactional
            email provider solely to deliver the notification and confirmation emails described
            above. Neither uses your data for their own purposes. We do not sell or rent
            personal data, and we don&apos;t share it with third parties for marketing.
          </p>
          <p className="mt-3 text-slate">
            Some of our service providers may process data outside the UK. Where this happens,
            we rely on the UK&apos;s International Data Transfer Agreement (IDTA), an adequacy
            regulation, or another safeguard recognised under UK GDPR Chapter V to keep your
            data protected to the same standard.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Your rights</h2>
          <p className="mt-3 text-slate">Under UK GDPR, you have the right to:</p>
          <ul className="mt-3 flex flex-col gap-2 text-slate">
            {[
              "Be informed about how your data is used (this policy)",
              "Access the personal data we hold about you",
              "Have inaccurate or incomplete data corrected",
              "Have your data erased, where we're not required to keep it for a legal reason",
              "Restrict or object to how we use your data",
              "Receive your data in a portable format",
              "Withdraw consent at any time, where consent is our lawful basis",
            ].map((right) => (
              <li key={right} className="flex items-start gap-2">
                <Icon icon={CheckmarkCircle01Icon} size={16} className="mt-0.5 shrink-0 text-cleared" />
                {right}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-slate">
            To exercise any of these rights, contact us using the details below. You also have
            the right to lodge a complaint with the Information Commissioner&apos;s Office
            (ICO), the UK&apos;s data protection regulator, at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-2"
            >
              ico.org.uk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Security</h2>
          <p className="mt-3 text-slate">
            This site is served over HTTPS, and enquiry data is transmitted and stored
            encrypted. Access to stored submissions is limited to Prefort staff who need it to
            respond to enquiries, in line with our obligations under the Data Protection Act
            2018 to keep personal data secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Changes to this policy</h2>
          <p className="mt-3 text-slate">
            We&apos;ll update this page if how we handle data changes, and date the update below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Contact</h2>
          {SITE.contactEmail ? (
            <p className="mt-3 text-slate">
              For any question about this policy or your data, contact{" "}
              <a href={`mailto:${SITE.contactEmail}`} className="text-ink underline underline-offset-2">
                {SITE.contactEmail}
              </a>
              , or write to us at {SITE.address}.
            </p>
          ) : (
            <p className="mt-3 text-slate">Write to us at {SITE.address}.</p>
          )}
        </section>
      </div>
    </div>
  );
}
