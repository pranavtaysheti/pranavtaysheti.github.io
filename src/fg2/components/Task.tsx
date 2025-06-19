import {maxLayers, type Task} from "../fg2";

function SubTasks(props: {l: number, tasks: Array<Task>}) {
    if (props.l === maxLayers) {
        return
    }

    return (
        <div>
            {props.tasks.map(i =>
                <div> 
                    <input value={i.text} onInput={(e) => {}} />
                <div>
                    <SubTasks l={props.l+1} tasks={props.tasks} />
                </div>
                </div>
            )}
        </div>
    )
}

export function Task(props: {task: Task}) {
    return (
        <div>
            <h1 class={"text-white text-3xl"}> {props.task.text} </h1>
            <SubTasks l={0} tasks={props.task.subtasks}/> 
        </div>
    )
}

