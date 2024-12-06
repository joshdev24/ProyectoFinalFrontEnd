import { useContext, createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const access_token = sessionStorage.getItem('access_token')
    const user_info = JSON.parse(sessionStorage.getItem('user_info'))
    //Estado booleano
    const  [isAuthenticatedUser, setIsAuthenticatedUser] = useState(Boolean(access_token))

    useEffect(
        ()=>{
            const access_token = sessionStorage.getItem('access_token')
            if(access_token){
                setIsAuthenticatedUser(true)
            }
        }, 
        []
    )
    
    const logOut = () => {
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('user_info')
        setIsAuthenticatedUser(false)
    }

    return (
        <AuthContext.Provider value={{
            logOut,
            isAuthenticatedUser,
            user_info
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}