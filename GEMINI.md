# CAIRRL Lab Website — Workspace Directives for Gemini / Antigravity

Whenever an agent operates in this workspace, follow these mandatory instructions:

1. **Read `Memory.md` first** at the start of any session to understand the current phase and decisions log.
2. **Adhere to `Rules.md`**:
   - Stack: Next.js (App Router), TypeScript strict mode, Tailwind CSS + shadcn/ui, Prisma + PostgreSQL.
   - Never invent or fabricate lab content or people (refer to `PRD.md §13`).
   - Use tokens defined in `Design.md` for all styling.
3. **Follow `Phases.md`**: Check exit criteria before proceeding to subsequent phases.
4. **Update `Memory.md`**: Log all completed tasks and architectural decisions at the end of every task.

## Common Tasks
- `npm run dev` — Run development server
- `npm run build` — Verify TypeScript and generate production routes
- `npm run lint` — Run ESLint checks
