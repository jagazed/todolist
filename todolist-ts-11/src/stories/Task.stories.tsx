import type {Meta, StoryObj} from '@storybook/react';
import {fn} from "@storybook/test";
import { action } from '@storybook/addon-actions';
import {Task} from "../Task";
import {useState} from "react";

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

    args: {
        changeTaskStatus: fn(),
        changeTaskTitle: fn(),
        removeTask: fn(),
        task: {id: '1212asdqwdq1', isDone: false, title: 'JS'},
        todolistId: 'sqwasq'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {}
export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '1212asdqwdq1', isDone: true, title: 'CSS'}
    }
}

const ToggleTask = () => {
    const [task, setTask] = useState({id: '1212asdqwdq1', isDone: false, title: 'JS'})
    function changeTaskStatus () {
        setTask({...task, isDone: !task.isDone})
    }
    function changeTaskTitle (taskId: string, newTitle: string) {
        setTask({...task, title: newTitle})
    }

    return <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={action('removeTask')} task={task} todolistId={'12asdqsdwsa'} />
}

export const ToggleTaskStory: Story = {
    render: () => <ToggleTask />
}