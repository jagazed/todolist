import React from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (
    {
        title,
        tasks,
        removeTask,
        changeFilter
    }: TodolistPropsType) => { // props. поменял на {title, tasks}

    //const {title, tasks} = props //дистриктуризация

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length !== 0
    ? tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={"x"} onClickHandler={() => removeTask(task.id)} />
            </li>
        )
    })

    : <span>Your taskslist is empty</span>

    return (
        <div className="todolist">
        <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"} />
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button onClickHandler={() => changeFilter("all")} title={"All"}/>
                <Button onClickHandler={() => changeFilter("active")} title={"Active"}/>
                <Button onClickHandler={() => changeFilter("completed")} title={"completed"}/>
            </div>
        </div>
    )
}