import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllWorkflows, workflowExecutor } from '../redux/actions/workflow.action'
import { toast } from 'react-toastify'

const FilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedWorkFlow, setSelectedWorkFlow] = useState('')
    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const { allWorkFlows } = useSelector(state => state.workflowReducer)
    //execute work flow
    const executeWorkFlow = () => {
        if (selectedWorkFlow === "Select Workflow" || !selectedFile) {
            toast.warn("please select File or workflow properly!")
        }
        else if (selectedFile.name.split('.')[1] !== "csv") {
            toast.warn("Sorry! csv file only!")
        }
        else {
            let formData = new FormData()
            formData.append("file", selectedFile)
            formData.append("workflowName", selectedWorkFlow)
            dispatch(workflowExecutor(formData)).then((res) => {
                toast.success(res.data.message)
                navigate("/all-workflow")
                setSelectedFile("Select Workflow")
                setSelectedWorkFlow('')
            })
        }
    }
    useEffect(() => {
        dispatch(getAllWorkflows())
    }, [])
    return (
        <div className="bg-cover bg-slate-900 grid place-content-center h-screen">
            <div className=" p-8 bg-slate-900  rounded-md border border-gray-400 shadow-lg  hover:shadow-gray-400 duration-300  shadow-white">
                <div className='flex max-md:flex-col justify-between w-full'>
                    <h1 className='hero-text'>File Upload</h1>
                    <button className='hero-btn my-2 mx-0 ' onClick={() => navigate('/workflow-canvas')}>+Create new WorkFlow</button>
                </div>
                <input className='input mb-2 h-52' type="file" onChange={onFileChange} />
                <label className='text-white'>Choose WorkFlow:</label>
                <select onChange={(e) => setSelectedWorkFlow(e.target.value)} className='input'>
                    <option>Select Workflow</option>
                    {
                        allWorkFlows?.workFlows?.map((flow) => {
                            return (
                                <option key={flow?._id}>{flow?.workflowName}</option>
                            )
                        })
                    }
                </select>
                <button onClick={() => executeWorkFlow()} className='hero-btn mt-2 max-md:w-full'>Run Workflow</button>
            </div>
        </div>
    )
}

export default FilePage
