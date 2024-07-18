import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {TaskType} from "../Todolist";

export type removeTaskActionType = ReturnType<typeof removeTaskAC>
export type addTaskActionType = ReturnType<typeof addTaskAC>


type ActionsType = removeTaskActionType | addTaskActionType

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
