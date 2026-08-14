import Link from "next/link";
import Image from "next/image";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { NAV_ITEMS, SITE } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-60 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-295 items-center justify-between px-5 md:px-7">
        <Link href="/" className="flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          <Image src="/Logo.png" alt="Prefort Consult" width={48} height={48} priority className="h-12 w-12" />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-200 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button as="link" href={SITE.primaryCta.href} size="sm" icon={ArrowRight01Icon}>
            {SITE.primaryCta.label}
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
