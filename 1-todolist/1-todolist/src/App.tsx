import React from 'react';
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


function App() {
    const todolistTitle = "What to learn"

    let tasks1: Array<TaskType> = [
        {id:1, title: "CSS", isDone: true},
        {id:2, title: "JS", isDone: true},
        {id:3, title: "React", isDone: false},
        {id:4, title: "Html", isDone: true},
        {id:5, title: "TSX", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={todolistTitle} tasks={tasks1}/>
            {/* Todolist({title: "What to learn"})*/}
            {/*<Todolist title="What to buy"/>*/}
            {/*<Todolist title="What to read"/>*/}
        </div>
    );
}

export default App;
