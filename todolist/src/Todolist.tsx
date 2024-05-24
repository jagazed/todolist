import React from "react";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
}
export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        return (
                            <li>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={ () => { alert('click')} }>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button>ALL</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>

    )
}