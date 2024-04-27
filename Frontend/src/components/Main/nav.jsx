import React from 'react'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate()
  return (
    <div className='absolute top-0 w-full bg-gray-100 bg-opacity-35 p-2'>
      <div className='flex items-center justify-between'>
        <h1 onClick={() => navigate("/all-workflow")} className=' w-fit font-bold text-3xl bg-gradient-to-r from-red-600 to-white text-transparent bg-clip-text'>FlowFlex</h1>
        {
          localStorage.getItem("token") &&
          <button onClick={() => { navigate("/"); localStorage.removeItem('token') }} className='hero-btn m-1'>Log out</button>
        }
      </div>

    </div>
  )
}

export default Nav

