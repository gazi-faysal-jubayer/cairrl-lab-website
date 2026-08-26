# Architecture.md

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh  
**Status:** Comprehensive Technical Architecture v2.0 (100% Detailed)  
**Last updated:** 2026-08-27  

---

## 1. Complete Technology Stack

| Layer | Selected Technology | Version / Specification | Rationale & Operational Notes |
|---|---|---|---|
| **Framework** | **Next.js** | `16.3.3` (App Router, Turbopack) | Modern React Server Components (RSC) architecture, hybrid static/dynamic rendering, built-in image optimization, native Server Actions. |
| **Language** | **TypeScript** | `5.x` (Strict Mode) | Strict typing across components, server actions, database queries, and validation schemas (`noImplicitAny`, `strictNullChecks`). |
| **UI Runtime** | **React** | `19.x` (Server Components Default) | Optimal rendering performance with zero client JS payload for static narrative pages; interactive client components isolated to leaf nodes. |
| **Styling** | **Tailwind CSS** + **shadcn/ui** | Tailwind `v4` | Design-token-driven CSS architecture (`brand-navy`, `accent-cyan`, `accent-green`, `surface-muted`, `ink`), accessible headless UI primitives. |
| **Iconography** | **Lucide React** | `^1.16.0` | High-performance, tree-shakeable vector icons matching the technical aesthetic. |
| **Database & Pooling** | **Neon Lakebase Postgres** | PostgreSQL `17` | Serverless Postgres with automatic branching, autoscaling, and connection pooling (`noisy-moon-93340476`). |
| **ORM & Migrations** | **Prisma ORM** | `^6.19.0` | Type-safe schema definition, client generation, automated migrations, and seed management. |
| **Object Storage** | **Neon S3 Storage** | `@aws-sdk/client-s3` | S3-compatible cloud object storage (`cairrl` bucket, `us-east-2`, `public_read` policy) for researcher photos, cover images, and PDFs. |
| **Validation** | **Zod** | `^3.24.0` | Single source of truth for runtime validation, shared between frontend client forms and backend Server Actions. |
| **Form Handling** | **React Hook Form** | `^7.54.0` | Performant, uncontrolled form validation with `@hookform/resolvers/zod`. |
| **Rich Text Editor** | **Tiptap** | `@tiptap/react` | Headless, extensible WYSIWYG editor for news posts, project descriptions, and event narratives in the dashboard. |
| **Security & Auth** | **Custom Session Auth / Better Auth** | Server-side Cookie Guard | Secure HTTP-only cookie session store with PBKDF2/SHA-256 password hashing and role-based access control (`ADMIN`, `EDITOR`). |
| **Hosting & CI/CD** | **Vercel** | Edge Network & Node.js Runtime | Native Next.js 16 deployment with automatic preview environments per PR and instant static asset caching. |

---

## 2. High-Level Architecture & Data Flow

```
                      ┌─────────────────────────────────────────────────────────────┐
                      │                       Client Browser                        │
                      │   Public Visitors (SSR/ISR)     |    Lab Admins (Dashboard) │
                      └──────────────┬───────────────────────────────┬──────────────┘
                                     │                               │
                                     ▼                               ▼
                      ┌─────────────────────────────────────────────────────────────┐
                      │                    Next.js App Router                       │
                      │                                                             │
                      │   ┌────────────────────────┐   ┌────────────────────────┐   │
                      │   │  (public) Route Group  │   │  (dashboard) Group     │   │
                      │   │  React Server Comps    │   │  Protected SSR Layout  │   │
                      │   │  ISR & React Cache()   │   │  Server-side RBAC Guard│   │
                      │   └───────────┬────────────┘   └───────────┬────────────┘   │
                      │               │                            │                │
                      │               ▼                            ▼                │
                      │   ┌─────────────────────────────────────────────────────┐   │
                      │   │          Server Actions & Query Layer               │   │
                      │   │  src/lib/db/queries.ts  |  src/lib/actions/*.ts     │   │
                      │   │  Shared Zod Schemas     |  XSS Sanitization         │   │
                      │   └───────────┬────────────────────────────┬────────────┘   │
                      └───────────────┼────────────────────────────┼────────────────┘
                                      │                            │
                                      ▼                            ▼
                      ┌───────────────────────────────┐   ┌─────────────────────────┐
                      │         Prisma Client         │   │   Neon S3 Object Store  │
                      │      src/lib/prisma.ts        │   │      src/lib/s3.ts      │
                      └───────────────┬───────────────┘   └─────────────┬───────────┘
                                      │                                 │
                                      ▼                                 ▼
                      ┌───────────────────────────────┐   ┌─────────────────────────┐
                      │    Neon Lakebase Postgres     │   │   S3 Storage Bucket     │
                      │   - Connection Pooler (App)   │   │   - Member Photos       │
                      │   - Direct Connection (Migr)  │   │   - Project Covers      │
                      │   - 11 Fully Relational Tables│   │   - Gallery Media       │
                      └───────────────────────────────┘   └─────────────────────────┘
```

---

## 3. Complete Codebase Directory Map

```
d:\code\website\cairrl-lab-website\
├── .agents/                               # Antigravity agent configuration & rules
│   ├── hooks.json                         # Agent execution hooks
│   └── rules/cairrl-rules.md              # Project directives and coding constraints
├── neon.ts                                # Neon infrastructure-as-code configuration
├── prisma/
│   ├── schema.prisma                      # Full relational PostgreSQL schema definition
│   ├── seed.ts                            # Seed script strictly matching PRD §13
│   └── migrations/                        # Versioned SQL migration history
├── public/                                # Static public assets
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx               # Administrative login portal
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                 # Protected dashboard shell & sidebar nav
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx               # Overview dashboard metrics & quick actions
│   │   │   │   ├── people/page.tsx        # People management CRUD
│   │   │   │   ├── research/page.tsx      # Research areas & projects CRUD
│   │   │   │   ├── publications/page.tsx  # Publications catalogue CRUD
│   │   │   │   ├── news/page.tsx          # News publisher with Tiptap editor
│   │   │   │   ├── events/page.tsx        # Events & seminar scheduler
│   │   │   │   ├── gallery/page.tsx       # Media & gallery manager
│   │   │   │   ├── messages/page.tsx      # Contact inquiries inbox
│   │   │   │   ├── settings/page.tsx      # Lab global configuration
│   │   │   │   └── users/page.tsx         # User credentials & RBAC (Admin only)
│   │   ├── (public)/
│   │   │   ├── layout.tsx                 # Public shell: Navbar, Footer, Container
│   │   │   ├── page.tsx                   # Homepage (Live stats, Focus areas, News, Events)
│   │   │   ├── about/page.tsx             # Mission, Vision, Affiliation, Story
│   │   │   ├── people/
│   │   │   │   ├── page.tsx               # People directory (Faculty, Grad, Undergrad)
│   │   │   │   └── [slug]/page.tsx        # Dynamic individual profile with publications
│   │   │   ├── research/
│   │   │   │   ├── page.tsx               # Research focus areas overview & projects
│   │   │   │   ├── [areaSlug]/page.tsx    # Research area detail with linked researchers
│   │   │   │   └── projects/[projectSlug]/page.tsx # Project detail & publications
│   │   │   ├── publications/page.tsx      # Filterable & searchable academic catalogue
│   │   │   ├── news/
│   │   │   │   ├── page.tsx               # News articles archive
│   │   │   │   └── [slug]/page.tsx        # Full news article view
│   │   │   ├── events/
│   │   │   │   ├── page.tsx               # Events directory (Upcoming vs. Past)
│   │   │   │   └── [slug]/page.tsx        # Event schedule & details
│   │   │   ├── gallery/page.tsx           # Visual archive with masonry & lightbox
│   │   │   ├── join-us/page.tsx           # Thesis & research recruitment information
│   │   │   └── contact/page.tsx           # Contact form & institutional coordinates
│   │   ├── api/
│   │   │   ├── auth/                      # Session & authentication API endpoints
│   │   │   └── upload/                    # Neon S3 file upload handler
│   │   ├── layout.tsx                     # Root layout with fonts, metadata, toast provider
│   │   ├── globals.css                    # Tailwind v4 theme tokens & CSS variables
│   │   ├── not-found.tsx                  # Custom 404 error page
│   │   ├── error.tsx                      # Global error boundary
│   │   ├── robots.ts                      # Dynamic crawler directives
│   │   └── sitemap.ts                     # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── public/                        # Public UI components
│   │   │   ├── navbar.tsx                 # Sticky navigation with mobile drawer
│   │   │   ├── footer.tsx                 # 3-column authoritative footer
│   │   │   ├── stats-strip.tsx            # Live database metric strip
│   │   │   ├── person-card.tsx            # Person card with initials avatar
│   │   │   ├── publication-list.tsx       # Searchable & filterable publications catalogue
│   │   │   ├── gallery-grid.tsx           # Masonry gallery with lightbox viewer
│   │   │   └── contact-form.tsx           # Zod-validated contact form with honeypot
│   │   ├── dashboard/                     # Administrative UI components
│   │   │   ├── sidebar.tsx                # Dashboard navigation sidebar
│   │   │   ├── data-table.tsx             # Reusable data table with search & pagination
│   │   │   ├── image-uploader.tsx         # Drag-and-drop S3 image uploader
│   │   │   └── rich-text-editor.tsx       # Tiptap WYSIWYG editor component
│   │   ├── shared/                        # Shared layouts and wrappers
│   │   │   ├── container.tsx              # Max-width responsive container
│   │   │   ├── section-heading.tsx        # Consistent section header
│   │   │   └── animated-section.tsx       # Scroll-triggered entrance animation
│   │   └── ui/                            # shadcn/ui primitives
│   │       ├── button.tsx, badge.tsx, card.tsx, input.tsx, textarea.tsx, dialog.tsx, etc.
│   ├── lib/
│   │   ├── actions/                       # Server Actions for mutations
│   │   │   ├── people.ts, research.ts, publications.ts, news.ts, events.ts, contact.ts, settings.ts
│   │   ├── db/
│   │   │   └── queries.ts                 # Centralized, cached database query functions
│   │   ├── validations/                   # Shared Zod validation schemas
│   │   │   ├── person.ts, research.ts, publication.ts, news.ts, event.ts, contact.ts, settings.ts
│   │   ├── auth.ts                        # Session verification & password utilities
│   │   ├── auth-guard.ts                  # Server-side requireUser() & requireAdmin()
│   │   ├── prisma.ts                      # Prisma client singleton
│   │   ├── s3.ts                          # Neon S3 storage client & upload helpers
│   │   └── utils.ts                       # Class merging (cn) and formatting helpers
│   └── types/                             # Shared TypeScript declarations
├── .env.example                           # Environment configuration template
├── package.json
├── tsconfig.json
├── PRD.md / Architecture.md / Rules.md / Design.md / Phases.md / Memory.md
```

---

## 4. Complete Prisma Relational Data Model

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  ADMIN
  EDITOR
}

enum StudentLevel {
  UNDERGRAD
  GRAD
  ALUMNI
}

enum ProjectStatus {
  PLANNED
  ONGOING
  COMPLETED
}

enum PublicationType {
  JOURNAL
  CONFERENCE
  THESIS
  PREPRINT
  BOOK_CHAPTER
}

enum EventType {
  SEMINAR
  TALK
  WORKSHOP
  DEFENSE
  OTHER
}

enum ContentStatus {
  DRAFT
  PUBLISHED
}

model User {
  id           String    @id @default(cuid())
  name         String
  email        String    @unique
  passwordHash String?
  role         UserRole  @default(EDITOR)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

model FacultyMember {
  id               String         @id @default(cuid())
  slug             String         @unique
  name             String
  designation      String         // e.g. "Professor", "Assistant Professor"
  department       String         // "Department of Mechanical Engineering" | "Department of Mechatronics Engineering"
  photoUrl         String?
  bio              String?        @db.Text
  email            String?
  googleScholarUrl String?
  researchGateUrl  String?
  linkedinUrl      String?
  researchAreas    ResearchArea[]
  order            Int            @default(0)
  status           ContentStatus  @default(PUBLISHED)
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
}

model StudentMember {
  id               String         @id @default(cuid())
  slug             String         @unique
  name             String
  level            StudentLevel
  program          String?        // e.g. "B.Sc. in Mechatronics Engineering"
  batchOrYear      String?
  photoUrl         String?
  bio              String?        @db.Text
  email            String?
  googleScholarUrl String?
  linkedinUrl      String?
  researchAreas    ResearchArea[]
  order            Int            @default(0)
  status           ContentStatus  @default(PUBLISHED)
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt
}

model ResearchArea {
  id            String          @id @default(cuid())
  slug          String          @unique
  name          String
  description   String          @db.Text
  coverImageUrl String?
  faculty       FacultyMember[]
  students      StudentMember[]
  projects      Project[]
  publications  Publication[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model Project {
  id            String          @id @default(cuid())
  slug          String          @unique
  title         String
  summary       String
  description   String          @db.Text        // Rich text content
  status        ProjectStatus   @default(ONGOING)
  startDate     DateTime?
  endDate       DateTime?
  coverImageUrl String?
  researchAreas ResearchArea[]
  publications  Publication[]
  galleryItems  GalleryItem[]
  contentStatus ContentStatus   @default(PUBLISHED)
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model Publication {
  id            String          @id @default(cuid())
  title         String
  authors       String          // Formatted citation author string
  venue         String          // Journal / Conference name
  year          Int
  type          PublicationType
  abstract      String?         @db.Text
  doiOrLink     String?
  pdfUrl        String?
  featured      Boolean         @default(false)
  researchAreas ResearchArea[]
  project       Project?        @relation(fields: [projectId], references: [id])
  projectId     String?
  status        ContentStatus   @default(PUBLISHED)
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model NewsPost {
  id            String        @id @default(cuid())
  slug          String        @unique
  title         String
  excerpt       String
  body          String        @db.Text     // Rich text HTML
  coverImageUrl String?
  publishedAt   DateTime      @default(now())
  status        ContentStatus @default(PUBLISHED)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Event {
  id            String        @id @default(cuid())
  slug          String        @unique
  title         String
  type          EventType
  description   String        @db.Text
  startAt       DateTime
  endAt         DateTime?
  location      String?
  isOnline      Boolean       @default(false)
  coverImageUrl String?
  status        ContentStatus @default(PUBLISHED)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model GalleryItem {
  id        String   @id @default(cuid())
  imageUrl  String
  caption   String?
  category  String?
  project   Project? @relation(fields: [projectId], references: [id])
  projectId String?
  createdAt DateTime @default(now())
}

model SiteSetting {
  id               String   @id @default("singleton")
  labFullName      String
  labShortName     String
  tagline          String
  missionStatement String   @db.Text
  address          String?
  contactEmail     String?
  phone            String?
  socialLinks      Json?    // { googleScholar, researchGate, linkedin, facebook }
  heroImageUrl     String?
  updatedAt        DateTime @updatedAt
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## 5. Authentication, Authorization & Security Architecture

### 5.1 Defense-in-Depth Auth Guard Workflow
1. **Login Portal (`/login`):** Validates credentials against the `User` table using cryptographically secure password comparison.
2. **Session Cookie:** Generates an encrypted HTTP-only, `SameSite=Lax`, `Secure` session cookie containing user ID and role.
3. **Layout-Level Guard (`src/app/(dashboard)/layout.tsx`):** Every administrative route invokes `requireUser()` on the server before rendering:
   ```ts
   const user = await requireUser();
   if (!user) redirect('/login');
   ```
4. **Role-Based Guards (`requireAdmin()`):** Destructive actions, user creation, and site settings are gated strictly for `UserRole.ADMIN`.
5. **Server Action Protection:** Every Server Action independently re-verifies `requireUser()` at runtime — never relying solely on layout protection.

---

## 6. Cloud Infrastructure & Object Storage (Neon S3)

- **Database:** Neon Lakebase Postgres (`us-east-2`). Uses `DATABASE_URL` with pooled connection (`-pooler`) for serverless query execution, and `DIRECT_URL` for direct schema migrations.
- **S3 Object Storage:** Configured via AWS S3 SDK with endpoint `AWS_ENDPOINT_URL_S3` and bucket `cairrl`.
- **Public Read Access:** Media files (photos, covers, gallery assets) are uploaded with `public-read` ACL, providing persistent HTTPS URLs stored directly in database records.

---

## 7. Rendering, Caching & Revalidation Strategy

- **Public Pages (RSC):** Rendered as React Server Components using `src/lib/db/queries.ts` with React `cache()` for request-level query deduplication.
- **ISR & Dynamic Revalidation:** Server Actions trigger targeted revalidation upon mutations using `revalidatePath('/people')`, `revalidatePath('/publications')`, etc.
- **Dashboard Pages:** Rendered dynamically with `export const dynamic = 'force-dynamic'` to guarantee lab administrators always see live database records.

---

## 8. Required Environment Variables (`.env.example`)

```bash
# Database Connections (Neon Lakebase Postgres)
DATABASE_URL="postgresql://neondb_owner:***@ep-***-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://neondb_owner:***@ep-***.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"

# S3 Object Storage (Neon Storage)
AWS_ENDPOINT_URL_S3="https://br-***.storage.c-5.us-east-2.aws.neon.tech"
AWS_ACCESS_KEY_ID="nak_live_***"
AWS_SECRET_ACCESS_KEY="nsk_live_***"
AWS_REGION="us-east-2"

# Authentication & Application
AUTH_SECRET="your-32-byte-random-auth-secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```
