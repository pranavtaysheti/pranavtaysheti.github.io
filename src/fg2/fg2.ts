import { ulid, type ULID } from "ulid";
import { Signal, signal } from "@preact/signals";
import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export interface Task {
    text: string
    ulid_: ULID | "root"
//    subtasks: Array<ULID>
}

interface State {
    root: Task
}

interface DB extends DBSchema {
    tasks: {
        key: ULID | "root";
        value: {
            text: string
        }
    }
}

export const state: Signal<null | Task | Error> = signal(null)
let db: IDBPDatabase<DB> = await openDB("tasks", 1, {
    upgrade(db) {
        db.createObjectStore("tasks")
    }
})

await db.put("tasks", {text: "this is root task"}, "root")

const rootTask = await db.get("tasks", "root")

if (rootTask === undefined) {
    console.error("Looks like key \"root\" was not found in db")
    state.value = new Error("root task not found in db")
} else {
    state.value = {
        text: rootTask.text,
        ulid_: "root"
    }
}

