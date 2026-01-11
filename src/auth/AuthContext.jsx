import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const fullName = localStorage.getItem("fullname");

        if(token && role)
        {
            setUser({role, fullName});
        }
        
        setLoading(false);
    }, []);

    const login  = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.rolen);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("expiresAt", data.expiresAt);
        
        setUser({
            role: data.role,
            fullName: data.fullName,
        });
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{user, login, logout, loading}} >
            {children}
        </AuthContext.Provider>
    );
}

export const auth = () => useContext(AuthContext);