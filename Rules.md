# Rules.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** Comprehensive Operational Rules & Behavioral Guidelines v2.1  
**Last updated:** 2026-08-27  

---

## 1. Governance & Precedence

This document establishes non-negotiable behavioral boundaries, coding standards, and architectural constraints. If any instruction or proposed modification conflicts with this file, **this file strictly wins**.

---

## 2. Strict Dashboard & Database Integration Rules

1. **Zero Mock Arrays in Dashboard:** The dashboard must NEVER import from static mock files (e.g. `src/lib/data/*.ts`) for list rendering or mutations. All dashboard screens must read directly from Neon Lakebase Postgres.
2. **Zero `alert()` / `confirm()` Calls:** Never use native browser `alert()` or `confirm()` popups. All user interactions must utilize production shadcn/ui components:
   - Form modals: `Dialog` / `DialogContent`
   - Delete confirmation: `DeleteConfirmDialog` with explicit action buttons
   - Feedback: Toast notifications (`success`, `error`)
3. **Real Server Action Mutations:** Every mutation (`CREATE`, `UPDATE`, `DELETE`) must execute through dedicated Server Actions in `src/lib/actions/` validating with shared Zod schemas.
4. **Instant Revalidation:** Every Server Action performing a mutation must invoke `revalidatePath()` for both the dashboard management route and all related public routes.
5. **Form Feedback & Loading States:** Every form must handle `isSubmitting`, disable submit buttons during network transit, and display inline error messages beneath offending fields.

---

## 3. Strict Content Integrity & Anti-Fabrication Mandate

1. **Zero Fabrication Policy:** Never invent fake faculty members, student researchers, publication titles, DOI numbers, or project descriptions.
2. **Authoritative Seed Source:** Refer exclusively to `PRD.md §13` as the single source of truth for lab personnel and initial records.
3. **Handling Incomplete Data:** Leave missing optional fields `null` or mark with clean empty states.

---

## 4. Coding Conventions & Stack Lock-In

- **Next.js 16 (App Router):** Server Components by default; client components isolated to interactive leaf nodes (`'use client'`).
- **Prisma ORM & Neon Postgres:** All database access through the singleton in `src/lib/prisma.ts`.
- **Neon S3 Storage:** Media uploads streamed through `/api/upload` to the `cairrl` bucket.
- **TypeScript Strict Mode:** Zero `any` types without explicit justification.
- **Design Tokens:** Strict adherence to `Design.md` color tokens (`brand-navy`, `accent-cyan`, `accent-green`, `surface-muted`, `ink`).
