
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import TodaysTasks from "../pages/TodaysTasks/TodaysTasks";
import AddTasks from "../pages/AddTasks/AddTasks";
import UpdateTask from "../pages/UpdateTask/UpdateTask";
import RegisterPage from "../pages/Authentication/RegisterPage/RegisterPage";
import LoginPage from "../pages/Authentication/LoginPage/LoginPage";
import PrivetRoute from "./PrivetRoute";

const routers = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivetRoute>
                <MainLayout />
            </PrivetRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'todays-tasks',
                element: <TodaysTasks />
            },
            {
                path: 'add-task',
                element: <AddTasks />
            },
            {
                path: 'update-task/:id',
                element: <UpdateTask />
            }
        ]
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    }
]);

export default routers;
