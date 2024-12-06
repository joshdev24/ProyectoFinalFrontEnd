import { useContext, createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
    const [user_info, setUser_info] = useState({});
    const access_token = sessionStorage.getItem('access_token');

    useEffect(
        ()=>{
            if(access_token){
                const user_info = JSON.parse(sessionStorage.getItem('user_info'))
                if(user_info){
                    setUser_info(user_info);
                    setIsAuthenticatedUser(true)
                }
            }
        }, 
        []
    );

    const logOut = () => {
        try {
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('user_info');
            setIsAuthenticatedUser(false);
            setUser_info({});
        } catch (error) {
            console.error('Error al cerrar sesi n:', error);
        }
    };

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