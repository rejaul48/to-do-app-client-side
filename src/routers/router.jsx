import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import TodaysTasks from "../pages/TodaysTasks/TodaysTasks";


const routers = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout ></MainLayout>,
        errorElement: <ErrorPage ></ErrorPage>,
        children:[
            {
                path:'todays-tasks',
                element: <TodaysTasks ></TodaysTasks>
            }
        ]
    }
])

export default routers