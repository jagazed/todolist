import React, {ChangeEvent, KeyboardEvent, useRef, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
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
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus
    }: TodolistPropsType) => { // props. поменял на {title, tasks}

    //const {title, tasks} = props //дистриктуризация

    const [taskTitle, setTaskTitle] = useState("")
    const [taskInputError, setTaskInputError] = useState<string | null>(null)

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length !== 0
    ? tasks.map((task: TaskType) => {
        const removeTaskHandler = () => removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={(e)=> changeTaskStatus(task.id, e.currentTarget.checked)}

                />
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <Button title={"x"} onClickHandler={removeTaskHandler} />
            </li>
        )
    })

    : <span>Your tasks list is empty</span>

    const addTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if(trimmedTitle){
            addTask(taskTitle.trim())
        } else {
            setTaskInputError("Title is required")
        }
        setTaskTitle("")
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        taskInputError && setTaskInputError(null)
        setTaskTitle(e.currentTarget.value)
    }

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
    const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>Recommended task title is 15 charters </div>
    const userTaskEmptyTitleError = taskInputError && <div style={{color: 'red'}}>{taskInputError}</div>

    return (
        <div className="todolist">
        <h3>{title}</h3>
            <div>
                <input className={taskInputError ? "taskInputError" : ""}
                       value={taskTitle} onChange={changeTaskTitleHandler}
                       onKeyDown={keyDownAddTaskHandler}
                />
                <Button title={"+"} onClickHandler={addTaskHandler} disabled={isAddTaskButtonDisabled} />
                {userTaskTitleLengthWarning}
                {userTaskEmptyTitleError}
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button classes={filter === "all" ? "active" : ""} onClickHandler={setAllTasksHandler} title={"All"}/>
                <Button classes={filter === "active" ? "active" : ""} onClickHandler={setActiveTasksHandler} title={"Active"}/>
                <Button classes={filter === "completed" ? "active" : ""} onClickHandler={setCompletedTasksHandler} title={"Completed"}/>
            </div>
        </div>
    )
}