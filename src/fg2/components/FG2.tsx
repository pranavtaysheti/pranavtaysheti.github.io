import { state } from "../lib/state"
import { TaskWidget } from "./Task"

export default function FG2() {
  return (
    <div>
      {state.root.value && <TaskWidget task={state.root.value} />}
    </div>
  )
}