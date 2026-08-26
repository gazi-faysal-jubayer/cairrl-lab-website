# Design.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** Comprehensive Visual Language & Design System v2.0 (100% Detailed)  
**Last updated:** 2026-08-27  

---

## 1. Core Visual Identity & Design Philosophy

CAIRRL Lab's visual language is engineered to communicate **academic rigor, robotic precision, and modern engineering authority**.

Unlike generic commercial landing pages or cluttered legacy university portals, CAIRRL adopts a refined editorial design language influenced by leading international robotics institutes (CMU Robotics Institute, GMU MARC):

1. **Precision & Engineering Geometry:** Clean structural grids, crisp card boundaries, subtle linear grid backdrops, and monospaced data accents reflect the exactness of robotics and control theory.
2. **Authoritative Academic Palette:** Deep navy (`#101B33`) serves as the foundational anchor, paired with high-clarity electric cyan (`#0EA5C4`) for interactive focus and emerald green (`#0F7A4D`) for status indicators.
3. **Intentional Density:** The layout is crafted to look complete, balanced, and confident with the founding 7-member team, effortlessly accommodating rapid 5-10x roster expansion without layout degradation.
4. **Accessible & Responsive by Design:** WCAG 2.1 AA compliant color contrast, clear typographic hierarchy, visible focus rings, and seamless fluidity from ultra-wide displays down to mobile viewports.

---

## 2. Complete Color Token Specification

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CAIRRL Color Palette                          │
│                                                                        │
│   [ brand-navy ]     [ accent-cyan ]     [ accent-green ]   [ ink ]    │
│      #101B33            #0EA5C4             #0F7A4D         #0F172A    │
│                                                                        │
│   [ surface ]        [ surface-muted ]   [ border ]         [ muted ]  │
│      #FFFFFF            #F5F7FA             #E2E8F0         #475569    │
└────────────────────────────────────────────────────────────────────────┘
```

| Token | Hex Value | CSS Variable | Semantic Usage |
|---|---|---|---|
| `brand-navy` | `#101B33` | `--brand-navy` | Dominant brand anchor: Dark hero sections, main navigation bar, footer, primary buttons, major CTA backgrounds. |
| `brand-navy-hover` | `#0B1426` | `--brand-navy-hover` | Interactive hover/active state for primary navy elements. |
| `accent-cyan` | `#0EA5C4` | `--accent-cyan` | Interactive primary accent: Hyperlinks, active navigation indicators, stats highlights, research area badges. |
| `accent-cyan-hover` | `#0B8AA6` | `--accent-cyan-hover` | Hover state for buttons and links using cyan styling. |
| `accent-green` | `#0F7A4D` | `--accent-green` | Secondary status accent: "Ongoing" project badges, verified credentials, green indicators. |
| `surface` | `#FFFFFF` | `--surface` | Primary page canvas, card backgrounds, modal dialog containers. |
| `surface-muted` | `#F5F7FA` | `--surface-muted` | Alternating section backgrounds, data card backdrops, subtle container fills. |
| `border` | `#E2E8F0` | `--border` | Dividers, card borders, data table row dividers, input field borders. |
| `ink` | `#0F172A` | `--ink` | Primary typography: Page headlines, card titles, high-emphasis text on light backgrounds. |
| `muted-text` | `#475569` | `--muted-text` | Secondary typography: Publication abstracts, meta dates, author lists, subheadings. |
| `success` | `#15803D` | `--success` | Form submission success states, positive system toasts. |
| `warning` | `#B45309` | `--warning` | Unsaved change warnings, pending status tags. |
| `error` | `#B91C1C` | `--error` | Form validation error messages, destructive deletion dialogs. |

---

## 3. Typography & Font Hierarchy

The typography system pairs geometric character with reading clarity using three self-hosted Google fonts via `next/font/google`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Typography Hierarchy                            │
│                                                                        │
│  HEADINGS: Space Grotesk (Geometric, Technical, Confident)             │
│  BODY / UI: Inter (Clean, Maximum Legibility, High Neutrality)         │
│  DATA / STATS: JetBrains Mono (Lab Notebook Precision, Citations)      │
└────────────────────────────────────────────────────────────────────────┘
```

### Typographic Scale

| Token | Font Family | Size / Line-Height | Weight | Example Application |
|---|---|---|---|---|
| `display` | Space Grotesk | `3.25rem` (52px) / 1.1 | 600 SemiBold | Homepage hero main headline |
| `h1` | Space Grotesk | `2.25rem` (36px) / 1.2 | 600 SemiBold | Primary page title (`About`, `People`, `Publications`) |
| `h2` | Space Grotesk | `1.875rem` (30px) / 1.25 | 600 SemiBold | Major section headings on pages |
| `h3` | Space Grotesk | `1.25rem` (20px) / 1.3 | 600 SemiBold | Individual card titles, project names |
| `h4` | Space Grotesk | `1.125rem` (18px) / 1.4 | 500 Medium | Minor subsection titles, author names |
| `body-lg` | Inter | `1.125rem` (18px) / 1.6 | 400 Regular | Hero subtitles, introductory narrative lead-ins |
| `body` | Inter | `1rem` (16px) / 1.6 | 400 Regular | General body paragraphs, bio text, mission statements |
| `body-sm` | Inter | `0.875rem` (14px) / 1.5 | 400 Regular | Metadata, publication abstracts, table contents |
| `mono-stat` | JetBrains Mono | `2rem` (32px) / 1.0 | 700 Bold | Numeric metric counter (e.g. `02`, `07`, `18`) |
| `mono-label` | JetBrains Mono | `0.75rem` (12px) / 1.4 | 500 Medium | Uppercase tracking tags (e.g. `FACULTY`, `JOURNAL`) |

---

## 4. Spacing, Grid & Responsive Layout System

- **Standard Container:** `max-w-7xl` (`1280px`) centered horizontally with `px-4 sm:px-6 lg:px-8`.
- **Vertical Section Rhythm:** `py-16 md:py-20 lg:py-24` between major content sections.
- **Card Grids:**
  - Faculty Grid: 2 columns on tablet/desktop (`grid-cols-1 md:grid-cols-2 gap-6`).
  - Student Grid: 3–4 columns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`).
  - Research Focus Areas: 3 columns (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).
  - Publications List: Full-width stacked cards with responsive internal flex layouts.
  - Gallery Grid: Dynamic CSS column masonry (`columns-1 sm:columns-2 lg:columns-3 gap-4`).

---

## 5. UI Component Blueprints

### 5.1 Hero Section
- High-contrast `brand-navy` background.
- Subtle geometric grid pattern with 4% opacity (`linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px)`).
- Ambient blurred glow orbs (`bg-accent-cyan/10 blur-3xl`).
- Institutional subtitle with JetBrains Mono tracking.
- Prominent CTA buttons with rounded-lg geometry and micro-hover lift.

### 5.2 Header / Navigation Bar
- Sticky positioning (`sticky top-0 z-50`) with backdrop blur and bottom border.
- Bold lab wordmark in `brand-navy` linking to root.
- Desktop navigation links with active state indicator (accent-cyan underline badge).
- Responsive mobile hamburger menu triggering an off-canvas drawer with smooth slide transition.

### 5.3 Researcher Cards (`PersonCard`)
- High-resolution photo support or deterministic initials gradient container (`from-cyan-600 to-blue-700`, etc.).
- Clear role tag (`FACULTY`, `GRADUATE RESEARCHER`, `UNDERGRADUATE RESEARCHER`).
- Clean academic links (Google Scholar, ResearchGate, LinkedIn, Email) with Lucide vector icons.
- Tag list of associated research areas with hover links.

### 5.4 Publications Catalogue (`PublicationList`)
- Real-time search bar with instant query filtering.
- Pill toggle filters for Publication Type, Year, and Research Area.
- Expandable abstract drawer with smooth height transition.
- Direct external action links for DOI, PDF, and one-click BibTeX copy to clipboard.

### 5.5 Masonry Gallery & Lightbox Viewer (`GalleryGrid`)
- Pure CSS masonry layout preventing awkward grid gaps.
- Category filter pills (`All`, `Facilities`, `Demos`, `Events`).
- Fullscreen modal lightbox with keyboard controls (`ArrowRight`, `ArrowLeft`, `Escape`), swipe support, captions, and photo counter.

### 5.6 Footer
- 3-column authoritative layout matching CMU RI standards:
  - Column 1: CAIRRL Lab overview, institutional KUET affiliation, founding year.
  - Column 2: Quick navigation links to all main sections.
  - Column 3: Contact coordinates, physical address, and academic profiles.
- Bottom copyright bar with university credit and administrative login shortcut.

---

## 6. Motion & Micro-Interactions

- **Timing Function:** `cubic-bezier(0.16, 1, 0.3, 1)` (smooth ease-out).
- **Duration Scale:** `150ms` (hover color/border), `250ms` (card elevation / modal zoom), `400ms` (scroll-in fade).
- **Scroll Entrance:** Subtly translateY(`12px`) to `0px` with opacity `0` to `1` using Intersection Observer.
- **Accessibility:** Automatically disable animations when `prefers-reduced-motion: reduce` is detected.
