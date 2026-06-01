import { ulid, type ULID } from "ulid";
import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export interface DBTask {
    text: string;
    subtasks: Array<ULID>;
}

interface DB extends DBSchema {
    tasks: {
        key: ULID;
        value: DBTask;
    };

    metadata: {
        key: string;
        value: ULID
    }
}

export const db: IDBPDatabase<DB> = await openDB("fg2", 1, {
    upgrade(database, oldVersion, newVersion, transaction, event) {
        const root_ulid = ulid();

        database.createObjectStore("tasks");
        transaction.objectStore("tasks").put({
            text: "Welcome to Project FG2!",
            subtasks: [],
        }, root_ulid);

        database.createObjectStore("metadata");
        transaction.objectStore("metadata").put(root_ulid, "root")
    },
});

// DB Helper Functions

export const getTask = async (ulid: ULID): Promise<DBTask> => {
    const db_task = await db.get("tasks", ulid)

    if (db_task == undefined) {
        throw new Error(`getTask: no task of ulid: ${ulid} exists in db`)
    }

    return db_task
}

export const getNamedULID = async (name: string): Promise<ULID> => {
    const task_id = await db.get("metadata", name)

    if (task_id == undefined) {
        throw new Error(`getNamedULID: named task: ${name} doesn't exist`)
    }

    return task_id
}

export const getNamedTask = async (name: string): Promise<DBTask> => {
    let task: DBTask;
    try {
        task = await getTask(await getNamedULID(name));
    } catch (e) {
        throw new Error(
            `getNamedTask: failed to get named task: ${name}`,
            { cause: e }
        )
    }

    return task;
}

