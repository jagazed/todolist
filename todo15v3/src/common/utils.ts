import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from "redux";

// export const handleServerNetworkError = (dispatch: Dispatch, err: {message: string}) => {
//     dispatch(setAppErrorAC(err.message))
//     dispatch(setAppStatusAC('failed'))
// }
export const handleServerNetworkError = (
    dispatch: Dispatch,
    err: Error
) => {
    dispatch(setAppErrorAC(err.message ? err.message : 'Some error occurred'));
    dispatch(setAppStatusAC('failed'));
};

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}