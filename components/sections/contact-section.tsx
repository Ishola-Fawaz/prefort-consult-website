import Image from "next/image";
import { ArrowRight01Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/content/site";

export function ContactSection() {
  return (
    <section>
      <div className="mx-auto grid max-w-295 gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:gap-12 md:px-7 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Get in touch"
            title="Talk to us about what you're dealing with"
            lede="Tell us where things stand and we'll tell you what an engagement would look like."
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Button as="link" href="/contact" icon={ArrowRight01Icon}>
              Send an enquiry
            </Button>
            {SITE.whatsappNumber && (
              <Button
                as="link"
                href={`https://wa.me/${SITE.whatsappNumber}`}
                variant="ghost"
                icon={WhatsappIcon}
              >
                WhatsApp us
              </Button>
            )}
          </div>
        </Reveal>
        <Reveal
          delay={120}
          className="group relative aspect-4/3 overflow-hidden rounded-md border border-rule"
        >
          <Image
            src="/About-us.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
}
