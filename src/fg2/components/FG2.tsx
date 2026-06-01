import { state } from "../lib/state"
import { TaskWidget } from "./Task"

export default function FG2() {
  const rootTask = state.root.value

  if (rootTask === null) {
    return (
      <div> "LOADING..." </div>
    )
  }

  return (
    <div>
      <TaskWidget task={rootTask} />
    </div>
  )
}