import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Risk assessment, gap analysis, vulnerability assessment and network protection for UK organisations each with a stated deliverable.",
};

const SERVICE_IMAGES: Record<string, string> = {
  "risk-assessment": "/risk.jpg",
  "gap-analysis": "/gap.jpg",
  "vulnerability-assessment": "/Vulnerability-assessment.jpg",
  "network-protection": "/network.jpg",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-24">
      <SectionHeading
        eyebrow="What we do"
        title="Services"
        lede="Consulting first. Every engagement ends with something written down not a category description, a deliverable."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SERVICES.map((service) => (
          <Card key={service.slug} className="group flex flex-col p-0">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={SERVICE_IMAGES[service.slug]}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <Tag severity={service.severity} className="absolute left-4 top-4">
                {service.tag}
              </Tag>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-bold tracking-tight text-primary">{service.title}</h2>
              <p className="mt-3 flex-1 text-sm text-slate">{service.summary}</p>
              <div className="mt-5 border-t border-rule pt-4">
                <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">
                  You receive
                </p>
                <p className="mt-1 text-sm text-ink">{service.deliverable}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10 flex items-center gap-4">
        <p className="text-sm text-slate">Not sure which one you need?</p>
        <Button as="link" href="/contact" variant="ghost" size="sm" icon={ArrowRight01Icon}>
          Get in touch
        </Button>
      </div>
    </div>
  );
}
