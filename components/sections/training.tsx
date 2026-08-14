import Image from "next/image";
import { ArrowRight01Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { TRAINING_TRACKS } from "@/content/training";

const TRACK_IMAGES: Record<string, string> = {
  awareness: "/cloud-architect.jpg",
  "incident-response": "/cyber-training.jpg",
  "executive-briefing": "/techniques.jpg",
};

export function Training() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Corporate training"
            title="Train your team, not just your policy"
            lede="Delivered on-site or remote to your staff, IT leads and leadership — not an open-enrolment course."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TRAINING_TRACKS.map((track, i) => (
            <Reveal key={track.slug} delay={i * 90}>
              <Card className="group flex h-full flex-col p-0">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={TRACK_IMAGES[track.slug]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/35 mix-blend-multiply" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">
                    {track.audience}
                  </p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-primary">{track.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-slate">{track.summary}</p>
                  <ul className="mt-4 flex flex-col gap-2 border-t border-rule pt-4">
                    {track.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-ink">
                        <Icon
                          icon={CheckmarkCircle01Icon}
                          size={16}
                          className="mt-0.5 shrink-0 text-cleared"
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs italic text-slate">{track.duration}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Button as="link" href="/training" variant="ghost" icon={ArrowRight01Icon}>
            Book training for your team
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
