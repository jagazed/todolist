import React, {ChangeEvent, KeyboardEvent, useRef, useState} from "react";
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

    const [taskTitle, setTaskTitle] = useState("")

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length !== 0
    ? tasks.map((task: TaskType) => {
        const removeTaskHandler = () => removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={"x"} onClickHandler={removeTaskHandler} />
            </li>
        )
    })

    : <span>Your tasks list is empty</span>

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const setAllTasksHandler = () => {
        changeFilter("all")
    }
    const setActiveTasksHandler = () => {
        changeFilter("active")
    }
    const setCompletedTasksHandler = () => {
        changeFilter("completed")
    }

    const isAddTaskButtonDisabled = !Boolean(taskTitle.trim()) || taskTitle.length > 25
    {/*можно написать {!taskTitle.trim()}*/}
    const userTaskTitleLengthWarning =taskTitle.length > 15 && <div>Recommended task title is 15 charters </div>

    return (
        <div className="todolist">
        <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={keyDownAddTaskHandler} />
                <Button title={"+"} onClickHandler={addTaskHandler} disabled={isAddTaskButtonDisabled} />
                {userTaskTitleLengthWarning}
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button onClickHandler={setAllTasksHandler} title={"All"}/>
                <Button onClickHandler={setActiveTasksHandler} title={"Active"}/>
                <Button onClickHandler={setCompletedTasksHandler} title={"completed"}/>
            </div>
        </div>
    )
}