import Link from "next/link";
import Image from "next/image";
import { FOOTER_COLUMNS, SITE } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const registration = [SITE.registeredName, SITE.rcNumber ? `RC ${SITE.rcNumber}` : null, SITE.address]
    .filter(Boolean)
    .join(" · ");

  return (
    <footer className="border-t border-rule bg-paper-raised">
      <div className="mx-auto max-w-295 px-5 py-16 md:px-7">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
              <Image src="/Logo.png" alt="Prefort Consult" width={40} height={40} className="h-10 w-10" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate">
              Cybersecurity assessment, compliance and training for Nigerian organisations.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">
                {column.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink hover:text-slate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {column.heading === "Contact" && SITE.contactEmail && (
                  <li>
                    <a
                      href={`mailto:${SITE.contactEmail}`}
                      className="text-sm text-ink hover:text-slate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {SITE.contactEmail}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-rule pt-6 text-xs text-slate md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} Prefort Consult. All rights reserved.</p>
          {registration && <p>{registration}</p>}
        </div>
      </div>
    </footer>
  );
}
