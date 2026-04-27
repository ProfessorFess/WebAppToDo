# HW4 — ReactJS Todo UI

## Submission Notes

- **Language:** TypeScript (TSX) — for the +10 bonus
- **Styling:** TailwindCSS (v4, via the `@tailwindcss/vite` plugin)
- **Build tool:** Vite + React 19
- **Icons:** lucide-react

## Projects

| Folder      | Description                                          |
| ----------- | ---------------------------------------------------- |
| `desktop/`  | Desktop todo UI (Personal / Professional tabs, card) |
| `mobile/`   | Mobile todo UI (sectioned tasks, bottom input bar)   |

Each is an independent Vite application, scaffolded with the `react-ts` template.

## Running each project

From the project folder:

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The build runs `tsc -b` first, so any type errors break the build.

## Functional Requirements

Both apps manage state with `useState` (no Redux, no Context, no persistence).

| Feature           | Desktop | Mobile |
| ----------------- | ------- | ------ |
| Add task          | ✓       | ✓      |
| Toggle complete   | ✓       | ✓      |
| Delete task       | ✓       | ✓      |
| Clear completed   | ✓       | —      |
| Tabs              | ✓       | —      |
| Section grouping  | —       | ✓      |

## Component Structure

Each project decomposes into small, single-responsibility components:

- **Desktop** (`desktop/src/components/`): `Logo`, `TabBar`, `TaskInput`, `TaskItem`, `TaskList`, `ClearCompletedButton`, `TodoCard`
- **Mobile** (`mobile/src/components/`): `ScreenHeader`, `TaskItem`, `TaskSection`, `TaskInputBar`, `TodoScreen`

Top-level state and handlers live in each project's `App.tsx`. Types are isolated in `src/types/task.ts`.

## Design Reference

Each project includes a `design-reference.png` exported from the corresponding HW3 Figma frame. Design tokens (colors, typography, spacing) are documented in `DESIGN_TOKENS.md` at the repo root and mapped into Tailwind v4's `@theme` block in each project's `src/index.css`.
