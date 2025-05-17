import { useReducer } from "preact/hooks";
import { initialState, reducer } from "../fg2";

export default function task() {
    const [text, dispatch] = useReducer(reducer, initialState)

    return (
        <input value={text} onChange={(e) => dispatch(["o", e.currentTarget.value])} />
    )
}