# Memory.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** 8-Stage Full Database & Dashboard CRUD Implementation Complete & Verified  
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
| **Active Roadmap** | 8-Stage Complete Dashboard & Database CRUD Integration — **100% COMPLETE** |

---

## 3. 8-Stage Implementation Progress

- [x] **Stage 1: Core Dashboard Data Layer & Shared CRUD Infrastructure** — Enhanced queries, S3 upload API route (`/api/upload`), delete confirm modal.
- [x] **Stage 2: People Management Module** — Real DB table, add/edit modal, delete action, photo upload, public sync.
- [x] **Stage 3: Publications Management Module** — Real DB table, add/edit modal, BibTeX copy, featured toggle, public sync.
- [x] **Stage 4: Research Areas & Projects Module** — Real DB tables, slug generators, area links, public sync.
- [x] **Stage 5: News & Events Modules** — Real DB tables, rich text, draft/published status, datetime pickers, public sync.
- [x] **Stage 6: Media Gallery & S3 Upload Module** — Direct Neon S3 upload to `cairrl` bucket, category tagger, public masonry sync.
- [x] **Stage 7: Contact Messages Inbox & Site Settings** — Inquiries inbox (read/unread/delete), singleton settings editor, public sync.
- [x] **Stage 8: Dashboard Overview & Verification** — Live analytics metrics, comprehensive verification, `npm run build` and `npm run lint` pass with 0 errors.

---

## 4. Completed Work Log

- **2026-08-27** — Added full capability to edit slugs across all dashboard dialogs (Lab Members, Research Areas, Projects, News Posts, Events) with database uniqueness validation and record ID targeting.
- **2026-08-27** — Updated all 6 core planning documents (`PRD.md`, `Architecture.md`, `Rules.md`, `Design.md`, `Phases.md`, `Memory.md`) with explicit, multi-stage implementation blueprints for connecting every single dashboard module to live Neon Postgres tables and Server Actions.
- **2026-08-27** — Built centralized query layer `src/lib/db/queries.ts` with React `cache()` deduplication. Connected public pages to live database queries.
- **2026-08-27** — Integrated live Neon Lakebase Postgres (`noisy-moon-93340476`) and Neon S3 Object Storage (`cairrl` bucket, `us-east-2`).
- **2026-08-27** — Implemented **Stage 1**: S3 upload endpoint `/api/upload` and `DeleteConfirmDialog` modal.
- **2026-08-27** — Implemented **Stage 2**: `PeopleTable` and `MemberDialog` with live CRUD (`saveFacultyMember`, `deleteFacultyMember`, `saveStudentMember`, `deleteStudentMember`) and Neon S3 photo upload.
- **2026-08-27** — Implemented **Stage 3**: `PublicationsTable` and `PublicationDialog` with live CRUD (`savePublication`, `deletePublication`, `toggleFeaturedPublication`).
- **2026-08-27** — Implemented **Stage 4**: `ResearchTable`, `ResearchAreaDialog`, and `ProjectDialog` with live CRUD (`saveResearchArea`, `deleteResearchArea`, `saveProject`, `deleteProject`).
- **2026-08-27** — Implemented **Stage 5**: `NewsTable`, `NewsDialog`, `EventsTable`, and `EventDialog` with live CRUD (`saveNewsPost`, `deleteNewsPost`, `saveEvent`, `deleteEvent`).
- **2026-08-27** — Implemented **Stage 6**: `GalleryManager` with direct Neon S3 file streaming, category classification, and DB deletion.
- **2026-08-27** — Implemented **Stage 7**: `MessagesInbox` with read/unread toggle and email reply launcher, and `SettingsForm` with singleton site branding updater.
- **2026-08-27** — Implemented **Stage 8**: `DashboardOverviewPage` connected to live metrics stream from `getDashboardMetrics()`.
- **2026-08-27** — Verified entire application with `npm run lint` (0 errors, 0 warnings) and `npm run build` (38 routes generated successfully).

---

## 5. Architectural Decisions Log

1. **True End-to-End Server Action Architecture:** No fake client-side mock arrays or `alert()` placeholders in the dashboard. Every CRUD action invokes typed Server Actions backed by Prisma and validated by shared Zod schemas.
2. **Instant Route Revalidation:** Every mutation calls `revalidatePath()` on both dashboard and corresponding public paths so changes are reflected instantaneously across the site.
3. **Direct S3 Object Storage:** Images are streamed to the Neon S3 `cairrl` bucket via `/api/upload` and stored as HTTPS URLs in database records.
