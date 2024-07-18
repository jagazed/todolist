import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = [newTask, ...todolistTasks]
            return {
                ...state
            }
            // let newTask : TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     isDone: false
            // }
            // return {
            //     ...state, [action.todolistId]: [newTask, ...state[action.todolistId] ]
            // }
        }
        case "CHANGE-TASK-STATUS": {
            // let tasks = state[action.todolistId]
            // let task = tasks.find(t => t.id === action.taskId)
            // if (task) {
            //     task.isDone = action.isDone
            // }
            // return {
            //     ...state
            // }
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, isDone: action.isDone}: t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, title: action.title}: t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.todolistId]:[]
            }
        }
        case "REMOVE-TODOLIST": {
            // let copyState = {...state}
            // copyState[action.id].filter((t => t.id != action.id))
            // delete copyState[action.id]
            // return copyState

            let copyState = {...state}
            delete copyState[action.id]
            return copyState
            //тоже самое
            // const {[action.id]: [], ...rest} = state
            // return rest
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}