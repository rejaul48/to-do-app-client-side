import React, { useState, useEffect } from 'react';

const TaskTimer = ({ task }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!task?.setTime) return; 

        const targetTime = new Date(task.setTime).getTime();  

        const updateTimer = () => {
            const currentTime = new Date().getTime(); 
            const difference = targetTime - currentTime;  

            if (difference <= 0) {
                setTimeLeft("Time's up!");
                return;
            }

            // Convert milliseconds into months, days, hours, minutes, and seconds
            const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30)); // Approximate month count
            const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            let timeString = "";
            if (months > 0) timeString += `${months}mo `;
            if (days > 0) timeString += `${days}d `;
            if (hours > 0) timeString += `${hours}h `;
            if (minutes > 0) timeString += `${minutes}m `;
            if (seconds >= 0) timeString += `${seconds}s`;

            setTimeLeft(timeString.trim());
        };

        // Run updateTimer immediately and set interval
        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval); 
    }, [task?.setTime]);

    return (
        <div>
            <p><strong>Time Left:</strong> {timeLeft}</p>
        </div>
    );
};

export default TaskTimer;
