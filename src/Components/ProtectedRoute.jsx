import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../Context/AuthContext'

const ProtectedRoute = () => {
    const {isAuthenticatedUser} = useAuthContext()
   
    return (
            isAuthenticatedUser ? <Outlet /> : <Navigate to={'/login'}/>
    )
}

export default ProtectedRoute