import Link from "next/link";
import type { Metadata } from "next";
import { Home01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-295 flex-1 flex-col items-start justify-center px-5 py-24 md:px-7">
      <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-lg text-slate">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button as="link" href="/" className="mt-8" icon={Home01Icon}>
        Back to home
      </Button>
      <p className="mt-4 text-sm text-slate">
        Or <Link href="/contact" className="text-ink underline underline-offset-2">get in touch</Link>.
      </p>
    </div>
  );
}
