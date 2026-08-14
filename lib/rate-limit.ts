const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

// Best-effort, in-memory rate limiting — fine for a single warm serverless
// instance, resets on cold start. Upgrade to a shared store only if abuse
// becomes real (scope §4.3: "add a challenge only if spam becomes a real
// problem" — same reasoning applies here).
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);
  return false;
}
