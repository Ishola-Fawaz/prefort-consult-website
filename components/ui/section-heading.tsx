import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, lede, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">{title}</h2>
      {lede && <p className="mt-4 text-lg text-slate">{lede}</p>}
    </div>
  );
}
