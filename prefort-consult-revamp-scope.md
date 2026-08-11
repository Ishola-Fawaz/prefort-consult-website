# Prefort Consult — Website Revamp
### Audit findings and scope of work

**Site reviewed:** https://prefortconsult.com/
**Date of review:** 11 August 2026
**Prepared by:** Ishola Fawaz 
**Status:** Pre-build. This document defines what changes and why. No code has been written against it yet.

---

## 1. Purpose of this document

This is the agreed scope before design and development begin. It covers three things:

1. **What's wrong with the current site** — findings from review, with severity.
2. **What the new site should do differently** — structure, content, and functionality.
3. **What Prefort needs to supply** — the information and assets that can't be written by a developer.

Anything listed under *Client inputs required* (Section 11) blocks the build. Everything else can proceed once this document is approved.

---

## 2. Review scope and limitations

Reviewed: the public homepage and its visible content and structure.

Not yet reviewed, and required before final estimates:

- Admin / CMS access (the site appears to run on WordPress, with a third-party support-chat plugin — to be confirmed)
- Hosting environment, current plan, and renewal dates
- Domain and DNS control
- Analytics — whether any is installed, and historical traffic
- Google Search Console access
- Existing blog archive beyond the three posts surfaced on the homepage
- Any existing brand assets: logo files, colour specification, typefaces

**Assumption to verify:** the current site is a purchased WordPress theme with placeholder content that was never fully replaced. Several findings below follow from this.

---

## 3. Executive summary of findings

The site communicates that Prefort Consult exists and works in cybersecurity. It does not communicate who it is for, what it has done, or what a buyer receives — and it gives a visitor no way to act other than starting a WhatsApp chat.

Four issues account for most of the lost value:

| # | Issue | Impact |
|---|---|---|
| 1 | The site sells two different businesses at once — a training academy and a consulting firm — with no hierarchy between them | Visitors can't tell what Prefort primarily does |
| 2 | Unfilled template placeholders are visible on the live site, including an empty statistics block | Directly undermines credibility in a trust-led sector |
| 3 | No proof of any kind — no credentials, no clients, no sectors, no case outcomes | Highest-impact gap for a security consultancy |
| 4 | The only conversion path is a WhatsApp button | Every visitor not ready to chat right now is lost |

---

## 4. Detailed findings

Severity key: **P0** blocks launch · **P1** fix during build · **P2** improve after launch

### 4.1 Positioning and messaging

**P0 — The site has no stated audience.**
Nothing on the page says who Prefort serves. "People" and "companies" is not an audience. A hospital administrator, a fintech compliance officer and a school proprietor have completely different fears, and none of them will see themselves on the current page.
→ *Fix:* Name the sectors served explicitly and near the top of the page.

**P0 — Training and consulting compete for the same space.**
"Popular Courses" and "Our Latest Course" sit directly above "Our Featured Services." Neither is framed as the primary offer.
→ *Fix:* Lead with consulting (assessment, gap analysis, protection). Give training its own clearly separated section and, later, its own page. They are different buying decisions made by different people.

**P1 — Service descriptions describe the category, not the offer.**
The current copy explains what a risk assessment *is* in general terms. It does not say what Prefort does, how long it takes, or what the client ends up holding.
→ *Fix:* Every service states a concrete deliverable — a ranked risk register, a control-by-control gap report, a closure statement. Consultancies are bought on deliverables.

**P1 — One service description is visibly truncated.**
The risk assessment paragraph ends mid-sentence with an ellipsis, apparently pasted from a longer source.
→ *Fix:* Rewrite in full, in Prefort's own words.

**P1 — Copy appears to be adapted from generic sources.**
Several passages read as standard framework boilerplate rather than original writing. Beyond the credibility cost, unattributed reuse is a legal exposure that a security and compliance firm can't afford.
→ *Fix:* All body copy rewritten as original. Where a standard is referenced (ISO 27001, NDPA, PCI DSS), cite it properly.

**P2 — Unverifiable quotation on the homepage.**
The site attributes a line about information finding its way to the wrong places to "Dexter Hawk." No credible source for this could be located.
→ *Fix:* Remove it. If a quote is wanted, use an attributable one, or write an original line.

### 4.2 Credibility and proof

**P0 — The statistics block is empty.**
Four labels — trainings delivered, customers globally, experts, available programmes — appear with no numbers against them. A visitor reads this as an unfinished site or an inflated claim that couldn't be substantiated.
→ *Fix:* Either populate with real, defensible figures, or remove the block entirely and replace it with something true. Recommendation: remove and replace with a named sector list. A real list beats an empty counter.

**P0 — No credentials are displayed anywhere.**
For a cybersecurity consultancy this is the single largest gap. Buyers in this market check for certifications before they check anything else.
→ *Fix:* Display the certifications held (CISSP, CISM, CEH, ISO 27001 Lead Auditor, or whatever applies), the years in operation, and any relevant registrations or memberships.

**P0 — No named people.**
Security is bought from people, not from logos. There is currently no way to know who would turn up to do the work.
→ *Fix:* A team section with at least the principal consultant — name, photograph, certifications, background. This is typically the highest-converting element on a page of this type.

**P1 — No client evidence.**
No logos, testimonials, sectors, or anonymised outcomes.
→ *Fix:* Where NDAs prevent naming clients, use anonymised descriptions ("a Lagos-based microfinance bank, 40 staff") plus the outcome. This is standard practice in the field and entirely acceptable.

**P1 — No physical address or company registration.**
→ *Fix:* Add the registered business name, RC number, and city. Corporate buyers check this before engaging.

### 4.3 Conversion and lead capture

**P0 — No contact form and no email address.**
The only route to contact is a WhatsApp widget. That suits an informal enquiry and actively repels a compliance officer at a bank.
→ *Fix:* A proper enquiry form capturing name, organisation, work email, service needed, and free text. Keep WhatsApp as a secondary option, not the only one.

**P1 — No lead magnet.**
There is nothing for a visitor who is interested but not ready to talk.
→ *Fix (recommended):* An interactive self-assessment — a short set of yes/no questions that returns a risk band. It demonstrates the service, requires no sales conversation, and captures an email at the point the visitor is most engaged. This doubles as the site's most distinctive feature.

**P1 — No calls to action in the page body.**
The service and blog sections dead-end.
→ *Fix:* A clear next step after every major section.

**P2 — No calendar booking option.**
→ *Fix:* Add a scheduling link (Cal.com or Calendly) for a scoping call.

### 4.4 Content and blog

**P1 — Blog posts are truncated fragments with no dates, authors, or full articles behind them.**
→ *Fix:* Confirm whether full posts exist. If not, either write them properly or remove the section until there's something to link to. A blog section that leads nowhere is worse than no blog.

**P1 — No compliance content, despite it being the strongest available hook.**
The Nigeria Data Protection Act and the NDPC's enforcement activity give Nigerian organisations a concrete, dated reason to act. The site doesn't mention it. Sector-specific requirements — the CBN risk-based cybersecurity framework for banks and OFIs, PCI DSS for anyone touching card data — are equally absent.
→ *Fix:* Build a content pillar around Nigerian regulatory obligations. This is the clearest differentiator available and it maps directly to search demand.

**P2 — No resources or downloads.**
→ *Fix (later phase):* A downloadable checklist or breach-response one-pager, gated behind an email.

### 4.5 Technical

The existing site is a purchased WordPress theme. It is being **replaced**, not patched — see Section 7 for the new stack. The findings below are therefore stated as requirements for the new build, plus what must be carried across from the old one.

- **P0 — Confirm HTTPS is valid** on the new deployment and that http:// redirects to https://. Non-negotiable for this sector.
- **P0 — Security headers** set at the edge: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy. A security firm whose own headers are missing will be noticed, and it is the first thing a technical buyer checks.
- **P0 — URL preservation.** Every existing indexed URL on the WordPress site must either survive or 301 to its closest equivalent. Losing them silently discards whatever ranking the domain currently holds. A full URL inventory is required before cutover.
- **P1 — Performance budget.** Target Lighthouse performance 90+, largest contentful paint under 2.5s on a 4G connection. Most Nigerian visitors arrive on mobile data, and the current theme ships large unoptimised images and multiple render-blocking scripts. The new build should be materially lighter.
- **P1 — Image optimisation** via the framework's image pipeline — WebP/AVIF, correct dimensions, lazy loading below the fold.
- **P1 — Third-party script discipline.** The current site injects a support-chat widget on every page. In the rebuild, the WhatsApp option should be a plain link rather than a hosted widget unless there's a specific reason otherwise. Every embedded script is both a performance cost and an attack surface.
- **P1 — Mobile rendering** verified section by section at 360px width.
- **P2 — Content backup and rollback plan** for the new deployment.

### 4.6 SEO

- **P0 — Page titles and meta descriptions** to be written for every page. Currently likely theme defaults.
- **P1 — Heading hierarchy.** One H1 per page, describing the page, not the brand.
- **P1 — Local SEO.** No location signals on site. Add city, service-area terms, and a Google Business Profile.
- **P1 — Target terms** to be researched properly, but the obvious cluster is Nigeria-specific and compliance-led: NDPA compliance, cybersecurity consultant Nigeria, ISO 27001 Nigeria, security awareness training Lagos.
- **P1 — Schema markup:** Organization, LocalBusiness, and Service.
- **P2 — XML sitemap and robots.txt** verified and submitted to Search Console.

### 4.7 Accessibility

- **P1 — Colour contrast** to meet WCAG AA (4.5:1 for body text).
- **P1 — Keyboard navigation** with visible focus states throughout.
- **P1 — Alt text** on all meaningful images.
- **P1 — Form labels** properly associated with inputs.
- **P2 — Reduced-motion support** for any animation.

### 4.8 Legal and trust pages

- **P0 — Privacy policy.** Currently absent. A firm advising on the NDPA must have an NDPA-compliant privacy notice on its own site. This is the most visible possible credibility failure.
- **P1 — Cookie consent** if any analytics or marketing scripts run.
- **P2 — Terms of service.**

---

## 5. Proposed sitemap

```
/                       Home
/services               Overview
  /services/risk-assessment
  /services/gap-analysis
  /services/network-protection
/training               Overview
  /training/awareness
  /training/incident-response
  /training/executive-briefing
/about                  Team, credentials, company details
/insights               Blog index
  /insights/[slug]
/contact                Form, booking, details
/privacy                Privacy policy
```

**Phase 1 (launch):** Home, Services overview, Training overview, About, Contact, Privacy.
**Phase 2:** Individual service and training pages, blog rebuild.

---

## 6. Homepage structure

In order:

1. **Header** — logo, navigation, one primary call to action ("Book an assessment")
2. **Hero** — headline stating the outcome, one-sentence explanation, two CTAs, and the interactive exposure check
3. **Sectors served** — replaces the empty statistics block
4. **Services** — three cards, each with a stated deliverable
5. **How an engagement runs** — four numbered steps with a realistic timeframe
6. **Credentials and team** — certifications, principal consultant, years operating
7. **Proof** — client evidence or anonymised outcomes
8. **Training** — three tracks by audience and duration
9. **Insights** — three most recent posts
10. **Contact** — form, plus details and secondary WhatsApp option
11. **Footer** — navigation, company registration details, privacy link

---

## 7. Design direction

**Principle:** the site should read like an assessment report, not like a stock "cyber" website.

Rationale: near every competitor in this space uses the same visual language — dark navy, glowing padlocks, circuit-board backgrounds, hexagon grids. It signals the category but conveys nothing about competence, and it makes every firm look interchangeable. A light, precise, document-like treatment reads as the work of people who produce rigorous written deliverables, which is exactly what Prefort sells.

- **Palette:** cool paper ground, near-black text. Colour is reserved for meaning, never decoration — a single red for exposure and severity, a single green for cleared and verified states, amber for partial. Consistent across the exposure check, the service tags, and any future report styling.
- **Typography:** three roles — a display face with institutional weight, a highly legible body face, and a monospace face for finding references, severity labels and metadata.
- **Motion:** minimal. Subtle reveals on scroll, nothing ambient or decorative. Reduced-motion preference respected.
- **Signature element:** the interactive exposure check in the hero. It is the one place boldness is spent; everything around it stays quiet.

---

## 8. Technical stack and architecture

### 8.1 Confirmed stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js** (App Router) | Server components by default; the exposure check and any interactive UI marked as client components |
| Language | **TypeScript** | Strict mode |
| Styling | **Tailwind CSS** | Design tokens from Section 7 defined as CSS custom properties and exposed through the Tailwind theme, so severity colours stay semantic rather than being hard-coded per component |
| Icons | **HugeIcons** | Single icon system across the whole site; no mixing with inline SVG one-offs |
| Fonts | `next/font` | Self-hosted, subset, no layout shift, no external font request |
| Hosting | **Vercel** | Recommended — edge caching matters for Nigerian latency |

### 8.2 Rendering strategy

Marketing and service pages are **statically generated**. There is no per-user content on this site, so nothing needs to render on request. This is what makes the performance budget in 4.5 achievable.

- Static pages: home, services, training, about, contact, privacy
- Blog: statically generated with incremental revalidation, so Prefort can publish without a redeploy
- The exposure check runs entirely **client-side** — scoring happens in the browser and nothing is transmitted unless the visitor submits the form. This should be stated on the widget itself. A security firm that quietly collects answers to a risk questionnaire has a real problem if anyone looks.

### 8.3 Content management — decision required

Prefort must be able to publish articles without a developer (Section 4.4). On Next.js that means a choice, and it needs making before build:

- **Headless CMS (Sanity, Payload, or Contentful)** — non-technical editing, media handling, preview. Adds a service dependency and, past the free tier, a monthly cost. **Recommended** given the compliance content pillar in Section 4.4 depends on regular publishing.
- **MDX in-repo** — zero cost, zero dependency, full version control. But every new article requires a developer. Only viable if Prefort accepts that publishing routes through you indefinitely.

This is a business decision, not a technical one. It should go to Prefort with the trade-off stated plainly.

### 8.4 Forms and email

- Form submissions handled by a Next.js **route handler**, not a third-party embed
- Transactional email via a provider (Resend or similar) — notification to Prefort, autoresponder to the enquirer
- Spam protection: honeypot field plus rate limiting; add a challenge only if spam becomes a real problem
- Server-side validation with a schema validator — never trust the client
- Submissions persisted somewhere Prefort can retrieve them, not email-only

### 8.5 Migration and cutover

1. Full inventory of existing URLs and content before anything is switched
2. Content migrated or rewritten per Section 4.1
3. New site built and reviewed on a preview deployment
4. Redirect map implemented and tested against the inventory
5. DNS cutover, with the old host kept live until propagation completes
6. Search Console: submit new sitemap, monitor coverage errors for the first fortnight

### 8.6 Repository and delivery

- Git, with preview deployments on every pull request so Prefort can review before anything reaches production
- Accessibility and Lighthouse checks run before launch, not after
- Environment variables for all keys — nothing committed
- Handover documentation covering how to publish, how to edit copy, and who holds which credential

---

## 9. Functional requirements

| Feature | Notes |
|---|---|
| Interactive exposure check | Client-side scoring, weighted questions, risk band output, CTA on completion. No data leaves the browser unless the visitor submits. |
| Contact form | Spam protection, email notification to Prefort, autoresponder to enquirer, submissions logged |
| Booking link | Third-party scheduler embedded or linked |
| WhatsApp | Retained, demoted to secondary |
| Blog / CMS | Prefort must be able to publish without a developer — see 8.3, decision required |
| Analytics | Privacy-respecting analytics, with conversion goals on form submit and check completion |
| Newsletter capture | Optional, phase 2 |

---

## 10. Success measures

Baseline to be established from current analytics, if any exists.

- Form submissions and booked calls per month — the primary measure
- Exposure check completion rate
- Organic traffic on Nigeria-specific compliance terms
- Lighthouse: performance 90+, accessibility 95+, SEO 100
- Bounce rate on the homepage

---

## 11. Client inputs required

**Blocking — the build cannot be completed without these:**

1. Registered company name, RC number, and business address
2. Certifications held, by individual, with awarding body
3. Years in operation
4. Principal consultant(s): name, role, photograph, professional background
5. Working business email address for enquiries
6. Confirmed WhatsApp business number
7. Sectors and client types actually served to date
8. Client permission for any named logos or testimonials — or agreement to use anonymised descriptions
9. Real training programme details: duration, delivery format, price or price range, certification issued if any
10. Decision on the statistics block: supply verifiable figures, or confirm removal

**Non-blocking but needed:**

11. Logo in vector format, and brand colours if defined
12. Photographs of past training sessions or the team, if available
13. Existing blog articles in full, if they exist
14. Hosting, domain, CMS, and analytics access
15. Confirmation of who will maintain content after launch

---

## 12. Phasing

**Phase 1 — Foundation.** Homepage, services overview, training overview, about, contact, privacy policy. All P0 findings resolved. Exposure check live. Analytics installed.

**Phase 2 — Depth.** Individual service and training pages, blog rebuild with real articles, case studies or anonymised outcomes, schema markup, Google Business Profile.

**Phase 3 — Growth.** Compliance content pillar, gated downloadable resources, email capture and nurture, ongoing SEO.

---

## 13. Open questions for Prefort

1. Which is the primary revenue line today — consulting or training? The homepage hierarchy follows the answer.
2. Which sector do you most want more of? That sector gets the sharpest positioning.
3. Is there a preferred compliance standard you position around — NDPA, ISO 27001, PCI DSS, CBN?
4. Are there existing clients who would give a testimonial or agree to a named logo?
5. Content management: headless CMS with a monthly cost and self-service publishing, or in-repo articles at no cost that require a developer each time? See 8.3.
6. Who will write and publish content after launch?
7. Is there a launch deadline or event driving timing?
8. What is the budget range? It determines how much of Phase 2 and 3 falls into the initial build.
9. Who currently controls the domain and DNS? Required before cutover.

---

## 14. Next step

Prefort reviews this document and answers Section 13. Once the blocking items in Section 11 are supplied, design and build begin against the structure in Sections 5–9.

The one item that can start immediately, independent of client inputs, is the URL inventory in 8.5 — it's needed for the redirect map and it doesn't depend on any decision above.
