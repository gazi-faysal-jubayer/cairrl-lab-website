# Rules.md

**Project:** CAIRRL Lab Website
**Last updated:** 2026-08-26

This document sets boundaries for any AI (or human) working on this codebase. If a request conflicts with this file, **this file wins** — flag the conflict to the user instead of silently overriding it. Read `PRD.md`, `Architecture.md`, and `Memory.md` before starting any work session.

---

## 1. Purpose

`Architecture.md` says what to build with. This file says **how to behave** while building it: what's allowed, what's forbidden, how to handle errors, and when to stop and ask instead of guessing.

## 2. Stack Lock-In

**Use only what's listed in `Architecture.md §1`.** Specifically:

✅ Allowed
- Next.js (App Router), TypeScript, React Server Components
- Tailwind CSS, shadcn/ui, lucide-react
- Prisma + PostgreSQL
- React Hook Form + Zod
- Better Auth **or** Auth.js v5 (pick one in Phase 7, never both)
- Tiptap (dashboard rich text only)
- Vercel Blob or UploadThing (pick one)
- Resend

❌ Disallowed without explicit user approval
- A second CSS framework or system (Bootstrap, Chakra, MUI, styled-components, Emotion) — Tailwind + shadcn/ui only
- A second ORM or raw SQL query builder alongside Prisma
- A second auth library once one is chosen in Phase 7
- State management libraries (Redux, Zustand, Jotai) — Server Components + minimal `useState`/`useReducer` should cover this app; if a real cross-tree client state need appears, ask first
- Moment.js — use `date-fns` if a date library is genuinely needed
- Any UI kit template downloaded wholesale ("free Next.js admin template") — build with shadcn/ui primitives per `Design.md`
- Any new dependency not already named in `Architecture.md` — propose it and wait for approval before installing

## 3. Coding Conventions

- TypeScript **strict mode** on. No `any` without a one-line comment explaining why it's unavoidable.
- Server Components by default. Add `"use client"` only when a component genuinely needs interactivity (state, effects, browser APIs, event handlers) — and keep that component as small/leaf as possible.
- One component per file; colocate a feature's components under its route segment when they're not reused elsewhere; put genuinely shared components in `components/shared` or `components/ui`.
- Naming: `PascalCase` components, `camelCase` functions/variables, `kebab-case` route folders, Prisma models `PascalCase` singular.
- Prefer Server Actions over building a separate REST API — this app has no external API consumers in v1.
- Every entity gets exactly one Zod schema in `lib/validations/`, imported by both the client form and the Server Action that consumes it. Never duplicate validation logic.

## 4. Styling Rules

- Tailwind utility classes only; no plain CSS files except `globals.css` for resets/fonts/CSS variables.
- All colors, spacing, and type come from the tokens defined in `Design.md` — don't introduce a one-off hex value or font size inline. If a token is missing, add it to `Design.md` first, then use it.
- Use shadcn/ui components as the base for buttons, inputs, dialogs, tables, etc. Customize via the token layer, not by forking the component into something unrecognizable.
- Every image goes through `next/image`. Every image needs meaningful `alt` text — never leave it empty except for genuinely decorative images (and then use `alt=""` deliberately, not by omission).

## 5. Data & Validation Rules

- Schema changes only via `prisma migrate dev` (local) / `prisma migrate deploy` (production) — never hand-edit the production database.
- Never write a Server Action that trusts client-supplied data without re-validating it with the Zod schema server-side, even if the form already validated it client-side.
- Seed data (`prisma/seed.ts`) must match `PRD.md §13` exactly — real names, real links, nothing invented. If a field is unknown (e.g., a missing bio), leave it empty or mark it `TODO`, don't fabricate plausible-sounding content.

## 6. Auth & Security Rules

- Every route under `(dashboard)` re-checks the session **server-side** in the route/layout itself, per `Architecture.md §6` — never rely on middleware alone.
- Every Server Action that mutates data re-checks session + role at the top of the function body, even if the calling page was already protected.
- Role checks: `ADMIN` for user management and site settings; `ADMIN` or `EDITOR` for everything else.
- Sanitize all rich-text HTML (Tiptap output) before storing/rendering — never render unsanitized user HTML with `dangerouslySetInnerHTML`.
- Rate-limit or otherwise throttle the public contact form to deter spam (a simple honeypot field + basic server-side rate limiting is enough for v1; no need for a CAPTCHA service unless spam becomes a real problem).
- Secrets live only in environment variables, never in source, never logged, never sent to the client. Keep `.env.example` current whenever a new variable is added.
- File uploads: validate file type and size server-side before accepting, not just via the `accept` attribute on the input.

## 7. Error Handling & UX Rules

- Wrap Server Actions in `try/catch`; return a typed `{ success, error? }` result rather than throwing across the client/server boundary.
- Every mutating dashboard action gives the user feedback (toast/inline message) on both success and failure — never fail silently.
- Every list/table has a designed empty state (e.g., "No publications yet — add your first one") — don't ship a blank page.
- Provide loading states (`loading.tsx` / skeletons) for anything that fetches data, and custom `not-found.tsx` / `error.tsx` for the public site.
- Log server-side errors with enough context to debug (route, user id if relevant) but never log secrets or full request bodies containing personal data.

## 8. Content Rules

- **Never fabricate lab content.** Faculty bios, publication lists, project descriptions, and news posts come from the lab — not from the AI's imagination. If content is missing, insert a clearly marked placeholder (`[PLACEHOLDER: faculty bio needed]`) rather than inventing something plausible.
- The seed roster in `PRD.md §13` is the only people data allowed until the lab supplies more. Do not add extra "example" faculty or students to make the site look fuller.
- Stock/placeholder imagery is fine for layout work during early phases, but must be clearly swappable and never presented as if it were an actual lab photo.

## 9. Git & Workflow Rules

- Commit messages: `type(scope): summary` (e.g., `feat(people): add faculty profile page`, `fix(auth): correct role check on settings route`).
- One phase (from `Phases.md`) roughly maps to one feature branch / one batch of commits — don't mix unrelated phases in the same commit.
- Don't rewrite or delete existing working code outside the current phase's scope without flagging it to the user first.

## 10. What the AI Must Always Do / Never Do

**Always**
- Re-read `Memory.md` at the start of a session before writing code.
- Update `Memory.md` at the end of a meaningful chunk of work (see `Memory.md §1` for the update format).
- Ask before adding a new dependency, changing the chosen auth library, or deviating from the folder structure in `Architecture.md`.
- Ask before deleting data, migrations, or files that aren't clearly superseded by the current phase's work.
- Keep phases sequential (per `Phases.md`) unless the user explicitly requests otherwise.

**Never**
- Never invent lab content, people, or publications (§8).
- Never install a second library that duplicates one already chosen (§2).
- Never bypass the auth/role checks described in §6, even "temporarily for testing."
- Never commit secrets or `.env` files.
- Never silently change the visual tokens in `Design.md` — propose changes there first.

## 11. Accessibility & Performance Budgets

- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 on Home, People, and Publications pages.
- All interactive elements reachable and operable by keyboard; visible focus rings (don't remove Tailwind's focus outline without replacing it).
- Color contrast must meet WCAG AA against the tokens in `Design.md` — if a design choice fails contrast, fix the token, don't override it ad hoc in one place.
- Respect `prefers-reduced-motion` for any animation beyond simple opacity/color transitions.
