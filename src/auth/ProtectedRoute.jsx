import { Navigate } from "react-router-dom";
import { auth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const {user, loading} = auth();

    if(loading) return <p>Loading....</p>

    if(!user)
    {
        return <Navigate to="/login" replace />
    }
    
    return children;
}

export default ProtectedRoute;