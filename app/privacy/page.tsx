import type { Metadata } from "next";
import { PendingNote } from "@/components/ui/pending-note";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Prefort Consult collects, uses and protects personal data, under the Nigeria Data Protection Act (NDPA).",
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
        why, and what rights you have over it under the Nigeria Data Protection Act 2023
        (NDPA).
      </p>

      <div className="mt-10 flex flex-col gap-10 text-sm leading-relaxed text-ink">
        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Who we are</h2>
          {SITE.registeredName ? (
            <p className="mt-3 text-slate">
              {SITE.registeredName}
              {SITE.rcNumber ? `, RC ${SITE.rcNumber}` : ""}
              {SITE.address ? `, ${SITE.address}` : ""}.
            </p>
          ) : (
            <div className="mt-3">
              <PendingNote>
                Registered company name, RC number and business address are awaiting
                confirmation from Prefort — see scope §11, item 1. This section cannot be
                finalised until they&apos;re supplied.
              </PendingNote>
            </div>
          )}
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
          <h2 className="text-xl font-bold tracking-tight text-primary">Why we collect it</h2>
          <p className="mt-3 text-slate">
            We process enquiry data to respond to your request, assess whether we&apos;re a
            good fit for your organisation, and — if you engage us — to deliver that work. This
            is a legitimate interest in operating a consulting business, and where you&apos;ve
            submitted the form, your consent to be contacted about it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">How long we keep it</h2>
          <div className="mt-3">
            <PendingNote>
              Retention period for enquiry submissions is a policy decision for Prefort to
              confirm — we hold data only as long as necessary to respond and maintain
              reasonable business records, and this section will state a specific period once
              agreed.
            </PendingNote>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Who we share it with</h2>
          <p className="mt-3 text-slate">
            Enquiry data is stored with our database provider and sent via our transactional
            email provider solely to deliver the notification and confirmation emails
            described above. Neither uses your data for their own purposes. We do not sell or
            rent personal data, and we don&apos;t share it with third parties for marketing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Your rights under the NDPA</h2>
          <p className="mt-3 text-slate">You can ask us to:</p>
          <ul className="mt-3 flex flex-col gap-2 text-slate">
            <li>— Confirm what personal data we hold about you and provide a copy of it</li>
            <li>— Correct inaccurate or incomplete data</li>
            <li>— Delete your data, where we&apos;re not required to keep it for a legal reason</li>
            <li>— Stop using your data for a particular purpose</li>
          </ul>
          <p className="mt-3 text-slate">
            You can also lodge a complaint with the Nigeria Data Protection Commission (NDPC)
            if you believe we&apos;ve handled your data improperly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Security</h2>
          <p className="mt-3 text-slate">
            This site is served over HTTPS, and enquiry data is transmitted and stored
            encrypted. Access to stored submissions is limited to Prefort staff who need it to
            respond to enquiries.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight text-primary">Changes to this policy</h2>
          <p className="mt-3 text-slate">
            We&apos;ll update this page if how we handle data changes, and date the update
            below.
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
              .
            </p>
          ) : (
            <div className="mt-3">
              <PendingNote>
                A working contact email for privacy requests is awaiting confirmation from
                Prefort — see scope §11, item 5.
              </PendingNote>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
