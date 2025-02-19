 
import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';

// Function to truncate text based on word limit
const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : text;
};

// Task Component for each task
const Task = ({ task, index, moveTask, category }) => {
    const [, drag] = useDrag({
        type: 'TASK',
        item: { index, category, task }
    });

    const [, drop] = useDrop({
        accept: 'TASK',
        hover: (item) => {
            if (item.index !== index || item.category !== category) {
                moveTask(item.index, index, item.category, category);
                item.index = index;
                item.category = category;
            }
        },
        drop: (item) => {
            if (item.index !== index || item.category !== category) {
                moveTask(item.index, index, item.category, category);
            }
        }
    });

    return (
        <li ref={(node) => drag(drop(node))} className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
            <Link className='col-span-11'>
                <h3 className='text-sm font-bold task_title'>
                    {truncateText(task.title, 4)}
                </h3>
                <p className='text-sm text-gray-500 mt-1 task_description'>
                    {truncateText(task.description, 6)}
                </p>
            </Link>

            <div className='space-y-3 col-span-1 flex flex-col'>
                <Link><FaPen className='text-lg' /></Link>
                <Link><CiTrash className='text-xl text-red-500' /></Link>
            </div>
        </li>
    );
};

const TodaysTasks = () => {
    const [tasks, setTasks] = useState({
        todo: [
            { title: "Task 1", description: "Description for Task 1" },
            { title: "Task 2", description: "Description for Task 2" }
        ],
        inProgress: [
            { title: "Task 3", description: "Description for Task 3" },
            { title: "Task 4", description: "Description for Task 4" }
        ],
        done: [
            { title: "Task 5", description: "Description for Task 5" },
            { title: "Task 6", description: "Description for Task 6" }
        ]
    });

    // Function to move tasks between categories
    const moveTask = (fromIndex, toIndex, fromCategory, toCategory) => {
        if (fromCategory !== toCategory) {
            const fromTasks = [...tasks[fromCategory]];
            const toTasks = [...tasks[toCategory]];
            const [movedTask] = fromTasks.splice(fromIndex, 1);
            toTasks.splice(toIndex, 0, movedTask);

            setTasks({
                ...tasks,
                [fromCategory]: fromTasks,
                [toCategory]: toTasks
            });
        } else {
            // If it's the same category, just reorder the task
            const categoryTasks = [...tasks[fromCategory]];
            const [movedTask] = categoryTasks.splice(fromIndex, 1);
            categoryTasks.splice(toIndex, 0, movedTask);

            setTasks({
                ...tasks,
                [fromCategory]: categoryTasks
            });
        }
    };

    // For each category, set up a drop target that accepts tasks
    const createDropTarget = (category) => {
        const [, drop] = useDrop({
            accept: 'TASK',
            drop: (item) => {
                if (item.category !== category) {
                    moveTask(item.index, 0, item.category, category);
                }
            }
        });
        return drop;
    };

    return (
        <main>
            <section className='py-5'>
                <div className='flex items-center justify-between p-4 bg-amber-200 w-[95%] mx-auto'>
                    <h2 className='text-2xl md:text-3xl capitalize font-semibold'>Add your tasks here..</h2>
                    <button className='btn flex items-center gap-1 bg-sky-400 p-3 rounded-sm hover:cursor-pointer'>
                        <span><IoMdAdd /></span> Add Task
                    </button>
                </div>

                {/* 3 categories to do list */}
                <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 mt-5 gap-3'>
                    {/* To-do-list */}
                    <div ref={createDropTarget('todo')} className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
                        <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>To-do-list: </h2>
                        <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
                            {tasks.todo.length > 0 ? tasks.todo.map((task, index) => (
                                <Task key={index} index={index} task={task} category="todo" moveTask={moveTask} />
                            )) : (
                                <li className="text-center text-white">No tasks in this category</li>
                            )}
                        </ul>
                    </div>

                    {/* In progress list */}
                    <div ref={createDropTarget('inProgress')} className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
                        <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>In progress: </h2>
                        <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
                            {tasks.inProgress.length > 0 ? tasks.inProgress.map((task, index) => (
                                <Task key={index} index={index} task={task} category="inProgress" moveTask={moveTask} />
                            )) : (
                                <li className="text-center text-white">No tasks in this category</li>
                            )}
                        </ul>
                    </div>

                    {/* Done list */}
                    <div ref={createDropTarget('done')} className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
                        <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>Done: </h2>
                        <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
                            {tasks.done.length > 0 ? tasks.done.map((task, index) => (
                                <Task key={index} index={index} task={task} category="done" moveTask={moveTask} />
                            )) : (
                                <li className="text-center text-white">No tasks in this category</li>
                            )}
                        </ul>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default TodaysTasks;
