

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const UpdateTask = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    // Store task for update
    const [forUpdateTask, setForUpdateTask] = useState({});
    const [taskDateTime, setTaskDateTime] = useState('');
    const [submittedTime, setSubmittedTime] = useState('');

    // Convert a given time to Bangladesh Time (BST)
    const getFormattedBDTime = (dateTime) => {
        if (!dateTime) return "Not set";
        return new Intl.DateTimeFormat('en-BD', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'Asia/Dhaka',
        }).format(new Date(dateTime));
    };

    // Fetch task data for update
    useEffect(() => {
        axiosPublic.get(`/tasks/${id}`)
            .then(res => {
                setForUpdateTask(res.data);
                setTaskDateTime(res.data.setTime || '');
                setSubmittedTime(res.data.submittedTime || '');
            })
            .catch(err => console.log("Error fetching task:", err));
    }, [id, axiosPublic]);

    // Handle update task
    const handleUpdateTask = (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const setTime = taskDateTime;

        // Capture the current submission time in Bangladesh Time
        const submissionDate = new Date();
        const submittedTimeBD = submissionDate.toLocaleString("en-BD", { timeZone: "Asia/Dhaka" });

        // Set the new submitted time in state
        setSubmittedTime(submittedTimeBD);

        // Create updated task object
        const updatedTask = { title, description, category, setTime, submittedTime: submittedTimeBD };

        console.log("Updated Task:", updatedTask);

        // Send updated task to backend
        axiosPublic.put(`/tasks/${id}`, updatedTask)
            .then(res => {
                console.log("Task updated successfully:", res);
                Swal.fire({
                    title: "Task updated successfully",
                    icon: "success",
                    draggable: true
                });

                // navigate to selected route
                navigate('/todays-tasks')
            })
            .catch(err => {
                console.error("Error updating task:", err);
                Swal.fire({
                    title: "Task update faild!!",
                    icon: "error",
                    draggable: true
                });
            });
    };

    return (
        <main className='flex justify-center items-center w-full h-full'>
            <div className="p-5 bg-white rounded-md shadow-lg w-full max-w-md">
                <h2 className='text-lg font-bold mb-4'>Update Task</h2>
                <form onSubmit={handleUpdateTask}>
                    <label className='block mb-2'>Title (max 50 characters)</label>
                    <input
                        defaultValue={forUpdateTask?.title}
                        name='title'
                        type='text'
                        maxLength='50'
                        required
                        className='w-full border p-2 mb-4'
                    />

                    <label className='block mb-2'>Description (max 200 characters)</label>
                    <textarea
                        defaultValue={forUpdateTask?.description}
                        name='description'
                        maxLength='200'
                        className='w-full border p-2 mb-4'>
                    </textarea>

                    <label className='block mb-2'>Category</label>
                    <select
                        value={forUpdateTask?.category || 'todo'} // Ensuring category value is properly handled
                        name='category'
                        className='w-full border p-2 mb-4'>
                        <option value='todo'>To-Do</option>
                        <option value='inProgress'>In Progress</option>
                        <option value='done'>Done</option>
                    </select>

                    {/* Task Date & Time Input */}
                    <label className='block mb-2'>Task Date & Time</label>
                    <input
                        type="datetime-local"
                        className='border p-2 w-full mb-4'
                        value={taskDateTime}
                        onChange={(e) => setTaskDateTime(e.target.value)}
                        required
                    />

                    {/* Display Selected & Submitted Time */}
                    <p className='text-sm text-gray-500'>
                        <strong>Set Task Time (BD):</strong> {getFormattedBDTime(taskDateTime)}
                    </p>
                    <p className='text-sm text-gray-500'>
                        <strong>Updated Time (BD):</strong> {submittedTime || "Not updated yet"}
                    </p>

                    <div className='flex justify-end gap-2 mt-4'>
                        <button type='submit' className='bg-[#66785F] text-white px-4 py-3 cursor-pointer'>Update Task</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default UpdateTask;
