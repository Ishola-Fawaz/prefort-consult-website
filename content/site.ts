export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Training", href: "/training" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_COLUMNS: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  {
    heading: "Offerings",
    links: [
      { label: "Services", href: "/services" },
      { label: "Training", href: "/training" },
    ],
  },
  {
    heading: "Contact",
    links: [{ label: "Get in touch", href: "/contact" }],
  },
];

/**
 * Blocked on client input — scope §11, items 1, 5, 6, 15. Leave null rather
 * than fabricate; components must render nothing for a null field, not a
 * placeholder value. See spec §5.3 on shipping unfilled placeholders.
 */
export const SITE = {
  name: "Prefort Consult",
  primaryCta: { label: "Book an assessment", href: "/contact" },
  contactEmail: null as string | null,
  whatsappNumber: null as string | null,
  registeredName: null as string | null,
  rcNumber: null as string | null,
  address: null as string | null,
};
