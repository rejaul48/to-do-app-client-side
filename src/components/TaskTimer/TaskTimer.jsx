 

import React, { useState, useEffect } from 'react';

const TaskTimer = ({ task, onTimeUpdate }) => {
    const [timeLeft, setTimeLeft] = useState("");
     // Track remaining days
    const [remainingDays, setRemainingDays] = useState(null);

    useEffect(() => {
        if (!task?.setTime) return;

        const targetTime = new Date(task.setTime).getTime();

        const updateTimer = () => {
            const currentTime = new Date().getTime();
            const difference = targetTime - currentTime;

            if (difference <= 0) {
                setTimeLeft("Time's up!");
                setRemainingDays(0);
                onTimeUpdate(0); // Send updated value to parent
                return;
            }

            // Convert milliseconds into time units
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            let timeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            setTimeLeft(timeString);
            setRemainingDays(days);
            onTimeUpdate(days); // Send updated days to parent
        };

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval);
    }, [task?.setTime, onTimeUpdate]);

    return (
        <div>
            <p><strong>Time Left:</strong> {timeLeft}</p>
        </div>
    );
};

export default TaskTimer;
