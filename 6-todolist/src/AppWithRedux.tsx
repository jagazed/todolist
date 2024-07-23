import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

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

function AppWithRedux() {

	const dispatch = useDispatch()
	const todolists = useSelector<AppRootState, Array<TodolistType>>( state => state.todolists )


	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		const action = changeTodolistFilterAC(filter, todolistId)
		dispatch(action)
	}

	const removeTodolist = (todolistId: string) => {
		const action = removeTodolistAC(todolistId);
		dispatch(action);
	}

	const addTodolist = (title: string) => {
		const action = addTodolistAC(title)
		dispatch(action);
	}

	const updateTodolist = (todolistId: string, title: string) => {
		const action = changeTodolistTitleAC(todolistId, title)
		dispatch(action)
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist}/>
			{todolists.map((tl) => {

				// const allTodolistTasks = tasks[tl.id]
				// let tasksForTodolist = allTodolistTasks
				//
				// if (tl.filter === 'active') {
				// 	tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
				// }
				//
				// if (tl.filter === 'completed') {
				// 	tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
				// }

				return <Todolist
					key={tl.id}
					todolistId={tl.id}
					title={tl.title}
					//tasks={tasksForTodolist}
					changeFilter={changeFilter}
					filter={tl.filter}
					removeTodolist={removeTodolist}
					updateTodolist={updateTodolist}
				/>
			})}
		</div>
	);
}

export default AppWithRedux;
