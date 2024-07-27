import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


type PropsType = {
	title: string
	todolistId: string
	//tasks: TaskType[]
	//removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	//addTask: (title: string, todolistId: string) => void
	//changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	//??? updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
	console.log("Todolist is called")

	const {
		title,
		filter,
		changeFilter,
		todolistId,
		removeTodolist,
		updateTodolist
	} = props

	const tasks = useSelector<AppRootState, Array<TaskType>>( state => state.tasks[props.todolistId] )
	const dispatch = useDispatch()

	const AddTask = useCallback((title: string) => {
		dispatch(addTaskAC(title, props.todolistId))
	} , [])
	// const updateTask = (todolistId: string, taskId: string, title: string) => {
	// 	dispatch(changeTaskTitleAC(todolistId, taskId, title))
	// }

	const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	}, [])

	const removeTodolistHandler = useCallback(() => {
		removeTodolist(todolistId)
	},[])

	// const addTaskCallback = (title: string) => {
	// 	dispatch(addTaskAC(title, todolistId));
	// }

	const updateTodolistHandler = useCallback((title: string) => {
		updateTodolist(props.todolistId, title)
	},[])

	let allTodolistTasks = tasks
	let tasksForTodolist = allTodolistTasks

	if (props.filter === 'active') {
		tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
	}

	if (props.filter === 'completed') {
		tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<AddItemForm addItem={AddTask}/>
			{
				tasksForTodolist.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasksForTodolist.map((task) => {

							const removeTaskHandler = () => {
								dispatch(removeTaskAC(task.id, todolistId))
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								dispatch(changeTaskStatusAC(task.id, newStatusValue, todolistId));
								//dispatch(changeTaskStatusAC(taskId, taskStatus, todolistId));
								//changeTaskStatus(task.id, newStatusValue, todolistId)
							}

							const changeTaskTitleHandler = (title: string) => {
								dispatch(changeTaskTitleAC(todolistId, task.id, title))
								//dispatch(changeTaskTitleAC(todolistId, taskId, title))
								//updateTask(todolistId, task.id, title)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
				        onClick={() => changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
				        onClick={() => changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
				        onClick={() => changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
})
