import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

// function useState2(data: any) {
//     return [ data, ()=> {}];
// }
// // eslint-disable-next-line react-hooks/rules-of-hooks
// let arr = useState2([{}, {}, {}]);
// let tasks = arr[0];
// let setTasks = arr[1];

export type FilterValuesType = "all" | "completed" | "active";
 function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter( t=> t.id !== id)
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus (taskId: string, isDone: boolean) {
        let task = tasks.find( t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    function changeFilter(value: FilterValuesType ){
        setFilter(value);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let taskForTodolist = tasks;

    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
