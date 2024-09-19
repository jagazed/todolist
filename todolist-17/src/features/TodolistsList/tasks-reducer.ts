import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "app/store";
import { setAppStatus } from "app/appSlice";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addTodolistTC,
    clearTodolists,
    fetchTodolistsTC,
    removeTodolistTC
} from "features/TodolistsList/todolists-reducer";
import { clearTasksAndTodolists } from "common/actions/common.actions";

const initialState: TasksStateType = {} // можно и не писать??

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.getTasks(todolistId);
    const tasks = res.data.items;
    thunkAPI.dispatch(setAppStatus({ status: "succeeded" }));
    return { tasks, todolistId };
});

export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (param: {
    taskId: string;
    todolistId: string
}, thunkAPI) => {
    const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId);
    return { taskId: param.taskId, todolistId: param.todolistId };
});
export const addTaskTC = createAsyncThunk("tasks/addTask", async (param: { title: string, todolistId: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }));
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title);
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatus({ status: "succeeded" }));
            return task
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    }
    catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
});

export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as AppRootStateType;
    const task = state.tasks[param.todolistId].find((t) => t.id === param.taskId);
    if (!task) {
        return rejectWithValue("task not found in the state");
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    };

    const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            return param
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});

const tasksSlice = createSlice({
    name: "tasks",
    initialState,//: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id];
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                });
            })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex((t) => t.id === action.payload.taskId);
                if (index !== -1) {
                    tasks.splice(index, 1);
                }
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId];
                tasks.unshift(action.payload);
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex((t) => t.id === action.payload.taskId);
                if (index !== -1) {
                    tasks[index] = { ...tasks[index], ...action.payload.model };
                }
            })
            // homework
            .addCase(clearTodolists, (state, action) => {
                return {};
            })
            .addCase(clearTasksAndTodolists, () => {
                return {};
            });
    }
});

export const tasksReducer = tasksSlice.reducer;

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
