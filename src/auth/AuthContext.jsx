import { createContext, useContext, useEffect, useState } from "react";
import { isTokenExpired } from "./jwt";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await api.get("/Auth/me");
                setUser({
                    role: res.data.role,
                    fullName: res.data.fullName
                })
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = (data) => {
        setUser({
            role: data.role,
            fullName: data.fullName,
        });
    };

    const logout = async () => {
        try {
            await api.post("/Auth/logout");
        } finally {
            setUser(null);
        }
    }


    return (
        <AuthContext.Provider value={{user, login, logout, loading}} >
            {children}
        </AuthContext.Provider>
    );
}

export const auth = () => useContext(AuthContext);