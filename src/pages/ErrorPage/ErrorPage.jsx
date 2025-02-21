import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
    <section className='flex justify-center items-center h-[90vh]'>
        <div className='flex flex-col space-y-3 justify-center items-center gap-2'>
          <h2 className='text-9xl font-bold text-black text-opacity-25 '>4<span className='animate-pulse text-red-500'>0</span>4</h2>
          <h3 className='text-6xl font-semibold text-black text-opacity-25 '>page not found!</h3>
          <Link to='/' className='text-3xl underline text-green-600'>go to home page</Link>
        </div>
      </section>
    </>
  )
}

export default ErrorPage
