import React, { useState } from 'react'

const UpdateTask = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [period, setPeriod] = useState('AM');

    return (
        <div className="p-5 bg-white rounded-md shadow-lg w-full max-w-md">
            <h2 className='text-lg font-bold mb-4'>Add Task</h2>
            <form>
                <label className='block mb-2'>Title (max 50 characters)</label>
                <input type='text' maxLength='50' required className='w-full border p-2 mb-4' />

                <label className='block mb-2'>Description (max 200 characters)</label>
                <textarea maxLength='200' className='w-full border p-2 mb-4'></textarea>

                <label className='block mb-2'>Category</label>
                <select className='w-full border p-2 mb-4'>
                    <option value='todo'>To-Do</option>
                    <option value='inProgress'>In Progress</option>
                    <option value='done'>Done</option>
                </select>

                <label className='block mb-2'>Task Date</label>
                <input
                    type='date'
                    className='w-full border p-2 mb-4'
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                />

                <label className='block mb-2'>Task Time</label>
                <div className='flex items-center gap-2 mb-4'>
                    <input
                        type='time'
                        className='border p-2 w-full'
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                    />
                    <select
                        className='border p-2'
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        <option value='AM'>AM</option>
                        <option value='PM'>PM</option>
                    </select>
                </div>

                <p className='text-sm text-gray-500'>Timestamp: {new Date().toLocaleString()}</p>

                <div className='flex justify-end gap-2 mt-4'>
                    <button type='button' className='btn'>Cancel</button>
                    <button type='submit' className='btn btn-primary'>Save Task</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateTask
