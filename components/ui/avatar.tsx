import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  photo?: string;
  /** Picks a cartoon style/palette when there's no photo. Cycles through CARTOONS. */
  variant?: number;
  size?: number;
  className?: string;
};

// Flat, brand-toned cartoon busts — used until real team photos are
// supplied via the `photo` field. Hair shape is the only thing that varies
// between them; deliberately abstract rather than depicting a specific
// likeness, since these placeholder entries don't map to real photographed
// people yet.
const CARTOONS = [
  { bg: "#DCEBF7", fg: "#015CA3", hair: "short" as const },
  { bg: "#E6EFE9", fg: "#2F6B4F", hair: "wavy" as const },
  { bg: "#F7EFDC", fg: "#8A6A16", hair: "bun" as const },
  { bg: "#EAECEA", fg: "#5A6169", hair: "short" as const },
];

function CartoonBust({ fg, hair }: { fg: string; hair: "short" | "wavy" | "bun" }) {
  return (
    <>
      {/* shoulders */}
      <path d="M6 58c0-13.8 11.6-23 26-23s26 9.2 26 23" fill={fg} />
      {/* head */}
      <circle cx="32" cy="27" r="13" fill={fg} />
      {/* hair */}
      {hair === "short" && (
        <path
          d="M19 24a13 13 0 0 1 26 0c-3.5-2.2-8.3-3.6-13-3.6s-9.5 1.4-13 3.6z"
          fill="#fff"
          opacity="0.35"
        />
      )}
      {hair === "wavy" && (
        <path
          d="M17.5 27c-1-7.8 4.9-15.6 14.5-15.6S47.5 19.2 46.5 27c-1.6-1-2.8-3-3-5.4-2 2.6-5.2 4.4-8.8 4.9 1.6-1.4 2.6-3.2 2.9-5.2-2.6 2.6-6.6 4.2-11 4.2-1.2 2-2.7 3.6-4.4 4.7-.2-1-.4-2.1-.7-3.2z"
          fill="#fff"
          opacity="0.35"
        />
      )}
      {hair === "bun" && (
        <>
          <path
            d="M19 24a13 13 0 0 1 26 0c-3.5-2.2-8.3-3.6-13-3.6s-9.5 1.4-13 3.6z"
            fill="#fff"
            opacity="0.35"
          />
          <circle cx="32" cy="11" r="4.5" fill="#fff" opacity="0.35" />
        </>
      )}
    </>
  );
}

export function Avatar({ name, photo, variant = 0, size = 56, className }: AvatarProps) {
  const style = { width: size, height: size };

  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={size}
        height={size}
        style={style}
        className={cn("shrink-0 rounded-full object-cover", className)}
      />
    );
  }

  const { bg, fg, hair } = CARTOONS[variant % CARTOONS.length];

  return (
    <svg
      viewBox="0 0 64 64"
      style={style}
      role="img"
      aria-label={name}
      className={cn("shrink-0 rounded-full", className)}
    >
      <circle cx="32" cy="32" r="32" fill={bg} />
      <CartoonBust fg={fg} hair={hair} />
    </svg>
  );
}
