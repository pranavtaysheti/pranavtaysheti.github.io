import { ulid, type ULID } from "ulid";
import { Signal, signal } from "@preact/signals";

interface Task {
    title: string
    ulid_: ULID
    subtasks: Array<ULID>
}

interface State {
    root: Task
}

const state: Signal<null | Task | Error> = signal(null)
let db: null | IDBDatabase = null

function initializaState() {
    const request = window.indexedDB.open("root", 3)

    request.onupgradeneeded = (e) => {
        console.info("root database either doesnt exist or is outdated. updating to v3")
    }

    request.onerror = (e) => {
        console.error("couldn't get/ create root database")
        console.log((e.target as IDBOpenDBRequest).error?.message)
    }

    request.onsuccess = (e) => {
        db = (e.target as IDBOpenDBRequest).result
    }
}

function initializeDatabase() {
    if (db === null) {
        console.error("cannot initilize null value db")
        return
    }

    db.onerror = (e) => {
        console.error(`database error: ${(e.target as IDBOpenDBRequest).error?.message}`)
    }

    
}