import { state } from "../fg2"
import {Task} from "./Task"

export default function FG2() {
    const rootTask = state.value

    if (rootTask === null) {
        return (
            <div> "LOADING..." </div>
        )
    }

    if (rootTask instanceof Error) {
        return (
            <div> {rootTask.message} </div>
        )
    }

    return (
        <div>
            <Task task={rootTask.root}/>         
        </div>
    )
}