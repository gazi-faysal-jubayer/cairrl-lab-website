# Phases.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** Comprehensive Multi-Stage Implementation Plan v2.1 (Full End-to-End Database & Dashboard Sync)  
**Last updated:** 2026-08-27  

---

## 8-Stage Detailed Implementation Plan

The remaining implementation work is organized into 8 explicit stages. Every stage connects the dashboard CRUD interface to real Server Actions and Neon Lakebase Postgres tables, with instant cache revalidation reflecting on public pages.

---

### Stage 1 — Core Dashboard Data Layer & Shared CRUD Infrastructure
**Goal:** Create shared query functions, reusable modal forms, delete confirmation dialogs, toast notification system, and the S3 file upload API.

- [ ] Add `getContactMessages()`, `getDashboardMetrics()`, and full query helpers to `src/lib/db/queries.ts`.
- [ ] Implement Neon S3 upload API route (`src/app/api/upload/route.ts`) for direct media uploads.
- [ ] Build reusable `DeleteConfirmDialog` component with loading state and action dispatch.
- [ ] Ensure toast notification provider is active across the dashboard shell.

**Exit Criteria:** S3 upload API accepts files and returns public URLs; shared dialogs and query helpers compile cleanly.

---

### Stage 2 — People Management Module (Faculty & Students)
**Goal:** Full end-to-end CRUD for Faculty and Student researchers connected to Neon Postgres.

- [ ] Complete Server Actions in `src/lib/actions/people-actions.ts` (`saveFacultyMember`, `deleteFacultyMember`, `saveStudentMember`, `deleteStudentMember`).
- [ ] Rewrite `src/app/(dashboard)/dashboard/people/page.tsx` as a Server Component fetching live members from DB, or pass initial data to an interactive client table.
- [ ] Build real `MemberDialog` with pre-filled edit mode, validation, photo URL/upload, and research area multi-select.
- [ ] Connect delete buttons to real delete Server Actions with `DeleteConfirmDialog`.
- [ ] Verify adding/editing/deleting a member immediately reflects on `/people`, `/people/[slug]`, and `/`.

**Exit Criteria:** An administrator can create, update, or delete a faculty/student member from `/dashboard/people` and see changes immediately on public profile pages.

---

### Stage 3 — Publications Management Module
**Goal:** Full end-to-end CRUD for academic publications with BibTeX, DOI, and featured toggling.

- [ ] Complete Server Actions in `src/lib/actions/publication-actions.ts` (`savePublication`, `deletePublication`, `toggleFeaturedPublication`).
- [ ] Rewrite `src/app/(dashboard)/dashboard/publications/page.tsx` to read live publications from DB.
- [ ] Build real `PublicationDialog` supporting Title, Authors, Venue, Year, Type, Abstract, DOI/Link, PDF URL, and Featured checkbox.
- [ ] Connect delete action with confirmation modal.
- [ ] Verify adding/editing/deleting a publication immediately updates `/publications` and `/` featured papers.

**Exit Criteria:** Adding a paper in the dashboard immediately renders in `/publications` with functional search, filtering, abstract expansion, and BibTeX copying.

---

### Stage 4 — Research Areas & Projects Management Module
**Goal:** Full end-to-end CRUD for research focus areas and experimental projects.

- [ ] Complete Server Actions in `src/lib/actions/research-actions.ts` (`saveResearchArea`, `deleteResearchArea`, `saveProject`, `deleteProject`).
- [ ] Rewrite `src/app/(dashboard)/dashboard/research/page.tsx` with live database tabs for Areas and Projects.
- [ ] Build `ResearchAreaDialog` (Name, Slug, Description, Cover Image).
- [ ] Build `ProjectDialog` (Title, Slug, Summary, Rich Description, Status enum, Start/End Dates, Cover Image, Area links).
- [ ] Verify changes reflect immediately on `/research`, `/research/[areaSlug]`, and `/research/projects/[slug]`.

**Exit Criteria:** Full CRUD operational for areas and projects with live public page synchronization.

---

### Stage 5 — News & Events Management Modules
**Goal:** Full end-to-end CRUD for news articles and seminar/event schedules.

- [ ] Complete Server Actions in `src/lib/actions/news-actions.ts` (`saveNewsPost`, `deleteNewsPost`).
- [ ] Complete Server Actions in `src/lib/actions/event-actions.ts` (`saveEvent`, `deleteEvent`).
- [ ] Rewrite `src/app/(dashboard)/dashboard/news/page.tsx` with live news table, Add/Edit modal, and draft/published status toggle.
- [ ] Rewrite `src/app/(dashboard)/dashboard/events/page.tsx` with live events table, datetime pickers, event type dropdown, and venue/online inputs.
- [ ] Verify public reflection on `/news`, `/news/[slug]`, `/events`, `/events/[slug]`, and homepage.

**Exit Criteria:** Lab admin can publish a news article or schedule a seminar through the dashboard and view it instantly on public pages.

---

### Stage 6 — Media Gallery & Neon S3 Upload Module
**Goal:** Full end-to-end media gallery management with direct S3 upload to `cairrl` bucket.

- [ ] Complete Server Actions in `src/lib/actions/gallery-actions.ts` (`saveGalleryItem`, `deleteGalleryItem`).
- [ ] Rewrite `src/app/(dashboard)/dashboard/gallery/page.tsx` with live media grid, category tagging, caption editing, and direct S3 upload dropzone.
- [ ] Verify image deletion removes records and revalidates `/gallery`.
- [ ] Verify public masonry gallery and lightbox display new uploaded photos.

**Exit Criteria:** Uploading a photo via the dashboard persists to Neon S3 and appears instantly on the public `/gallery` page.

---

### Stage 7 — Contact Messages Inbox & Global Site Settings
**Goal:** Real-time inquiry management and singleton site settings editor.

- [ ] Implement `src/lib/actions/message-actions.ts` (`markMessageRead`, `deleteMessage`).
- [ ] Rewrite `src/app/(dashboard)/dashboard/messages/page.tsx` with live inquiries from `ContactMessage` table, unread badges, message detail reader, and delete actions.
- [ ] Complete `src/lib/actions/settings-actions.ts` (`updateSiteSettings`).
- [ ] Rewrite `src/app/(dashboard)/dashboard/settings/page.tsx` with pre-filled form values from `SiteSetting` singleton and real save action.
- [ ] Verify public reflection across `/contact`, `/about`, `/join-us`, and footer coordinates.

**Exit Criteria:** Submitting a message on `/contact` appears in `/dashboard/messages`; updating settings modifies homepage and footer text.

---

### Stage 8 — Dashboard Overview & Final End-to-End Verification
**Goal:** Live analytics dashboard and rock-solid build verification.

- [ ] Rewrite `src/app/(dashboard)/dashboard/page.tsx` to compute live metrics from all database tables (total members, publications, projects, unread messages, recent activity feed).
- [ ] Perform end-to-end testing across every entity CRUD flow.
- [ ] Run `npm run lint` and `npm run build` to verify 0 errors and 0 warnings.
- [ ] Update `Memory.md` with final verification status.

**Exit Criteria:** Dashboard displays accurate real-time metrics; all routes pass production build with zero errors.
