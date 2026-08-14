"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps<T extends React.ElementType> = {
  /** Element to render as — defaults to "div". Use "li" inside lists, etc. */
  as?: T;
  /** Stagger delay in ms, applied only once the element is visible. */
  delay?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "delay">;

/**
 * Fades and lifts children into place the first time they cross into the
 * viewport. Falls back to fully visible, no animation, if IntersectionObserver
 * is unavailable. `prefers-reduced-motion` is handled globally in
 * globals.css, which collapses the transition duration to ~0.
 */
export function Reveal<T extends React.ElementType = "div">({
  as,
  className,
  delay = 0,
  style,
  children,
  ...props
}: RevealProps<T>) {
  const Tag = (as ?? "div") as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  // Must match between server and client render, so this can't read
  // `typeof IntersectionObserver` (undefined during SSR, defined in the
  // browser) — that mismatch is what causes a hydration warning.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer to synchronize with on this browser — reveal on the
      // next tick rather than mid-effect, so content isn't stuck hidden.
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -64px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        "reveal transition duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
