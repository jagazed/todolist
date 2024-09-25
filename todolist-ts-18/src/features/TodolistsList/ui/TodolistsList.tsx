import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addTodolist, changeTodolistTitle,
  fetchTodolists,
  FilterValuesType, removeTodolist,
  todolistsActions,
} from "features/TodolistsList/model/todolists.reducer";
import {addTask, removeTask, updateTask} from "features/TodolistsList/model/tasks.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/TodolistsList/model/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/model/todolists.selectors";
import {TaskStatuses} from "../lib/enums";

type PropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    const thunk = fetchTodolists();
    dispatch(thunk);
  }, []);

  const removeTaskCallback = useCallback(function (taskId: string, todolistId: string) {
    const thunk = removeTask({taskId, todolistId});
    dispatch(thunk);
  }, []);

  const addTaskCallback = useCallback(function (title: string, todolistId: string) {
    const thunk = addTask({title, todolistId});
    dispatch(thunk);
  }, []);


  const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
    dispatch(updateTask({taskId, domainModel: { status }, todolistId}));
  }, []);

  const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
    dispatch(updateTask({taskId, domainModel: { title }, todolistId}));
  }, []);

  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    dispatch(todolistsActions.changeTodolistFilter({ id, filter }));
  }, []);

  const removeTodolistCallback = useCallback(function (id: string) {
    const thunk = removeTodolist(id);
    dispatch(thunk);
  }, []);

  const changeTodolistTitleCallback = useCallback(function (id: string, title: string) {
    const thunk = changeTodolistTitle({id, title});
    dispatch(thunk);
  }, []);

  const addTodolistCallback = useCallback(
    (title: string) => {
      const thunk = addTodolist({title});
      dispatch(thunk);
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTaskCallback}
                  changeFilter={changeFilter}
                  addTask={addTaskCallback}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolistCallback}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitleCallback}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
