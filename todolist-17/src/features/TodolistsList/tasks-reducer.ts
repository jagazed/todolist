import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api"
import { Dispatch } from "redux"
import { AppRootStateType } from "app/store"
import { setAppStatus } from "app/appSlice"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolist, clearTodolists, removeTodolist, setTodolists } from "features/TodolistsList/todolists-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"

//const initialState: TasksStateType = {} // можно и не писать??

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: "loading" }))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
    return { tasks, todolistId }
})

export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (param: { taskId: string; todolistId: string }, thunkAPI) => {
    const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return { taskId: param.taskId, todolistId: param.todolistId }
})
// thunks

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistsAPI
        .createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTask({ task })
                dispatch(action)
                dispatch(setAppStatus({ status: "succeeded" }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC =
    (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find((t) => t.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model,
        }

        todolistsAPI
            .updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const action = updateTask({ taskId, model, todolistId })
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
        //removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {},
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index !== -1) {
                tasks[index] = { ...tasks[index], ...action.payload.model }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(setTodolists, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((t) => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks.splice(index, 1)
                }
            })
            // homework
            .addCase(clearTodolists, (state, action) => {
                return {}
            })
            .addCase(clearTasksAndTodolists, () => {
                return {}
            })
    },
})

export const tasksReducer = tasksSlice.reducer
export const { addTask, updateTask } = tasksSlice.actions

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType = any
type ThunkDispatch = Dispatch<ActionsType>
