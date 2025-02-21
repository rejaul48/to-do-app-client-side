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
        element: <MainLayout ></MainLayout>,
        errorElement: <ErrorPage ></ErrorPage>,
        children: [
            {
                path: 'todays-tasks',
                element: 
                <PrivetRoute >
                    <TodaysTasks ></TodaysTasks>

                </PrivetRoute>
            },
            {
                path: 'add-task',
                element:
                 <PrivetRoute >
                    <AddTasks ></AddTasks>
                </PrivetRoute>
            },
            {
                path: 'update-task/:id',
                element: 
                <PrivetRoute >
                    <UpdateTask />,
                </PrivetRoute>

            }

        ],
    }, {
        path: '/register',
        element: <RegisterPage ></RegisterPage>
    }, {
        path: '/login',
        element: <LoginPage ></LoginPage>
    }
])

export default routers