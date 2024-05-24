import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

let arr = [ []]
function App() {

    let tasks: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]
    useState(tasks);
    // let tasks2: Array<TaskType> = [
    //     {id: 1, title: "Terminator", isDone: true},
    //     {id: 2, title: "XXX", isDone: false},
    //     {id: 3, title: "Jentlments of fortune", isDone: true},
    // ]

    function removeTask(id: number) {
        tasks = tasks.filter( t=> t.id !== id)
    }
    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />
            {/*<Todolist title="Movies" tasks={tasks2} />*/}
            {/*<Todolist title="Songs"/>*/}


        </div>
    );
}

export default App;
