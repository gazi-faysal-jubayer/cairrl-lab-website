# Phases.md

**Project:** CAIRRL Lab Website
**Last updated:** 2026-08-26

The build is broken into sequential phases so the AI (and any human collaborator) can work in focused, verifiable chunks instead of attempting the whole app at once. Complete a phase, verify its exit criteria, update `Memory.md`, then move to the next. Don't skip ahead unless the user explicitly asks.

---

## Phase 0 — Project Setup & Foundations
**Goal:** A running, empty Next.js app with the full tooling chain in place.

- Scaffold with `create-next-app` (TypeScript, App Router, Tailwind, `src/` directory)
- Install and configure shadcn/ui, lucide-react
- Set up ESLint + Prettier, strict `tsconfig.json`
- Initialize git, `.gitignore`, `.env.example`
- Set up Prisma with a local/dev Postgres connection (Neon dev branch or Docker)
- Confirm the app builds and runs (`npm run dev`, `npm run build`)

**Exit criteria:** Blank homepage renders at `localhost:3000`; `npm run build` succeeds; lint passes.

---

## Phase 1 — Design System & Layout Shell
**Goal:** The visual language from `Design.md` is implemented as reusable pieces, and the public site has its skeleton.

- Configure Tailwind theme (colors, fonts, spacing) from `Design.md`
- Import and configure the chosen fonts
- Build shared `Navbar` and `Footer` components matching `Design.md`
- Build the base UI kit needed early: `Button`, `Card`, `Badge`, `Container`, `SectionHeading`
- Wire up `(public)/layout.tsx` with the shell

**Exit criteria:** Any placeholder public page shows the correct navbar, footer, fonts, and colors.

---

## Phase 2 — Static Public Pages v1 (Home, About, Join Us, Contact)
**Goal:** The core narrative pages exist with real seed copy, using hardcoded/local data (no DB yet).

- Home: hero, stats strip, placeholder "latest news"/"upcoming events" sections (empty-state OK at this point)
- About: mission/vision, founding story, dept. affiliation (from `PRD.md §7.2`)
- Join Us page
- Contact page with a working form UI (submission wiring comes in Phase 6/9)

**Exit criteria:** All four pages are responsive, accessible, and pass a manual Lighthouse check ≥ 85 (final polish comes in Phase 10).

---

## Phase 3 — People Pages (static)
**Goal:** Faculty and student directory + individual profile pages, using the seed roster from `PRD.md §13` as local static data.

- `/people` directory with Faculty / Graduate / Undergraduate tabs or sections
- `/people/[slug]` profile pages for both real faculty members and all 5 real students
- Person cards link out to Google Scholar where available

**Exit criteria:** Both faculty and all five students are visible with their real names and correct links; no placeholder people.

---

## Phase 4 — Research (Areas + Projects) & Publications (static)
**Goal:** Research storytelling pages, still on local static data.

- `/research` overview listing research areas (seed from faculty's actual interests: Robotics & Control, Mechatronics, Additive Manufacturing, UAV/Aerial Robotics, Industrial Automation, IoT/Embedded Systems — confirm final list with the lab)
- `/research/[areaSlug]` detail page
- `/research/projects/[projectSlug]` — at least one placeholder-marked project until real project data arrives
- `/publications` list with filter UI (year/type/area), backed by local data for now

**Exit criteria:** Research areas reflect the real faculty's actual research interests (not generic filler); publications list renders and filters correctly against sample data.

---

## Phase 5 — News, Events & Gallery (static)
**Goal:** The remaining public content types.

- `/news` list + `/news/[slug]` detail
- `/events` list (Upcoming/Past split) + `/events/[slug]` detail
- `/gallery` grid

**Exit criteria:** All three sections render correctly with sample/placeholder content clearly marked as such.

---

## Phase 6 — Database Layer
**Goal:** Move from static data to a real schema, without yet touching the dashboard.

- Implement the full Prisma schema from `Architecture.md §4`
- Run initial migration against the dev database
- Write `prisma/seed.ts` using the exact roster and info from `PRD.md §13` — no invented content
- Verify seeded data via Prisma Studio

**Exit criteria:** `prisma migrate dev` and `prisma db seed` both succeed; Prisma Studio shows correct real faculty/student rows.

---

## Phase 7 — Auth & Dashboard Shell
**Goal:** Lab members can log in; the dashboard has a protected shell.

- Choose **one** auth library (Better Auth or Auth.js v5) and record the decision in `Memory.md`
- Implement login page, session handling, `requireUser()`/`requireAdmin()` guards (`Architecture.md §6`)
- Build the `(dashboard)` layout: sidebar nav, top bar, protected by the guard
- Create the first Admin user manually (seed or one-off script) so there's a way in

**Exit criteria:** Logging in with valid credentials reaches `/dashboard`; an unauthenticated visit to any `/dashboard/*` route redirects to `/login`; role checks are enforced (an Editor cannot reach `/dashboard/users`).

---

## Phase 8 — Dashboard CRUD: People, Research, Publications
**Goal:** Staff can manage the "who we are and what we study" content without touching code.

- CRUD screens (list/create/edit/delete) for Faculty, Students, Research Areas, Projects, Publications
- Image upload wired to Vercel Blob/UploadThing for photos and cover images
- Draft/Published toggle where applicable

**Exit criteria:** A lab member can add a new student researcher or publication end-to-end through the UI and see it reflected on the public site after revalidation.

---

## Phase 9 — Dashboard CRUD: News, Events, Gallery, Settings, Messages
**Goal:** Complete the content-management surface and wire the public site fully to the database.

- CRUD for News (with Tiptap editor), Events, Gallery
- Site Settings screen (hero content, mission text, contact info, social links)
- Contact Messages inbox (list, mark read, linked to the Resend-notified submissions)
- Replace all remaining static/local data on the public site with live DB reads + ISR revalidation

**Exit criteria:** No hardcoded content remains on the public site except genuinely static copy (e.g., legal footer text); every dynamic section is dashboard-editable.

---

## Phase 10 — Polish, SEO, Accessibility, QA, Deployment
**Goal:** Ship-ready.

- Meta tags/OpenGraph per page, `sitemap.ts`, `robots.ts`
- Run and fix Lighthouse to meet the budgets in `Rules.md §11`
- Full keyboard-navigation and screen-reader pass
- Cross-browser/device check (see CMU RI's own supported-browsers note as a sanity check for what "modern browser" support means in practice)
- Write a short admin guide (how to log in, add a publication, publish news) as a `docs/admin-guide.md` for the lab
- Connect production database, storage, and email; deploy to Vercel; verify the production build end-to-end
- Final update to `Memory.md` marking launch

**Exit criteria:** Site is live at its production URL; all `PRD.md §9` success metrics are met; admin guide handed off to the lab.

---

## Working Notes for the AI

- Do not start a phase until the previous phase's exit criteria are met, unless the user explicitly says to jump ahead.
- If a phase reveals that an earlier decision needs to change (e.g., the schema needs a new field), make the smallest change that unblocks progress, note it in `Memory.md`'s decision log, and continue — don't silently redesign unrelated parts of the app.
- Update `Memory.md` at the end of every session, even a short one, per the format in `Memory.md §1`.
