import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import TodaysTasks from "../pages/TodaysTasks/TodaysTasks";
import AddTasks from "../pages/AddTasks/AddTasks";
import UpdateTask from "../pages/UpdateTask/UpdateTask";


const routers = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout ></MainLayout>,
        errorElement: <ErrorPage ></ErrorPage>,
        children:[
            {
                path:'todays-tasks',
                element: <TodaysTasks ></TodaysTasks>
            },
            {
                path: 'add-task',
                element: <AddTasks ></AddTasks>
            },
            {
                path: 'update-task',
                element: <UpdateTask ></UpdateTask>
            }
        ]
    }
])

export default routers