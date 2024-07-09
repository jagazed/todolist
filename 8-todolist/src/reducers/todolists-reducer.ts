import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type AddTodolistActionType ={
    type: "ADD-TODOLIST",
    payload: {
        title: string
        id: string
    }
}

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    payload: {
        id: string
    }
}

type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        filter: FilterValuesType,
        id: string
    }
}

type ChangeTodolistTitleFilterActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        title: string,
        id: string
    }
}

export type ActionType = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleFilterActionType


export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST": { //но они не обязательны, посльзуемся потому что id нельзя называть дважды
            //const {title} = action.payload
            //const newTodolist: TodolistType = {id: v1(), title, filter: 'all'}
            //return [newTodolist, ...todolists]
            // тоже самое
            const {title, id} = action.payload
            return [...todolists, {id, title, filter: 'all'} ]
        }
        case "REMOVE-TODOLIST": {
            const {id} = action.payload
            return todolists.filter(tl => tl.id !== id)
        }
        case "CHANGE-TODOLIST-FILTER": {
            const {filter, id} = action.payload
            return todolists.map( tl => tl.id === id ? {...tl, filter} : tl)
        }
        case "CHANGE-TODOLIST-TITLE": {
            const {title, id} = action.payload
            return todolists.map( tl => tl.id === id ? {...tl, title} : tl)
        }
        default:
            return todolists;
    }
}

export const AddTodolistAC = (id: string, title: string): AddTodolistActionType => ({
    type: "ADD-TODOLIST",
    payload: {title, id}
})

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST",
    payload: {
        id: id
    }
})

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        id: id,
        filter: filter
    }
})

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleFilterActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        id,
        title
    }
})


