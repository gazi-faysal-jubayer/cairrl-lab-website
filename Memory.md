# Memory.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** 8-Stage Full Database & Dashboard CRUD Implementation  
**Last updated:** 2026-08-27  

---

## 1. Governance & Purpose

This document is the single source of truth for the ongoing engineering status, architectural decisions log, and active workspace snapshot.

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
| **Active Roadmap** | 8-Stage Complete Dashboard & Database CRUD Integration (Stages 1 through 8) |

---

## 3. 8-Stage Implementation Progress

- [ ] **Stage 1: Core Dashboard Data Layer & Shared CRUD Infrastructure** — Enhanced queries, S3 upload API route (`/api/upload`), delete confirm modal.
- [ ] **Stage 2: People Management Module** — Real DB table, add/edit modal, delete action, photo upload, public sync.
- [ ] **Stage 3: Publications Management Module** — Real DB table, add/edit modal, BibTeX copy, featured toggle, public sync.
- [ ] **Stage 4: Research Areas & Projects Module** — Real DB tables, slug generators, area links, public sync.
- [ ] **Stage 5: News & Events Modules** — Real DB tables, rich text, draft/published status, datetime pickers, public sync.
- [ ] **Stage 6: Media Gallery & S3 Upload Module** — Direct Neon S3 upload to `cairrl` bucket, category tagger, public masonry sync.
- [ ] **Stage 7: Contact Messages Inbox & Site Settings** — Inquiries inbox (read/unread/delete), singleton settings editor, public sync.
- [ ] **Stage 8: Dashboard Overview & Verification** — Live analytics metrics, comprehensive verification, `npm run build` pass.

---

## 4. Completed Work Log

- **2026-08-27** — Updated all 6 core planning documents (`PRD.md`, `Architecture.md`, `Rules.md`, `Design.md`, `Phases.md`, `Memory.md`) with explicit, multi-stage implementation blueprints for connecting every single dashboard module to live Neon Postgres tables and Server Actions.
- **2026-08-27** — Built centralized query layer `src/lib/db/queries.ts` with React `cache()` deduplication. Connected public pages to live database queries.
- **2026-08-27** — Integrated live Neon Lakebase Postgres (`noisy-moon-93340476`) and Neon S3 Object Storage (`cairrl` bucket, `us-east-2`).

---

## 5. Architectural Decisions Log

1. **True End-to-End Server Action Architecture:** No fake client-side mock arrays or `alert()` placeholders in the dashboard. Every CRUD action invokes typed Server Actions backed by Prisma and validated by shared Zod schemas.
2. **Instant Route Revalidation:** Every mutation calls `revalidatePath()` on both dashboard and corresponding public paths so changes are reflected instantaneously across the site.
3. **Direct S3 Object Storage:** Images are streamed to the Neon S3 `cairrl` bucket via `/api/upload` and stored as HTTPS URLs in database records.
