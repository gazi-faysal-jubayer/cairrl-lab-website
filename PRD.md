# Product Requirements Document (PRD)

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory  
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna 9203, Bangladesh  
**Status:** Comprehensive Technical Specification v2.0 (100% Detailed)  
**Last updated:** 2026-08-27  

---

## 1. Executive Summary

CAIRRL Lab is an interdisciplinary robotics and intelligent-systems research laboratory established at KUET, unifying advanced research across the **Department of Mechanical Engineering** and the **Department of Mechatronics Engineering**.

The lab requires an authoritative, modern, and high-performance web platform modeled on premier international robotics institutes such as [Carnegie Mellon University Robotics Institute (CMU RI)](https://www.ri.cmu.edu/) and [George Mason University Autonomy and Robotics Center (MARC)](https://marc.gmu.edu/).

### Key Platform Objectives:
1. **Establish Academic Authority & Global Visibility:** Present a polished, high-fidelity digital presence for international collaborators, prospective students, and KUET administration.
2. **Comprehensive Research & Academic Showcase:** Elegantly display faculty, student researchers, research focus areas, active/completed projects, and peer-reviewed publications with faceted filtering and search.
3. **Dynamic Content Management System (CMS):** Empower non-technical lab faculty and student admins to effortlessly publish news, schedule seminars/events, update project milestones, upload media assets, and manage publications without writing code.
4. **Scalable Information Architecture (IA):** Ensure the platform feels complete, dense, and intentional with the founding 7-member team, while effortlessly scaling to 50+ members, hundreds of papers, and dozens of funded projects over the next decade.

---

## 2. Institutional Context & Background

CAIRRL currently operates with 2 founding faculty members (Prof. Md. Helal-An-Nahiyan and Asst. Prof. Priyo Nath Roy) and 5 student researchers (1 graduate, 4 undergraduate). 

Until now, the lab possessed no unified digital presence. In order to attract competitive research grants, recruit high-caliber graduate researchers, and interface with international robotics conferences (IEEE ICRA, IROS, etc.), the lab requires a dedicated web platform connected to live cloud infrastructure (Neon Lakebase Postgres and S3-compatible object storage).

---

## 3. Core Personas & User Journeys

| Persona | Primary Goals | Key User Journey |
|---|---|---|
| **Prospective Graduate/Undergrad Student** | Evaluate research focus, review faculty publications, learn how to join the lab | Lands on Home → explores Research Areas → inspects Faculty profiles & Google Scholar links → visits Join Us / Contact to apply |
| **External Academic / Research Collaborator** | Discover active lab research, cite recent papers, verify lab credentials | Visits Publications → searches/filters by area or year → reads abstracts → accesses DOI/PDF links → reaches out via Contact |
| **Industry Partner / Funding Agency** | Review lab capabilities, infrastructure, and ongoing project deliverables | Explores Projects & Gallery → checks faculty expertise → initiates dialogue via Contact form |
| **KUET Faculty & Student Lab Admin** | Update publications, post lab news, schedule defense/seminars, manage messages | Logs in via `/login` → accesses `/dashboard` → performs CRUD operations with immediate live public reflection |

---

## 4. Comprehensive Information Architecture & Route Map

```
cairrl-lab-website/
├── (public)
│   ├── / ............................ Homepage (Hero, Live Stats, Focus Areas, Faculty, Featured Pubs, News, Events, CTA)
│   ├── /about ....................... Mission, Vision, Institutional Affiliation, Research Philosophy, Story
│   ├── /people ...................... People Directory (Segmented: Faculty, Graduate, Undergraduate)
│   │   └── /people/[slug] ........... Individual Researcher Profile (Bio, Areas, Connected Publications, Social Links)
│   ├── /research .................... Research Overview & Active Projects Grid
│   │   ├── /research/[areaSlug] ..... Research Area Detail (Overview, Associated Researchers, Projects, Publications)
│   │   └── /research/projects/[slug] Project Detail (Milestones, Rich Description, Related Papers, Gallery Items)
│   ├── /publications ................ Faceted Academic Catalogue (Search by Title/Author, Filters by Type, Year, Area, BibTeX)
│   ├── /news ........................ News Archive (Cover Images, Dates, Categories, Excerpts)
│   │   └── /news/[slug] ............. Full News Article (Rich Text HTML, Date, Author attribution)
│   ├── /events ...................... Events Directory (Upcoming vs. Past Split, Date badges, Online/Physical indicators)
│   │   └── /events/[slug] ........... Event Detail (Schedule, Venue/Meeting Link, Agenda)
│   ├── /gallery ..................... Visual Archive (Masonry Grid, Category Filtering, Lightbox Modal Viewer)
│   ├── /join-us ..................... Research Tracks (B.Sc. Thesis, M.Sc./Ph.D. Research, Application Instructions & FAQ)
│   └── /contact ..................... Interactive Contact Form (Honeypot, Zod-validated) & Institutional Coordinates
│
├── (auth)
│   └── /login ....................... Secure Administrative Login Portal (Session management)
│
└── (dashboard) [Protected]
    ├── /dashboard ................... Administrative Command Center (Live metrics, quick actions, recent messages)
    ├── /dashboard/people ............ People Management (Faculty & Student CRUD, ordering, photo uploads)
    ├── /dashboard/research .......... Research Focus Areas & Projects Management (Slug generation, status toggles)
    ├── /dashboard/publications ...... Publications CRUD (Type categorization, DOI links, abstract editor)
    ├── /dashboard/news .............. News Publisher (Rich Text Tiptap editor, cover image uploader, draft/publish toggle)
    ├── /dashboard/events ............ Event Scheduler (Date-time pickers, event types, venue configuration)
    ├── /dashboard/gallery ........... Media Manager (Image uploads to Neon S3, captions, category tagging)
    ├── /dashboard/messages .......... Contact Form Inbox (Read/Unread status, submission timestamps)
    ├── /dashboard/settings .......... Global Lab Settings (Lab name, mission statement, contact email, social links)
    └── /dashboard/users ............. User & Role Management (Admin / Editor credentials, RBAC)
```

---

## 5. Detailed Functional Specifications per Section

### 5.1 Homepage (`/`)
- **Hero Section:** High-contrast `brand-navy` background with dynamic grid overlay, subtle cyan ambient blur orbs, prominent institutional subtitle, lab title, mission tagline, and primary CTAs (`Meet the Team`, `Explore Research`).
- **Live Metric Counter:** Real-time synchronized counters reading directly from Neon Postgres:
  - Total Faculty (`FacultyMember` count)
  - Active Members (`FacultyMember` + `StudentMember` count)
  - Research Areas (`ResearchArea` count)
  - Published Works (`Publication` count)
- **Research Highlights:** 6 distinct focus area cards with custom icons, descriptions, and dynamic metadata badge indicators.
- **Faculty Spotlight:** Dedicated cards for founding faculty featuring photo, title, department, and area badges.
- **Featured Publications:** Top highlighted publications with type badge, year, authors, venue, and DOI direct link.
- **Latest News & Upcoming Events:** 3 most recent published articles and upcoming calendar items.
- **Call to Action (CTA):** Highlighting research recruitment and thesis opportunities.

### 5.2 About Page (`/about`)
- **Mission & Vision:** Structured dual cards displaying the lab's core academic mission and long-term vision.
- **Institutional Affiliation:** Explicit connection to the Department of Mechanical Engineering and Department of Mechatronics Engineering at KUET.
- **Founding Narrative:** The founding story of CAIRRL Lab (est. 2026), its interdisciplinary philosophy, and core objectives.

### 5.3 People Directory & Profile System (`/people`, `/people/[slug]`)
- **Directory Hierarchy:** Tabbed or segmented view grouping members into Faculty, Graduate Researchers, and Undergraduate Researchers.
- **Avatar System:** Supports high-resolution portrait photos from Neon S3; falls back to deterministic, name-hashed gradient avatars with initials.
- **Dynamic Profile Pages (`/people/[slug]`):**
  - Full biographical details, designation, department, and academic degree program.
  - Linked Research Areas.
  - Integrated Publications List: dynamically queries all publications authored or co-authored by the researcher.
  - Academic & Professional Outbound Links: Google Scholar, ResearchGate, LinkedIn, and official KUET email.

### 5.4 Research Areas & Projects (`/research`, `/research/[areaSlug]`, `/research/projects/[slug]`)
- **Research Areas Overview:** Rich visual cards featuring custom icons, gradient accents, researcher counts, project counts, and publication counts.
- **Area Detail Page (`/research/[areaSlug]`):** In-depth domain description, list of associated faculty & student researchers, ongoing projects, and all publications mapped to the area.
- **Project Detail Page (`/research/projects/[slug]`):** Project status (`PLANNED`, `ONGOING`, `COMPLETED`), start/end dates, full project description, linked publications, and image gallery.

### 5.5 Academic Publications Catalogue (`/publications`)
- **Multi-dimensional Filtering:**
  - Real-time text search across paper titles, author lists, and venues.
  - Type filter: `All`, `Journal`, `Conference`, `Thesis`, `Preprint`, `Book Chapter`.
  - Year filter: Dynamically computed from database publication years.
  - Research Area filter: Categorized by focus domains.
- **Publication Card Features:**
  - Publication metadata: Title, author string, venue, year, publication type badge.
  - Interactive collapsible abstract toggle with smooth animation.
  - Direct DOI / PDF outbound action buttons.
  - One-click BibTeX citation generator and clipboard copy utility.

### 5.6 News & Events (`/news`, `/news/[slug]`, `/events`, `/events/[slug]`)
- **News Engine:** Grid view of published news posts with cover image, publication date, excerpt, and full rich-text reading page.
- **Events Calendar:** Clear separation between **Upcoming Events** and **Past Events**.
  - Calendar date stack (Month abbreviation, numeric day, year).
  - Event type categorization (`Seminar`, `Talk`, `Workshop`, `Defense`, `Other`).
  - Online vs. In-person indicator with venue or meeting details.

### 5.7 Gallery Archive (`/gallery`)
- **Masonry Layout:** Responsive multi-column layout supporting variable aspect ratio images.
- **Category Filter Tabs:** Dynamic category sorting (`Lab & Facilities`, `Robotics Demos`, `Workshops & Events`, `Team`).
- **Interactive Lightbox:** Fullscreen modal with image zoom, keyboard navigation (Left/Right arrows, Escape), captions, and image index counter.

### 5.8 Join Us & Contact (`/join-us`, `/contact`)
- **Join Us:** Clear guidelines for undergraduate B.Sc. thesis students and prospective M.Sc./Ph.D. researchers, including required prerequisites, research commitment, and application workflow.
- **Contact Form:** Interactive form featuring Zod validation, honeypot anti-spam protection, success notifications, and instant database ingestion into the Admin Messages inbox.
- **Lab Coordinates:** Physical address at KUET campus, contact email, and institutional affiliation.

### 5.9 Administrative Dashboard (`/dashboard/*`)
- **Role-Based Access Control (RBAC):** `ADMIN` (full system privileges) and `EDITOR` (content management).
- **CRUD Suites:** Complete data management tables for People, Research Areas, Projects, Publications, News, Events, Gallery, Settings, and Users.
- **Object Storage Integration:** Direct image upload to Neon S3 storage with auto-generated public URLs.
- **Rich Text Authoring:** Tiptap WYSIWYG editor for news posts and project narratives.
- **Contact Inbox:** Live management interface to review incoming inquiries, mark them as read, or delete spam.

---

## 6. Non-Functional & Quality Requirements

1. **Performance:** 
   - Lighthouse Performance Score ≥ 90 on all public pages.
   - Core Web Vitals compliance (LCP < 2.0s, CLS < 0.05, FID/INP < 100ms).
   - Incremental Static Regeneration (ISR) and React `cache()` deduplication on all database queries.
2. **Security:**
   - Server-side session verification in App Router layouts and Server Actions.
   - Zero exposure of server secrets (`DATABASE_URL`, `AWS_SECRET_ACCESS_KEY`, `AUTH_SECRET`) to the browser bundle.
   - Input sanitization and Zod server-side validation on every mutation.
3. **Accessibility (a11y):**
   - WCAG 2.1 Level AA compliance.
   - Semantic HTML5 structure (`main`, `section`, `article`, `header`, `footer`, `nav`).
   - High contrast ratios (brand-navy and accent-cyan contrast validated).
   - Complete keyboard navigability and `prefers-reduced-motion` compliance.
4. **SEO & Discoverability:**
   - Automated dynamic `sitemap.xml` and `robots.txt`.
   - Comprehensive OpenGraph and Twitter card metadata for every route.
   - Structured JSON-LD schemas for `Organization`, `Person`, and `ScholarlyArticle`.

---

## 7. Official Seed Roster (Source of Truth)

Strict adherence to actual lab personnel. Fabricating members, titles, or publications is strictly prohibited (`Rules.md §8`).

### Faculty Members
1. **Md. Helal-An-Nahiyan**
   - Designation: Professor / Associate Professor
   - Department: Department of Mechanical Engineering, KUET
   - Research Areas: Robotics & Control, Mechatronics Systems, Additive Manufacturing
   - Google Scholar: [Profile Link](https://scholar.google.com/citations?user=rkOGMxgAAAAJ&hl=en)
2. **Priyo Nath Roy**
   - Designation: Assistant Professor
   - Department: Department of Mechatronics Engineering, KUET
   - Research Areas: Industrial Robot Control, UAV/eVTOL Control, IoT & Embedded Systems
   - Google Scholar: [Profile Link](https://scholar.google.com/citations?user=l8HwgY8AAAAJ&hl=en)

### Graduate Student Researchers
1. **Mashrul Khan**
   - Degree: M.Sc. in Mechatronics / Mechanical Engineering
   - Focus: Robotics and Autonomous Control

### Undergraduate Student Researchers
1. **Hafizur Rahman** — B.Sc. in Mechatronics Engineering
2. **Gazi Faysal Jubayer** — B.Sc. in Mechatronics Engineering
3. **Rahat** — B.Sc. in Engineering
4. **Sojib** — B.Sc. in Engineering
