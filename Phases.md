# Phases.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** Comprehensive Sequential Implementation Roadmap v2.0 (100% Detailed)  
**Last updated:** 2026-08-27  

The build is structured into 11 sequential phases (Phase 0 through Phase 10). Each phase specifies clear goals, detailed task breakdowns, and strict exit criteria.

---

## Phase 0 — Project Setup & Foundations
**Goal:** Establish a clean, production-ready Next.js 16 App Router foundation with strict TypeScript and toolchains.

- [x] Scaffold Next.js 16 (App Router, Turbopack, TypeScript strict mode, `src/` directory).
- [x] Configure Tailwind CSS v4, Lucide React icons, and shadcn/ui primitives.
- [x] Configure ESLint and Prettier with zero initial warnings.
- [x] Configure `.env.example` with template environment variables.
- [x] Set up Prisma ORM and define base connection strings.

**Exit Criteria:** Blank project compiles cleanly with `npm run build`; linter passes with 0 warnings.

---

## Phase 1 — Design System, Tokens & Layout Shell
**Goal:** Implement the visual language from `Design.md` as reusable tokens, styles, and layout wrappers.

- [x] Configure CSS custom properties for all color tokens (`brand-navy`, `accent-cyan`, `accent-green`, `surface-muted`, `ink`).
- [x] Import and configure Space Grotesk, Inter, and JetBrains Mono fonts via `next/font/google`.
- [x] Build shared `Navbar` with sticky header, desktop links, active state indicators, and responsive mobile slide-out drawer.
- [x] Build 3-column `Footer` with lab summary, navigation links, KUET affiliation, and social links.
- [x] Build base UI primitives: `Container`, `SectionHeading`, `Button`, `Badge`, `Card`, and `AnimatedSection`.
- [x] Wrap `(public)/layout.tsx` with the unified shell.

**Exit Criteria:** Shell renders correctly on mobile, tablet, and desktop with proper fonts, colors, and responsive behavior.

---

## Phase 2 — Static Public Pages v1 (Home, About, Join Us, Contact)
**Goal:** Construct the foundational public storytelling and inquiry pages.

- [x] Build Home page structure: Hero section with grid overlay, Quick Stats counter, Research Highlights, and Call to Action.
- [x] Build About page: Mission & Vision dual cards, Founding Story, Departmental Affiliation, and Research Philosophy.
- [x] Build Join Us page: Undergrad thesis tracks, M.Sc./Ph.D. recruitment details, and application instructions.
- [x] Build Contact page: Interactive form with Zod validation, honeypot spam protection, and institutional coordinates.

**Exit Criteria:** All four pages are fully responsive, accessible, and render semantic HTML with zero console errors.

---

## Phase 3 — People Directory & Individual Profile System
**Goal:** Present the lab's faculty and student researchers with individual dynamic profile pages strictly adhering to `PRD.md §13`.

- [x] Build People directory (`/people`) with segmented sections for Faculty, Graduate Researchers, and Undergraduate Researchers.
- [x] Build dynamic profile pages (`/people/[slug]`) with static parameters generation (`generateStaticParams`).
- [x] Implement deterministic, name-hashed gradient avatar placeholders with initials.
- [x] Integrate external academic links (Google Scholar, ResearchGate, LinkedIn, Email).
- [x] Connect individual profiles to their respective published works.

**Exit Criteria:** Profiles for both faculty (Md. Helal-An-Nahiyan, Priyo Nath Roy) and all 5 student researchers render correctly with accurate information and zero fabricated people.

---

## Phase 4 — Research Areas, Projects & Academic Publications
**Goal:** Deliver a rich research catalogue covering focus areas, ongoing projects, and filterable publications.

- [x] Build Research Areas directory (`/research`) with custom icons and gradient card toppers.
- [x] Build dynamic Research Area detail pages (`/research/[areaSlug]`) listing associated researchers, active projects, and papers.
- [x] Build Project detail pages (`/research/projects/[projectSlug]`) with status badges and milestone descriptions.
- [x] Build filterable Publications catalogue (`/publications`) with text search, type filters, year filters, area filters, collapsible abstracts, and BibTeX citation export.

**Exit Criteria:** Research areas accurately reflect faculty domains; publications catalogue supports fast search and faceted filtering.

---

## Phase 5 — News Archive, Events Calendar & Visual Gallery
**Goal:** Implement remaining public content sections for lab updates and media.

- [x] Build News archive (`/news`) and article reading view (`/news/[slug]`) with rich text body rendering.
- [x] Build Events directory (`/events`) with automatic separation of Upcoming vs. Past events and calendar date badges.
- [x] Build Event detail page (`/events/[slug]`) with schedule and venue information.
- [x] Build Gallery (`/gallery`) with CSS masonry layout, category tabs, and interactive modal lightbox viewer.

**Exit Criteria:** News, Events, and Gallery render correctly with smooth lightbox viewer and category filtering.

---

## Phase 6 — Database Layer & Cloud Infrastructure (Neon Postgres & S3)
**Goal:** Move from local static data to a live, cloud-hosted relational database and object store.

- [x] Deploy Prisma schema with 11 relational models to Neon Lakebase Postgres (`noisy-moon-93340476`).
- [x] Configure connection pooling (`DATABASE_URL`) and direct migration URL (`DIRECT_URL`).
- [x] Configure Neon S3-compatible object storage (`cairrl` bucket, `us-east-2`, `public_read` policy).
- [x] Write and execute automated seed script (`prisma/seed.ts` & `scripts/seed-neon.mjs`) strictly populating the real seed roster and research areas from PRD §13.
- [x] Implement centralized database query layer (`src/lib/db/queries.ts`) with React `cache()` deduplication.

**Exit Criteria:** Neon Postgres contains all seeded tables; S3 client is initialized and verified; Prisma client singleton is type-safe.

---

## Phase 7 — Authentication & Dashboard Shell
**Goal:** Provide secure, authenticated access for lab members to manage website content.

- [x] Build administrative login page (`/login`) with session management.
- [x] Implement server-side security guards (`requireUser()`, `requireAdmin()`) in `src/lib/auth-guard.ts`.
- [x] Build protected dashboard layout (`src/app/(dashboard)/layout.tsx`) with sidebar navigation and user status.
- [x] Guard all `/dashboard/*` routes so unauthenticated requests immediately redirect to `/login`.

**Exit Criteria:** Valid credentials allow entry into `/dashboard`; unauthenticated requests are blocked; layout is responsive.

---

## Phase 8 — Administrative CRUD: People, Research & Publications
**Goal:** Enable lab admins to manage core research identity data through intuitive management interfaces.

- [x] Build People management interface (`/dashboard/people`) for Faculty and Student CRUD with photo upload support.
- [x] Build Research Areas and Projects management (`/dashboard/research`) with slug generation and status toggling.
- [x] Build Publications catalogue editor (`/dashboard/publications`) with type categorization and DOI management.
- [x] Wire image uploads to Neon S3 storage with immediate public HTTPS URL generation.

**Exit Criteria:** Lab admin can add/edit a researcher or publication and see it reflected immediately on the public site.

---

## Phase 9 — Administrative CRUD: News, Events, Gallery, Messages & Settings
**Goal:** Complete the content management surface and administrative inbox.

- [x] Build News post manager (`/dashboard/news`) with Tiptap rich-text editor and cover image uploader.
- [x] Build Event scheduler (`/dashboard/events`) with date-time configuration and venue selector.
- [x] Build Media Gallery manager (`/dashboard/gallery`) with batch upload to S3 and category tagging.
- [x] Build Contact Messages inbox (`/dashboard/messages`) with read/unread tracking and inquiry details.
- [x] Build Global Site Settings editor (`/dashboard/settings`) for lab name, mission text, and social URLs.

**Exit Criteria:** Every dynamic section of the website is manageable via the dashboard without touching code.

---

## Phase 10 — Full Live Database Integration, Polish, SEO & Launch
**Goal:** Fully wire every public page to live Neon Postgres queries, optimize SEO, and ensure rock-solid production readiness.

- [x] Replace all static data imports across all public pages with live queries from `src/lib/db/queries.ts`.
- [x] Implement live dynamic metric counters on Homepage and Research overview.
- [x] Implement dynamic OpenGraph metadata, `robots.txt`, and XML sitemap (`sitemap.ts`).
- [x] Implement custom 404 page (`not-found.tsx`) and error boundary (`error.tsx`).
- [x] Verify complete type-check (`npm run build`) with 0 type errors and 0 lint warnings.
- [x] Update `Memory.md` and documentation suite to reflect the completed state.

**Exit Criteria:** All 47 routes compile cleanly with SSG/ISR; live data flows from Neon Postgres; site is 100% production-ready.
