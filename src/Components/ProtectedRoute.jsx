import React from 'react'


//Nos llama a la ruta hija o nesteada de nuestra ruta
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const access_token = sessionStorage.getItem('access_token')
  const acc = Boolean(access_token)
    
  return (
    acc ? <Outlet/> : <Navigate to={'/login'}/>
  )
}

export default ProtectedRoute