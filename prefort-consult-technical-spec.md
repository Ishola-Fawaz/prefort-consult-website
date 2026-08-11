# Prefort Consult — Technical Specification

**Project:** prefortconsult.com rebuild
**Companion document:** `prefort-consult-revamp-scope.md` (audit findings, content strategy, client inputs)
**Status:** Pre-build
**Audience:** Developers implementing this build

This document covers implementation. For *why* a decision was made, see the scope document; this one assumes those decisions and says how to execute them.

---

## 1. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js, App Router | Latest stable. Server Components default. |
| Language | TypeScript | `strict: true`. No `any` without a comment justifying it. |
| Styling | Tailwind CSS v4 | CSS-first config via `@theme`. No `tailwind.config.js` unless a plugin forces it. |
| Icons | HugeIcons (React) | Single icon system. No inline one-off SVGs except the logo mark. |
| Fonts | `next/font/google`, self-hosted | Subset, `display: swap`, no external request at runtime. |
| Validation | Zod | Shared schema between client and server. |
| Email | Resend | Transactional only. |
| CMS | **Decision pending** — see §7 | Blocks the blog route only; everything else can proceed. |
| Hosting | Vercel | Edge caching matters for Nigerian latency. |
| Analytics | Plausible or Vercel Analytics | No cookie banner required if cookieless. |

**Verify at install:** HugeIcons package names and the React component API have changed across major versions. Confirm the current import path against the official docs before writing components — do not copy the snippets in §5.4 blindly.

---

## 2. Repository structure

```
prefort/
├── app/
│   ├── layout.tsx                 # Root: fonts, metadata defaults, skip link
│   ├── page.tsx                   # Home
│   ├── globals.css                # @theme tokens + base layer
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx        # Phase 2
│   ├── training/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx        # Phase 2
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   ├── insights/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── api/
│   │   └── enquiry/route.ts       # Contact form handler
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   └── opengraph-image.tsx
├── components/
│   ├── layout/                    # Header, Footer, Nav, MobileNav, SkipLink
│   ├── sections/                  # Hero, Sectors, Services, Process, Team,
│   │                              # Proof, Training, Insights, ContactSection
│   ├── exposure-check/            # See §6
│   └── ui/                        # Button, Card, Field, Tag, SectionHeading, Icon
├── content/
│   ├── services.ts                # Typed constants — not CMS-managed
│   ├── training.ts
│   ├── sectors.ts
│   └── process.ts
├── lib/
│   ├── schemas.ts                 # Zod schemas
│   ├── email.ts                   # Resend wrapper
│   ├── rate-limit.ts
│   ├── seo.ts                     # Metadata + JSON-LD builders
│   └── analytics.ts               # Typed event helpers
├── types/
├── public/
├── middleware.ts                  # Security headers (or next.config)
└── next.config.ts                 # Redirect map
```

**Rule:** service and training copy lives in `content/*.ts` as typed constants, not in JSX. It changes often during client review and shouldn't require touching component files.

---

## 3. Design tokens

Defined once in `globals.css` via Tailwind v4's `@theme`. Every colour, font and radius used anywhere in the app resolves to one of these. No arbitrary hex values in components.

```css
@import "tailwindcss";

@theme {
  /* Surfaces */
  --color-paper: #EFF1EE;
  --color-paper-raised: #F7F8F6;
  --color-rule: #D5D9D3;

  /* Text */
  --color-ink: #14171A;
  --color-slate: #5A6169;

  /* Semantic severity — see rule below */
  --color-signal: #C2321B;        /* exposure, high severity */
  --color-signal-soft: #FBEBE7;
  --color-caution: #8A6A16;       /* partial, medium severity */
  --color-caution-soft: #F7EFDC;
  --color-cleared: #2F6B4F;       /* verified, resolved */
  --color-cleared-soft: #E6EFE9;

  /* Type */
  --font-display: var(--font-archivo);
  --font-body: var(--font-public-sans);
  --font-mono: var(--font-plex-mono);

  --radius-sm: 3px;
  --radius-md: 5px;
}
```

### 3.1 The semantic colour rule

**Non-negotiable.** `signal`, `caution` and `cleared` carry meaning. They are used *only* to communicate severity or state:

- `signal` — exposure, high-severity findings, the highest risk band
- `caution` — partial coverage, medium severity
- `cleared` — verified, resolved, low risk, success states

They must never be used decoratively — not for a hover state, not to brighten a section, not for a heading accent. If a colour is needed for decoration, use the neutrals. The moment red appears on something that isn't a risk, the entire visual system stops meaning anything, and the severity language is the whole point of the design.

Primary actions use `ink`, not `signal`. A call to action is not a warning.

### 3.2 Typography

| Role | Face | Usage |
|---|---|---|
| Display | Archivo, 700–800, tracking `-0.025em` | All headings |
| Body | Public Sans, 400–500 | Paragraphs, lists, form inputs |
| Mono | IBM Plex Mono, 500, uppercase, tracking `0.09em` | Eyebrows, tags, metadata, step numbers, severity labels |

Loaded with `next/font/google` in the root layout, assigned to CSS variables, consumed through `@theme`. Fonts must be self-hosted by the framework — no `<link>` to Google Fonts.

Body base 17px desktop / 16px mobile. Headings scale with `clamp()`.

### 3.3 Layout

- Content max-width: `1180px`, gutter `28px` desktop / `20px` mobile
- Section vertical rhythm: `90px` desktop / `64px` mobile
- Sections separated by a `1px` rule in `--color-rule`, not by whitespace alone

---

## 4. Routing and rendering

| Route | Rendering | Phase |
|---|---|---|
| `/` | Static | 1 |
| `/services` | Static | 1 |
| `/services/[slug]` | Static, generated from `content/services.ts` | 2 |
| `/training` | Static | 1 |
| `/training/[slug]` | Static | 2 |
| `/about` | Static | 1 |
| `/contact` | Static + client form island | 1 |
| `/privacy` | Static | 1 |
| `/insights` | Static, revalidated | 1 (shell) |
| `/insights/[slug]` | Static, revalidated | 2 |
| `/api/enquiry` | Route handler, `runtime: nodejs` | 1 |

No page on this site requires per-request rendering. Anything reaching for SSR needs justification.

**Client boundaries.** Only these are `"use client"`:

- `ExposureCheck` and its children
- `EnquiryForm`
- `MobileNav`

Everything else stays a Server Component. Do not mark a section client just to use an icon — HugeIcons renders fine server-side.

---

## 5. Component specifications

### 5.1 Layout

**`Header`** — sticky, `z-60`, translucent background with backdrop blur, bottom rule. Desktop: logo, five nav items, one primary CTA. Mobile: logo, hamburger, CTA hidden. `MobileNav` is a client component; the shell is not.

**`Footer`** — brand block, three link columns, base bar with company registration details (blocked on client input, see scope §11).

**`SkipLink`** — first focusable element in the DOM, visually hidden until focused.

### 5.2 UI primitives

```ts
Button:         variant: 'primary' | 'ghost'
                size: 'sm' | 'md'
                as: 'button' | 'link'

SectionHeading: eyebrow: string
                title: string
                lede?: string

Tag:            severity: 'signal' | 'caution' | 'cleared'
                children: string

Field:          label, name, type, required?, error?, hint?
```

`Field` must associate `<label htmlFor>` with the input `id`, and wire `aria-describedby` to both hint and error text. This is not optional — see §11.

### 5.3 Sections

Each is a self-contained Server Component reading from `content/*.ts`:

`Hero` · `SectorStrip` · `Services` · `Process` · `Credentials` · `Proof` · `Training` · `Insights` · `ContactSection`

`Credentials` and `Proof` are blocked on client input. Build them behind a flag or with clearly-marked placeholder data — **do not ship placeholder credentials to production.** Shipping unfilled placeholders is the exact failure the current site makes (scope §4.2).

### 5.4 Icon usage

Wrap HugeIcons in a local `Icon` component rather than importing the library directly across the codebase. Keeps the migration cost to one file if the API changes:

```tsx
// components/ui/icon.tsx
import { HugeiconsIcon } from '@hugeicons/react';

export function Icon({ icon, size = 20, className }: IconProps) {
  return <HugeiconsIcon icon={icon} size={size} className={className} strokeWidth={1.8} />;
}
```

Consistent `strokeWidth` across the site. Decorative icons get `aria-hidden="true"`; meaningful ones get an accessible label.

---

## 6. Exposure check — full specification

The signature element. Client component, hero-right on desktop, below the hero copy on mobile.

### 6.1 Data

```ts
type Question = { id: string; weight: number; text: string };

const QUESTIONS: Question[] = [
  { id: 'q1', weight: 3, text: 'Staff share work files over personal email or WhatsApp.' },
  { id: 'q2', weight: 3, text: 'More than one person uses the same admin login.' },
  { id: 'q3', weight: 3, text: "There's no written record of who can access customer data." },
  { id: 'q4', weight: 3, text: 'Backups are never tested — or don\'t exist.' },
  { id: 'q5', weight: 2, text: 'No phishing training in the last 12 months.' },
  { id: 'q6', weight: 2, text: 'Nobody is formally responsible when something goes wrong.' },
];

const MAX_SCORE = 16;
```

### 6.2 Bands

| Score | Band | Colour | Meaning |
|---|---|---|---|
| 0 | Nothing ticked yet | `rule` | Neutral initial state |
| 1–4 | Solid footing | `cleared` | Basics covered; assessment is about evidencing it |
| 5–8 | Partial cover | `caution` | Real gaps, mostly fixable in weeks |
| 9–16 | Exposed | `signal` | How most breaches start |

Band copy lives in `content/exposure-check.ts` alongside the questions.

### 6.3 Behaviour

- Local `useState` only. No global store, no persistence, no `localStorage`.
- Recompute on every change. The set is six items — no memoisation needed.
- Meter width animates to `score / MAX_SCORE`; fill colour transitions with the band.
- CTA below the result routes to `/contact` with the band as a query param, so the form can pre-fill context. **Send the band only — never the individual answers.**

### 6.4 Privacy

Answers stay in browser memory and are never transmitted. This must be **stated visibly on the widget**, not buried in the privacy policy. A security consultancy silently collecting risk-questionnaire answers is a credibility problem waiting to be found.

If lead capture is added later (scope Phase 3), it must be explicit opt-in *after* the result is shown — never a gate before it.

### 6.5 Accessibility

- Real `<input type="checkbox">` elements, visually hidden, custom box styled from the checked state. **No `<div role="checkbox">`.**
- Each wrapped in a `<label>` so the full row is a click target
- Visible focus ring via `:focus-visible`
- Result region: `aria-live="polite"` so screen readers announce band changes
- The band must be distinguishable without colour — the label text carries the meaning, colour only reinforces it

---

## 7. Content model

### 7.1 In-repo (typed constants)

Services, training tracks, sectors and process steps are structural, change rarely, and belong in `content/*.ts`:

```ts
export type Service = {
  slug: string;
  severity: 'signal' | 'caution' | 'cleared';
  tag: string;              // "Start here" | "Compliance" | "Ongoing"
  title: string;
  summary: string;
  deliverable: string;      // Required — see scope §4.1
  detail?: string[];        // Phase 2 detail page
};

export type TrainingTrack = {
  slug: string;
  duration: string;
  audience: string;
  title: string;
  summary: string;
  outcomes: string[];
};
```

`deliverable` is a required field by design. A service that can't state what the client receives shouldn't ship.

### 7.2 CMS — blog only

**Blocked on the client decision in scope §8.3.** Whichever way it lands, isolate it behind `lib/cms.ts` exposing:

```ts
getPosts(): Promise<PostSummary[]>
getPost(slug: string): Promise<Post | null>
getPostSlugs(): Promise<string[]>
```

No component imports a CMS SDK directly. If Prefort chooses MDX now and a CMS in eighteen months, that swap should touch one file.

```ts
type Post = {
  slug: string; title: string; excerpt: string;
  category: string; publishedAt: string;
  author: { name: string; role: string };
  body: unknown;            // Shape depends on CMS choice
  seo?: { title?: string; description?: string };
};
```

Blog routes use `generateStaticParams` with `revalidate`, so publishing doesn't require a redeploy.

---

## 8. Enquiry form — API contract

### 8.1 Schema (`lib/schemas.ts`, shared client and server)

```ts
export const enquirySchema = z.object({
  name:    z.string().min(2).max(100),
  org:     z.string().min(2).max(150),
  email:   z.string().email().max(150),
  phone:   z.string().max(30).optional(),
  service: z.enum([
    'risk-assessment', 'gap-analysis', 'network-protection',
    'training', 'incident', 'unsure',
  ]),
  message: z.string().max(2000).optional(),
  band:    z.enum(['solid', 'partial', 'exposed']).optional(),
  website: z.string().max(0),   // Honeypot — must be empty
});
```

### 8.2 `POST /api/enquiry`

**Success** `200` → `{ ok: true }`
**Validation failure** `400` → `{ ok: false, errors: Record<string, string> }`
**Rate limited** `429` → `{ ok: false, error: 'rate_limited' }`
**Server error** `500` → `{ ok: false, error: 'server_error' }`

Handler sequence:

1. Rate limit by IP — 5 requests per 10 minutes
2. Parse with `enquirySchema`. **Always re-validate server-side.** Client validation is a UX convenience and nothing more.
3. Reject silently with `200` if the honeypot is non-empty — return success so bots don't learn
4. Persist the submission
5. Send notification to Prefort and autoresponder to the enquirer
6. Return

**Email failure must not lose the lead.** Persist first, send second. If Resend is down, the submission still exists.

### 8.3 Client behaviour

- Inline field errors on blur, not on every keystroke
- Submit button disabled with a pending state during the request
- Success replaces the form with a confirmation, not a toast that disappears
- Network failure shows a retry and the fallback email address
- On success, fire the `enquiry_submitted` analytics event

---

## 9. SEO implementation

### 9.1 Metadata

Root `layout.tsx` sets `metadataBase`, a title template, and OpenGraph defaults. Every page exports its own `metadata` — **no page ships with an inherited default title.** Titles under 60 characters, descriptions 140–160.

### 9.2 Structured data

JSON-LD injected via `<script type="application/ld+json">`, built by helpers in `lib/seo.ts`:

- `Organization` + `LocalBusiness` in root layout — requires the registered company details (blocked, scope §11)
- `Service` on each service page
- `Course` on each training page
- `Article` on each blog post
- `BreadcrumbList` on nested routes

### 9.3 Sitemap and robots

`app/sitemap.ts` and `app/robots.ts`, generated — never hand-maintained. Blog URLs pulled from `getPostSlugs()`.

### 9.4 Redirects

`next.config.ts` holds the redirect map from the URL inventory (scope §8.5). **Permanent 301s, not 302s.**

This is a P0 launch blocker. Every URL currently indexed either survives at the same path or redirects to its closest equivalent. Untracked, the domain loses whatever ranking it holds. Build the inventory before cutover, and test the map against it as an automated check.

---

## 10. Performance

**Budget:** Lighthouse performance ≥ 90 · LCP < 2.5s on 4G · CLS < 0.1 · JS on the homepage under ~120KB gzipped.

Nigerian mobile data is the design constraint, not a desktop connection on fibre.

Rules:

- Static generation everywhere; no SSR without justification
- `next/image` for every raster image, explicit dimensions, `priority` only on the hero
- `next/font` — zero external font requests, zero layout shift
- Client JS limited to the three islands in §4
- No third-party embeds. WhatsApp is a plain `<a href="https://wa.me/...">`, not a hosted chat widget. The current site's widget loads on every page for a feature most visitors never touch.
- Any scheduler embed (Cal.com) loads on `/contact` only, lazily, never in the root layout

---

## 11. Accessibility

Target: **WCAG 2.1 AA**. Verified before launch, not after.

- Body text contrast ≥ 4.5:1; large text ≥ 3:1. Check `slate` on `paper` — it is the likeliest failure and may need darkening.
- One `<h1>` per page; no skipped heading levels
- Every interactive element keyboard reachable with a visible `:focus-visible` state
- Skip link as the first focusable element
- All form inputs labelled; errors linked via `aria-describedby` and announced
- Decorative icons `aria-hidden`; meaningful icons labelled
- `prefers-reduced-motion: reduce` disables all transitions and scroll reveals
- Mobile nav traps focus while open, closes on `Escape`, restores focus to the trigger
- **No information conveyed by colour alone** — this matters most in the exposure check bands

---

## 12. Security headers

Set in `middleware.ts` or `next.config.ts` headers:

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: <explicit allowlist>
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

The CSP must be a real allowlist, not `unsafe-inline` everywhere. Test it against the analytics script and any CMS image domain before launch.

This is a cybersecurity firm's own website. A technical buyer *will* check the headers, and it takes about ten seconds. Treat this as a launch blocker, not a nice-to-have.

---

## 13. Analytics

Cookieless, so no consent banner is required. Typed helpers in `lib/analytics.ts`.

Events:

| Event | Fires on |
|---|---|
| `exposure_check_started` | First checkbox interaction |
| `exposure_check_completed` | Score > 0, with band as a property |
| `exposure_check_cta` | CTA click from the result panel |
| `enquiry_submitted` | Successful form submission, with `service` |
| `whatsapp_click` | Any WhatsApp link |
| `booking_click` | Scheduler link |

Primary conversion is `enquiry_submitted`. The exposure check events measure whether the signature element actually earns its build cost.

---

## 14. Environment variables

```
NEXT_PUBLIC_SITE_URL
RESEND_API_KEY
ENQUIRY_NOTIFY_EMAIL
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_ANALYTICS_DOMAIN
CMS_PROJECT_ID          # if CMS chosen
CMS_API_TOKEN           # if CMS chosen
```

`.env.example` committed with keys and no values. Nothing else committed. Anything `NEXT_PUBLIC_` is world-readable — no secrets behind that prefix.

---

## 15. Conventions

- Components `PascalCase.tsx`, everything else `kebab-case.ts`
- Named exports throughout, except Next.js route files which require default
- No `any`; no `@ts-ignore` without an adjacent comment explaining it
- Branches `feat/`, `fix/`, `chore/`; conventional commits
- Every pull request gets a Vercel preview URL — client review happens there, never on production
- Prettier + ESLint enforced in CI

---

## 16. Build order

**Milestone 1 — Foundation.** Project init, tokens in `@theme`, fonts, UI primitives, header, footer, security headers. Deployable shell.

**Milestone 2 — Homepage.** All sections against `content/*.ts` with real copy where available and clearly-marked placeholders where blocked.

**Milestone 3 — Exposure check.** Full spec in §6, including accessibility and the privacy statement.

**Milestone 4 — Forms and pages.** Contact, about, services overview, training overview, privacy. API route, email, rate limiting.

**Milestone 5 — Blog.** Once §7.2 is decided.

**Milestone 6 — Launch.** Redirect map, sitemap, structured data, Lighthouse and accessibility audits, analytics verification, DNS cutover, Search Console.

Milestones 1–4 do not depend on the CMS decision. Only Milestone 5 blocks on it.

---

## 17. Definition of done

A page ships when all of the following hold:

- [ ] Lighthouse ≥ 90 performance, ≥ 95 accessibility, 100 SEO on mobile
- [ ] Exports its own `metadata` with a unique title and description
- [ ] Keyboard-navigable end to end with visible focus
- [ ] Renders correctly at 360px, 768px, 1440px
- [ ] Zero console errors or warnings
- [ ] No placeholder content, no lorem ipsum, no unfilled statistics
- [ ] All copy reviewed and approved by the client
- [ ] Relevant analytics events firing and verified

The sixth item is the one that sank the current site. Enforce it.
