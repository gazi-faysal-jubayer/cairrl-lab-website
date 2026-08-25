# Product Requirements Document (PRD)

**Project:** CAIRRL Lab Website — Centre for Advanced Intelligent Robotics Research Laboratory
**Institution:** Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh
**Status:** Draft v1.0
**Last updated:** 2026-08-26

---

## 1. Executive Summary

CAIRRL Lab is a newly formed, interdisciplinary robotics and intelligent-systems research lab at KUET, bridging the Department of Mechanical Engineering and the Department of Mechatronics Engineering. The lab needs a professional web presence, modeled on established robotics institute sites such as [Carnegie Mellon's Robotics Institute](https://www.ri.cmu.edu/) and [George Mason's Mason Autonomy and Robotics Center (MARC)](https://marc.gmu.edu/), in order to:

- Establish credibility and visibility for a brand-new lab
- Showcase people, research areas, projects, and publications
- Attract prospective undergraduate and graduate researchers
- Let faculty and students keep the site current without touching code

This document defines **what** is being built, **for whom**, and **which features** are required for v1 and beyond. See `Architecture.md` for how it's built, `Design.md` for how it looks, and `Phases.md` for the build order.

## 2. Background

CAIRRL currently consists of 2 founding faculty members and 5 student researchers (1 graduate, 4 undergraduate). It has no existing web presence. Reference institutions demonstrate the pattern this site should follow: a public-facing research showcase (people, research, publications, news/events) backed by a content system lab members can maintain themselves as the lab grows.

## 3. Goals & Objectives

| Goal | Why it matters |
|---|---|
| Establish an authoritative, modern web presence for CAIRRL | First impression for prospective students, collaborators, and KUET administration |
| Showcase faculty, students, and research areas | Core purpose of a research lab site |
| Make publications and projects discoverable | Academic credibility, citation visibility |
| Give non-technical lab members an easy way to update content | Small team; no dedicated web developer long-term |
| Support growth from 7 people today to a larger multi-year lab | Avoid a full rebuild in 1–2 years |

## 4. Target Users & Personas

| Persona | Needs |
|---|---|
| **Prospective student** (KUET undergrad or grad applicant) | See research areas, current projects, and how to join |
| **Faculty / researcher / collaborator (external)** | See faculty profiles and publications quickly, judge research focus |
| **KUET administration / press** | An authoritative overview of the lab's mission, people, and achievements |
| **Current lab member (admin/editor)** | Add/edit people, publications, news, events — without a developer |
| **General public / industry** | Understand what the lab does and how to get in touch |

## 5. Reference Sites & What We're Borrowing

| Site | What we're taking from it |
|---|---|
| [CMU Robotics Institute](https://www.ri.cmu.edu/) | Global nav pattern (About / People / Research / Education / News / Events / Contact); homepage pattern of featured story + news grid + upcoming events; people directory segmented by role |
| [GMU MARC](https://marc.gmu.edu/) | Framing research as named "research areas" tied to faculty and projects; interdisciplinary positioning; mission-driven About narrative |

CAIRRL is far smaller than either reference lab today, so v1 scopes the **same information architecture** at a **realistic content depth**. It should look intentional and complete at low content volume, not empty, and scale gracefully as the roster and publication list grow.

## 6. Scope

### 6.1 In scope (v1)

**Public website**
- Home
- About (mission, vision, founding story, affiliation with KUET's Mechanical & Mechatronics Engineering departments)
- People (Faculty, Graduate Researchers, Undergraduate Researchers)
- Research (Research Areas, Projects)
- Publications (browsable, filterable list)
- News & Events
- Gallery
- Join Us (how to get involved as a thesis/research student)
- Contact (form + lab address/email)

**Admin dashboard**
- Secure login for lab members (Admin / Editor roles)
- CRUD for People, Research Areas, Projects, Publications, News, Events, Gallery
- Site settings (hero content, mission text, contact info, social links)
- Contact form submissions inbox

### 6.2 Out of scope (v1) — candidates for v2+

- Bangla-language toggle / i18n
- Full-length blog beyond short News posts
- Alumni network / directory (add once the lab has graduates)
- Event registration & ticketing
- Newsletter / mailing list integration
- Public API for publications
- Multi-lab / multi-tenant support
- Automatic import of publications from Google Scholar / ORCID

## 7. Functional Requirements

### 7.1 Home
- Hero: lab name, short tagline, CTA buttons ("Meet the Team", "Explore Research")
- Highlighted research area or project
- Latest 3–4 news items
- Upcoming events (if any — hide the section gracefully if none)
- Quick stats strip (faculty count, active projects, publications) computed from real data, never hardcoded
- Footer: quick links, contact, social / Scholar / ResearchGate links

### 7.2 About
- Mission & vision statement
- Founding story / date established
- Affiliation: Dept. of Mechanical Engineering + Dept. of Mechatronics Engineering, KUET
- Research philosophy (interdisciplinary robotics, control, mechatronics, autonomy)

### 7.3 People
- **Faculty** — photo, name, title/designation, department, short bio, research interest tags, links (Google Scholar, ResearchGate, email)
- **Graduate Student Researchers** — photo, name, degree program, research focus, links
- **Undergraduate Student Researchers** — photo, name, batch/year, area of interest
- *(Future)* Alumni section, enabled once the lab has graduates
- Each person gets an individual profile page at `/people/[slug]`

### 7.4 Research
- **Research Areas** — e.g. Robotics & Control, Mechatronics Systems, Additive Manufacturing, Aerial Robotics / UAV Control, Industrial Automation, Computer Vision & HRI, IoT & Embedded Systems — each with a description, cover image, associated faculty, and associated projects/publications
- **Projects** — title, status (Ongoing / Completed / Planned), summary, full description, team members, related research area(s), cover image and gallery

### 7.5 Publications
- List view with filters: year, type (Journal / Conference / Thesis / Preprint / Book Chapter), research area, author
- Each entry: title, authors, venue, year, type, abstract (optional), external link (DOI / PDF / Scholar)
- Sortable and paginated so it scales past a handful of entries

### 7.6 News & Events
- **News** — dated posts with cover image, excerpt, rich-text body, optional author
- **Events** — title, type (Seminar / Talk / Workshop / Defense / Other), date & time, location (physical/online), description; split into Upcoming vs. Past, mirroring CMU RI's pattern

### 7.7 Gallery
- Grid of images with captions, optionally grouped by event, project, or category

### 7.8 Join Us
- Explains how undergrad/grad students can join as thesis or research students
- Lists current openings (editable) or a general "always open to motivated students — email us" message
- Links through to Contact

### 7.9 Contact
- Contact form (name, email, subject, message) → stored in the dashboard inbox + emailed to lab admin
- Static info: address (KUET, Khulna), department(s), email, optional map embed

### 7.10 Admin Dashboard
- Login (email + password, or magic link) restricted to lab members
- Roles: **Admin** (full access incl. user management & settings) and **Editor** (content CRUD only)
- Dashboard home: at-a-glance counts, recent activity, unread contact messages
- CRUD screens for every content type in 7.1–7.9, with image upload, form validation, and preview
- Draft / Published state for News, Events, and Publications so unfinished content never leaks to the public site

## 8. Non-Functional Requirements

- **Performance:** target Lighthouse Performance ≥ 90; static generation/ISR wherever content doesn't change per request
- **SEO:** server-rendered HTML, per-page meta tags/OpenGraph, `sitemap.xml`, `robots.txt`, semantic HTML
- **Responsiveness:** fully usable on mobile, tablet, and desktop — most first-time visitors arrive via a shared mobile/social link
- **Accessibility:** WCAG 2.1 AA — color contrast, keyboard navigation, alt text, visible focus states
- **Security:** dashboard routes authenticated and authorized server-side; all input validated and sanitized; secrets never exposed client-side
- **Maintainability:** a non-developer lab member should be able to add a publication or news post in under 2 minutes via the dashboard
- **Cost-consciousness:** should run comfortably on free/low-cost tiers appropriate for a university lab
- **Content scalability:** the IA should comfortably support the roster and publication list growing 5–10x without a redesign

## 9. Success Metrics

- Site live with all 5 current student researchers and both faculty profiles populated
- 100% of real publications (as supplied by faculty) represented at launch
- A non-developer lab member can publish a news post unassisted
- Lighthouse scores ≥ 90 (Performance, Accessibility, Best Practices, SEO) on Home and People pages
- Site indexed and appearing for a search of "CAIRRL Lab KUET" within 4 weeks of launch

## 10. Assumptions & Constraints

- Team is small (2 faculty + 5 students today); content volume is light at launch but the IA is built to scale
- No dedicated ongoing developer after initial build — the dashboard must carry the maintenance burden
- Budget is limited/academic — prefer free-tier-friendly infrastructure
- Content (bios, publications, project descriptions) is supplied by lab members; nothing is fabricated (see `Rules.md §8`)
- Domain/hosting (KUET subdomain vs. a lab-owned domain) is a lab decision, not a build blocker

## 11. Risks

| Risk | Mitigation |
|---|---|
| Content stays thin (small lab) | Design pages to look intentional at low content volume (see `Design.md`); avoid CMU/MARC-scale grids that look empty |
| No one maintains the site after handoff | Dashboard must be genuinely easy to use; ship a short admin guide in the final phase of `Phases.md` |
| Scope creep beyond v1 | `PRD.md §6.2` explicitly fences off v2 ideas |

## 12. Roadmap Beyond v1

- Bangla/English language toggle
- Alumni directory as first students graduate
- BibTeX import for publications
- Longer-form lab blog / research stories
- Event registration for seminars/workshops
- Deeper integration with KUET's main site/branding once formalized

## 13. Seed Roster (source of truth for initial content)

**Faculty**

| Name | Department | Research interests | Google Scholar |
|---|---|---|---|
| Md. Helal-An-Nahiyan | Mechanical Engineering, KUET | Robotics & Control, Mechatronics, Additive Manufacturing | [Profile](https://scholar.google.com/citations?user=rkOGMxgAAAAJ&hl=en) |
| Priyo Nath Roy | Mechatronics Engineering, KUET | Industrial robot control, UAV/eVTOL control, IoT | [Profile](https://scholar.google.com/citations?user=l8HwgY8AAAAJ&hl=en) |

**Graduate Student Researcher**
- Mashrul Khan

**Undergraduate Student Researchers**
- Hafizur Rahman
- Gazi Faysal Jubayer
- Rahat *(confirm full name before publishing)*
- Sojib *(confirm full name before publishing)*

> This table is the single source of truth for seed data referenced in `Phases.md` and `Memory.md`. Never invent additional people, titles, or bios — flag missing details as TODOs instead of guessing.
