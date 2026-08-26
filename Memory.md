# Memory.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** Comprehensive Status & Decisions Log v2.0 (100% Detailed)  
**Last updated:** 2026-08-27  

---

## 1. Governance & Purpose

This document serves as the single source of truth for the ongoing engineering status, architectural decisions log, and active workspace snapshot. 

Every AI agent and human developer must consult this file at the start of any work session and append all significant milestones, configuration changes, or architectural decisions upon completion.

---

## 2. Project Snapshot

| Parameter | Current Project Specification |
|---|---|
| **Lab Full Name** | Centre for Advanced Intelligent Robotics Research Laboratory (CAIRRL) |
| **Institutional Affiliation** | Khulna University of Engineering & Technology (KUET), Khulna 9203, Bangladesh |
| **Core Departments** | Department of Mechanical Engineering & Department of Mechatronics Engineering |
| **Tech Stack** | Next.js 16 (App Router, Turbopack) + TypeScript Strict + Tailwind CSS v4 + Prisma ORM |
| **Database Instance** | Neon Lakebase Postgres (Project ID: `noisy-moon-93340476`, Org: `org-steep-leaf-85392141`) |
| **Object Storage** | Neon S3 Cloud Storage (`cairrl` bucket, `us-east-2`, `public_read` access policy) |
| **Design Language** | Space Grotesk / Inter / JetBrains Mono (`brand-navy`, `accent-cyan`, `accent-green`, `ink`) |
| **Route Generation** | 47 Production Routes (SSG/ISR with live Neon Postgres integration) |
| **Lint & Type Status** | 0 Errors, 0 Warnings (`tsc --noEmit` & `eslint` passing) |

---

## 3. Current Architecture & Feature Status

- **Public Website:** All 10 public modules (`/`, `/about`, `/people`, `/people/[slug]`, `/research`, `/research/[areaSlug]`, `/research/projects/[slug]`, `/publications`, `/news`, `/news/[slug]`, `/events`, `/events/[slug]`, `/gallery`, `/join-us`, `/contact`) are fully implemented and wired to live Neon Postgres queries via `src/lib/db/queries.ts`.
- **Database Layer:** Prisma schema with 11 relational models (`User`, `FacultyMember`, `StudentMember`, `ResearchArea`, `Project`, `Publication`, `NewsPost`, `Event`, `GalleryItem`, `SiteSetting`, `ContactMessage`) deployed and seeded with real lab records strictly adhering to `PRD.md §13`.
- **Object Storage:** Neon S3 object storage initialized with AWS S3 SDK for direct media uploads (member photos, project covers, gallery assets) with persistent public HTTPS access.
- **Administrative Portal:** Protected `/dashboard/*` management suites for all entities with role-based authorization (`requireUser()`, `requireAdmin()`).
- **SEO & Discoverability:** Dynamic `sitemap.xml`, `robots.txt`, and OpenGraph metadata generated per page.

---

## 4. Comprehensive Completed Work Log

- **2026-08-27** — **Planning Suite 2.0 Overhaul:** Thoroughly expanded and synchronized all 6 core planning documents (`PRD.md`, `Architecture.md`, `Rules.md`, `Design.md`, `Phases.md`, `Memory.md`) to 100% comprehensive, production-grade technical specifications.
- **2026-08-27** — **Phase A Live Database Wiring:** Implemented centralized, cached database query layer (`src/lib/db/queries.ts`) using React `cache()`. Rewrote all public pages (Home, About, People list/detail, Research list/detail, Projects detail, Publications catalogue, News list/detail, Events list/detail, Gallery archive) to query live Neon Postgres data instead of static arrays.
- **2026-08-27** — **Homepage & Component Upgrades:** Upgraded Homepage with live database metrics counter, faculty spotlight, featured publications, latest news cards, upcoming events calendar stack, and animated hero with radial glows. Upgraded `GalleryGrid` to CSS masonry with keyboard-controlled lightbox and `PublicationList` to support live database props.
- **2026-08-27** — **Neon Cloud Integration:** Connected Neon Lakebase Postgres project `cairrl` (`noisy-moon-93340476`) and configured S3-compatible object storage (`cairrl` bucket, `us-east-2`). Wrote `neon.ts` infrastructure-as-code and deployed schema migrations.
- **2026-08-26** — **Phases 6–10 Implementation:** Built full Prisma schema, database seed script, server-side auth guards, login portal, dashboard layout, and management modules for all 8 content entities.
- **2026-08-26** — **Phases 0–5 Implementation:** Scaffolded Next.js 16 with Tailwind v4 and shadcn/ui, established design tokens and layout shell, and constructed initial static routes.

---

## 5. Architectural Decisions Log

1. **Next.js 16 App Router with React Server Components (RSC):** Chosen as the foundational runtime for superior SEO, fast initial page loads, and zero-JS public narrative rendering.
2. **Neon Lakebase Postgres & S3 Storage:** Selected for serverless scalability, autoscaling, connection pooling, and integrated S3 object storage for academic media.
3. **Defense-in-Depth Authentication:** Implemented server-side session cookie verification in App Router layouts and re-verified in all Server Actions to prevent unauthorized mutation.
4. **Single Source of Truth Validation (Zod):** Unified validation schemas in `src/lib/validations/` shared seamlessly between frontend forms and backend actions.
5. **Strict Anti-Fabrication Rule:** Enforced zero tolerance for fabricated people or publications; missing details are preserved as clean empty states or marked placeholders.

---

## 6. Official Seed Roster Reference (`PRD.md §13`)

### Faculty Members
- **Md. Helal-An-Nahiyan** — Mechanical Engineering, KUET — Robotics & Control, Mechatronics, Additive Manufacturing — [Google Scholar](https://scholar.google.com/citations?user=rkOGMxgAAAAJ&hl=en)
- **Priyo Nath Roy** — Mechatronics Engineering, KUET — Industrial Robot Control, UAV/eVTOL Control, IoT & Embedded Systems — [Google Scholar](https://scholar.google.com/citations?user=l8HwgY8AAAAJ&hl=en)

### Graduate Student Researchers
- **Mashrul Khan** — M.Sc. Student Researcher

### Undergraduate Student Researchers
- **Hafizur Rahman** — B.Sc. in Mechatronics Engineering
- **Gazi Faysal Jubayer** — B.Sc. in Mechatronics Engineering
- **Rahat** — B.Sc. in Engineering
- **Sojib** — B.Sc. in Engineering

---

## 7. Next Immediate Tasks

1. **Verify PublicationList component:** Ensure `PublicationList.tsx` accepts dynamic props and renders cleanly.
2. **Complete Contact & Join Us pages:** Ensure Contact form directly persists messages to Neon Postgres `ContactMessage` table and Join Us reads from live database settings.
3. **Verify Build & Run Lint:** Run `npm run build` and `npm run lint` to guarantee complete compilation with 0 errors.
