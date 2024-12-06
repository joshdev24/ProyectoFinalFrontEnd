import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const {isAuthenticatedUser} = useAuthContext()
    
 
    if (isAuthenticatedUser === true) {
       <Navigate to ={'/home'}/>
    } else {
        <Navigate to={'/login'}/>
    }    
    
    return (
        <div>
        
        </div>
    ) 
}



export default ProtectedRoute