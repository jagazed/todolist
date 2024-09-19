import { setAppError, setAppStatus } from "app/appSlice"
import { ResponseType } from "api/todolists-api"
import { Dispatch } from "redux"

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({ error: data.messages[0] }))
    } else {
        dispatch(setAppError({ error: "Some error occurred" }))
    }
    dispatch(setAppStatus({ status: "failed" }))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppError({ error: error.message } ? { error: error.message } : { error: "Some error occurred" }))
    dispatch(setAppStatus({ status: "failed" }))
}
