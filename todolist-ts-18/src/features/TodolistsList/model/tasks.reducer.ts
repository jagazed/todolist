import {
    TaskType,
    todolistsAPI,
    UpdateTaskArgs,
    UpdateTaskModelType
} from "features/TodolistsList/api/todolists-api";
import { appActions } from "app/app.reducer";
import {
    addTodolist,
    fetchTodolists,
    removeTodolist,
    todolistsActions
} from "features/TodolistsList/model/todolists.reducer";
import {createSlice} from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import {createAppAsyncThunk, handleServerNetworkError} from "../../../common/utils";
import {handleServerAppError} from "../../../common/utils";
import {TaskPriorities, TaskStatuses} from "../lib/enums";

const initialState: TasksStateType = {};

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.task.todoListId];
                tasks.unshift(action.payload.task);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex((t) => t.id === action.payload.taskId);
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel};
                }
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex((t) => t.id === action.payload.taskId);
                if (index !== -1) tasks.splice(index, 1);
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id];
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                });
            })
            .addCase(clearTasksAndTodolists, () => {
                return {};
            });
    },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

export const fetchTasks = createAppAsyncThunk<{
    tasks: TaskType[],
    todolistId: string
}, string>(`${slice.name}/fetchTasks`, async(todolistId: string, thunkAPI)=> {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items;
        //dispatch(tasksActions.setTasks({tasks, todolistId}));
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        return {tasks, todolistId}
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const addTask = createAppAsyncThunk<{ task: TaskType }, { title: string, todolistId: string }>(`${slice.name}/addTask`, async (arg, thunkAPI) =>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await todolistsAPI.createTask(arg)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item;
            dispatch(appActions.setAppStatus({status: "succeeded"}));
            return {task}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs > (`${slice.name}/updateTask`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {
        const state = getState();
        const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
        if (!task) {
            console.warn("task not found in the state");
            return rejectWithValue(null)
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...arg.domainModel,
        };

        const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
        if (res.data.resultCode === 0) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const removeTask = createAppAsyncThunk<{taskId: string, todolistId: string} , {taskId: string, todolistId: string}>(`${slice.name}/removeTask`, async (arg, thunkAPI) =>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await todolistsAPI.deleteTask(arg.todolistId, arg.taskId)
        return { taskId: arg.taskId, todolistId: arg.todolistId }
    } catch (err) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
