import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext  = createContext()

export const AuthContextProvider = ({children}) =>{
    const access_token = sessionStorage.getItem('access_token')
    //Estado booleano
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(
        Boolean(access_token)
    )

    useEffect(
        () => {
            const access_token = sessionStorage.getItem('access_token')
            if(access_token) {
                setIsAuthenticatedUser(true)
            }
        }, 
        []
    )
    return (
        <AuthContext.Provider value={{
    
            isAuthenticatedUser
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext) // devuelve un objeto con  {logout, isAuthenticatedUser}
}
