import { createAction } from "@reduxjs/toolkit"
// import { TasksStateType } from "features/TodolistsList/tasks-reducer"
// import { TodolistDomainType } from "features/TodolistsList/todolists-reducer"
//
// export type ClearTasksAndTodolistsType = {
//     tasks: TasksStateType
//     todolists: TodolistDomainType[]
// }
//
// export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>("common/clear-tasks-todolists")
// тоже самое сверху но надо дописать всякое

export const clearTasksAndTodolists = createAction("common/clear-tasks-todolists")
