import { todolistsAPI, TodolistType } from "api/todolists-api"
import { RequestStatusType, setAppStatus } from "app/appSlice"
import { handleServerNetworkError } from "utils/error-utils"
import { AppThunk } from "app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchTasksTC } from "features/TodolistsList/tasks-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"

const todolistsSlice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
        },
        changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
                state[index].entityStatus = action.payload.status
            }
        },
        setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            action.payload.todolists.forEach((tl) => {
                state.push({ ...tl, filter: "all", entityStatus: "idle" })
            })
        },
        clearTodolists: (state, action: PayloadAction<{}>) => {
            return []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(clearTasksAndTodolists, () => {
            return []
        })
    },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
    removeTodolist,
    addTodolist,
    changeTodolistTitle,
    changeTodolistFilter,
    changeTodolistEntityStatus,
    setTodolists,
    clearTodolists,
} = todolistsSlice.actions

//const initialState: Array<TodolistDomainType> = []

// thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus({ status: "loading" }))
        todolistsAPI
            .getTodolists()
            .then((res) => {
                dispatch(setTodolists({ todolists: res.data }))
                dispatch(setAppStatus({ status: "succeeded" }))
                return res.data // добавил строку
            })
            .then((todos) => {
                // весь then добавил и закоментил в todolists
                todos.forEach((tl) => {
                    dispatch(fetchTasksTC(tl.id))
                })
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus({ status: "loading" }))
        dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }))
        todolistsAPI.deleteTodolist(todolistId).then((res) => {
            dispatch(removeTodolist({ id: todolistId }))
            dispatch(setAppStatus({ status: "succeeded" }))
        })
    }
}
export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus({ status: "loading" }))
        todolistsAPI.createTodolist(title).then((res) => {
            dispatch(addTodolist({ todolist: res.data.data.item }))
            dispatch(setAppStatus({ status: "succeeded" }))
        })
    }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.updateTodolist(id, title).then((res) => {
            dispatch(changeTodolistTitle({ id, title }))
        })
    }
}

// types

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
