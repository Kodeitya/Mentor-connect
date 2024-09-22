import React from 'react';
import './AccessAccount.css'

const AccessAccount = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='w-full  text-white'>
        <div className='w-full text-white'>
          <div className='w-[65%] mx-auto flex justify-end gap-6 py-3'>
            <span className='cursor-pointer'>Contact Us</span>
            <span>|</span>
            <span className='cursor-pointer'>Log in</span>
          </div>
        </div>
        <div className='w-full flex md:flex-row flex-col'>
           <span className='bg-gradient-to-r from-blue-500 to-teal-400 md:w-[50%] w-full text-center flex justify-center items-center gap-3 py-3'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/MENTOR_Logo.jpg" alt="logo" className='w-12 h-12 rounded-xl'/>
            <span className='text-4xl'>Mentor Connect</span>
           </span>
           <span className='bg-white md:w-[50%] w-full text-black text-center text-2xl py-2'>
             <span className='rounded-lg bg-black text-white py-1 px-3'>
              Sign up
             </span>
           </span>
        </div>
      </nav>

      <main className='flex flex-col md:flex-row min-h-[94.5vh]'>
  
        <div className={`w-full md:w-[50%] min-h-[94.5vh] bg-gradient-to-r from-blue-500 to-teal-400 text-white flex flex-col justify-center items-center p-6`}>
          {/* <span className='text-2xl font-bold mb-4'>Mentor Connect</span> */}
          <h1 className='text-4xl font-semibold mb-4'>For Mentors</h1>
          <p className='text-lg mb-6 text-center'>Be a contributor in someone's bright journey towards success</p>
          <form className='w-full max-w-sm'>
      
            <button type='submit' className='block w-full mx-auto my-2 p-2 bg-white text-black rounded-md hover:bg-gray-200'>Login</button>
          </form>
        </div>
        <div className={`w-full md:w-[50%] min-h-[94.5vh] flex flex-col justify-center items-center p-6`}>
          {/* <span className='text-2xl font-bold mb-4'>Mentor Connect</span> */}
          <h1 className='text-4xl font-semibold mb-4'>For Mentees</h1>
          <p className='text-lg mb-6 text-center'>Seek guidance from successful personalities of your field</p>
          <form className='w-full max-w-sm'>
      
            <button type='submit' className='block w-full mx-auto my-2 p-2 bg-black text-white rounded-md hover:bg-gray-800'>Login</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AccessAccount;