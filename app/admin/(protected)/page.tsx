import Link from "next/link";
import type { Metadata } from "next";
import { listEnquiries } from "@/lib/enquiries";
import { SERVICE_OPTIONS } from "@/lib/schemas";

export const metadata: Metadata = { title: "Enquiries" };

function serviceLabel(value: string) {
  return SERVICE_OPTIONS.find((opt) => opt.value === value)?.label ?? value;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminDashboardPage() {
  const enquiries = await listEnquiries();

  return (
    <div className="mx-auto max-w-295 px-5 py-10 md:px-7">
      <h1 className="text-2xl font-bold tracking-tight text-primary">Enquiries</h1>
      <p className="mt-1 text-sm text-slate">
        {enquiries.length} submission{enquiries.length === 1 ? "" : "s"}
      </p>

      {enquiries.length === 0 ? (
        <p className="mt-8 text-sm text-slate">No submissions yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-md border border-rule">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-raised text-xs uppercase tracking-[0.09em] text-slate">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Organisation</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-paper-raised">
                  <td className="whitespace-nowrap px-4 py-3 text-slate">
                    {formatDate(enquiry.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/enquiries/${enquiry.id}`}
                      className="font-medium text-ink underline-offset-2 hover:underline"
                    >
                      {enquiry.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate">{enquiry.org}</td>
                  <td className="px-4 py-3 text-slate">{serviceLabel(enquiry.service)}</td>
                  <td className="px-4 py-3 text-slate">{enquiry.email}</td>
                  <td className="max-w-70 truncate px-4 py-3 text-slate" title={enquiry.message ?? undefined}>
                    {enquiry.message ? (
                      <Link href={`/admin/enquiries/${enquiry.id}`} className="hover:underline">
                        {enquiry.message}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
