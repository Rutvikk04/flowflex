import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWorkflows } from '../redux/actions/workflow.action'
import { useNavigate } from 'react-router-dom'

const AllWorkflows = () => {
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const { allWorkFlows } = useSelector(state => state.workflowReducer)
    useEffect(() => {
        dispatch(getAllWorkflows())
    }, [])
    return (
        <section className='bg-slate-900 h-screen'>
            <div className='flex max-md:flex-col max-md:items-center justify-between w-full pt-14 px-2'>
                <h1 className='hero-text'>My Workflows</h1>
                <div className='flex  space-x-2'>
                <button className='hero-btn bg-slate-900 text-white border hover:text-black border-white my-2 mx-0' onClick={() => navigate('/file-operation')}>File operation</button>
                <button className='hero-btn my-2 mx-0' onClick={() => navigate('/workflow-canvas')}>+Create new WorkFlow</button>
                </div>
            </div>
            <div className="bg-cover w-full m-auto p-2">
                <div className=" p-8 bg-slate-900 rounded-md border border-gray-400 shadow-lg  hover:shadow-gray-400 duration-300  shadow-white">
                    <section className=' border rounded-md'>
                        {
                            allWorkFlows?.workFlows?.length ?
                                <table className='w-full text-white'>
                                    <thead>

                                        <tr>
                                            <th className='w-20'>Index</th>
                                            <th >Workflow Name</th>
                                            <th className='w-20'>actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           allWorkFlows?.workFlows.map((node,index) => {
                                                return (
                                                    <tr key={node?._id} className='text-center border border-gray-400 '>
                                                        <td >{index+1}</td>
                                                        <td >{node.workflowName}</td>
                                                        <td onClick={()=>navigate("/workflow-canvas",{state:{node}})} className='hero-btn cursor-pointer text-black m-1'>view</td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>


                                </table> :

                                <h1 className='p-2 text-center font-medium text-red-500'>
                                    No Workflows .. create one!
                                </h1>
                        }

                    </section>

                </div>
            </div>
        </section>
    )
}

export default AllWorkflows
