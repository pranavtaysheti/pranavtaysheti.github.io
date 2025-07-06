import type { ULID } from "ulid";
import { state, updateState} from "./state";
import { db } from "./db";

export async function updateTask(path: Array<ULID>, newText: string) {
    await db.put("tasks", {
        text: newText,
        subtasks: [],
    }, "root")

    updateState([])
}