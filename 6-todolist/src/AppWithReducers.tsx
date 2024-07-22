import './App.css';
import {Todolist} from "./Todolist";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

function AppWithReducers() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
	})

	const removeTask = (taskId: string, todolistId: string) => {
		const action = removeTaskAC(taskId, todolistId);
		dispatchToTasksReducer(action);
	}

	const addTask = (title: string, todolistId: string) => {
		const action = addTaskAC(title, todolistId);
		dispatchToTasksReducer(action);
	}
	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		const action = changeTaskStatusAC(taskId, taskStatus, todolistId);
		dispatchToTasksReducer(action);
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		const action = changeTodolistFilterAC(filter, todolistId)
		dispatchToTodolistsReducer(action)
	}

	const removeTodolist = (todolistId: string) => {
		const action = removeTodolistAC(todolistId);
		dispatchToTasksReducer(action);
		dispatchToTodolistsReducer(action)
	}

	const addTodolist = (title: string) => {
		const action = addTodolistAC(title)
		dispatchToTasksReducer(action);
		dispatchToTodolistsReducer(action)
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, title))
	}

	const updateTodolist = (todolistId: string, title: string) => {
		const action = changeTodolistTitleAC(todolistId, title)
		dispatchToTodolistsReducer(action)
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist}/>
			{todolists.map((tl) => {

				const allTodolistTasks = tasks[tl.id]
				let tasksForTodolist = allTodolistTasks

				if (tl.filter === 'active') {
					tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
				}

				return <Todolist
					key={tl.id}
					todolistId={tl.id}
					title={tl.title}
					tasks={tasksForTodolist}
					removeTask={removeTask}
					changeFilter={changeFilter}
					addTask={addTask}
					changeTaskStatus={changeTaskStatus}
					filter={tl.filter}
					removeTodolist={removeTodolist}
					updateTask={updateTask}
					updateTodolist={updateTodolist}
				/>
			})}
		</div>
	);
}

export default AppWithReducers;
