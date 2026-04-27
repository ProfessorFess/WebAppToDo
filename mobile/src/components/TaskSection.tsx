import type { Task } from "../types/task";
import { TaskItem } from "./TaskItem";

type TaskSectionProps = {
  sectionName: string;
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskSection({
  sectionName,
  tasks,
  onToggle,
  onDelete,
}: TaskSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-[12px] font-bold uppercase tracking-wider text-section-label">
        {sectionName}
      </h2>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
