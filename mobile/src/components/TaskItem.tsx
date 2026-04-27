import { Check, X } from "lucide-react";
import type { Task } from "../types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="group flex items-start gap-3 bg-task-bg rounded-2xl px-3 py-3">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed ? "Mark task incomplete" : "Mark task complete"
        }
        aria-pressed={task.completed}
        className={[
          "shrink-0 w-7 h-7 rounded-md border-2 flex items-center justify-center mt-[2px] transition-colors",
          task.completed
            ? "border-neutral-700 bg-neutral-700 text-white"
            : "border-checkbox-border text-transparent hover:border-neutral-500",
        ].join(" ")}
      >
        {task.completed && <Check size={16} strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={[
            "text-[16px] font-bold leading-snug",
            task.completed
              ? "line-through text-neutral-400"
              : "text-text-primary",
          ].join(" ")}
        >
          {task.text}
        </p>
        {task.subtitle && (
          <p className="text-[13px] text-subtitle leading-snug mt-0.5">
            {task.subtitle}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.text}`}
        className="shrink-0 text-neutral-400 hover:text-neutral-600 transition opacity-0 group-hover:opacity-100 focus:opacity-100 p-1"
      >
        <X size={16} />
      </button>
    </div>
  );
}
