import { useState, type FormEvent } from "react";

type TaskInputBarProps = {
  onAdd: (text: string) => void;
};

export function TaskInputBar({ onAdd }: TaskInputBarProps) {
  const [value, setValue] = useState("");
  const trimmed = value.trim();
  const canSubmit = trimmed.length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 px-4 py-3 bg-card border-t border-neutral-200/60"
    >
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Write a task..."
        aria-label="New task"
        className="flex-1 bg-task-bg rounded-2xl px-4 py-3 text-[14px] text-text-primary placeholder:text-neutral-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={!canSubmit}
        className="bg-add-bg text-white text-[14px] font-bold px-5 py-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition"
      >
        Add
      </button>
    </form>
  );
}
