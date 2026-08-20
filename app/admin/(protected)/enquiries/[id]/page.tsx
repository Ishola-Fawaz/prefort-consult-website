import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { getEnquiry } from "@/lib/enquiries";
import { SERVICE_OPTIONS } from "@/lib/schemas";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = { title: "Enquiry" };

function serviceLabel(value: string) {
  return SERVICE_OPTIONS.find((opt) => opt.value === value)?.label ?? value;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-4 md:grid-cols-[10rem_1fr] md:gap-4">
      <dt className="text-xs font-medium uppercase tracking-[0.09em] text-slate">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}

export default async function EnquiryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  const enquiry = await getEnquiry(numericId);

  if (!enquiry) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-7">
      <Link
        href="/admin"
        className="group inline-flex items-center gap-2 text-sm font-medium text-slate transition-colors duration-200 hover:text-ink"
      >
        <Icon
          icon={ArrowLeft01Icon}
          size={16}
          className="shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
        />
        Back to enquiries
      </Link>

      <h1 className="mt-6 text-2xl font-bold tracking-tight text-primary">{enquiry.name}</h1>
      <p className="mt-1 text-sm text-slate">
        {new Date(enquiry.created_at).toLocaleString("en-GB")}
      </p>

      <dl className="mt-8 divide-y divide-rule border-t border-rule">
        <Row label="Organisation" value={enquiry.org} />
        <Row
          label="Email"
          value={
            <a href={`mailto:${enquiry.email}`} className="underline underline-offset-2">
              {enquiry.email}
            </a>
          }
        />
        <Row label="Phone" value={enquiry.phone ?? "—"} />
        <Row label="Service" value={serviceLabel(enquiry.service)} />
        <Row label="Message" value={enquiry.message ?? "—"} />
      </dl>
    </div>
  );
}
