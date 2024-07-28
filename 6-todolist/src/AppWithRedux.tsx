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
import {useCallback} from "react";

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

function AppWithRedux(callback: T, deps: React.DependencyList) {
	console.log("app is called ")
	const dispatch = useDispatch()
	const todolists = useSelector<AppRootState, Array<TodolistType>>( state => state.todolists )

	const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
		const action = changeTodolistFilterAC(filter, todolistId)
		dispatch(action)
	},[dispatch])

	const removeTodolist = useCallback((todolistId: string) => {
		const action = removeTodolistAC(todolistId);
		dispatch(action);
	}, [dispatch])

	const addTodolist = useCallback((title: string) => {
		const action = addTodolistAC(title)
		dispatch(action);
	}, [dispatch]);

	const updateTodolist = useCallback((todolistId: string, title: string) => {
		const action = changeTodolistTitleAC(todolistId, title)
		dispatch(action)
	},[dispatch])

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist}/>
			{todolists.map((tl) => {

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
