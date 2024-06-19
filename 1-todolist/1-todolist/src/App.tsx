import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

// Create
// Read (view mode, filter, sort, search, page(по 10, 20 страниц показывать)
// Update
// Delete
// CRUD операции -> данные непрерывно меняются

// CLI -> командная строка
// GUI -> Graphic user interface -> мы такое делаем
// VUI -> voice
// VRUI -> виртуальная реальность
// ARUI -> дополненная реальность

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {
            id: todolistId_1,
            title: "What to learn",
            filter: "all",
        },
        {
            id: todolistId_2,
            title: "What to buy",
            filter: "all",
        }
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Chips', isDone: true},
            {id: v1(), title: 'Dried', isDone: false}
        ]
    })

    //State management => useState, useReducer, redux
    const removeTask = (taskId: string, todolistId: string) => {

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
        // аналогичный код:
        // const updatedTasks = tasks[todolistId]
        // const filteredTasks = updatedTasks.filter(t => t.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = filteredTasks
        // setTasks(copyTasks)
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks(
            {
                ...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
            })
    }

    const removeTodolist = (todolistId: string ) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        // const copyTasks = {...tasks}
        // delete copyTasks[todolistId]
        // setTasks(copyTasks)
        // или вот так, но сверху правила по которому все двигаются
        delete tasks[todolistId]

    }

    // UI
    const todolistsElements = todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
        }

        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodolist} //отфильтрованные

                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
            />
        )
    })

    return (
        <div className="App">
            {todolistsElements}
        </div>
    );
}

export default App;
