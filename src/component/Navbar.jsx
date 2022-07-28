import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <>
        <div className='bg-cyan-500 flex justify-start text-center py-2'>
            <h2 className='inline uppercase text-2xl mr-10 pl-1'>Student App</h2>
            <Link to={'/add'} className='mr-3 mt-1'>Register</Link>
            <Link to={'/'} className='mt-1'>View All</Link>
        </div>
    </>
  )
}

export default Navbar