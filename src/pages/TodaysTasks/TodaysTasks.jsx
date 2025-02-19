import React from 'react';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";

// Function to truncate text based on word limit
const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : text;
};

const TodaysTasks = () => {
    return (
        <>
            <main>
                <section className='py-5'>

                    {/* Add your tasks page heading*/}
                    <div className='flex items-center justify-between p-4 bg-amber-200 w-[95%] mx-auto'>
                        <h2 className='text-2xl md:text-3xl capitalize font-semibold'>Add your tasks here..</h2>
                        <button className='btn flex items-center gap-1 bg-sky-400 p-3 rounded-sm hover:cursor-pointer'>
                            <span><IoMdAdd /></span> Add Task
                        </button>
                    </div>

                    {/* 3 categories to do list */}
                    <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 mt-5 gap-3'>

                        {/* to-do-list */}
                        <div className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
                            <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>To-do-list: </h2>

                            {/* a fixed height and allow scrolling */}
                            <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold task_title'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1 task_description'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12 '>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                {/* Repeat the same structure for more tasks... */}

                            </ul>
                        </div>

                        {/* In progress list */}

                        <div className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
                            <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>In progress: </h2>

                            {/* a fixed height and allow scrolling */}
                            <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)]   no-scrollbar'>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold task_title'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1 task_description'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12 '>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                {/* Repeat the same structure for more tasks... */}

                            </ul>
                        </div>

                        {/* Done to-do list */}

                        <div className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
                            <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>Done: </h2>

                            {/* a fixed height and allow scrolling */}
                            <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)]   no-scrollbar'>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold task_title'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1 task_description'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12 '>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                <li className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
                                    <Link className='col-span-11'>
                                        <h3 className='text-sm font-bold'>
                                            {truncateText("Task title added here max Char 50", 4)}
                                        </h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            {truncateText("Task Description added here max 200 characters", 6)}
                                        </p>
                                    </Link>

                                    <div className='space-y-3 col-span-1 flex flex-col'>
                                        <Link><FaPen className='text-lg' /></Link>
                                        <Link><CiTrash className='text-xl text-red-500' /></Link>
                                    </div>
                                </li>

                                {/* Repeat the same structure for more tasks... */}

                            </ul>
                        </div>


                    </section>

                </section>
            </main>
        </>
    );
};

export default TodaysTasks;
