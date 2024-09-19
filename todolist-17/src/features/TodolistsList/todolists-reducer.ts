import { todolistsAPI, TodolistType } from "api/todolists-api"
import { RequestStatusType, setAppStatus } from "app/appSlice"
import { handleServerNetworkError } from "utils/error-utils"
import { AppThunk } from "app/store"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTasksTC } from "features/TodolistsList/tasks-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"

export const fetchTodolistsTC = createAsyncThunk("todolists/fetchTodolists", async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }))
    const res = await todolistsAPI.getTodolists()
    try {
        //const res = await todolistsAPI.getTodolists();
        dispatch(setAppStatus({ status: "succeeded" }));
        //return {todolists: res.data}
        //homework
        const todos = res.data;
        for (const tl of todos) {
            await dispatch(fetchTasksTC(tl.id));
        }
        return {todolists: res.data}
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
});
export const removeTodolistTC = createAsyncThunk("todolists/removeTodolists", async (todolistId: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }));
    dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }));
    const res = await todolistsAPI.deleteTodolist(todolistId);
    dispatch(setAppStatus({ status: "succeeded" }));
    return { id: todolistId };
});
export const addTodolistTC = createAsyncThunk("todolists/addTodolists", async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }))
    const res = await todolistsAPI.createTodolist(title)
    dispatch(setAppStatus({ status: "succeeded" }))
    return { todolist: res.data.data.item }
});
export const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle", async (param: {id: string, title: string}, { dispatch, rejectWithValue }) => {
    await todolistsAPI.updateTodolist(param.id, param.title)
    return { id: param.id, title: param.title }
});


const todolistsSlice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
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
        clearTodolists: (state, action: PayloadAction<{}>) => {
            return []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state.push({ ...tl, filter: "all", entityStatus: "idle" })
            })
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        builder.addCase(clearTasksAndTodolists, () => {
            return []
        })
    },
})

export const todolistsReducer = todolistsSlice.reducer
export const { changeTodolistFilter, changeTodolistEntityStatus, clearTodolists, } = todolistsSlice.actions

//const initialState: Array<TodolistDomainType> = []

// thunks
// export const fetchTodolistsTC = (): AppThunk => {
//     return (dispatch) => {
//         dispatch(setAppStatus({ status: "loading" }))
//         todolistsAPI
//             .getTodolists()
//             .then((res) => {
//                 dispatch(setTodolists({ todolists: res.data }))
//                 dispatch(setAppStatus({ status: "succeeded" }))
//                 return res.data // добавил строку
//             })
//             .then((todos) => {
//                 // весь then добавил и закоментил в todolists
//                 todos.forEach((tl) => {
//                     dispatch(fetchTasksTC(tl.id))
//                 })
//             })
//             .catch((error) => {
//                 handleServerNetworkError(error, dispatch)
//             })
//     }
// }
// export const removeTodolistTC = (todolistId: string): AppThunk => {
//     return (dispatch) => {
//         dispatch(setAppStatus({ status: "loading" }))
//         dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }))
//         todolistsAPI.deleteTodolist(todolistId).then((res) => {
//             dispatch(removeTodolist({ id: todolistId }))
//             dispatch(setAppStatus({ status: "succeeded" }))
//         })
//     }
// }
// export const addTodolistTC = (title: string): AppThunk => {
//     return (dispatch) => {
//         dispatch(setAppStatus({ status: "loading" }))
//         todolistsAPI.createTodolist(title).then((res) => {
//             dispatch(addTodolist({ todolist: res.data.data.item }))
//             dispatch(setAppStatus({ status: "succeeded" }))
//         })
//     }
// }
// export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
//     return (dispatch) => {
//         todolistsAPI.updateTodolist(id, title).then((res) => {
//             dispatch(changeTodolistTitle({ id, title }))
//         })
//     }
// }

// types

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
