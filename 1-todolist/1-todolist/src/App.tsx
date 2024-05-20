import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

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
    return (
        <div className="App">
            <Todolist title="What to learn"/>
            {/* Todolist({title: "What to learn"})*/}
            <Todolist title="What to buy"/>
            <Todolist title="What to read"/>
        </div>
    );
}

export default App;
