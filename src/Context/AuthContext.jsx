import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Indicador de carga inicial

    useEffect(() => {
        const checkAuth = () => {
            const token = sessionStorage.getItem('access_token');
            setIsAuthenticated(Boolean(token));
            setLoading(false); // Finalizar la carga
        };
        
        checkAuth();
    }, []);

    const logout = () => {
        sessionStorage.removeItem('access_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);