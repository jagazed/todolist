import React, {useRef} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask
    }: TodolistPropsType) => { // props. поменял на {title, tasks}

    //const {title, tasks} = props //дистриктуризация

    const taskInputRef = useRef<HTMLInputElement>(null)

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

    : <span>Your tasks list is empty</span>

    const addTaskHandler = () => {
        if (taskInputRef.current) {
            if (taskInputRef.current.value.length < 15) {
                addTask(taskInputRef.current.value)
            }
            taskInputRef.current.value = ""
        }
    }

    return (
        <div className="todolist">
        <h3>{title}</h3>
            <div>
                <input ref ={taskInputRef} />
                <Button title={"+"} onClickHandler={addTaskHandler} />
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