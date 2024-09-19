import { Dispatch } from "redux"
import { setAppStatus } from "app/appSlice"
import { authAPI, FieldErrorType, LoginParamsType } from "api/todolists-api";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { AxiosError } from "axios";

// const initialState: InitialStateType = {
//     isLoggedIn: false,
// }

export const loginTC = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
} >("auth/login", async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: "loading" }))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({ status: "succeeded" }))
            return { isLoggedIn: true }
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
            // Обработка других типов ошибок, если необходимо
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
            {state.isLoggedIn = action.payload.isLoggedIn}
        })
    },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions

// thunks

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authAPI
        .logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({ isLoggedIn: false }))
                dispatch(clearTasksAndTodolists())
                //dispatch(clearTodolists({}))
                dispatch(setAppStatus({ status: "succeeded" }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
