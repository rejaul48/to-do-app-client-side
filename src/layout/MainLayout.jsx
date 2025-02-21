import React, { useContext, useEffect, useState } from 'react'
import { FaTasks } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { ToDoContext } from '../authContext/ContextApi';
import ThemeToogleButton from '../components/ThemeToogleButton/ThemeToogleButton';
const MainLayout = () => {

    const [tasks, setTasks] = useState([])
    const axiosPublic = useAxiosPublic()
    const { userLogOut, currentUser ,user, theme} = useContext(ToDoContext)
    const navigate = useNavigate()

    useEffect(() => {
        axiosPublic.get('/tasks')
            .then(res => {
                setTasks(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    // show todays-task page by default
    useEffect(()=>{
        if(user?.email || currentUser?.email){
            navigate('/todays-tasks')
        }
    },[])



    const handleUserLogout = () => {
        userLogOut()
            .then(() => {
                navigate('/login')
            })
            .catch(err => console.log(err))
    }


    return (
        <>

            <main>

                <section className='grid grid-cols-12'>

                    {/* left side menubar for to to task list */}


                    <section className={`sticky top-0 left-0  col-span-12 pb-6 md:pb-0 md:col-span-3   px-4 md:min-h-screen ${theme === 'dark' ? "bg-black text-white" : 'bg-[#66785F] text-black'}`}>

                        {/* menu heading and menu icon for drawer */}
                        <div className='flex items-center justify-between py-4'>
                            <h2 className='text-xl md:text-2xl font-semibold capitalize text-white'>Menu</h2>
                           <div>
                            <ThemeToogleButton ></ThemeToogleButton>
                           </div>
                        </div>

                        {/* some menu links here for some action
    to add to do task 

*/}
                        <div className='flex flex-col h-full md:h-[85vh] '>

                            {/* Add Task Button */}
                            <div className='pb-4'>
                                <Link to={'/add-task'} className={`btn add_btn flex items-center gap-1  p-3 rounded-sm hover:cursor-pointer bg-[#f2f2f2f2] text-black`}>
                                    <span><IoMdAdd /></span> Add Task
                                </Link>
                            </div>

                            {/* Task Menu - Takes Available Space */}
                            <div className={`grow `}>
                                <ul className="menu menu-md bg-base-200 rounded-box w-full bg-white rounded-md px-3 py-4">
                                    <h3 className='text-lg font-semibold pb-3 text-black'>Tasks</h3>

                                    <div className='space-y-1'>
                                        <li>
                                            <Link to={'/todays-tasks'} className='flex items-center gap-2 w-full bg-[#91AC8F] p-3 rounded-sm'>
                                                <span><FaTasks /></span>
                                                <span className='flex items-center justify-between w-full'>Todays Tasks</span>
                                            </Link>
                                        </li>
                                    </div>
                                </ul>
                            </div>

                            {/* Sign Out Button - Stays at Bottom */}
                            <div className='w-full flex items-center justify-center'>
                                <Link to={'/login'} onClick={handleUserLogout} className='bg-[#B2C9AD] w-full py-3 text-sm cursor-pointer font-bold text-center px-12'>
                                    Sign out
                                </Link>
                            </div>

                        </div>



                    </section>



                    {/* right side --> here to do data show with 
                        heading and description */}
                    <section className={`col-span-12 md:col-span-9 flex justify-center items-center w-full md:flex-none md:items-start ${theme === 'dark' ? "bg-black text-white" : 'bg-[#FBFBFB] text-black'}`}>
                        <Outlet ></Outlet>
                    </section>
                </section>

            </main>


        </>
    )
}

export default MainLayout

