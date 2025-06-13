export default function task() {
    return (
        <input value={""} onInput={(e) => dispatch(["u", e.currentTarget.value])} />
    )
}