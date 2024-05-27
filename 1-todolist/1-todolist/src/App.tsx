import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

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
        {id:1, title: "CSS", isDone: true},
        {id:2, title: "JS", isDone: true},
        {id:3, title: "React", isDone: false},
        {id:4, title: "Html", isDone: true},
        {id:5, title: "TSX", isDone: false}
    ])

    //State management => useState, useReducer, redux
    const removeTask = (taskId: number) => {
        //иммутабельная работа -> без измения данных первоночальных данных
        const nextState = tasks.filter(t => t.id !== taskId) // new array
        setTasks(nextState)
        console.log(nextState)
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
            <Todolist title={todolistTitle} tasks={filteredTasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
