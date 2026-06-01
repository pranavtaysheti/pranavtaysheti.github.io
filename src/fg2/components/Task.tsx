import { state, Task } from "../lib/state";

// Global Constants
const MAX_LAYERS = 1

export function TaskWidget({ task }: { task: Task }) {
  return (
    <div>
      <div
        class={"text-white text-3xl bg-slate-800 w-full overflow-hidden resize-none"}
        contentEditable
        role={"textbox"}
        onInput={(e) => state.updateTaskText(task, e.currentTarget.innerText)}
      >
        {task.text}
      </div>
    </div>
  )
}

