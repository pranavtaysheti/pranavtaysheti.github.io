import { type ULID } from "ulid"
import { db, getNamedULID, getTask } from "./db"
import { signal, Signal } from "@preact/signals"

export class Task {
    text: Signal<string>
    ulid: ULID
    subtasks: Array<Task>

    constructor(ulid: ULID, text: string) {
        this.text = signal(text)
        this.ulid = ulid
        this.subtasks = []
    }
}

// State Management Helpers 

const buildDeepTask = async (ulid: ULID, layers: number): Promise<Task> => {
    // buildDeepTask:
    if (!Number.isInteger(layers)) {
        throw new Error(`buildDeepTask: no. of layers (${layers}) is not int`)
    }

    const buildTask = async (ulid: ULID, curr_layer: number): Promise<Task> => {
        const db_task = await getTask(ulid)

        const res = new Task(ulid, db_task.text)
        if (curr_layer >= layers) {
            return res
        }

        for (const c_ulid of db_task.subtasks) {
            const subtask = await buildTask(c_ulid, curr_layer + 1)
            res.subtasks.push(subtask)
        }

        return res
    }

    let ret: Task;
    try {
        ret = await buildTask(ulid, 0)
    } catch (e) {
        throw new Error(
            `buildDeepTask: Failed to build. ULID: ${ulid}, layers: ${layers}`,
            { cause: e }
        )
    }

    return ret
}

// State Management

class State {
    status: Signal<"Syncing" | "Synced">
    root: Signal<Task | null>

    constructor() {
        this.status = signal("Syncing")
        this.root = signal(null)
    }

    async init(layers: number) {
        try {
            const root_ulid = await getNamedULID("root")
            this.root.value = await buildDeepTask(root_ulid, layers)
        } catch (e) {
            throw new Error(
                `State::init: Failed to init state.`,
                { cause: e }
            )
        }
    }

    async updateTaskText(task: Task, newText: string) {
        task.text.value = newText

        this.status.value = "Syncing"
        await db.put("tasks", {
            text: newText,
            subtasks: task.subtasks.map((t) => t.ulid)
        }, task.ulid)

        this.status.value = "Synced"
    }
}

export const state = new State()
state.init(0)