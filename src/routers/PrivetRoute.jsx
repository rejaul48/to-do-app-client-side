import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { ToDoContext } from '../authContext/ContextApi';


const PrivetRoute = ({ children }) => {
    const { currentUser, user, loader } = useContext(ToDoContext);
    // console.log(currentUser?.email, user?.email)
    // check valid user

    if (loader) {
        return (
            <div className='flex items-center justify-center h-full '>
             <p>Loading....</p>
            </div>
        )
    }

    if (currentUser?.email || user?.email) {
        return children;
    }

    // Redirect unauthorized users to the login page
    return <Navigate to="/login" />;
};

export default PrivetRoute;


