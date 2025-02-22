import React, { useContext, useEffect } from 'react'
import GoogleLogin from '../../../components/GoogleLogin/GoogleLogin'
import { Link, useNavigate } from 'react-router-dom'
import { ToDoContext } from '../../../authContext/ContextApi'
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const RegisterPage = () => {

    const { setUser, createNewUser, user } = useContext(ToDoContext)
    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate()


    const handleUserRegister = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            // 🔹 Wait for Firebase to create a user
            const firebaseUser = await createNewUser(email, password);

            console.log("Firebase User Created:", firebaseUser);

            // 🔹 Prepare user data (including Firebase UID)
            const user = {
                uid: firebaseUser.user.uid,  // Get UID from Firebase
                name,
                email
            };

            // 🔹 Send user data to the database
            await axiosPublic.post('/register-people', user)
                .then(res => {
                    setUser(res?.data);
                    navigate('/todays-tasks');
                }).catch(err => console.log(err))

           
            // Reset form
            form.reset();
        } catch (error) {
            console.error("Registration error:", error);
            
        }
    };


    return (
        <>

            <div className="flex  justify-center items-center h-[100vh] md:p-4 px-4 xl:px-0">
                <div className="bg-white p-2 md:p-8 rounded-lg shadow-lg w-full max-w-2xl  border-[1px] ">
                    <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>

                    <form onSubmit={handleUserRegister}>

                        {/* Name Field */}
                        <div className="mb-4 w-full">
                            <label htmlFor="name" className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name='name'
                                className="input input-bordered w-full mt-2 border-2 rounded-sm p-3"
                                placeholder="Enter your name"
                            />

                        </div>
                        {/* Email Field */}
                        <div className="mb-4 w-full">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name='email'
                                className="input input-bordered w-full mt-2 border-2 rounded-sm p-3"
                                placeholder="Enter your email"
                            />

                        </div>


                        {/* Password Field */}
                        <div className="mb-4 w-full">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type='password'
                                    id="password"
                                    name='password'
                                    className="input input-bordered w-full mt-2 border-2 rounded-sm p-3"
                                    placeholder="Enter your password"
                                />

                            </div>


                        </div>



                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button type="submit" className="btn bg-[#66785F] text-white py-3 text-lg font-semibold w-full">
                                Register
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <p className="mt-4 text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to={'/login'} className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </p>

                    {/* divider */}
                    <div className='mt-4'>
                        <div className="flex w-full flex-col justify-center items-center">
                            <div className="divider">other's login method</div>
                        </div>
                    </div>

                    {/* sign in with google account */}
                    <div className='mt-3'>
                        <GoogleLogin ></GoogleLogin>
                    </div>
                </div>

            </div>


        </>
    )
}

export default RegisterPage
