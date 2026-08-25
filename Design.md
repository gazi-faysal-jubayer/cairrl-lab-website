# Design.md

**Project:** CAIRRL Lab Website
**Last updated:** 2026-08-26

This document defines the visual language of the site: color, type, spacing, components, imagery, and motion. Every visual decision made while implementing `Phases.md` should trace back to a token defined here — see `Rules.md §4`.

> These are **proposed** design tokens, not an existing official CAIRRL/KUET brand guideline. If KUET or the lab later publishes formal brand colors/logo standards, reconcile this file against them before final launch.

---

## 1. Design Principles

1. **Credible before flashy.** This is an academic research lab, not a startup — CMU RI and GMU MARC both lean editorial and calm, not "SaaS landing page." Confidence comes from clarity and real content, not heavy animation.
2. **Feels precise, like the work it represents.** Robotics/mechatronics is exact, structured, technical — the UI should feel the same way: clean grids, sharp alignment, restrained color use.
3. **Honest about scale.** With 7 people today, the design must feel intentional and complete at low content density — not like an empty template waiting to be filled (see `PRD.md §11`).
4. **Accessible by default,** not as an afterthought — every token here is chosen to clear WCAG AA on its intended background.

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0F172A` | Primary text, headings on light backgrounds |
| `surface` | `#FFFFFF` | Page background |
| `surface-muted` | `#F5F7FA` | Section backgrounds, card backgrounds, alternating sections |
| `border` | `#E2E8F0` | Dividers, card borders, input borders |
| `brand-navy` | `#101B33` | Primary brand color — header/footer, primary buttons, dark hero sections |
| `brand-navy-hover` | `#0B1426` | Hover/active state of navy elements |
| `accent-cyan` | `#0EA5C4` | Links, active nav item, highlighted stats, research-area tag default |
| `accent-cyan-hover` | `#0B8AA6` | Hover state for cyan interactive elements |
| `accent-green` | `#0F7A4D` | Secondary accent — used sparingly (badges, "Ongoing" project status, subtle nod to the national/institutional green common to Bangladeshi public universities) |
| `muted-text` | `#475569` | Secondary text, captions, metadata (dates, authors) |
| `success` | `#15803D` | Success toasts/states in the dashboard |
| `warning` | `#B45309` | Warning toasts/states |
| `error` | `#B91C1C` | Error toasts/states, destructive actions |

**Usage guidance**
- `brand-navy` is the dominant identity color — nav bar, footer, hero backgrounds, primary CTA buttons. Use it the way CMU RI uses its scarlet: as *the* signature, not one of many.
- `accent-cyan` is the single interactive/highlight color — links, active states, chart accents, research-area tag default color. Don't introduce a second "pop" color competing with it.
- `accent-green` is a deliberately minor secondary accent (status badges, an occasional divider) — it should never compete with cyan for attention in the same view.
- Never use `accent-cyan` or `accent-green` text on `surface-muted` at small sizes without checking contrast; prefer `ink` for body text everywhere.

**Dark mode (v1.5, optional):** invert `surface`↔`ink` using CSS variables so `brand-navy` and `accent-cyan` still work as accents on a near-black background (`#0B1220`). Not required for launch, but the token structure (CSS variables, not hardcoded Tailwind colors) should make it a follow-on task, not a rebuild.

## 3. Typography

| Role | Font | Fallback stack |
|---|---|---|
| Headings | **Space Grotesk** | `ui-sans-serif, system-ui, sans-serif` |
| Body / UI | **Inter** | `ui-sans-serif, system-ui, sans-serif` |
| Data / labels / stats | **JetBrains Mono** | `ui-monospace, SFMono-Regular, monospace` |

Load all three via `next/font/google` (self-hosted by Next.js, no external request, no layout shift).

- **Space Grotesk** for H1–H4: geometric and slightly technical, distinct from generic "Inter everywhere" academic sites, without tipping into a flashy display face.
- **Inter** for body copy, nav, buttons, form labels — maximum legibility for long bios and abstracts.
- **JetBrains Mono** used sparingly: the homepage stats strip (e.g., `02 FACULTY`, `07 MEMBERS`), publication years in the list view, event dates. Gives a technical, lab-notebook texture without hurting readability.

### Type scale

| Token | Size / Line-height | Weight | Example use |
|---|---|---|---|
| `display` | 3rem / 1.1 (48px) | 600 | Home hero headline |
| `h1` | 2.25rem / 1.2 (36px) | 600 | Page titles |
| `h2` | 1.875rem / 1.25 (30px) | 600 | Section headings |
| `h3` | 1.5rem / 1.3 (24px) | 600 | Card/subsection headings |
| `h4` | 1.25rem / 1.4 (20px) | 500 | Minor headings |
| `body-lg` | 1.125rem / 1.6 (18px) | 400 | Intro paragraphs |
| `body` | 1rem / 1.6 (16px) | 400 | Default body text |
| `small` | 0.875rem / 1.5 (14px) | 400 | Captions, metadata |
| `mono-label` | 0.8125rem / 1.4 (13px), uppercase, tracked | 500 | Stats, tags, dates |

Scale down `display`→2rem and `h1`→1.75rem on mobile breakpoints.

## 4. Spacing & Layout

- Base unit: **4px**, using Tailwind's default spacing scale (`1` = 4px … `4` = 16px … `8` = 32px, etc.) — no custom spacing scale needed.
- Content container: max-width `1280px` (Tailwind `max-w-7xl`), horizontal padding `1.5rem` mobile / `2rem` desktop.
- Section vertical rhythm: `py-16` mobile, `py-24` desktop between major homepage sections.
- Breakpoints: Tailwind defaults — `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.
- Grid: 12-column implicit via Tailwind grid utilities; people/project/news cards typically 1 col mobile → 2 col tablet → 3–4 col desktop.

## 5. Components

| Component | Style notes |
|---|---|
| **Buttons** | Primary: `brand-navy` fill, white text, `rounded-md`. Secondary: outline in `border`, `ink` text. Ghost: text-only, `accent-cyan` on hover. All buttons use `body` weight 500, `px-5 py-2.5`. |
| **Cards** (person, project, news, event) | `surface` background, `border` 1px, `rounded-lg`, subtle shadow on hover only (`shadow-sm` → `shadow-md`), consistent image aspect ratio per card type (16:9 for news/project covers, 1:1 for people avatars). |
| **Tags / badges** (research areas, publication type, project status) | Pill shape, `text-xs`, `accent-cyan`-on-`surface-muted` by default; `accent-green` variant reserved for "Ongoing" project status. |
| **Navbar** | Sticky, `surface` background with `border-b`, `brand-navy` logo/wordmark, `accent-cyan` underline on active link. Collapses to a slide-in drawer under `md`. |
| **Footer** | `brand-navy` background, white/`surface-muted` text, three-column layout (Quick Links / Contact / Social+Scholar), matching the CMU RI pattern of surfacing outreach/contact/giving-equivalent links. |
| **Hero** | Full-width, `brand-navy` background or a photo with a navy duotone overlay (`brand-navy` at ~70% opacity) so white headline text stays legible over any photo. |
| **Data tables** (dashboard) | shadcn/ui `Table`, zebra-free (use `border` divider rows instead), sticky header on scroll, row actions right-aligned. |
| **Forms** (dashboard + contact) | shadcn/ui `Input`/`Textarea`/`Select`, `accent-cyan` focus ring, inline Zod error text in `error` color directly beneath the field. |
| **Empty states** | Icon (lucide, `muted-text`) + one line of copy + a primary action where relevant (e.g., "No publications yet — Add publication"). Never a bare blank area. |

## 6. Imagery & Iconography

- **Icons:** `lucide-react` exclusively, `1.5px` stroke, sized to match adjacent text (typically 20–24px).
- **Photography:** real lab/people/robot photos once available; until then, use clearly-labeled placeholders (per `Rules.md §8`) rather than generic stock robot imagery that could be mistaken for real lab work.
- **Hero/cover treatment:** apply a `brand-navy` duotone/gradient overlay behind any text-over-image composition, mirroring the legibility technique CMU RI uses on its homepage feature imagery.
- **Aspect ratios:** keep them consistent per content type so grids stay tidy — 1:1 for people, 16:9 for news/project/event covers, free-form only in the Gallery.

## 7. Motion

- Transitions: `150–250ms`, `ease-out`, applied to color/opacity/transform only — no bouncing, no parallax scrolling.
- Page-level motion stays minimal: a subtle fade/slide-up on section entry is optional and should never delay content becoming readable.
- Respect `prefers-reduced-motion: reduce` — disable non-essential transitions entirely for users who request it (`Rules.md §11`).

## 8. Accessibility Notes

- All text/background pairings above are chosen to clear **WCAG AA** (4.5:1 for body text, 3:1 for large text/UI components). Re-check contrast if any token is adjusted.
- Never convey status (e.g., "Ongoing" vs. "Completed" project) by color alone — always pair the badge color with a text label.
- Focus states use a visible `accent-cyan` ring (`ring-2 ring-accent-cyan ring-offset-2`) on every interactive element, never `outline-none` without a replacement.

## 9. Homepage Mood Reference

The homepage should read, in order: **hero → quick stats → featured research/latest news → upcoming events (if any) → footer** — the same rhythm as CMU RI's "featured story, then news grid, then events sidebar" pattern, scaled down to CAIRRL's actual content volume so nothing feels padded. Prefer one well-composed featured item over a large empty grid.
