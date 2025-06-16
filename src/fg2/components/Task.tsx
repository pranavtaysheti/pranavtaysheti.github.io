import type { ULID } from "ulid";
import { state, type Task } from "../fg2";

export default function Task(props: {ulid_: ULID | "root"}) {
    const task = state.value
    
    if (task === null) {
        return (
            <div> "LOADING..." </div>
        )
    }

    if (task instanceof Error) {
        return (
            <div> {task.message} </div>
        )
    }

    return (
        <input value={(state.value as Task).text} />
    )
}