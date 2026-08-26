import Image from "next/image";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

type AboutSectionProps = {
  /** The homepage already has its own <h1> (Hero) — this section must not add a second one. */
  headingLevel?: "h1" | "h2";
  /** Shown only on the homepage, pointing through to the full About page. */
  showLink?: boolean;
};

export function AboutSection({ headingLevel = "h2", showLink = false }: AboutSectionProps) {
  const Heading = headingLevel;

  return (
    <section className="border-b border-rule">
      <div className="mx-auto grid max-w-295 gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:gap-12 md:px-7 md:py-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">About</p>
          <Heading className="mt-4 text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Assessment, not theatre.
          </Heading>
          <p className="mt-5 max-w-lg text-lg text-slate">
            Prefort Consult runs risk assessments, closes compliance gaps and trains staff for
            organisations operating in the UK. The output of every engagement is something
            written down a register, a report, a closure statement not a slide deck.
          </p>
          {showLink && (
            <div className="mt-6">
              <Button as="link" href="/about" variant="ghost" size="sm" icon={ArrowRight01Icon}>
                More about us
              </Button>
            </div>
          )}
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
    </section>
  );
}
