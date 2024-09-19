import { Dispatch } from "redux"
import { authAPI } from "api/todolists-api"
import { setIsLoggedIn } from "features/Login/auth-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// const initialState: InitialStateType = {
//     status: "idle",
//     error: null,
//     isInitialized: false,
// }

const appSlice = createSlice({
    name: "app",
    initialState: {
        status: "idle" as RequestStatusType,
        error: null as string | null,
        isInitialized: false, // as boolean
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
    selectors: {
        selectAppError: (sliceState) => sliceState.error,
        selectAppStatus: (sliceState) => sliceState.status,
        selectIsInitialized: (sliceState) => sliceState.isInitialized,
    },
})

export const appReducer = appSlice.reducer
export const { setAppError, setAppStatus, setAppInitialized } = appSlice.actions
export const { selectAppError, selectAppStatus, selectIsInitialized } = appSlice.selectors

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({ isLoggedIn: true }))
        } else {
        }
        dispatch(setAppInitialized({ isInitialized: true }))
    })
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
