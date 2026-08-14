import Image from "next/image";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SERVICES } from "@/content/services";

const SERVICE_IMAGES: Record<string, string> = {
  "risk-assessment": "/risk.jpg",
  "gap-analysis": "/gap.jpg",
  "vulnerability-assessment": "/Vulnerability-assessment.jpg",
  "network-protection": "/network.jpg",
};

export function Services() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Services"
            lede="Consulting first. Every engagement ends with something written down not a category description, a deliverable."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 90}>
              <Card className="group flex h-full flex-col p-0">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[service.slug]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/35 mix-blend-multiply" />
                  <Tag severity={service.severity} className="absolute left-4 top-4">
                    {service.tag}
                  </Tag>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight text-primary">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-slate">{service.summary}</p>
                  <div className="mt-5 border-t border-rule pt-4">
                    <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">
                      You receive
                    </p>
                    <p className="mt-1 text-sm text-ink">{service.deliverable}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Button as="link" href="/contact" variant="ghost" icon={ArrowRight01Icon}>
            Book our service
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
