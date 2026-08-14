import Link from "next/link";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

type Variant = "primary" | "ghost";
type Size = "sm" | "md";

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Decorative trailing icon. Nudges right on hover. */
  icon?: IconSvgElement;
};

type ButtonAsButton = SharedProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    as?: "button";
  };

type ButtonAsLink = SharedProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children"> & {
    as: "link";
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary: "bg-primary text-paper hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none",
  ghost: "border border-rule bg-transparent text-ink hover:border-ink/30 hover:bg-paper-raised hover:-translate-y-0.5 active:translate-y-0",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  as = "button",
  className,
  children,
  icon,
  ...props
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-sm font-medium transition duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {children}
      {icon && (
        <Icon
          icon={icon}
          size={size === "sm" ? 16 : 18}
          className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (as === "link") {
    const { href, ...rest } = props as Omit<React.ComponentProps<typeof Link>, "className" | "children">;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
