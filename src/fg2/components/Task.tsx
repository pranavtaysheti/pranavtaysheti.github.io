import { updateTask } from "../lib/actions";
import {maxLayers, type Task} from "../lib/state";
import { type ULID } from "ulid";

function SubTasks(props: {l: number, parent_ulids: Array<ULID>, tasks: Array<Task>}) {
    if (props.l === maxLayers) {
        return
    }

    return (
        <div>
            {props.tasks.map(i =>
                <div> 
                    <input value={i.text} onInput={(e) => {}} />
                    
                    <SubTasks
                        l={props.l+1} 
                        parent_ulids={[...props.parent_ulids, i.ulid_]}
                        tasks={props.tasks} 
                    />

                </div>
            )}
        </div>
    )
}

export function Task(props: {task: Task}) {
    return (
        <div>
            <div 
                class={"text-white text-3xl bg-slate-800 w-full overflow-hidden resize-none"}
                contentEditable
                role={"textbox"}
                onInput={(e) => updateTask([], e.currentTarget.innerText)}
            > 
                {props.task.text} 
            </div>

            <SubTasks 
                l={0}
                parent_ulids={[props.task.ulid_]} 
                tasks={props.task.subtasks}
            /> 
        </div>
    )
}

