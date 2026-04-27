import { useState } from "react";
import { TodoScreen } from "./components/TodoScreen";
import type { Task } from "./types/task";

const SECTION_ORDER = ["Design", "Personal", "House"];
const DEFAULT_SECTION = "Personal";

const initialTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    text: "Create icons for dashboard",
    completed: false,
    section: "Design",
  },
  {
    id: crypto.randomUUID(),
    text: "Prepare a design presentation",
    completed: false,
    section: "Design",
  },
  {
    id: crypto.randomUUID(),
    text: "Stretch for 15 minutes",
    completed: false,
    section: "Personal",
  },
  {
    id: crypto.randomUUID(),
    text: "Plan your meal",
    completed: false,
    section: "Personal",
  },
  {
    id: crypto.randomUUID(),
    text: "Review daily goals before sleep.",
    subtitle: "add more if time",
    completed: false,
    section: "Personal",
  },
  {
    id: crypto.randomUUID(),
    text: "Water indoor plants",
    completed: false,
    section: "House",
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (text: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        section: DEFAULT_SECTION,
      },
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main className="min-h-screen w-full bg-page">
      <TodoScreen
        tasks={tasks}
        sectionOrder={SECTION_ORDER}
        onAdd={addTask}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </main>
  );
}

export default App;
