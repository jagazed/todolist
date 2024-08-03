import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import React from "react";

export default {
	title: "Task Component",
	component: Task
}

const removeTodolistCallback = action("Task remove")
const updateTodolistCallback = action("Title changed")
const changeFilterCallback = action("Status changed")

export const TaskBaseExample = () => {
	return <>
		<Task
			task={{id: '1', isDone: true, title: 'CSS'}}
			todolistId={"todolistId1"}
			removeTodolist={removeTodolistCallback}
			updateTodolist={updateTodolistCallback}
			changeFilter={changeFilterCallback}
		/>
			<Task
				task={{id: '2', isDone: false, title: 'JS'}}
				todolistId={"todolistId2"}
				removeTodolist={removeTodolistCallback}
				updateTodolist={updateTodolistCallback}
				changeFilter={changeFilterCallback}
			/>
	</>
}