<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# CAIRRL Lab Project Directives for All AI Agents

Before performing any tasks, writing code, or making suggestions in this repository, you **MUST** read and follow these authoritative planning documents located at the repository root:

1. **`Rules.md` (Highest Priority)**: Behavioral boundaries, strict technology stack constraints, coding conventions, data validation rules, security requirements, and the strict rule against fabricating lab members or content.
2. **`PRD.md`**: Product Requirements Document detailing target users, functional scope for v1, and the official Seed Roster (`PRD.md §13`).
3. **`Phases.md`**: Sequential roadmap and phase exit criteria. Do not jump ahead unless explicitly requested.
4. **`Memory.md`**: Single source of truth for the current build status, decisions log, and known items. **Always update `Memory.md` at the end of every work session.**
5. **`Design.md`**: Proposed visual language and design tokens (`brand-navy`, `accent-cyan`, `accent-green`, `surface-muted`, `ink`), typography scale (Space Grotesk, Inter, JetBrains Mono), and motion rules (150-250ms transitions, WCAG AA, `prefers-reduced-motion`).
6. **`Architecture.md`**: Technical architecture, folder structure, Prisma schema, App Router layout patterns, and auth guard workflows.

## Key Developer Commands
- Run dev server: `npm run dev` (running at `http://localhost:3000`)
- Run type check & build: `npm run build`
- Run linter: `npm run lint`
