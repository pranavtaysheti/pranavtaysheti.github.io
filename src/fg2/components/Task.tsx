import { state, Task } from "../lib/state";

// Global Constants
const MAX_LAYERS = 1

export function TaskWidget({ task }: { task: Task }) {
  return (
    <div>
      <textarea
        class={"text-white text-3xl bg-slate-800 w-full overflow-hidden resize-none"}
        onInput={(e) => state.updateTaskText(task, e.currentTarget.value)}
      >
        {task.text.value}
      </textarea>
    </div>
  )
}

