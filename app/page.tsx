import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about-section";
import { SectorStrip } from "@/components/sections/sector-strip";
import { Services } from "@/components/sections/services";
import { Credentials } from "@/components/sections/credentials";
import { Training } from "@/components/sections/training";
import { Insights } from "@/components/sections/insights";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Cybersecurity risk assessment, gap analysis and training for UK organisations.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection showLink />
      <SectorStrip />
      <Services />
      <Credentials />
      <Training />
      <Insights />
      <ContactSection />
    </>
  );
}
