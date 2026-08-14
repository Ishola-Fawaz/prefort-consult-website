type AnalyticsEvent =
  | { name: "enquiry_submitted"; service: string }
  | { name: "whatsapp_click" }
  | { name: "booking_click" };

type Plausible = (name: string, options?: { props?: Record<string, unknown> }) => void;

// No-op until the analytics script is wired up in Milestone 6 — calling
// track() ahead of that is safe and keeps event call sites stable.
export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const plausible = (window as typeof window & { plausible?: Plausible }).plausible;
  if (!plausible) return;

  const { name, ...props } = event;
  plausible(name, Object.keys(props).length ? { props } : undefined);
}
