import { ulid, type ULID } from "ulid";
import { Signal, signal } from "@preact/signals";
import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export interface Task {
    text: string
    ulid_: ULID | "root"
    subtasks: Array<Task>
}

interface State {
    root: Task
}

interface DB extends DBSchema {
    tasks: {
        key: ULID | "root";
        value: {
            text: string
            subtasks: Array<ULID>
        }
    }
}

export const maxLayers = 3
export const state: Signal<null | State | Error> = signal(null)

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

    if (rootTask === undefined) {
        return
    }

    state.value = {
        root: {
            text: rootTask.text,
            ulid_: root_ulid,
            subtasks: await getSubTask(0, root_ulid)
        }
    }
    
}

let db: IDBPDatabase<DB> = await openDB("tasks", 1, {
    upgrade(db) {
        db.createObjectStore("tasks")
    }

    //TODO: handle blocked, blocking, etc. events
})

await db.put("tasks", {
    text: "this is root task, if you are user this shouldnt be visible.",
    subtasks: [],
}, "root")

const rootTask = await db.get("tasks", "root")

if (rootTask === undefined) {
    console.error("Looks like key \"root\" was not found in db")
    state.value = new Error("root task not found in db")
} else {
    // state.value = {
    //     root: {
    //         text: rootTask.text,
    //         ulid_: "root",
    //         subtasks: [],
    //     }
    // }

    buildState("root")
}

