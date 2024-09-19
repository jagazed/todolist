import { Dispatch } from "redux"
import { setAppStatus } from "app/appSlice"
import { authAPI, FieldErrorType, LoginParamsType } from "api/todolists-api";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { AxiosError } from "axios";

// const initialState: InitialStateType = {
//     isLoggedIn: false,
// }

export const loginTC = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
} >("auth/login", async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: "loading" }))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            //return thunkAPI.rejectWithValue({ isLoggedIn: false })
            return thunkAPI.rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
        }
    } catch (err) {
        // const error: AxiosError = err
        // handleServerNetworkError(error, thunkAPI.dispatch)
        // //return { isLoggedIn: false }
        // return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
        // изменил вот на этот код чтобы не было ошибки
        if (err instanceof AxiosError) {
            const error: AxiosError = err;
            handleServerNetworkError(error, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined });
        } else {
            return thunkAPI.rejectWithValue({ errors: ['Unknown error'], fieldsErrors: undefined });
            }
    }
})

export const logoutTC = createAsyncThunk("auth/logout", async (param , thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: "loading" }))
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(clearTasksAndTodolists());
            //dispatch(clearTodolists({}))
            thunkAPI.dispatch(setAppStatus({ status: "succeeded" }));
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({}) // какую строку оставить?
        }
    }
    catch (err){
        if (err instanceof AxiosError) {
            const error: AxiosError = err;
            handleServerNetworkError(error, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined });
        } else {
            return thunkAPI.rejectWithValue({ errors: ['Unknown error'], fieldsErrors: undefined });
        }
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    // редьюсер + экшен
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            //return { ...state, isLoggedIn: action.payload.isLoggedIn }
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = false
        })
    },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions

// thunks


