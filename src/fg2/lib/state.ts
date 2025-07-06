import { db } from "./db"
import { type ULID } from "ulid"
import { signal, type Signal } from "@preact/signals"

export const maxLayers = 3
export const state: Signal<null | State | Error> = signal(null)

export interface Task {
    text: string
    ulid_: ULID | "root"
    subtasks: Array<Task>
}

interface State {
    root: Task
}

async function buildState(root_ulid: ULID | "root") {
    const getSubTask = async (l: number, task_ulid: ULID): Promise<Array<Task>> => {
        if (l === maxLayers) {
            return []
        }

        const db_task = await db.get("tasks", task_ulid).catch((e: Error) => {
            const error_message = `Error getting subtask in buildSubTask ${task_ulid} from db: ${e.message}`
            console.error(error_message)
        })

        if (db_task === undefined) {
            return []
        }

        const res: Array<Task> = []
        for (const tu of db_task.subtasks) {
            res.push({
                text: db_task.text,
                subtasks: await getSubTask(l+1, tu),
                ulid_: tu
            })
        }

        return res
    }

    const root_task = await db.get("tasks", root_ulid).catch((e: Error) => {
        const error_message = `Error getting root_task in buildState ${root_ulid} from db: ${e.message}`
        console.error(error_message)
        state.value = new Error(error_message)
    })

    if (root_task === undefined) {
        return
    }

    state.value = {
        root: {
            text: root_task.text,
            ulid_: root_ulid,
            subtasks: await getSubTask(0, root_ulid)
        }
    }
    
}

export async function updateState(path: Array<ULID | "root">) {
    // TODO: Handle following errors:
    // 1. state is not intiialized yet
    // 2. state is of type error
    // 2. path doesnt exist

    const root_task = await db.get("tasks", "root").catch((e: Error) => {
        const error_message = `Error getting updated task value`
        console.error(error_message)
    })

    if (root_task === undefined) {
        return
    }

    (state.value as State).root.text = root_task.text
    state.value = state.value
}

async function initState() {
    const rootTask = await db.get("tasks", "root")

    if (rootTask === undefined) {
        console.error("Looks like key \"root\" was not found in db")
        state.value = new Error("root task not found in db")
    } else {
        buildState("root")
    }
} 

initState()