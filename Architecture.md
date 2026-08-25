# Architecture.md

**Project:** CAIRRL Lab Website
**Last updated:** 2026-08-26

This document defines **how** the system in `PRD.md` gets built: stack, folder structure, data model, routing, auth flow, rendering strategy, and deployment. `Rules.md` governs how the AI should behave while implementing this architecture.

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) | Active LTS as of build time. Use `npx create-next-app@latest` and re-confirm the current stable minor before scaffolding — Next.js ships frequent patches. |
| Language | **TypeScript** (strict mode) | No `any` without justification (`Rules.md`) |
| UI runtime | **React 19** | Server Components by default |
| Styling | **Tailwind CSS** + **shadcn/ui** | Utility-first + accessible headless components; tokens from `Design.md` |
| Icons | **lucide-react** | Matches shadcn/ui, tree-shakeable |
| Forms & validation | **React Hook Form** + **Zod** | One Zod schema shared by client form and server action |
| ORM | **Prisma** | Type-safe DB access, migrations |
| Database | **PostgreSQL** (Neon or Supabase, free tier to start) | Local dev via Docker Postgres or Neon branch DB |
| Auth | **Better Auth** (primary) or **Auth.js v5** (fallback) | Both support the App Router, Prisma adapter, and credentials/email login. Better Auth is the actively-developed option in 2026; Auth.js v5 is the more battle-tested incumbent, now in maintenance mode. Pick one at Phase 7 and record the decision in `Memory.md` — don't install both. |
| Rich text editor | **Tiptap** | For News/Event/Project body content in the dashboard |
| Image/file storage | **Vercel Blob** (primary) or **UploadThing** | Store only the URL in Postgres, not binary blobs |
| Email (contact form, notifications) | **Resend** | Simple transactional email, generous free tier |
| Hosting | **Vercel** | Pairs natively with Next.js + Vercel Blob |
| Analytics (optional) | Vercel Analytics or Plausible | Privacy-friendly, no cookie banner needed |

> Versions drift constantly. At Phase 0, run `npm view next version` (and equivalents) and pin what's actually current — don't assume the exact patch numbers above are still latest.

## 2. High-Level Architecture

```
                ┌───────────────────────────────────────────┐
                │                 Browser                    │
                │   Public site (visitor)  |  Dashboard (staff) │
                └───────────────┬─────────────────┬───────────┘
                                │                 │
                                ▼                 ▼
                ┌───────────────────────────────────────────┐
                │              Next.js (App Router)           │
                │  ┌─────────────┐        ┌─────────────────┐ │
                │  │  Public      │        │  Dashboard       │ │
                │  │  route group │        │  route group      │ │
                │  │  (RSC, ISR)  │        │  (protected, SSR) │ │
                │  └──────┬──────┘        └────────┬────────┘ │
                │         │  Server Actions / route handlers   │
                └─────────┼──────────────────────────┼─────────┘
                          ▼                          ▼
                ┌────────────────┐         ┌──────────────────┐
                │  Prisma Client  │         │  Auth (Better     │
                │                 │         │  Auth / Auth.js)  │
                └────────┬────────┘         └─────────┬────────┘
                         ▼                             ▼
                ┌────────────────┐         ┌──────────────────┐
                │  PostgreSQL     │         │  Sessions table   │
                │  (Neon/Supabase)│◄────────┤  (same Postgres)  │
                └────────────────┘         └──────────────────┘

        Also reachable from Server Actions / route handlers:
        → Vercel Blob (image uploads)     → Resend (emails)
```

- **Public route group**: mostly React Server Components, statically generated at build time and revalidated (ISR) when content changes in the dashboard.
- **Dashboard route group**: Server-rendered per request, protected by session + role checks in a layout-level guard (not middleware alone — see `Rules.md §6`).
- All writes go through **Server Actions** validated with the shared Zod schemas; the dashboard has no separate REST/GraphQL API to maintain.

## 3. Folder Structure

```
cairrl-lab/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts                  # seeds the real roster from PRD.md §13
│   └── migrations/
├── public/
│   └── ...static assets, favicon, og-image
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx        # public navbar + footer
│   │   │   ├── page.tsx          # Home
│   │   │   ├── about/page.tsx
│   │   │   ├── people/
│   │   │   │   ├── page.tsx      # directory (faculty/grad/undergrad tabs)
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── research/
│   │   │   │   ├── page.tsx      # research areas overview
│   │   │   │   ├── [areaSlug]/page.tsx
│   │   │   │   └── projects/[projectSlug]/page.tsx
│   │   │   ├── publications/page.tsx
│   │   │   ├── news/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── events/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   ├── join-us/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx        # auth guard + sidebar nav
│   │   │   ├── dashboard/page.tsx  # overview/home
│   │   │   ├── dashboard/people/...
│   │   │   ├── dashboard/research/...
│   │   │   ├── dashboard/publications/...
│   │   │   ├── dashboard/news/...
│   │   │   ├── dashboard/events/...
│   │   │   ├── dashboard/gallery/...
│   │   │   ├── dashboard/messages/...   # contact form inbox
│   │   │   ├── dashboard/settings/...
│   │   │   └── dashboard/users/...      # Admin-only
│   │   ├── login/page.tsx
│   │   ├── api/
│   │   │   └── auth/[...all]/route.ts   # Better Auth / Auth.js handler
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── layout.tsx            # root layout, fonts, metadata
│   ├── components/
│   │   ├── ui/                   # shadcn/ui primitives (generated, rarely hand-edited)
│   │   ├── public/                # Navbar, Footer, Hero, NewsCard, PersonCard, etc.
│   │   ├── dashboard/              # DataTable, ImageUploader, RichTextEditor wrapper
│   │   └── shared/                 # things used on both sides
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── auth.ts                # auth config
│   │   ├── auth-guard.ts          # requireUser()/requireAdmin() helpers
│   │   ├── validations/           # Zod schemas, one file per entity
│   │   ├── actions/               # Server Actions, one file per entity
│   │   └── utils.ts
│   ├── types/
│   └── styles/globals.css
├── .env.example
├── Rules.md / PRD.md / Architecture.md / Phases.md / Design.md / Memory.md   # kept at repo root
└── package.json
```

## 4. Data Model (Prisma schema, outline)

```prisma
enum UserRole { ADMIN EDITOR }
enum StudentLevel { UNDERGRAD GRAD ALUMNI }
enum ProjectStatus { PLANNED ONGOING COMPLETED }
enum PublicationType { JOURNAL CONFERENCE THESIS PREPRINT BOOK_CHAPTER }
enum EventType { SEMINAR TALK WORKSHOP DEFENSE OTHER }
enum ContentStatus { DRAFT PUBLISHED }

model User {                       // dashboard login, NOT public-facing "People"
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  passwordHash  String?             // if using credentials
  role          UserRole @default(EDITOR)
  createdAt     DateTime @default(now())
}

model FacultyMember {
  id                 String   @id @default(cuid())
  slug               String   @unique
  name               String
  designation        String              // e.g. "Professor"
  department         String              // "Mechanical Engineering" | "Mechatronics Engineering"
  photoUrl           String?
  bio                String?  @db.Text
  email              String?
  googleScholarUrl   String?
  researchGateUrl    String?
  linkedinUrl        String?
  researchAreas      ResearchArea[]      // many-to-many
  order              Int      @default(0)
  status             ContentStatus @default(PUBLISHED)
}

model StudentMember {
  id             String   @id @default(cuid())
  slug           String   @unique
  name           String
  level          StudentLevel
  program        String?             // e.g. "B.Sc. in Mechatronics Engineering"
  batchOrYear    String?
  photoUrl       String?
  bio            String?  @db.Text
  email          String?
  googleScholarUrl String?
  linkedinUrl    String?
  researchAreas  ResearchArea[]
  order          Int      @default(0)
  status         ContentStatus @default(PUBLISHED)
}

model ResearchArea {
  id           String   @id @default(cuid())
  slug         String   @unique
  name         String
  description  String   @db.Text
  coverImageUrl String?
  faculty      FacultyMember[]
  students     StudentMember[]
  projects     Project[]
  publications Publication[]
}

model Project {
  id             String   @id @default(cuid())
  slug           String   @unique
  title          String
  summary        String
  description    String   @db.Text        // rich text
  status         ProjectStatus @default(ONGOING)
  startDate      DateTime?
  endDate        DateTime?
  coverImageUrl  String?
  researchAreas  ResearchArea[]
  publications   Publication[]
  galleryItems   GalleryItem[]
  contentStatus  ContentStatus @default(PUBLISHED)
}

model Publication {
  id            String   @id @default(cuid())
  title         String
  authors       String            // "M. Roy, P. N. Roy, ..." simple string for v1
  venue         String
  year          Int
  type          PublicationType
  abstract      String?  @db.Text
  doiOrLink     String?
  pdfUrl        String?
  featured      Boolean  @default(false)
  researchAreas ResearchArea[]
  project       Project? @relation(fields: [projectId], references: [id])
  projectId     String?
  status        ContentStatus @default(PUBLISHED)
}

model NewsPost {
  id           String   @id @default(cuid())
  slug         String   @unique
  title        String
  excerpt      String
  body         String   @db.Text     // rich text HTML
  coverImageUrl String?
  publishedAt  DateTime @default(now())
  status       ContentStatus @default(DRAFT)
}

model Event {
  id           String   @id @default(cuid())
  slug         String   @unique
  title        String
  type         EventType
  description  String   @db.Text
  startAt      DateTime
  endAt        DateTime?
  location     String?
  isOnline     Boolean  @default(false)
  coverImageUrl String?
  status       ContentStatus @default(PUBLISHED)
}

model GalleryItem {
  id         String   @id @default(cuid())
  imageUrl   String
  caption    String?
  category   String?
  project    Project? @relation(fields: [projectId], references: [id])
  projectId  String?
  createdAt  DateTime @default(now())
}

model SiteSetting {                  // singleton row, id fixed to "singleton"
  id                String  @id @default("singleton")
  labFullName        String
  labShortName        String
  tagline             String
  missionStatement     String  @db.Text
  address              String?
  contactEmail          String?
  phone                 String?
  socialLinks           Json?         // { facebook, linkedin, youtube, ... }
  heroImageUrl           String?
}

model ContactMessage {
  id          String   @id @default(cuid())
  name        String
  email       String
  subject     String?
  message     String   @db.Text
  read        Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

Notes:
- `slug` fields power clean URLs (`/people/priyo-nath-roy`, `/research/robotics-and-control`).
- `ContentStatus` (Draft/Published) gates visibility on the public site for News, Events, Publications, and Projects — dashboard users see both.
- Junction tables for the many-to-many relations (`FacultyMember`↔`ResearchArea`, etc.) are implicit Prisma relation tables; make them explicit only if extra fields are ever needed on the relation itself.

## 5. Routing Map

| Route | Access | Rendering |
|---|---|---|
| `/` | Public | Static + ISR |
| `/about` | Public | Static |
| `/people`, `/people/[slug]` | Public | Static + ISR |
| `/research`, `/research/[areaSlug]` | Public | Static + ISR |
| `/research/projects/[projectSlug]` | Public | Static + ISR |
| `/publications` | Public | Static + ISR (revalidate on publish) |
| `/news`, `/news/[slug]` | Public | Static + ISR |
| `/events`, `/events/[slug]` | Public | Static + ISR |
| `/gallery` | Public | Static + ISR |
| `/join-us`, `/contact` | Public | Static |
| `/login` | Public | Dynamic |
| `/dashboard/*` | Admin/Editor only | Dynamic, no caching |
| `/api/auth/*` | Auth provider handler | N/A |

## 6. Auth & Authorization Flow

1. Lab member visits `/login`, submits credentials (or requests a magic link via Resend).
2. Auth library validates against the `User` table (Prisma adapter) and issues a session.
3. Every route under `(dashboard)` is wrapped by a **server-side** check in `layout.tsx` — call `requireUser()` from `lib/auth-guard.ts`, redirect to `/login` if absent.
4. Admin-only screens (`/dashboard/users`, `/dashboard/settings`) additionally call `requireAdmin()`.
5. **Do not rely on middleware alone** for protection — check session in the server component/action itself, since middleware-only protection has known bypass classes. Middleware may still be used for a fast redirect, but it is a UX nicety, not the security boundary.
6. Server Actions that mutate data re-check the session/role themselves — never trust that "the page was protected" is enough, since actions can be invoked directly.

## 7. Rendering & Caching Strategy

- Public pages: generate statically at build time where possible; use `revalidatePath()` / `revalidateTag()` from the relevant Server Action after a dashboard write so content updates without a full redeploy.
- Dashboard pages: always dynamic (`export const dynamic = 'force-dynamic'`), no ISR — staff need to see live data.
- Images: always through `next/image` with explicit `sizes`, sourced from Vercel Blob (or UploadThing) URLs.

## 8. Third-Party Integrations

| Service | Purpose | Notes |
|---|---|---|
| Resend | Contact form notification email, magic-link email (if used) | Free tier sufficient at this scale |
| Vercel Blob | Image/file storage for photos, cover images, PDFs | Store only the returned URL in Postgres |
| Neon / Supabase Postgres | Database | Neon's branching is handy for preview deployments |
| Google Scholar / ResearchGate | **Link-out only** — no scraping/automated import in v1 | Respect ToS; revisit if a v2 integration is wanted |

## 9. Environment Variables (`.env.example`)

```
DATABASE_URL=
DIRECT_URL=                 # if using a pooled Neon connection
AUTH_SECRET=
AUTH_URL=                   # e.g. http://localhost:3000 in dev
RESEND_API_KEY=
BLOB_READ_WRITE_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

Never commit `.env`. Keep `.env.example` in sync whenever a new variable is introduced (`Rules.md §6`).

## 10. Deployment Topology

- **Frontend + Server Actions + API routes:** Vercel (Production + Preview deployments per PR)
- **Database:** Neon or Supabase Postgres, single production instance; a branch/preview DB for staging if budget allows
- **File storage:** Vercel Blob, same account as hosting
- **Email:** Resend, verified sending domain once the lab has one (fall back to Resend's shared domain during development)
- **DNS:** points at whatever domain the lab settles on (KUET subdomain or a lab-owned domain) — not a build blocker per `PRD.md §10`
