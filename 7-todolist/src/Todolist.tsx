import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
//import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';





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
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
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

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskCallback = (title: string) => {
		addTask(title, props.todolistId)
	}

	const updateTodolistHandler = (title: string) => {
		updateTodolist(props.todolistId, title)
	}

	return (
		<div>
            <div className={"todolist-title-container"}>
                <h3>
                    <EditableSpan value={title} onChange={updateTodolistHandler}/>
                    {/*<Button title={'x'} />*/}
                    <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </h3>
            </div>
			<AddItemForm addItem={addTaskCallback}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}

							const changeTaskTitleHandler = (title: string) => {
								updateTask(todolistId, task.id, title)
							}

							return <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}>
								{/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
								<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
								<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
								{/*<Button onClick={removeTaskHandler} title={'x'}/>*/}
								<IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
									<DeleteIcon fontSize="inherit" />
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<div>
				<Button variant={filter === 'all' ? 'outlined' : 'contained'} color="error"
				        onClick={() => changeFilterTasksHandler('all')}>All</Button>
				<Button variant={filter === 'active' ? 'outlined' : 'contained'}  color="primary"
						onClick={() => changeFilterTasksHandler('active')}>Active</Button>
				<Button variant={filter === 'completed' ? 'outlined' : 'contained'} color="secondary"
						onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
			</div>
		</div>
	)
}
