import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// script-src needs 'unsafe-inline': Next.js's own hydration/RSC bootstrap
// scripts are inline, and nonce-based strict CSP (the alternative) requires
// every page to opt into dynamic rendering — which conflicts with spec §4 /
// §10's static-generation-everywhere requirement. This matches Next's own
// documented "Without Nonces" CSP guidance for static apps
// (node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
// 'unsafe-eval' is dev-only, for React's source-mapped error stacks.
// Baseline allowlist for Milestone 1 (no analytics/CMS wired yet). Revisit at
// Milestone 6 — add the analytics script origin and any CMS image domain
// before launch, per spec §12.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
