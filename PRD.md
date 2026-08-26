# Product Requirements Document (PRD)

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna 9203, Bangladesh  
**Status:** Comprehensive Technical Specification v2.1 (Full Database & Dashboard CRUD Integration)  
**Last updated:** 2026-08-27  

---

## 1. Executive Summary & Staged Roadmap

CAIRRL Lab requires a complete, end-to-end web platform where **every administrative feature in the dashboard is directly connected to live Neon Lakebase Postgres tables and Neon S3 object storage**, and **every write in the dashboard immediately revalidates and reflects across all public pages**.

### 8-Stage Implementation Roadmap:
1. **Stage 1: Core Dashboard Data Layer & Shared CRUD Components** — Real dashboard query functions, universal modal/delete dialogs, and toast feedback.
2. **Stage 2: People Management Module** — Full CRUD for Faculty & Students with photo support, live table, edit/delete actions, and public profile sync.
3. **Stage 3: Publications Management Module** — Full CRUD for Academic Papers (Journal, Conference, Thesis, Book Chapter) with BibTeX, DOI, featured toggle, and public catalogue sync.
4. **Stage 4: Research Areas & Projects Module** — Full CRUD for Focus Thrust Areas and Experimental Projects with status toggles (`ONGOING`, `COMPLETED`, `PLANNED`) and area multi-mapping.
5. **Stage 5: News & Events Modules** — Full CRUD for News posts (rich text, cover upload, draft/published) and Event calendar items (datetime pickers, location, upcoming/past automatic split).
6. **Stage 6: Gallery & Media Module** — Neon S3 direct upload pipeline (`cairrl` bucket), category management, media deletion, and masonry public display.
7. **Stage 7: Contact Messages Inbox & Site Settings** — Real-time contact inquiry management (mark read, delete) and singleton Site Settings editor.
8. **Stage 8: Dashboard Overview & Verification** — Live analytics metrics, recent activity feeds, role-based safeguards, and 100% test verification.

---

## 2. Institutional Context & Background

CAIRRL currently operates with 2 founding faculty members (Prof. Md. Helal-An-Nahiyan and Asst. Prof. Priyo Nath Roy) and 5 student researchers (1 graduate, 4 undergraduate).

The dashboard must allow non-technical faculty and student coordinators to manage all lab assets without editing TypeScript source files or raw database records.

---

## 3. Core Personas & Detailed Functional User Journeys

| Persona | Primary Goals | Detailed User Journey & Feature Surface |
|---|---|---|
| **Prospective Student** | Evaluate research thrusts, view faculty publications, learn how to join | Visits `/` → explores `/research` → checks `/people/[slug]` publications → visits `/join-us` & `/contact` |
| **External Academic** | Cite papers, explore research areas, access DOI/PDFs | Visits `/publications` → filters by Area/Type/Year → copies BibTeX with 1-click → opens DOI link |
| **Industry Partner** | Review ongoing lab projects and experimental facilities | Explores `/research/projects/[slug]` → browses `/gallery` media archive → submits inquiry via `/contact` |
| **Lab Coordinator / Admin** | Create/Edit/Delete members, papers, news, events, gallery items, settings | Logs in at `/login` → navigates `/dashboard/*` → executes real Server Actions → sees live updates instantly |

---

## 4. End-to-End Entity Specifications & Dashboard CRUD Contracts

### 4.1 People Management (`/dashboard/people` ↔ `/people`, `/people/[slug]`)
- **Entities:** `FacultyMember`, `StudentMember`
- **Dashboard Features:**
  - Tabbed or unified data table listing Name, Role Badge, Department/Program, Research Areas, Order Index, Status.
  - Search by name or department. Role filter (`ALL`, `faculty`, `graduate`, `undergraduate`).
  - **Create Member Dialog:** Full form with validation (Name, Slug, Role, Designation/Program, Department, Bio, Email, Scholar/ResearchGate/LinkedIn URLs, Photo URL/Upload, Order, Status).
  - **Edit Member Dialog:** Pre-filled form with current record values, supporting in-place updates.
  - **Delete Confirmation Dialog:** Safe modal prompting before removing record.
- **Public Impact:** Immediate updates on `/people`, `/people/[slug]`, `/` faculty spotlight, and `/about`.

### 4.2 Publications Management (`/dashboard/publications` ↔ `/publications`, `/`)
- **Entity:** `Publication`
- **Dashboard Features:**
  - Data table with Title, Type Badge, Year, Authors, Venue, Featured Badge, Actions.
  - Search by keyword/author/venue.
  - **Create/Edit Dialog:** Title, Authors string, Venue, Year, Type enum, Abstract, DOI/Link, PDF URL, Featured checkbox, Research Area multi-select.
  - **Delete Dialog:** Confirmation modal.
- **Public Impact:** Immediate updates on `/publications`, `/` featured publications, `/people/[slug]` authored papers list, and `/research/[areaSlug]`.

### 4.3 Research Areas & Projects (`/dashboard/research` ↔ `/research`, `[areaSlug]`, `[projectSlug]`)
- **Entities:** `ResearchArea`, `Project`
- **Dashboard Features:**
  - Segmented views for Areas and Projects.
  - **Area CRUD:** Name, Slug, Description, Cover Image URL.
  - **Project CRUD:** Title, Slug, Summary, Rich Description, Status (`PLANNED`, `ONGOING`, `COMPLETED`), Start/End Dates, Cover Image URL, Research Area linkage.
- **Public Impact:** Immediate updates on `/research`, `/research/[areaSlug]`, `/research/projects/[projectSlug]`, and `/` focus areas.

### 4.4 News & Events (`/dashboard/news`, `/dashboard/events` ↔ `/news`, `/events`, `/`)
- **Entities:** `NewsPost`, `Event`
- **Dashboard Features:**
  - **News CRUD:** Title, Slug, Excerpt, Rich HTML Body, Cover Image, Publish Date, Status (`DRAFT`, `PUBLISHED`).
  - **Event CRUD:** Title, Slug, Type (`SEMINAR`, `TALK`, `WORKSHOP`, `DEFENSE`, `OTHER`), Start DateTime, End DateTime, Location, IsOnline toggle, Description, Status.
- **Public Impact:** Immediate updates on `/news`, `/news/[slug]`, `/events`, `/events/[slug]`, and `/` latest news/events cards.

### 4.5 Media Gallery (`/dashboard/gallery` ↔ `/gallery`)
- **Entity:** `GalleryItem`
- **Dashboard Features:**
  - Image grid with preview, caption, category tag, creation date.
  - S3 Upload Dropzone: Drag & drop image upload directly to Neon S3 (`cairrl` bucket) returning HTTPS URL.
  - Delete confirmation.
- **Public Impact:** Immediate updates on `/gallery` masonry grid and lightbox viewer.

### 4.6 Contact Messages Inbox (`/dashboard/messages` ↔ `/contact`)
- **Entity:** `ContactMessage`
- **Dashboard Features:**
  - Real-time inbox of visitor inquiries with Unread badge indicator.
  - Detail drawer/modal to read full message body, sender email, and timestamp.
  - Mark as Read / Mark as Unread toggle action.
  - Delete inquiry action.
- **Public Impact:** Contact submissions from `/contact` appear instantly in the inbox.

### 4.7 Global Site Settings (`/dashboard/settings` ↔ `/`, `/about`, `/contact`, Footer)
- **Entity:** `SiteSetting` (Singleton `id: "singleton"`)
- **Dashboard Features:**
  - Lab Full Name, Short Name, Tagline, Mission Statement, Address, Contact Email, Phone, Social Links (Google Scholar, ResearchGate, LinkedIn, Facebook).
  - Save button triggering `updateSiteSettings` Server Action with toast notification.
- **Public Impact:** Immediate updates across homepage hero/taglines, about mission/vision, contact coordinates, and footer links.

---

## 5. Non-Functional & Quality Requirements

1. **Zero Fake UI / Zero `alert()` calls:** All UI interactions must use production components (Dialogs, Toasts, Skeletons).
2. **Instant Cache Invalidation:** Every mutating Server Action must call `revalidatePath()` for all affected public and dashboard paths.
3. **Optimistic & Error Resilient:** Forms must display clear loading states (`isSubmitting`) and return descriptive error messages upon failure.
4. **Strict Security & RBAC:** All mutations verify `requireUser()` or `requireAdmin()` on the server side.
5. **Zero Fabrication:** Only authorized real lab data from `PRD.md §13` is seeded.

---

## 6. Official Seed Roster (Source of Truth)

### Faculty Members
1. **Md. Helal-An-Nahiyan** — Mechanical Engineering, KUET — Robotics & Control, Mechatronics, Additive Manufacturing — [Profile](https://scholar.google.com/citations?user=rkOGMxgAAAAJ&hl=en)
2. **Priyo Nath Roy** — Mechatronics Engineering, KUET — Industrial robot control, UAV/eVTOL control, IoT — [Profile](https://scholar.google.com/citations?user=l8HwgY8AAAAJ&hl=en)

### Graduate Student Researcher
1. **Mashrul Khan** — M.Sc. in Mechatronics / Mechanical Engineering

### Undergraduate Student Researchers
1. **Hafizur Rahman** — B.Sc. in Mechatronics Engineering
2. **Gazi Faysal Jubayer** — B.Sc. in Mechatronics Engineering
3. **Rahat** — B.Sc. in Engineering
4. **Sojib** — B.Sc. in Engineering
