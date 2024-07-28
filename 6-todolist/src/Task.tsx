import {FilterValuesType, TaskType} from "./App";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {Button} from "./Button";

type TaskPropsType = {
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTodolist: (todolistId: string, title: string) => void
    //?? removeTaskHandler: () => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const removeTaskHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(props.task.id, newStatusValue, props.todolistId));
        //dispatch(changeTaskStatusAC(taskId, taskStatus, todolistId));
        //changeTaskStatus(task.id, newStatusValue, todolistId)
    }

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, title))
        //dispatch(changeTaskTitleAC(todolistId, taskId, title))
        //updateTask(todolistId, task.id, title)
    },[props.todolistId, props.task.id])

    return <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <input type="checkbox" checked={props.task.isDone} onChange={changeTaskStatusHandler}/>
        <EditableSpan value={props.task.title} onChange={changeTaskTitleHandler}/>
        <Button onClick={removeTaskHandler} title={'x'}/>
    </li>
})