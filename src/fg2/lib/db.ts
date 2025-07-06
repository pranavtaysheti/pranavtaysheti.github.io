import { type ULID } from "ulid";
import { openDB, type DBSchema, type IDBPDatabase } from "idb";

interface DB extends DBSchema {
    tasks: {
        key: ULID | "root";
        value: {
            text: string
            subtasks: Array<ULID>
        }
    }
}


export let db: IDBPDatabase<DB> = await openDB("tasks", 1, {
    async upgrade(db,_ov, _nv, txn, e) {
        if (!db.objectStoreNames.contains("tasks")) {
            db.createObjectStore("tasks")

        txn.objectStore("tasks").put({
                text: "Welcome! bow before PT the great!",
                subtasks: [],
            }, "root")
        }
    }

    //TODO: handle blocked, blocking, etc. events
})
