# Architecture.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** Comprehensive Technical Architecture v2.1 (Full End-to-End Database & Dashboard Flow)  
**Last updated:** 2026-08-27  

---

## 1. Complete Technology Stack & Integration Architecture

| Layer | Component | Implementation Detail |
|---|---|---|
| **Framework** | Next.js 16.3.3 (App Router) | React 19 Server Components default + React Server Actions for mutations. |
| **Language** | TypeScript 5.x | Strict typing across all data queries, actions, forms, and schemas. |
| **Database** | Neon Lakebase Postgres | Serverless PostgreSQL with pooling (`DATABASE_URL`) and direct migrations (`DIRECT_URL`). |
| **ORM** | Prisma ORM 6.4.1 | 11 relational models with Prisma client singleton in `src/lib/prisma.ts`. |
| **Storage** | Neon S3 Object Storage | `@aws-sdk/client-s3` (`cairrl` bucket, `us-east-2`, `public_read` policy). |
| **Upload Pipeline** | API Route `/api/upload` | Multipart form upload buffer streaming to S3 returning HTTPS public URLs. |
| **Validation** | Zod 3.24+ | Single source of truth validation schemas in `src/lib/validations/*.ts`. |
| **State & Forms** | React Hook Form + Zod Resolver | Client form state handling with field-level validation and loading indicators. |
| **Security** | Session Cookie + Auth Guards | `requireUser()` and `requireAdmin()` executed server-side in layouts and actions. |
| **Cache & ISR** | `revalidatePath` + React `cache()` | Request-level query deduplication and immediate path revalidation on write. |

---

## 2. End-to-End Data & Mutation Lifecycle

```
[ Dashboard User Form ] 
          │
          ▼  (Validates via Zod schema client-side)
[ React Server Action ] 
          │
          ├── 1. requireUser() / requireAdmin() Session Guard
          ├── 2. Zod Server-Side Schema Validation
          ├── 3. Prisma Mutation (create / update / delete / upsert)
          │        │
          │        ▼
          │   [ Neon Lakebase Postgres ]
          │
          ├── 4. revalidatePath() for all affected routes
          │        ├── /dashboard/... (Live table refresh)
          │        └── /(public)/... (Instant public reflection)
          │
          ▼  (Returns typed ActionResult { success, message, error })
[ User Feedback (Toast / Dialog Close) ]
```

---

## 3. Server Actions Architecture (`src/lib/actions/*.ts`)

Every entity is backed by dedicated Server Actions with standard return type `ActionResult`:

```ts
export type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};
```

### Action Modules Breakdown:
1. **`people-actions.ts`:**
   - `saveFacultyMember(data)` — Upserts `FacultyMember`, revalidates `/people`, `/people/[slug]`, `/dashboard/people`.
   - `deleteFacultyMember(id)` — Deletes `FacultyMember`, revalidates `/people`, `/dashboard/people`.
   - `saveStudentMember(data)` — Upserts `StudentMember`, revalidates `/people`, `/people/[slug]`, `/dashboard/people`.
   - `deleteStudentMember(id)` — Deletes `StudentMember`, revalidates `/people`, `/dashboard/people`.
2. **`publication-actions.ts`:**
   - `savePublication(data)` — Upserts `Publication` with `researchAreas` relational connects, revalidates `/publications`, `/`, `/dashboard/publications`.
   - `deletePublication(id)` — Deletes `Publication`, revalidates `/publications`, `/dashboard/publications`.
   - `toggleFeaturedPublication(id, featured)` — Updates featured flag, revalidates `/`, `/dashboard/publications`.
3. **`research-actions.ts`:**
   - `saveResearchArea(data)` — Upserts `ResearchArea`, revalidates `/research`, `/research/[areaSlug]`, `/dashboard/research`.
   - `deleteResearchArea(id)` — Deletes `ResearchArea`, revalidates `/research`, `/dashboard/research`.
   - `saveProject(data)` — Upserts `Project` with area connections, revalidates `/research`, `/research/projects/[slug]`, `/dashboard/research`.
   - `deleteProject(id)` — Deletes `Project`, revalidates `/research`, `/dashboard/research`.
4. **`news-actions.ts`:**
   - `saveNewsPost(data)` — Upserts `NewsPost`, revalidates `/news`, `/news/[slug]`, `/`, `/dashboard/news`.
   - `deleteNewsPost(id)` — Deletes `NewsPost`, revalidates `/news`, `/dashboard/news`.
5. **`event-actions.ts`:**
   - `saveEvent(data)` — Upserts `Event`, revalidates `/events`, `/events/[slug]`, `/`, `/dashboard/events`.
   - `deleteEvent(id)` — Deletes `Event`, revalidates `/events`, `/dashboard/events`.
6. **`gallery-actions.ts`:**
   - `saveGalleryItem(data)` — Creates `GalleryItem`, revalidates `/gallery`, `/dashboard/gallery`.
   - `deleteGalleryItem(id)` — Deletes `GalleryItem`, revalidates `/gallery`, `/dashboard/gallery`.
7. **`message-actions.ts`:**
   - `markMessageRead(id, read)` — Updates `ContactMessage.read`, revalidates `/dashboard/messages`.
   - `deleteMessage(id)` — Deletes `ContactMessage`, revalidates `/dashboard/messages`.
8. **`settings-actions.ts`:**
   - `updateSiteSettings(data)` — Upserts `SiteSetting` (singleton), revalidates `/`, `/about`, `/contact`, `/join-us`, `/dashboard/settings`.

---

## 4. Neon S3 Upload API Architecture (`/api/upload`)

- **Route:** `src/app/api/upload/route.ts` (POST)
- **Security:** Checks active user session via `requireUser()`.
- **Validation:** Enforces maximum file size (5MB for images, 20MB for PDFs) and permitted MIME types (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`).
- **Processing:** Streams incoming file buffer directly into Neon S3 bucket `cairrl` using `@aws-sdk/client-s3` `PutObjectCommand` with `public-read` ACL.
- **Output:** Returns JSON `{ success: true, url: "https://.../filename.webp" }`.

---

## 5. Centralized Database Queries (`src/lib/db/queries.ts`)

Centralized, cached query functions for both Public and Dashboard consumers:
- `getFacultyMembers()` & `getStudentMembers()`
- `getFacultyBySlug(slug)` & `getStudentBySlug(slug)`
- `getResearchAreas()` & `getResearchAreaBySlug(slug)`
- `getProjects()` & `getProjectBySlug(slug)`
- `getPublications()` & `getFeaturedPublications()`
- `getNewsPosts()` & `getNewsPostBySlug(slug)`
- `getEvents()` & `getUpcomingEvents()`
- `getGalleryItems()`
- `getContactMessages()` & `getUnreadMessageCount()`
- `getSiteSettings()`
- `getQuickStats()` & `getDashboardMetrics()`
