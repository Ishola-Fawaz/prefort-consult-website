import { SectionHeading } from "@/components/ui/section-heading";
import { PendingNote } from "@/components/ui/pending-note";
import { Reveal } from "@/components/ui/reveal";
import { Avatar } from "@/components/ui/avatar";
import { CREDENTIALS_CONFIRMED, TEAM, YEARS_OPERATING } from "@/content/credentials";

export function Credentials() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Who does the work" title="Credentials and team" />
        </Reveal>
        {CREDENTIALS_CONFIRMED && TEAM.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {TEAM.map((member, i) => (
              <Reveal
                key={member.name}
                delay={i * 90}
                className="rounded-md border border-rule bg-paper-raised p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <Avatar name={member.name} photo={member.photo} variant={i} size={56} />
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-primary">{member.name}</h3>
                    <p className="mt-1 text-sm text-slate">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink">{member.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {member.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="rounded-sm border border-rule px-2 py-1 font-mono text-xs uppercase tracking-[0.09em] text-slate"
                    >
                      {cert}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
            {YEARS_OPERATING &&  (
              <p className="text-sm text-slate md:col-span-2">
                {YEARS_OPERATING} years in operation.
              </p>
            )}
          </div>
        ) : (
          <Reveal delay={100} className="mt-10">
            <PendingNote>
              Team bios, certifications and years in operation are awaiting confirmation from
              Prefort see scope §11, items 2–4. This is the highest-impact gap on the current
              site; it should be filled before launch, not after.
            </PendingNote>
          </Reveal>
        )}
      </div>
    </section>
  );
}
