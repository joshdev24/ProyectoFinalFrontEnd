import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const isAuthenticatedUser = sessionStorage.getItem('access_token');
   
    return (
            isAuthenticatedUser ? <Outlet /> : <Navigate to={'/login'}/>
    )
}

export default ProtectedRoute