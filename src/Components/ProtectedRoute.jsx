import React from 'react'
import { useAuthContext } from '../Context/AuthContext'


//Nos llama a la ruta hija o nesteada de nuestra ruta
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const {isAuthenticatedUser} = useAuthContext()
    
  return (
    isAuthenticatedUser ? <Outlet/> : <Navigate to={'/login'}/>
  )
}

export default ProtectedRoute

