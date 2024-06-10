import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
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
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //DATA
    const todolistTitle = "What to learn"

    //global state
    const [ tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Html", isDone: true},
        {id: v1(), title: "TSX", isDone: false}
    ])

    //State management => useState, useReducer, redux
    const removeTask = (taskId: string) => {
        //иммутабельная работа -> без измения данных первоночальных данных
        const nextState: Array<TaskType> = tasks.filter(t => t.id !== taskId) // new array
        setTasks(nextState)
        console.log(nextState)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        //иммутабильеная работа
        // const copyState = [...tasks]
        // copyState.push(newTask)
        // setTasks(copyState)
        // аналог строк выше
        setTasks([newTask, ...tasks]) //такая запись добавит в конец массива новый элемент, если в начале то
        // setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks(nextState)
    }
    //UI
    const [filter, setFilter] = useState<FilterValuesType>("all")
    // какие таски отдать в Todo на отрисовку? => см. filter

    let filteredTasksForTodolist: Array<TaskType> = tasks
    if (filter === "active") {
        filteredTasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        filteredTasksForTodolist = tasks.filter(t => t.isDone)
    }

    const changeFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    return (
        <div className="App">
            <Todolist title={todolistTitle}
                      tasks={filteredTasksForTodolist}
                      filter={filter}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
