import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "9f9f9055-be3a-4471-b30d-243d6ab48e32"
    }
})
export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    },
}

type TodolistType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    resultCode: number
    messages: string []
}

type DeleteTodolistAndUpdateTodolistType = {
    data: {}
    fieldsErrors: string[]
    messages: Array<string>
    resultCode: number
}