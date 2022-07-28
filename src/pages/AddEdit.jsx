import React, {useState, useEffect} from 'react'
import  { useNavigate, useParams, useLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Navbar from '../component/Navbar'


function AddEdit() {


    const initialState = {
        stdId: "",
        stdName: "",
        stdFee: "",
        stdCourse: ""
    }
    const navigate = useNavigate();
    const { id } = useParams()
    const [state, setState] = useState(initialState)

    const { stdId, stdName, stdFee, stdCourse } = state

    const handleSubmit = (e) => {
        e.preventDefault();
        if( !stdName || !stdFee || !stdCourse) {
            toast.error('Please Enter All Fields')
        }else {
            if(!id) {
                axios.post('/springboot-crud-rest/rest/student/save', {
             
                    stdName,
                    stdFee,
                    stdCourse
                }).then(() => {
                    setState({ stdName: "", stdFee: "", stdCourse:""})
                }).catch((err) => {
                    toast.error(err.response.data)
                })
                toast.success('Student Added Successfully')
                setTimeout(() => {
                    navigate('/')
                }, 2500)
            }else {
                axios.put(`/springboot-crud-rest/rest/student/update/${id}`, {
                    _id: id,
                    stdName,
                    stdFee,
                    stdCourse
                }).then(() => {
                    setState({ stdName: "", stdFee: "", stdCourse:""})
                }).catch((err) => {
                    toast.error(err.response.data)
                })
                toast.success('Student Updated Successfully')
                setTimeout(() => {
                    navigate('/')
                }, 2500)
            }
           
        }
    }

    useEffect(() => {
        if(id) {
        axios.get(`/springboot-crud-rest/rest/student/one/${id}`)
            .then((res) => { setState({...res.data})})
        }
    }, [id])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }
  return (
    <>
    <div className="">
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center mx-auto w-10/12 mt-44 border-2">
        <Navbar />
        <div className='pl-2 pr-2 pb-2 flex flex-col'>
            <h2 className='font-bold text-2xl'>Student {id ? "Edit Page" : "Register Page"}</h2>
           {id && (<label> Student Id:</label>)}
            {id && ( <input  className='border-2 bg-slate-300' type="text" id="id" name='stdId' value={id} disabled />)}
            <label> Student Name:</label>
            <input  className='border-2' type="text" id="name" name='stdName' value={id && stdName } onChange={handleInputChange}/>
            <label> Student Fee:</label>
            <input className='border-2' type="text" id="fee" name='stdFee'  value={ id && stdFee } onChange={handleInputChange}/>
            <label> Student Course:</label>
            <input className='border-2' type="text" id="course" name='stdCourse' value={ id && stdCourse } onChange={handleInputChange}/>

            <input type="submit" value={id ? "Update" : "Register"} className="border-2 w-20 border-cyan-700 bg-cyan-500 rounded mt-3"/>
            </div>
            </div>
        </form>
    </div>
    </>
  )
}

export default AddEdit