import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-primary">
      <div aria-hidden="true" className="bg-report-grid-inverse pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-215 px-5 py-20 text-center md:px-7 md:py-28">
        {/* <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.09em] text-paper/70">
          Cybersecurity consulting, United Kingdom
        </p> */}
        <h1
          className="animate-fade-up mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-paper md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Know where you&apos;re exposed before someone else finds out for you.
        </h1>
        <p
          className="animate-fade-up mx-auto mt-5 max-w-xl text-lg text-paper/75"
          style={{ animationDelay: "160ms" }}
        >
          Prefort Consult runs risk assessments, closes compliance gaps and trains your
          people then hands you a written record of what was found and what was fixed.
        </p>
        <div
          className="animate-fade-up mt-8 flex flex-wrap justify-center gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <Button
            as="link"
            href="/contact"
            icon={ArrowRight01Icon}
            className="bg-paper text-primary hover:bg-paper/90"
          >
            Book an assessment
          </Button>
          <Button
            as="link"
            href="/services"
            variant="ghost"
            icon={ArrowRight01Icon}
            className="border-paper/30 text-paper hover:border-paper/50 hover:bg-paper/10"
          >
            See our services
          </Button>
        </div>
      </div>
    </section>
  );
}
