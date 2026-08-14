import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

type IconProps = {
  icon: IconSvgElement;
  size?: number;
  className?: string;
  /** Accessible label. Omit for decorative icons — they render aria-hidden. */
  label?: string;
};

export function Icon({ icon, size = 20, className, label }: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      className={className}
      strokeWidth={1.8}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
