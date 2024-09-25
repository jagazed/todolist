import {TaskType, todolistsAPI, TodolistType} from "features/TodolistsList/api/todolists-api";
import {appActions, RequestStatusType} from "app/app.reducer";
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {AppThunk} from "app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk} from "../../../common/utils";
import {fetchTasks} from "./tasks.reducer";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearTasksAndTodolists, () => {
                return [];
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}));
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: "all", entityStatus: "idle"};
                state.unshift(newTodolist);
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) state.splice(index, 1);
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const todo = state.find((todo) => todo.id === action.payload.id);
                if (todo) {
                    todo.title = action.payload.title;
                }
            })
    },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

export const fetchTodolists = createAppAsyncThunk<{
    todolists: TodolistType[]},void>(`${slice.name}/fetchTodolists`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await todolistsAPI.getTodolists()
        const todos = res.data;
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        return {todolists: todos}
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})
export const addTodolist = createAppAsyncThunk<
    {todolist: TodolistType}, {title: string}>(`${slice.name}/addTodolist`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await todolistsAPI.createTodolist(arg.title)
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        return {todolist: res.data.data.item}
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})
export const removeTodolist = createAppAsyncThunk<
    { id: string },string>(`${slice.name}/removeTodolist`, async ( id , thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: "loading"}));
        const res = await todolistsAPI.deleteTodolist(id)
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        return {id}
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})
export const changeTodolistTitle = createAppAsyncThunk<
    { id: string, title: string }, { id: string, title: string }>(`${slice.name}/changeTodolistTitle`, async ( {id, title} , thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await todolistsAPI.updateTodolist(id, title)
        return {id, title}
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})
// export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
//     return (dispatch) => {
//         todolistsAPI.updateTodolist(id, title).then((res) => {
//             dispatch(todolistsActions.changeTodolistTitle({id, title}));
//         });
//     };
// };

// export const removeTodolistTC = (id: string): AppThunk => {
//     return (dispatch) => {
//         dispatch(appActions.setAppStatus({status: "loading"}));
//         dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: "loading"}));
//         todolistsAPI.deleteTodolist(id).then((res) => {
//             dispatch(todolistsActions.removeTodolist({id}));
//             dispatch(appActions.setAppStatus({status: "succeeded"}));
//         });
//     };
// };

// export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
//     return (dispatch) => {
//         todolistsAPI.updateTodolist(id, title).then((res) => {
//             dispatch(todolistsActions.changeTodolistTitle({id, title}));
//         });
//     };
// };

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};
