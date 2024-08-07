import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonProps, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType)  => {
    console.log('Todolist')
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[props.title])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])

    let tasks = props.tasks

    tasks = useMemo(() => {
        console.log('useMemo')
        if (props.filter === "active") {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true);
        }
        return tasks
    }, [tasks, props.filter])



    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    // const onClickHandler = () => props.removeTask(t.id, props.id)
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    // }
                    // const onTitleChangeHandler = (newValue: string) => {
                    //     props.changeTaskTitle(t.id, newValue, props.id);
                    // }


                    return <TaskWithRedux key={t.id} task={t} todolistId={props.id} />



                    // <Task key={t.id}
                    //              task={t}
                    //              todolistId={props.id}
                    //              removeTask={props.removeTask}
                    //              changeTaskTitle={props.changeTaskTitle}
                    //              changeTaskStatus={props.changeTaskStatus}
                    // />
                    // <div key={t.id} className={t.isDone ? "is-done" : ""}>
                    //     <Checkbox
                    //         checked={t.isDone}
                    //         color="primary"
                    //         onChange={onChangeHandler}
                    //     />
                    //
                    //     <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                    //     <IconButton onClick={onClickHandler}>
                    //         <Delete />
                    //     </IconButton>
                    // </div>
                })
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            {/*<ButtonWithMemo variant={props.filter === 'all' ? 'outlined' : 'text'}*/}
            {/*        onClick={onAllClickHandler}*/}
            {/*        color={'inherit'} title={'All'}*/}
            {/*>*/}
            {/*</ButtonWithMemo>*/}
            {/*<ButtonWithMemo variant={props.filter === 'active' ? 'outlined' : 'text'}*/}
            {/*        onClick={onActiveClickHandler}*/}
            {/*        color={'primary'} title={'Active'}>*/}
            {/*</ButtonWithMemo>*/}
            {/*<ButtonWithMemo variant={props.filter === 'completed' ? 'outlined' : 'text'}*/}
            {/*        onClick={onCompletedClickHandler}*/}
            {/*        color={'secondary'} title={'Completed'}>*/}
            {/*</ButtonWithMemo>*/}
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                            onClick={onAllClickHandler}
                            color={'inherit'} 
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                            onClick={onActiveClickHandler}
                            color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                            onClick={onCompletedClickHandler}
                            color={'secondary'} >Completed
            </Button>
        </div>
    </div>
})

type ButtonWithMemoPropsType = ButtonProps & {}

const ButtonWithMemo = memo(({...props}: ButtonWithMemoPropsType) => {
    return <Button
     variant={props.variant}
     onClick={props.onClick}
     color={props.color}
     {...props}
    >{props.title}</Button>
})




