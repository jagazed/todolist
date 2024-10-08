import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../app/app-reducer";
//import {TodolistType} from "../api/todolists-api";
//import {FilterValuesType, TodolistType} from '../App';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})

// test('correct todolist should be removed', () => {
//     const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
// });
//
// test('correct todolist should be added', () => {
//     let newTodolistTitle = "New Todolist";
//
//     const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))
//
//     expect(endState.length).toBe(3);
//     expect(endState[0].title).toBe(newTodolistTitle);
//     expect(endState[0].filter).toBe("all");
// });
//
// test('correct todolist should change its name', () => {
//     let newTodolistTitle = "New Todolist";
//
//     const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);
//
//     const endState = todolistsReducer(startState, action);
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
//
// test('correct filter of todolist should be changed', () => {
//     let newFilter: FilterValuesType = "completed";
//
//     const action = changeTodolistFilterAC(todolistId2, newFilter);
//
//     const endState = todolistsReducer(startState, action);
//
//     expect(endState[0].filter).toBe("all");
//     expect(endState[1].filter).toBe(newFilter);
// });

test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
    //expect(endState[1].filter).toBe(newFilter);
});

test('correct entit', () => {
    let newStatus : RequestStatusType = 'loading'
    const action = changeTodolistEntityStatusAC(todolistId2, newStatus)
    const endState = todolistsReducer(startState, action)
    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('Assa')
})