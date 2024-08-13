import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API',
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "9f9f9055-be3a-4471-b30d-243d6ab48e32"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist("Vasya todolist")
            .then((res) => {
            setState(res.data);
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1435a170-6387-4bf6-88b9-dcae5bcab19e'
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
            setState(res.data);
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c9b7df96-f355-4849-95c4-56f584b61e4d'
        todolistsApi.updateTodolist(todolistId, "Yo yo yo").then((res) => {
            setState(res.data);
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '94f1ad19-3abe-4e64-94c0-3cab03943634'
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '94f1ad19-3abe-4e64-94c0-3cab03943634'
        const title = 'new task'
        todolistsApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>("")
    const [todolistId, setTodolistId] = useState<any>("")
    const deleteTask = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const getDate = () => {
            const date = new Date();
            return date.toDateString();
        }
        const todolistId = '94f1ad19-3abe-4e64-94c0-3cab03943634'
        const taskId = '86be2b84-eb33-4f7a-8c3c-c98c8a793a83'
        const model = {
            title: 'update task',
            description: 'processing ok',
            completed: true,
            status: 1,
            priority: 2,
            startDate: getDate(),
            deadline: getDate()
        }
        todolistsApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}