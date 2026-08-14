import { SectionHeading } from "@/components/ui/section-heading";
import { PendingNote } from "@/components/ui/pending-note";
import { Reveal } from "@/components/ui/reveal";
import { SECTORS, SECTORS_CONFIRMED } from "@/content/sectors";

export function SectorStrip() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Who we work with" title="Sectors served" />
        </Reveal>
        {SECTORS_CONFIRMED && SECTORS.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-3">
            {SECTORS.map((sector, i) => (
              <Reveal
                as="li"
                key={sector.name}
                delay={i * 60}
                className="rounded-sm border border-rule bg-paper-raised px-4 py-2 text-sm text-ink transition-colors hover:border-ink/30"
              >
                {sector.name}
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal delay={100} className="mt-8">
            <PendingNote>
              Sector list awaiting confirmation from Prefort — see scope §11, item 7.
            </PendingNote>
          </Reveal>
        )}
      </div>
    </section>
  );
}
