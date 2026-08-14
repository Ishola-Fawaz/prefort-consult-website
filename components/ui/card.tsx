import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-rule bg-paper-raised p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
