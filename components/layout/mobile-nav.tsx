"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { NAV_ITEMS, SITE } from "@/content/site";
import { cn } from "@/lib/utils";

export function MobileNav({ inverse = false }: { inverse?: boolean }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) triggerRef.current?.focus();
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;
    document.body.style.overflow = "hidden";

    const focusable = panelRef.current
      ? Array.from(
          panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        )
      : [];
    focusable[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2",
          inverse ? "text-paper focus-visible:outline-paper" : "text-ink focus-visible:outline-ink"
        )}
      >
        <HugeiconsIcon icon={Menu01Icon} size={24} strokeWidth={1.8} aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-70">
            <div
              className="absolute inset-0 bg-ink/40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              ref={panelRef}
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="absolute right-0 top-0 flex h-full w-full max-w-xs flex-col bg-paper-raised p-6 shadow-xl"
            >
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={24} strokeWidth={1.8} aria-hidden="true" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-sm px-3 py-3 text-lg font-medium text-ink hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                href={SITE.primaryCta.href}
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-base font-medium text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {SITE.primaryCta.label}
              </Link>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
