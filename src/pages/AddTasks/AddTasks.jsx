

import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
 

const AddTasks = () => {
    const [taskDateTime, setTaskDateTime] = useState('');
    const [submittedTime, setSubmittedTime] = useState('');

    // get axiospublic custom hooks
    const axiosPublic = useAxiosPublic()

    // Convert a given time to Bangladesh Time (BST)
    const getFormattedBDTime = (dateTime) => {
        if (!dateTime) return "Not set";
        return new Intl.DateTimeFormat('en-BD', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'Asia/Dhaka',
        }).format(new Date(dateTime));
    };

    // Handle form submission
    const handleAddTask = (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const setTime = taskDateTime;

        // Capture the submission time in Bangladesh Time
        const submissionDate = new Date();
        const submittedTimeBD = submissionDate.toLocaleString("en-BD", { timeZone: "Asia/Dhaka" });

        // Set the submitted time in state
        setSubmittedTime(submittedTimeBD);

        // Create task object
        const task = { title, description, category, setTime, submittedTime: submittedTimeBD };

        console.log("Task Submitted:", task);

        // send into database
        try {
            axiosPublic.post('/tasks', task)
            .then(res =>{
                console.log(res)
                alert("task added successfully")
            })
            .catch(err => console.log(err))
        }
        catch (error) {
            console.error("Error submitting task:", error);
            alert("Failed to save the task. Please try again.");
        }

    };

    return (
        <div className="p-5 bg-white rounded-md shadow-lg w-full max-w-md">
            <h2 className='text-lg font-bold mb-4'>Add Task</h2>
            <form onSubmit={handleAddTask}>
                <label className='block mb-2'>Title (max 50 characters)</label>
                <input name='title' type='text' maxLength='50' required className='w-full border p-2 mb-4' />

                <label className='block mb-2'>Description (max 200 characters)</label>
                <textarea name='description' maxLength='200' className='w-full border p-2 mb-4'></textarea>

                <label className='block mb-2'>Category</label>
                <select name='category' className='w-full border p-2 mb-4'>
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
                    <strong>Submitted Time (BD):</strong> {submittedTime || "Not submitted yet"}
                </p>

                <div className='flex justify-end gap-2 mt-4'>
                    <button type='button' className='btn'>Cancel</button>
                    <button type='submit' className='bg-green-200 px-4 py-3'>Save Task</button>
                </div>
            </form>
        </div>
    );
};

export default AddTasks;
