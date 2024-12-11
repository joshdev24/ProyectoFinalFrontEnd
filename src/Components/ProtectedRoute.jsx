import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = () => {
    const isAuthenticatedUser = useContext(AuthContext);
   
    return (
            isAuthenticatedUser ? <Outlet /> : <Navigate to={'/login'}/>
    )
}

export default ProtectedRoute