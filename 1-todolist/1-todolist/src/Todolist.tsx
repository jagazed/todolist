import React from "react";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks}: TodolistPropsType) => { // props. поменял на {title, tasks}

    //const {title, tasks} = props //дистриктуризация

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length !== 0
    ? tasks.map(task => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
    })

    : <span>Your taskslist is empty</span>

    return (
        <div className="todolist">
        <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'} />
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}