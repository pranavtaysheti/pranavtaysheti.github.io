import type { Reducer } from "preact/hooks";

const ls = window.localStorage

export const initialState: string = (() => {
    const root = ls.getItem("root");
    if (root === null) {
        return ""
    } else {
        return root
    }
})()

export const reducer: Reducer<string, [string, string]> = (state, action) => {
    const [type, payload] = action
    switch (type) {
        case "o":
            ls.setItem("root", payload);
            const newState = ls.getItem("root");
            if (newState === null) {
                return ""
            } else {
                return newState
            }


        default:
            throw new Error(`Unhandled action: ${action}`)
    }
}