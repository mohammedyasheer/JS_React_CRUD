import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Navbar from '../component/Navbar'

function Home() {
    const [data, setData] = useState([])

    const loadData = async() => {
        const response = await axios.get('/springboot-crud-rest/rest/student/all')
        if(response.data === "No Data Found") {

           setData([])
        }else{
            setData(response.data)
        }
        
    }

    useEffect(() => {
        loadData();

    }, [])

    const deleteStudent = (id) => {
        if(window.confirm('Are you sure?')) {
            axios.delete(`/springboot-crud-rest/rest/student/remove/${id}`)
            toast.success('Student Deleted Successfully')
            setTimeout(() =>   loadData(), 1500)
        }
    }

  return (
    <>
    
         <div className=' conatiner mx-auto w-7/12 mt-44 border-2'>
         <div>
         <Navbar />
         <div className='pl-2 pr-2 pb-2'>
         <h2 className='font-bold text-2xl'>All Students</h2>
        {data.length > 0 ? (
         <table className='table-auto w-full'>
             <thead className='border border-500 '>
                 <tr className='text-left'>
                     <th className='border border-500'>ID</th>
                     <th className='border border-500 '>Name</th>
                     <th className='border border-500 '>Fee</th>
                     <th className='border border-500 '>Course</th>
                     <th>Operations</th>
                 </tr>
             </thead>
         <tbody className='border border-500'>

             { data.map((item, index) => {
                 return(
                     <tr key={index} >
                         <td className='border border-500 '>{item._id}</td>
                         <td className='border border-500'>{item.stdName}</td>
                         <td className='border border-500'>{item.stdFee}</td>
                         <td className='border border-500'>{item.stdCourse}</td>
                         <td className='border border-500'>
                             <button className='bg-red-600 px-1 border-solid border-2 border-red-800 rounded' onClick={() => deleteStudent(item._id)}>Delete</button>    
                             <Link to={`/update/${item._id}`} >
                             <button className=' border-cyan-700 bg-cyan-500 px-3 border-solid border-2 rounded ml-4'>Edit</button>
                             </Link>  
                           </td>
                     </tr>
                 )
             })}
         </tbody>
         </table>): (<h3 className='text-center mt-3'>No Data in Database</h3>)}
         </div>
         </div>
     </div>
   </>
  )
}

export default Home