import React, { useContext } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ToDoContext } from '../../authContext/ContextApi'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import Swal from 'sweetalert2'

const GoogleLogin = () => {

    const { user, setUser, loginWithGoogle } = useContext(ToDoContext)

    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const handleLoginWithGoogle = () => {

        loginWithGoogle()
            .then((res) => {
                // now send the data into database
                const googleLoginUser = {
                    uid: res?.user?.uid,
                    name: res?.user?.displayName,
                    email: res?.user?.email
                }

                axiosPublic.post('/register-people', googleLoginUser)
                    .then(res => {
                        // first show swal alert
                        Swal.fire({
                            title: "Login successfully",
                            icon: "success",
                            draggable: true
                        });
                        // then user
                        setUser(res.data)
                        // then navigate to this route
                        navigate('/todays-tasks')
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))


    }

    return (
        <div>

            <Link
                onClick={handleLoginWithGoogle}
                className='flex items-center gap-1 btn bg-[#91AC8F] text-white hover:bg-[#4B5945] p-3 rounded-md'
            >
                <span className='flex items-center justify-center gap-2 w-full '> <FaGoogle className='text-2xl ' /> Log in with Google Account</span>
            </Link>

        </div>
    )
}

export default GoogleLogin
