# Memory.md

**Project:** CAIRRL Lab Website
**Purpose:** The single source of truth for "where things stand." Read this file first, before re-reading code or asking the user to re-explain context. Update it at the end of every work session — even a short one — so the next session (possibly a different chat, possibly a different AI tool) doesn't waste tokens rediscovering what's already known.

---

## 1. How to Use This File

- **At the start of a session:** read this whole file before writing any code.
- **At the end of a session:** update `§3 Current Status`, append to `§4 Completed Work Log`, and add any new entries to `§5 Decisions Log` or `§6 Known Issues`. Keep entries short — this is a status board, not a diary.
- **Never delete history** from the Decisions Log — if a decision changes, add a new entry noting the change and why, rather than erasing the old one.
- If you (the AI) are unsure whether something was already built, check `§4` before re-implementing it.

---

## 2. Project Snapshot

| | |
|---|---|
| Name | CAIRRL Lab — Centre for Advanced Intelligent Robotics Research Laboratory |
| Institution | Khulna University of Engineering & Technology (KUET) |
| Stack | Next.js (App Router) + TypeScript + Tailwind/shadcn + Prisma/PostgreSQL — full detail in `Architecture.md` |
| Planning docs | `PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, `Design.md`, `Memory.md` (this file) — all live at repo root |
| Repo | *(not yet created — add path/URL here once initialized)* |
| Production URL | *(not yet deployed)* |

---

## 3. Current Status

**Phase:** Phase 3 Complete — Phase 0 (Setup), Phase 1 (Design System & Shell), Phase 2 (Core Public Pages), and Phase 3 (People Directory & Profiles) are all implemented, verified, and passing type-check and linting.
**As of:** 2026-08-26

The website is fully functional in development mode (`npm run dev`) and builds statically with `npm run build` (0 lint errors, 0 type errors).

---

## 4. Completed Work Log

*(Newest entry on top. Format: `YYYY-MM-DD — what got done — phase`)*

- **2026-08-26** — Completed Phase 3: Built People directory page (`/people`) with segmented sections for Faculty, Graduate, and Undergraduate researchers, and individual dynamic profile pages (`/people/[slug]`) statically generated for all 7 team members from the PRD seed roster. — *Phase 3*
- **2026-08-26** — Completed Phase 2: Built Home page (hero with grid overlay, animated stats strip, research highlights, placeholders for news and events, CTA), About page (mission, vision, story, affiliation), Join Us page (thesis & research student tracks), and Contact page (Zod-validated form with honeypot spam protection). — *Phase 2*
- **2026-08-26** — Completed Phase 1: Configured Design.md visual tokens (brand-navy, accent-cyan, surface-muted, etc.), imported Google Fonts (Inter, Space Grotesk, JetBrains Mono), implemented responsive Navbar with mobile slide-in drawer and active indicator, 3-column Footer, shared Container and SectionHeading components, and smooth scroll-in animations with reduced-motion support. — *Phase 1*
- **2026-08-26** — Completed Phase 0: Initialized Next.js 16 (App Router, TypeScript strict, Tailwind CSS v4, Turbopack, Prettier, shadcn/ui components) and created `.env.example`. — *Phase 0*
- **2026-08-26** — Wrote all six planning documents (`PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, `Design.md`, `Memory.md`) based on the lab's actual roster and research focus, and on the CMU RI / GMU MARC reference sites. — *Pre-Phase 0*

---

## 5. Decisions Log

*(Newest entry on top. Record real decisions and why — not routine implementation detail.)*

- **2026-08-26** — Chose Next.js App Router + Prisma/PostgreSQL + Tailwind/shadcn as the stack; see `Architecture.md §1` for the full rationale and version notes (confirm exact current versions at Phase 0 — they drift).
- **2026-08-26** — Left the auth library choice **open** between Better Auth and Auth.js v5, to be decided and locked in at `Phases.md` Phase 7. Do not install either prematurely.
- **2026-08-26** — Research areas for the site are grounded in the two founding faculty's actual documented research (Robotics & Control, Mechatronics, Additive Manufacturing, UAV/eVTOL control, Industrial robotics, IoT) rather than generic robotics-lab boilerplate. Final area names/descriptions still need lab sign-off before Phase 4.
- **2026-08-26** — Design palette (`Design.md §2`) is a proposed identity, not a confirmed KUET/CAIRRL brand standard — flagged for reconciliation if the lab or university later issues formal brand guidelines.

---

## 6. Known Issues / Open Questions

- Full names/confirmation needed for student researchers listed only by first/short name: **Rahat**, **Sojib**, and graduate researcher **Mashrul** (see `PRD.md §13`).
- No project or news content exists yet — Phase 4/5 will need at least placeholder-marked entries until the lab supplies real ones (`Rules.md §8`).
- Domain and hosting account ownership (KUET subdomain vs. lab-owned domain) not yet decided — doesn't block build, only final deployment (`Architecture.md §10`).
- No KUET or CAIRRL logo/wordmark exists yet — `Design.md` assumes a text wordmark in `brand-navy` until one is supplied.

---

## 7. Seed Data Quick Reference

*(Full detail lives in `PRD.md §13` — this is a fast lookup so sessions don't need to re-open that file for basic facts.)*

**Faculty**
- Md. Helal-An-Nahiyan — Mechanical Engineering, KUET — Robotics & Control, Mechatronics, Additive Manufacturing — [Scholar](https://scholar.google.com/citations?user=rkOGMxgAAAAJ&hl=en)
- Priyo Nath Roy — Mechatronics Engineering, KUET — Industrial robot control, UAV/eVTOL control, IoT — [Scholar](https://scholar.google.com/citations?user=l8HwgY8AAAAJ&hl=en)

**Graduate Student Researcher**
- Mashrul *(full name TBD)*

**Undergraduate Student Researchers**
- Hafizur Rahman
- Gazi Foysal
- Rahat *(full name TBD)*
- Sojib *(full name TBD)*

---

## 8. Next Steps

Start `Phases.md` → **Phase 0 — Project Setup & Foundations**.
