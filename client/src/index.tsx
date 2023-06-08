import React from 'react';

import { Provider } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

import { Paths } from './paths';
import Login from './pages/login';
import { store } from './app/store';
import Employee from './pages/employee';
import Register from './pages/register';
import { Status } from './pages/status';
import Employees from './pages/employees';
import { Auth } from './features/auth/auth';
import AddEmployee from './pages/add-employee';
import EditEmployee from './pages/edit-employee';

import './index.css';

const router = createBrowserRouter([
    {
        path: Paths.home,
        element: <Employees />,
    },
    {
        path: Paths.login,
        element: <Login />,
    },
    {
        path: Paths.register,
        element: <Register />,
    },
    {
        path: Paths.employeeAdd,
        element: <AddEmployee />,
    },
    {
        path: `${Paths.status}/:status`,
        element: <Status />,
    },
    {
        path: `${Paths.employee}/:id`,
        element: <Employee />,
    },
    {
        path: `${Paths.employeeEdit}/:id`,
        element: <EditEmployee />,
    },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}>
                <Auth>
                    <RouterProvider router={router}></RouterProvider>
                </Auth>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>,
);
