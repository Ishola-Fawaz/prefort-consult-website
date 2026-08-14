import { SectionHeading } from "@/components/ui/section-heading";
import { PendingNote } from "@/components/ui/pending-note";
import { Reveal } from "@/components/ui/reveal";
import { PROOF_CONFIRMED, PROOF_ITEMS } from "@/content/proof";

export function Proof() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Evidence" title="Proof" />
        </Reveal>
        {PROOF_CONFIRMED && PROOF_ITEMS.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROOF_ITEMS.map((item, i) => (
              <Reveal
                key={item.description}
                delay={i * 90}
                className="rounded-md border border-rule bg-paper-raised p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md"
              >
                <p className="text-sm text-ink">{item.description}</p>
                <p className="mt-3 text-sm font-medium text-cleared">{item.outcome}</p>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={100} className="mt-10">
            <PendingNote>
              Client evidence is awaiting confirmation from Prefort — named logos where
              permitted, or anonymised descriptions otherwise. See scope §11, item 8.
            </PendingNote>
          </Reveal>
        )}
      </div>
    </section>
  );
}
