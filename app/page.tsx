import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SectorStrip } from "@/components/sections/sector-strip";
import { Services } from "@/components/sections/services";
import { Credentials } from "@/components/sections/credentials";
import { Training } from "@/components/sections/training";
import { Insights } from "@/components/sections/insights";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Cybersecurity risk assessment, gap analysis and training for Nigerian organisations.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <SectorStrip />
      <Services />
      <Credentials />
      <Training />
      <Insights />
      <ContactSection />
    </>
  );
}
