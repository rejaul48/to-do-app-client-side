import React from 'react'
import { GrMenu } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import { SlCalender } from "react-icons/sl";
import { GiBrickWall } from "react-icons/gi";
const MainLayout = () => {
    return (
        <>

            <main>

                <section className='grid grid-cols-12'>
                    
                    {/* left side menubar for to to task list */}

                    <section className='md:col-span-3 bg-gray-600 px-4 md:min-h-screen'>

                        {/* menu heading and menu icon for drawer */}
                        <div className='flex items-center justify-between py-4'>
                            <h2 className='text-xl md:text-2xl font-semibold capitalize text-white'>Menu</h2>
                             
                        </div>

                        {/* some menu links here for some action
                            to add to do task 
                             
                        */}
                        <div>

                            {/* for task -> menubar */}
                            <ul className="menu menu-md bg-base-200 rounded-box w-full bg-white rounded-md px-3 py-4">
                                <h3 className='text-lg font-semibold pb-3'>Tasks</h3>

                                <div className='space-y-3'>
                                    <li><Link to={'/todays-tasks'} className='flex items-center
                                 gap-2 w-full bg-lime-200 p-3 rounded-sm'>  <span>  <FaTasks /></span> <span className='flex items-center justify-between w-full'>Todays Tasks <span className='text-sm bg-white w-8 h-8 flex items-center justify-center rounded-full'>100</span></span></Link></li>

                                    <li><Link className='flex items-center
                                 gap-2 w-full bg-lime-200 p-3 rounded-sm'>  <span> <SlCalender /></span> <span className='flex items-center justify-between w-full'>Calender <span className='text-sm bg-white w-8 h-8 flex items-center justify-center rounded-full'>100</span></span></Link></li>

                                    <li><Link className='flex items-center
                                 gap-2 w-full bg-lime-200 p-3 rounded-sm'>  <span>  <GiBrickWall /></span> <span className='flex items-center justify-between w-full'>Sticky Wall<span className='text-sm bg-white w-8 h-8 flex items-center justify-center rounded-full'>100</span></span></Link></li>

                                </div>
                            </ul>

                            {/* for more action menubar added here..... */}

                        </div>

                    </section>


                    {/* right side --> here to do data show with 
                        heading and description */}
                    <section className='md:col-span-9 '>
                        <Outlet ></Outlet>
                    </section>
                </section>

            </main>


        </>
    )
}

export default MainLayout
