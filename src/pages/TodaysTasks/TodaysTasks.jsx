
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import TaskTimer from '../../components/TaskTimer/TaskTimer';

// Function to truncate text based on word limit
const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : text;
};

// Task Component for each task
const Task = ({ task, index, moveTask, category, handleTaskDelete }) => {
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
                <div className='text-sm text-gray-500 mt-1 time_remaining'>
                    <TaskTimer task={task}></TaskTimer>
                </div>
            </Link>

            <div className='space-y-3 col-span-1 flex flex-col'>
                <Link to={'/update-task'}><FaPen className='text-lg' /></Link>
                <Link onClick={() => handleTaskDelete(task._id)}><CiTrash className='text-xl text-red-500' /></Link>
            </div>
        </li>
    );
};

const TodaysTasks = () => {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });

    const axiosPublic = useAxiosPublic();

    // Fetch tasks from the database and categorize them
    useEffect(() => {
        axiosPublic.get('/tasks')
            .then(res => {
                const fetchedTasks = Array.isArray(res.data) ? res.data : [];
                const categorizedTasks = {
                    todo: fetchedTasks.filter(task => task?.category === "todo"),
                    inProgress: fetchedTasks.filter(task => task?.category === "inProgress"),
                    done: fetchedTasks.filter(task => task?.category === "done"),
                };
                setTasks(categorizedTasks);
            })
            .catch(err => {
                console.error("Error fetching tasks:", err);
                setTasks({ todo: [], inProgress: [], done: [] });
            });
    }, []);

    // Handle task deletion
    const handleTaskDelete = (id) => {
        axiosPublic.delete(`/tasks/${id}`)
            .then(() => {
                alert("Task Deleted successfully");
                setTasks(prevTasks => ({
                    todo: prevTasks.todo.filter(task => task._id !== id),
                    inProgress: prevTasks.inProgress.filter(task => task._id !== id),
                    done: prevTasks.done.filter(task => task._id !== id),
                }));
            })
            .catch(err => console.log(err));
    };

    // Function to move tasks between categories
    const moveTask = (fromIndex, toIndex, fromCategory, toCategory) => {
        if (fromCategory !== toCategory) {
            const fromTasks = [...tasks[fromCategory]];
            const toTasks = [...tasks[toCategory]];
            const [movedTask] = fromTasks.splice(fromIndex, 1);
            movedTask.status = toCategory; // Update status
            toTasks.splice(toIndex, 0, movedTask);

            setTasks({
                ...tasks,
                [fromCategory]: fromTasks,
                [toCategory]: toTasks
            });

            // Optionally update the task status in the database
            axiosPublic.put(`/tasks/${movedTask._id}`, { status: toCategory })
                .catch(err => console.log("Error updating task status:", err));
        } else {
            const categoryTasks = [...tasks[fromCategory]];
            const [movedTask] = categoryTasks.splice(fromIndex, 1);
            categoryTasks.splice(toIndex, 0, movedTask);

            setTasks({
                ...tasks,
                [fromCategory]: categoryTasks
            });
        }
    };

    // Function to create a drop target for a category
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
                </div>

                {/* 3 categories to-do list */}
                <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 mt-5 gap-3'>
                    {/* To-do List */}
                    <div ref={createDropTarget('todo')} className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
                        <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>To-do List: </h2>
                        <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
                            {tasks.todo.length > 0 ? tasks.todo.map((task, index) => (
                                <Task key={task._id} index={index} task={task} category="todo" moveTask={moveTask} handleTaskDelete={handleTaskDelete} />
                            )) : (
                                <li className="text-center text-white">No tasks in this category</li>
                            )}
                        </ul>
                    </div>

                    {/* In Progress List */}
                    <div ref={createDropTarget('inProgress')} className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
                        <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>In Progress: </h2>
                        <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
                            {tasks.inProgress.length > 0 ? tasks.inProgress.map((task, index) => (
                                <Task key={task._id} index={index} task={task} category="inProgress" moveTask={moveTask} handleTaskDelete={handleTaskDelete} />
                            )) : (
                                <li className="text-center text-white">No tasks in this category</li>
                            )}
                        </ul>
                    </div>

                    {/* Done List */}
                    <div ref={createDropTarget('done')} className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
                        <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>Done: </h2>
                        <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
                            {tasks.done.length > 0 ? tasks.done.map((task, index) => (
                                <Task key={task._id} index={index} task={task} category="done" moveTask={moveTask} handleTaskDelete={handleTaskDelete} />
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
