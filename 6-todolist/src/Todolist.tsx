import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistID: string, taskID: string, newTitle : string ) => void
	updateTodolist: (todolistID: string, newTitle : string ) => void
}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		todolistId,
		removeTodolist,
		updateTask,
		updateTodolist
	} = props

	//const [taskTitle, setTaskTitle] = useState('')
	//const [error, setError] = useState<string | null>(null)

	// const addTaskHandler = () => {
	// 	if (taskTitle.trim() !== '') {
	// 		addTask(taskTitle.trim(), todolistId)
	// 		setTaskTitle('')
	// 	} else {
	// 		setError('Title is required')
	// 	}
	// }

	// const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
	// 	setTaskTitle(event.currentTarget.value)
	// }

	// const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
	// 	setError(null)
	// 	if (event.key === 'Enter') {
	// 		addTaskHandler()
	// 	}
	// }

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskHandler = (title: string) => {
		addTask(title, props.todolistId)
	}

	const updateTodolistHandler = (title: string) => {
		updateTodolist(todolistId, title)
	}


	const updateTaskHandler = (taskId:string, newTitle: string) => {
		updateTask(todolistId, taskId, newTitle)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan oldTitle={title} updateItem={updateTodolistHandler}/></h3>
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<AddItemForm addItem={addTaskHandler} />

			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}

							// const updateTaskHandler = (newTitle: string) => {
							// 	updateTask(todolistId, task.id, newTitle)
							// }

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan oldTitle={task.title} updateItem={(newTitle) => updateTaskHandler(task.id, newTitle)} />
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
}
