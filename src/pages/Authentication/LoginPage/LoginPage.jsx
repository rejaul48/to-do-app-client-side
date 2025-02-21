import React, { useContext, useEffect, useState } from 'react';
import GoogleLogin from '../../../components/GoogleLogin/GoogleLogin';
import { Link, useNavigate } from 'react-router-dom';
import { ToDoContext } from '../../../authContext/ContextApi';

const LoginPage = () => {
    const { loginRegisterUser, setUser, user } = useContext(ToDoContext);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');
    const navigate = useNavigate();

    // Navigate when user logs in
    useEffect(() => {
        if (user) {
            navigate('/todays-tasks');
        }
    }, [user, navigate]);

    const handleGetLoginCredentials = () => {
        setLoginEmail('rejaul@gmail.com');
        setLoginPass('RejaulIslam');
    };
    const handleUserLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await loginRegisterUser(loginEmail, loginPass);

            if (res?.data) {
                setUser(res?.data);  // Set user data in context
                alert('User logged in successfully');
               
            } else {
                // alert('Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error(err);
            // alert('Login failed. Please check your credentials.');
        }
    };

    // const handleUserLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await loginRegisterUser(loginEmail, loginPass);
    //         setUser(res?.data);
    //         alert('User logged in successfully');
    //         navigate('/todays-tasks')
    //     } catch (err) {
    //         console.error(err);
    //         alert('Login failed. Please check your credentials.');
    //     }
    // };

    return (
        <div className="flex justify-center items-center h-[100vh] md:p-4">
            <div className="bg-white p-2 md:p-8 rounded-lg shadow-lg w-full max-w-2xl border-[1px]">
                <h2 className="text-2xl font-semibold text-center mb-6">Welcome</h2>

                <div className="flex justify-end items-center">
                    <button onClick={handleGetLoginCredentials} className="bg-yellow-300 py-2 px-4 rounded-sm font-bold">
                        Hint
                    </button>
                </div>

                <form onSubmit={handleUserLogin}>
                    {/* Email Field */}
                    <div className="mb-4 w-full">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="input input-bordered w-full mt-2 border-2 rounded-sm p-3"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4 w-full">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginPass}
                            onChange={(e) => setLoginPass(e.target.value)}
                            className="input input-bordered w-full mt-2 border-2 rounded-sm p-3"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button type="submit" className="btn bg-[#66785F] text-white text-lg font-semibold py-3 rounded-sm w-full cursor-pointer">
                            Login
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to={'/register'} className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>

                {/* Divider */}
                <div className="mt-4 flex w-full flex-col justify-center items-center">
                    <div className="divider">Other Login Methods</div>
                </div>

                {/* Google Login */}
                <div className="mt-3">
                    <GoogleLogin />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
