import React from 'react'
import { toast } from 'react-toastify'

const AddNewNode = ({ newNode, setNewNode, addNewNode }) => {
    const { id, data } = newNode
    //form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "label") {
            setNewNode({ ...newNode, data: { label: value } })
        }
        else {
            setNewNode({ ...newNode, [name]: value })
        }
    }
    return (
        <div className='border border-white h-fit w-72 max-md:mx-auto rounded-md bg-slate-800'>
            <h1 className='hero-text text-xl'>Add New Node</h1>
            <form className='p-2'>
                <label className='text-white'>Node ID:</label>
                <input type="text" className='input' name='id' placeholder='example:1,bm202,11' value={id} onChange={handleChange} />
                <label className='text-white'>Node Label:</label>
                <input type="text" className='input' name='label' placeholder='example: first node..' value={data.label} onChange={handleChange} />

            </form>
            <button className='hero-btn mb-2' onClick={() => {
                if (id !== '' || data.label !== "") { addNewNode() } else {
                    toast.warn("Id and Label Is required")
                }
            }}>Set new Node</button>
        </div>
    )
}

export default AddNewNode
