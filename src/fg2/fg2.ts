const syncLocal = () => {
    ls.setItem("task", tb.value);
    console.log(ls.getItem("task"));
};

const initLocal = () => {
    const cached_task = ls.getItem("task");
    if (cached_task !== null) {
        tb.value = cached_task
    }
}

var tb: HTMLTextAreaElement;
const ls = window.localStorage;
document.addEventListener("DOMContentLoaded", () => {
    tb = document.getElementById("task-box") as HTMLTextAreaElement;

    initLocal()
    tb.addEventListener("change", syncLocal);
});
