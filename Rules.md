# Rules.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** Comprehensive Operational Rules & Behavioral Guidelines v2.0 (100% Detailed)  
**Last updated:** 2026-08-27  

---

## 1. Governance & Precedence

This document establishes the non-negotiable behavioral boundaries, coding standards, and architectural constraints for all AI agents and human developers operating within this repository.

**If any instruction, user prompt, or proposed modification conflicts with this file, this file strictly wins.** Flag conflicts explicitly rather than silently overriding these directives.

---

## 2. Stack Lock-In & Prohibited Dependencies

### ✅ Permitted & Standardized Stack
- **Framework:** Next.js 16 (App Router, Turbopack, Server Actions)
- **Language:** TypeScript in strict mode (`noImplicitAny`, `strictNullChecks`)
- **UI & Components:** React 19 (Server Components default), Tailwind CSS v4, shadcn/ui primitives, Lucide React icons
- **Database & Storage:** Prisma ORM, Neon Lakebase Postgres (`@prisma/client`), Neon S3 Object Storage (`@aws-sdk/client-s3`)
- **Forms & Validation:** React Hook Form, Zod (`lib/validations/*`)
- **Rich Text:** Tiptap WYSIWYG editor
- **Authentication:** Server-side secure session cookie auth with `requireUser()` / `requireAdmin()` guards

### ❌ Strictly Prohibited Without Explicit Approval
- **Alternative CSS systems:** Bootstrap, Chakra UI, MUI, Emotion, styled-components, or ad-hoc inline hex styles.
- **Alternative ORMs or Query Builders:** Drizzle, TypeORM, Kysely, or raw unescaped SQL queries alongside Prisma.
- **Client-Side State Managers:** Redux, MobX, Recoil, Zustand, Jotai (use React Server Components + minimal leaf `useState`/`useReducer`).
- **Heavy Utility Libraries:** Moment.js, jQuery, Lodash (use native ES features or `date-fns` where necessary).
- **External UI Template Downloads:** Never download full admin templates; construct all screens using native shadcn/ui primitives tailored to `Design.md`.

---

## 3. Strict Content Integrity & Anti-Fabrication Mandate

1. **Zero Fabrication Policy:** **Never invent or fabricate lab members, faculty credentials, student researchers, publication titles, DOI numbers, or project descriptions.**
2. **Authoritative Seed Source:** Refer exclusively to `PRD.md §13` as the single source of truth for lab personnel and initial academic records.
3. **Handling Incomplete Content:** When real information is unknown or pending from the lab (e.g., missing bio, temporary phone number, unconfirmed thesis title), use clearly marked placeholders (e.g., `[PLACEHOLDER: Bio to be provided by researcher]`) or leave the optional field `null`. Never generate plausible-sounding fictional text.
4. **Seed Roster Consistency:** The 2 founding faculty (Md. Helal-An-Nahiyan, Priyo Nath Roy) and 5 student researchers (Mashrul Khan, Hafizur Rahman, Gazi Faysal Jubayer, Rahat, Sojib) are the only authorized seed members.

---

## 4. TypeScript & Coding Conventions

- **Strict Mode:** TypeScript `strict: true` must be maintained at all times. The use of `any` is strictly prohibited unless accompanied by an explicit code comment justifying an unavoidable third-party library limitation.
- **Server Components by Default:** All components in `src/app/` and `src/components/` must be React Server Components unless client-side interactivity (state, event listeners, browser DOM APIs) is explicitly required.
- **Isolate Client Components:** Keep `'use client'` components at the furthest leaf nodes of the component tree to maximize server rendering benefits and minimize JS bundle size.
- **File & Symbol Naming Conventions:**
  - React Components: `PascalCase` (e.g., `PublicationList.tsx`, `PersonCard.tsx`)
  - Utilities & Actions: `camelCase` (e.g., `formatDate.ts`, `queries.ts`, `people.ts`)
  - Route Folders: `kebab-case` (e.g., `join-us`, `research-areas`)
  - Prisma Models: `PascalCase` singular (e.g., `FacultyMember`, `ResearchArea`)
- **Single Source Validation:** Every database entity must possess a single, authoritative Zod validation schema located in `src/lib/validations/`. Both client forms and Server Actions must import this exact schema.

---

## 5. Security & Authentication Rules

1. **Server-Side Authorization Everywhere:** Every administrative route in `(dashboard)` must be guarded server-side via `requireUser()` in `layout.tsx`. Never rely solely on client-side state or middleware redirects.
2. **Server Action Gating:** Every Server Action performing a mutation (`CREATE`, `UPDATE`, `DELETE`) must independently invoke `requireUser()` (or `requireAdmin()`) at the top of its execution block.
3. **Role-Based Permissions:**
   - `ADMIN`: User management, credential updates, and global site settings.
   - `EDITOR`: Content creation and editing across People, Research, Publications, News, Events, and Gallery.
4. **XSS & Content Sanitization:** All rich text HTML generated by Tiptap or user inputs must be properly validated and sanitized before persistence and rendering.
5. **Zero Secret Leakage:** Environment variables containing credentials (`DATABASE_URL`, `DIRECT_URL`, `AWS_SECRET_ACCESS_KEY`, `AUTH_SECRET`) must never be exposed to the client bundle or committed to source control.
6. **Upload Validation:** File uploads to Neon S3 must validate file MIME types (JPEG, PNG, WebP, PDF) and restrict payload sizes server-side before initiating S3 upload commands.

---

## 6. Styling & Design Token Adherence

- **Token Discipline:** All typography, colors, borders, and spacing must strictly utilize the design tokens defined in `Design.md`:
  - `brand-navy` (`#101B33`), `brand-navy-hover` (`#0B1426`)
  - `accent-cyan` (`#0EA5C4`), `accent-cyan-hover` (`#0B8AA6`)
  - `accent-green` (`#0F7A4D`)
  - `surface` (`#FFFFFF`), `surface-muted` (`#F5F7FA`), `border` (`#E2E8F0`), `ink` (`#0F172A`)
- **No Ad-Hoc Hex Colors:** Never write arbitrary hex values (e.g., `bg-[#123456]`) inside component classes.
- **Image Optimization:** All public imagery must utilize `next/image` with explicit aspect ratios and descriptive `alt` text for screen readers.

---

## 7. Error Handling, Empty States & UX Guidelines

- **Typed Server Action Results:** Server Actions must return a typed response `{ success: boolean; data?: T; error?: string }` within a `try/catch` block rather than throwing unhandled exceptions across the network boundary.
- **Designed Empty States:** Every directory, catalogue, table, or list must include an intentional empty state featuring an icon, informative message, and actionable CTA. Never render a blank screen.
- **Immediate User Feedback:** All mutating operations must trigger user-visible toast notifications (`success` or `error`) confirming the operation outcome.
- **Loading & Skeleton States:** Data-fetching pages must implement dedicated `loading.tsx` skeletons matching the layout grid to prevent cumulative layout shifts (CLS).

---

## 8. Accessibility (a11y) & Performance Budgets

- **Lighthouse Standards:** Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- **WCAG 2.1 AA Compliance:** Color contrast ratios must exceed 4.5:1 for normal text and 3:1 for large headers/UI controls.
- **Keyboard Navigation:** All interactive elements (modals, dropdowns, navigation drawers, lightbox viewer) must support standard keyboard interactions (`Tab`, `Enter`, `Escape`, Arrow keys) with visible focus rings (`ring-2 ring-accent-cyan`).
- **Motion Restraint:** Respect `prefers-reduced-motion` media queries by suppressing non-essential CSS transitions and parallax effects.
