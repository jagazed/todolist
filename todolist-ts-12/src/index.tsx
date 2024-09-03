// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './app/App';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
//
//
//
// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
//
// root.render(
//     <Provider store={store}>
//     <App demo={false} />
//     </Provider>
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { store } from './app/store';
import {Login} from "./features/Login/Login";
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App demo={false} />,
        errorElement: <Navigate to="/404"/>,
        children: [
            {
                index: true,
                element: <Navigate to="/todolists"/>
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/todolists",
                element: <TodolistsList/>,
            },
        ],
    },
    {
        path: "/404",
        element: <ErrorSnackbar />
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
