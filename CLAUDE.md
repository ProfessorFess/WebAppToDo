# HW4 — ReactJS Todo UI: Project Plan & Claude Code Guide

> **Purpose of this document:** This is both (a) a human-readable plan for the HW4 assignment and (b) a step-by-step instruction set for Claude Code to implement both projects end-to-end.

---

## 1. Project Decisions (Locked In)

| Decision | Choice | Rationale |
|---|---|---|
| Language | **TSX (TypeScript)** for both projects | +10 bonus points, industry standard |
| Build tool | **Vite + React** for both projects | Required by assignment |
| Styling | **TailwindCSS** for both projects | Fast, consistent, readable |
| Repo structure | **Single repo, two folders**: `desktop/` and `mobile/` | Allowed by spec, easier to submit |
| Design source | **Figma MCP server** (live read from Figma file) | No transcription, pixel-accurate |
| Functional scope | Add task, toggle complete, **delete task**, **clear completed** | Matches all visible UI in screenshots |
| State management | `useState` only (no Redux, no Context) | Per assignment spec |
| Persistence | **None** | Explicitly out of scope |
| Routing | **None** | Out of scope |
| Backend | **None** | Out of scope |

---

## 2. Repository Layout

```
hw4-todo-ui/
├── README.md                    # Top-level: which language/styling, how to run each
├── .gitignore                   # node_modules, dist, .DS_Store, etc.
├── desktop/                     # Vite + React + TS project (desktop UI)
│   ├── src/
│   ├── package.json
│   └── ...
└── mobile/                      # Vite + React + TS project (mobile UI)
    ├── src/
    ├── package.json
    └── ...
```

---

## 3. Design Reference (from PDF Screenshots)

These are the visual targets. Claude Code should pull authoritative values from Figma via MCP, but use this as a sanity check.

### Desktop UI
- **Header:** "TOD✓" logo, centered, top of card
- **Tabs:** "Personal" | "Professional" — Personal active (underlined)
- **Input row:** Rounded text input with placeholder "What do you need to do?" + dark teal "ADD" button on right
- **Task list:** Light pinkish-cream rows with rounded corners
  - Left: circular checkbox (filled with checkmark when complete)
  - Center: task text (strikethrough + faded when complete)
  - Right: trash icon (orange/red)
- **Footer link:** "🗑 Clear Completed" bottom-right, small orange text
- **Container:** Soft rounded card, light cream/pink background, subtle shadow

### Mobile UI
- **Header:** "Today" — bold, large, top-left
- **Section headers:** Small uppercase grey labels grouping tasks (e.g., a section before each pair of tasks)
- **Task rows:** Each task has a square checkbox on the left + task text
  - Some tasks are two-line (title + secondary line in lighter grey)
- **Input row:** Bottom-fixed: rounded text input "Write a task…" + dark "Add" button
- **Container:** White card on light grey background, rounded corners

---

## 4. Functional Requirements (Both Projects)

Each app must support, via `useState`:

1. **Maintain a list of tasks** in component state. Seed each app with the tasks visible in its screenshot so the UI matches at first load.
2. **Add a new task** — typing in the input + clicking Add (or pressing Enter) appends a task with `completed: false`.
3. **Toggle complete** — clicking a task's checkbox flips its `completed` flag; UI updates immediately (strikethrough + faded for desktop, checkbox fill for both).
4. **Delete task** — clicking the trash icon removes the task from state.
5. **Clear completed** (desktop only, since the button is only visible there) — removes all tasks where `completed === true`.

### Shared `Task` type
```ts
type Task = {
  id: string;        // crypto.randomUUID()
  text: string;
  completed: boolean;
  // mobile only:
  subtitle?: string; // for two-line tasks
  section?: string;  // section header this task belongs to
};
```

---

## 5. Component Decomposition

### Desktop (`desktop/src/`)
```
App.tsx                      # Top-level state, renders TodoCard
components/
  TodoCard.tsx               # The main rounded container
  Logo.tsx                   # "TOD✓" header
  TabBar.tsx                 # Personal | Professional tabs
  TaskInput.tsx              # Input + ADD button
  TaskList.tsx               # Maps tasks -> TaskItem
  TaskItem.tsx               # Checkbox + text + trash
  ClearCompletedButton.tsx   # Footer action
types/
  task.ts                    # Task type definition
```

### Mobile (`mobile/src/`)
```
App.tsx                      # Top-level state, renders TodoScreen
components/
  TodoScreen.tsx             # Main scrollable screen container
  ScreenHeader.tsx           # "Today" title
  TaskSection.tsx            # Section label + grouped TaskItems
  TaskItem.tsx               # Checkbox + text (+ optional subtitle)
  TaskInputBar.tsx           # Bottom input + Add button
types/
  task.ts                    # Task type definition
```

---

## 6. Grading Criteria Mapping

| Criterion | Points | How this plan addresses it |
|---|---|---|
| Design Fidelity | 30 | Figma MCP for exact tokens; reference screenshots; Tailwind arbitrary values where needed |
| Functional React State | 25 | `useState` for tasks array; add/toggle/delete/clear handlers in App |
| Component Structure | 20 | 6–7 components per project, clear separation of concerns |
| Styling Quality | 15 | Tailwind utility classes, consistent spacing scale, no inline styles |
| Project Setup & Code Quality | 10 | Clean Vite scaffold, TS types, README, no build errors |
| **Bonus: TypeScript** | +10 | Both projects use `react-ts` template, typed props/state |
| **Total target** | **110** | |

---

# 7. Claude Code Instructions

> **Read this entire section before starting.** Execute phases in order. Do not skip the Figma MCP step — it is the source of truth for design values.

## Phase 0: Prerequisites Check

```bash
node -v   # Should be >= 18
npm -v
git --version
```

If Node is below 18, stop and ask the user to upgrade.

## Phase 1: Initialize Repo

```bash
mkdir hw4-todo-ui
cd hw4-todo-ui
git init
```

Create top-level `.gitignore`:
```
node_modules/
dist/
.DS_Store
*.local
.env
.vite/
```

## Phase 2: Connect to Figma & Extract Design Context

The user has the Figma MCP server connected. Before writing any code:

1. **Ask the user** to open their HW3 Figma file and select the **desktop frame**.
2. Call `Figma:get_design_context` on the current selection to extract layout, colors, typography, spacing.
3. Call `Figma:get_variable_defs` to capture any design tokens (colors, font sizes, etc.).
4. Call `Figma:get_screenshot` to capture a reference image; save it to `desktop/design-reference.png`.
5. Repeat steps 1–4 for the **mobile frame**, saving the screenshot to `mobile/design-reference.png`.

**Record the extracted design tokens** in a working notes file at the repo root: `DESIGN_TOKENS.md`. Include:
- Color palette (hex values)
- Font family / sizes / weights
- Spacing scale
- Border radius values
- Shadow definitions

These will feed directly into each project's `tailwind.config.js`.

> **If the Figma MCP returns nothing or the user can't share a frame**, fall back to the PDF screenshots in `/mnt/user-data/uploads/HW4__ReactJS.pdf` and infer values visually. Document this fallback in `DESIGN_TOKENS.md`.

## Phase 3: Scaffold the Desktop Project

```bash
cd hw4-todo-ui
npm create vite@latest desktop -- --template react-ts
cd desktop
npm install
```

Install Tailwind v4 (current stable):
```bash
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.ts` to include the Tailwind plugin:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Replace the contents of `src/index.css` with:
```css
@import "tailwindcss";

@theme {
  /* Inject design tokens from DESIGN_TOKENS.md here as CSS variables */
  --color-card-bg: #fdf4f0;          /* example - replace with Figma value */
  --color-accent: #2d6a6a;           /* example - replace */
  --color-trash: #e07b4a;            /* example - replace */
  /* ...etc */
}
```

Delete the boilerplate `src/App.css` and clear out `src/App.tsx`.

## Phase 4: Build Desktop Components

Create files in this order. Each component should be a typed functional component with explicit props.

### 4.1 `src/types/task.ts`
```ts
export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export type Tab = 'personal' | 'professional';
```

### 4.2 `src/components/Logo.tsx`
A small presentational component rendering the "TOD✓" header. Use Tailwind for centering and typography.

### 4.3 `src/components/TabBar.tsx`
Props: `activeTab: Tab`, `onTabChange: (tab: Tab) => void`. Renders two clickable tab buttons; active tab gets an underline border.

### 4.4 `src/components/TaskInput.tsx`
Props: `onAdd: (text: string) => void`. Local `useState` for the input value. Submit on click or Enter key. Clears input after add. Disables ADD button when input is empty.

### 4.5 `src/components/TaskItem.tsx`
Props: `task: Task`, `onToggle: (id: string) => void`, `onDelete: (id: string) => void`. Renders:
- Circular checkbox (use a styled `<button>` with conditional checkmark icon)
- Task text (strikethrough + opacity-60 when `task.completed`)
- Trash icon button on the right (use lucide-react: `import { Trash2 } from 'lucide-react'`)

Install lucide-react:
```bash
npm install lucide-react
```

### 4.6 `src/components/TaskList.tsx`
Props: `tasks: Task[]`, `onToggle`, `onDelete`. Maps tasks to `<TaskItem>`s.

### 4.7 `src/components/ClearCompletedButton.tsx`
Props: `onClear: () => void`. Small text button with trash icon, bottom-right aligned.

### 4.8 `src/components/TodoCard.tsx`
The main rounded container. Composes Logo, TabBar, TaskInput, TaskList, ClearCompletedButton. Receives all state and handlers from App as props.

### 4.9 `src/App.tsx`
Holds all state:
```tsx
const [tasks, setTasks] = useState<Task[]>([
  { id: crypto.randomUUID(), text: 'Personal Work No. 1', completed: true },
  { id: crypto.randomUUID(), text: 'Personal Work No. 2', completed: false },
  // ...seed to match screenshot
]);
const [activeTab, setActiveTab] = useState<Tab>('personal');

const addTask = (text: string) => { /* ... */ };
const toggleTask = (id: string) => { /* ... */ };
const deleteTask = (id: string) => { /* ... */ };
const clearCompleted = () => setTasks(tasks.filter(t => !t.completed));
```

Renders `<TodoCard>` centered on a full-screen background that matches the Figma design.

### 4.10 Verify
```bash
npm run dev
```
Open the URL, compare side-by-side with `design-reference.png`. Iterate on Tailwind classes until visual match is close (spacing, colors, radii, font weights).

## Phase 5: Scaffold the Mobile Project

```bash
cd ../   # back to hw4-todo-ui root
npm create vite@latest mobile -- --template react-ts
cd mobile
npm install
npm install tailwindcss @tailwindcss/vite lucide-react
```

Apply the same Vite config and `index.css` setup as Phase 3, but use the mobile design tokens.

**Important:** Since this is a mobile UI rendered in a browser, constrain the app width:
- Wrap the entire app in a container with `max-w-[420px] mx-auto h-screen` (approximate iPhone width)
- Use a light grey body background so the white card stands out

## Phase 6: Build Mobile Components

### 6.1 `src/types/task.ts`
```ts
export type Task = {
  id: string;
  text: string;
  subtitle?: string;
  completed: boolean;
  section: string;  // e.g., "Work", "Health", "Home"
};
```

### 6.2 `src/components/ScreenHeader.tsx`
Renders "Today" as a bold heading.

### 6.3 `src/components/TaskItem.tsx`
Props: `task`, `onToggle`, `onDelete`. Square checkbox on left (rounded-sm border), text on right. If `subtitle` exists, render below the title in lighter grey/smaller font. Trash icon appears on hover/tap (or always visible — designer's call).

### 6.4 `src/components/TaskSection.tsx`
Props: `sectionName: string`, `tasks: Task[]`, `onToggle`, `onDelete`. Renders a small uppercase grey label, then a list of TaskItems.

### 6.5 `src/components/TaskInputBar.tsx`
Props: `onAdd: (text: string) => void`. Sticky to bottom. Placeholder "Write a task…" + dark "Add" button.

### 6.6 `src/components/TodoScreen.tsx`
Composes ScreenHeader + grouped TaskSections + TaskInputBar. Groups tasks by `section` field.

### 6.7 `src/App.tsx`
Same state pattern as desktop. Seed tasks to match the mobile screenshot:
- Section "Work": "Create icons for a dashboard", "Prepare a design presentation"
- Section "Health": "Stretch for 15 minutes", "Plan your meal"
- Section "Personal": "Review daily goals before sleeping" (with subtitle "Add some now if time permits")
- Section "Home": "Water indoor plants"

(Adjust section names to match what's actually visible in the screenshot.)

### 6.8 Verify
```bash
npm run dev
```
Compare against `design-reference.png`. The browser viewport should be narrowed to ~420px to simulate a phone.

## Phase 7: Polish & Code Quality

For **both** projects:
- Run `npm run build` — fix any TS errors.
- Run `npx tsc --noEmit` to catch type issues the build might miss.
- Ensure no unused imports, no `any` types, no console.logs.
- Confirm all interactive elements (buttons, checkboxes) have proper `aria-label`s for accessibility.
- Make sure `crypto.randomUUID()` is used (or fallback to a counter if targeting very old environments).

## Phase 8: Documentation

### Top-level `README.md`:
```markdown
# HW4 — ReactJS Todo UI

## Submission Notes
- **Language:** TypeScript (TSX) — for the +10 bonus
- **Styling:** TailwindCSS (v4)
- **Build tool:** Vite + React

## Projects
- `desktop/` — Desktop todo UI
- `mobile/` — Mobile todo UI

## Running each project
From the project folder:
```bash
npm install
npm run dev
```
Then open the URL printed in the terminal.

## Build for production
```bash
npm run build
npm run preview
```

## Component Structure
See `desktop/src/components/` and `mobile/src/components/`.

## Design Reference
Each project includes a `design-reference.png` exported from the corresponding HW3 Figma frame.
```

### Optional but recommended: per-project READMEs
Each project gets its own brief `README.md` describing its component tree.

## Phase 9: Final Checks Before Submission

- [ ] Both projects run with `npm install && npm run dev` from a clean clone
- [ ] Both projects build with `npm run build` with zero errors
- [ ] No TypeScript `any` types
- [ ] All four functional requirements work in desktop: add, toggle, delete, clear completed
- [ ] All three functional requirements work in mobile: add, toggle, delete
- [ ] Visual comparison vs. `design-reference.png` is faithful
- [ ] `README.md` clearly states TSX + TailwindCSS
- [ ] Repo is committed:
  ```bash
  git add .
  git commit -m "HW4: complete desktop and mobile todo UI implementations"
  ```
- [ ] Push to GitHub and submit the repo URL

---

## 8. Risks & Notes for Claude Code

1. **Figma MCP availability:** If the user's Figma file isn't accessible, fall back to the PDF screenshots and ask the user to confirm color choices before locking them in.
2. **Tailwind v4 vs v3:** This plan assumes v4 (current stable, uses `@import "tailwindcss"` + Vite plugin). If v3 is preferred, switch to PostCSS config + `@tailwind` directives.
3. **Don't over-engineer:** No state management library, no routing, no testing framework, no API calls. The assignment is explicit about scope.
4. **Two separate projects:** Don't try to share code between `desktop/` and `mobile/`. The assignment specifically says they should be independent — duplication is intentional here.
5. **Seed data matters for design fidelity:** The grader will compare against the screenshots. Seed each project's task list to match what's visible in the corresponding screenshot.
