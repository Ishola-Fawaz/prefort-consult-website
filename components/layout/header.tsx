"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { NAV_ITEMS, SITE } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

const HEADER_HEIGHT = 64; // px — matches h-16 below; used to offset the hero observer

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // "Blue" (matching the hero) only while the hero is behind the header, and
  // only on the homepage — every other page has no hero to match, so it
  // stays on the white/paper treatment throughout. heroIntersecting is only
  // ever written from the observer callback (a real subscription); onHero
  // itself is derived at render time, not synced via a second setState.
  const [heroIntersecting, setHeroIntersecting] = useState(true);
  const onHero = isHome && heroIntersecting;

  useEffect(() => {
    if (!isHome) return;

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroIntersecting(entry.isIntersecting),
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      className={`sticky top-0 z-60 border-b transition-colors duration-300 ${
        onHero ? "relative border-transparent bg-primary/90 backdrop-blur" : "border-rule bg-paper"
      }`}
    >
      {onHero && (
        <div aria-hidden="true" className="bg-report-grid-header pointer-events-none absolute inset-0" />
      )}
      <div className="relative mx-auto flex h-16 max-w-295 items-center justify-between px-5 md:px-7">
        <Link
          href="/"
          className={`flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 ${
            onHero ? "focus-visible:outline-paper" : "focus-visible:outline-ink"
          }`}
        >
          <Image
            src={onHero ? "/Logo-white.png" : "/Logo.png"}
            alt="Prefort Consult"
            width={48}
            height={48}
            priority
            unoptimized={onHero}
            className="h-12 w-12"
          />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                onHero
                  ? "text-paper focus-visible:outline-paper"
                  : "text-ink focus-visible:outline-ink"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-200 ease-out group-hover:w-full ${
                  onHero ? "bg-paper" : "bg-ink"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            as="link"
            href={SITE.primaryCta.href}
            size="sm"
            icon={ArrowRight01Icon}
            className={onHero ? "bg-paper text-primary hover:bg-paper/90" : undefined}
          >
            {SITE.primaryCta.label}
          </Button>
        </div>

        <MobileNav inverse={onHero} />
      </div>
    </header>
  );
}
