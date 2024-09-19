import { Dispatch } from "redux"
import { authAPI, todolistsAPI } from "api/todolists-api";
import { setIsLoggedIn } from "features/Login/auth-reducer"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState: InitialStateType = {
//     status: "idle",
//     error: null,
//     isInitialized: false,
// }
export const initializeAppTC = createAsyncThunk("app/initializeApp", async (param, { dispatch }) => {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
    } else {

    }
})


const appSlice = createSlice({
    name: "app",
    initialState: {
        status: "idle" as RequestStatusType,
        error: null as string | null,
        isInitialized: false, // as boolean
    } as InitialStateType,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
    },
    selectors: {
        selectAppError: (sliceState) => sliceState.error,
        selectAppStatus: (sliceState) => sliceState.status,
        selectIsInitialized: (sliceState) => sliceState.isInitialized,
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = appSlice.reducer
export const { setAppError, setAppStatus} = appSlice.actions
export const { selectAppError, selectAppStatus, selectIsInitialized } = appSlice.selectors

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
