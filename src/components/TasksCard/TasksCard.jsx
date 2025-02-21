// import React from 'react'
// import { useDrag, useDrop } from 'react-dnd';
// import { Link } from 'react-router-dom';
// import { CiTrash } from 'react-icons/ci';
// import { FaPen } from 'react-icons/fa';
// import TaskTimer from '../TaskTimer/TaskTimer';

// const TasksCard = ({ task, index, moveTask, category, handleTaskDelete, openModal }) => {

//     const truncateText = (text = "", wordLimit) => {
//         if (!text) return "";
//         const words = text.split(" ");
//         return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : text;
//     };

//     const [, drag] = useDrag({
//         type: 'TASK',
//         item: { index, category, task }
//     });

//     const [, drop] = useDrop({
//         accept: 'TASK',
//         hover: (item) => {
//             if (item.index !== index || item.category !== category) {
//                 moveTask(item.index, index, item.category, category);
//                 item.index = index;
//                 item.category = category;
//             }
//         },
//         drop: (item) => {
//             if (item.index !== index || item.category !== category) {
//                 moveTask(item.index, index, item.category, category);
//             }
//         }
//     });

//     return (
//         <li ref={(node) => drag(drop(node))} className='bg-white shadow-xl p-2 rounded-md grid grid-cols-12 cursor-pointer' onClick={() => openModal(task)}>
//             <Link className='col-span-11'>
//                 <h3 className='text-sm font-bold task_title text-black'>{truncateText(task.title, 4)}</h3>
//                 <p className='text-sm text-gray-500 mt-1 task_description'>{truncateText(task.description, 6)}</p>
//                 <div className='text-sm text-gray-500 mt-1 time_remaining'>
//                     <TaskTimer task={task} />
//                 </div>
//             </Link>
//             <div className='space-y-3 col-span-1 flex flex-col'>
//                 <Link onClick={(e)=> {e.stopPropagation()}} to={`/update-task/${task?._id}`}><FaPen className='text-lg text-black' /></Link>
//                 <Link onClick={(e) => {
//                     e.stopPropagation();
//                     handleTaskDelete(task._id);
//                 }}><CiTrash className='text-xl text-red-500' /></Link>
//             </div>
//         </li>
//     );
// };

// export default TasksCard


import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { CiTrash } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa';
import TaskTimer from '../TaskTimer/TaskTimer';

const TasksCard = ({ task, index, moveTask, category, handleTaskDelete, openModal }) => {
    const [remainingDays, setRemainingDays] = useState(null); // Track remaining days

    const handleTimeUpdate = (days) => {
        setRemainingDays(days);
    };

    const truncateText = (text = "", wordLimit) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : text;
    };


    const taskBgColor =
        Math.floor(remainingDays) >= 2
            // Light green for more than 2 days
            ? 'bg-green-100'
            : Math.floor(remainingDays) === 1
                // Light yellow for exactly 1 day
                ? 'bg-yellow-100'
                // Light red for less than 1 day
                : 'bg-red-100';


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
        <li
            ref={(node) => drag(drop(node))}
            className={`shadow-xl p-2 rounded-md grid grid-cols-12 cursor-pointer ${taskBgColor}`}
            onClick={() => openModal(task)}
        >
            <Link className='col-span-11'>
                <h3 className='text-sm font-bold task_title text-black'>{truncateText(task.title, 4)}</h3>
                <p className='text-sm text-gray-500 mt-1 task_description'>{truncateText(task.description, 6)}</p>
                <div className='text-sm text-gray-500 mt-1 time_remaining'>
                    <TaskTimer task={task} onTimeUpdate={handleTimeUpdate} />
                </div>
            </Link>
            <div className='space-y-3 col-span-1 flex flex-col'>
                <Link onClick={(e) => { e.stopPropagation() }} to={`/update-task/${task?._id}`}><FaPen className='text-lg text-black' /></Link>
                <Link onClick={(e) => {
                    e.stopPropagation();
                    handleTaskDelete(task._id);
                }}><CiTrash className='text-xl text-red-500' /></Link>
            </div>
        </li>
    );
};

export default TasksCard;

