import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type Action2Type = {
    type: '2'
    title: string
}

// export type ChangeTodolistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     payload: {
//         id: string
//         title: string
//     }
// }

type ActionType = | RemoveTaskActionType | Action2Type


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "2": {
            return {...state}
        }
        default:
            throw new Error("i don't understand this action type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId }
}
export const action2AC = (title: string): Action2Type => {
    return { type: '2', title: title }
}