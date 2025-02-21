import React, { useContext } from 'react';
import { ToDoContext } from '../../authContext/ContextApi'; // Assuming context is here

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useContext(ToDoContext); // Get theme and toggle function from context

    return (
        <button
            onClick={toggleTheme} // Toggle theme on button click
            className="flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-white border border-gray-300 dark:border-gray-600 transition-colors duration-300"
        >
            {/* Sun Icon for Light Mode */}
            <svg
                className={`w-6 h-6 text-yellow-500 ${theme === 'dark' ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v3m0 12v3m6-6h3m-15 0H3m4.22-4.22l2.12-2.12m6.36 6.36l2.12-2.12m0-6.36l-2.12 2.12m-6.36 6.36l-2.12 2.12"
                />
            </svg>

            {/* Moon Icon for Dark Mode */}
            <svg
                className={`w-6 h-6 text-gray-800 ${theme === 'light' ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3a9 9 0 010 18m0-18a9 9 0 009 9c0 5-4 9-9 9m0 0a9 9 0 01-9-9c0-5 4-9 9-9"
                />
            </svg>
        </button>
    );
};

export default ThemeToggleButton;
