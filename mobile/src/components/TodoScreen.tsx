import type { Task } from "../types/task";
import { ScreenHeader } from "./ScreenHeader";
import { TaskInputBar } from "./TaskInputBar";
import { TaskSection } from "./TaskSection";

type TodoScreenProps = {
  tasks: Task[];
  sectionOrder: string[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function groupBySection(tasks: Task[]): Record<string, Task[]> {
  return tasks.reduce<Record<string, Task[]>>((acc, task) => {
    if (!acc[task.section]) acc[task.section] = [];
    acc[task.section].push(task);
    return acc;
  }, {});
}

export function TodoScreen({
  tasks,
  sectionOrder,
  onAdd,
  onToggle,
  onDelete,
}: TodoScreenProps) {
  const grouped = groupBySection(tasks);

  const knownSections = sectionOrder.filter((name) => grouped[name]?.length);
  const extraSections = Object.keys(grouped).filter(
    (name) => !sectionOrder.includes(name),
  );
  const sections = [...knownSections, ...extraSections];

  return (
    <div className="mx-auto max-w-[420px] h-screen flex flex-col bg-card shadow-xl">
      <header className="px-6 pt-10 pb-4">
        <ScreenHeader />
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-6">
        {sections.map((sectionName) => (
          <TaskSection
            key={sectionName}
            sectionName={sectionName}
            tasks={grouped[sectionName]}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>

      <TaskInputBar onAdd={onAdd} />
    </div>
  );
}
