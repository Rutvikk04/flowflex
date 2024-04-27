import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProtectedRoute = ({ Component }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.warn("You need to login to access this page!")
            navigate("/")
        }
    }, [])
    return (
        <Component />
    )
}

export default ProtectedRoute
