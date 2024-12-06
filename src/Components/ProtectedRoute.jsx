import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const {isAuthenticatedUser} = useAuthContext()
    
  return (
    isAuthenticatedUser ? <Navigate to ={'/home'}/> : <Navigate to={'/login'}/>
  )
}

export default ProtectedRoute