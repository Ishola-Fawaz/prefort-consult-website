import { cn } from "@/lib/utils";

type Severity = "signal" | "caution" | "cleared";

type TagProps = {
  severity: Severity;
  children: string;
  className?: string;
};

const severityStyles: Record<Severity, string> = {
  signal: "bg-signal-soft text-signal",
  caution: "bg-caution-soft text-caution",
  cleared: "bg-cleared-soft text-cleared",
};

export function Tag({ severity, children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-mono text-xs uppercase tracking-[0.09em]",
        severityStyles[severity],
        className
      )}
    >
      {children}
    </span>
  );
}
