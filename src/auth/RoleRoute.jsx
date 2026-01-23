import { Navigate } from "react-router-dom";
import { auth } from "./AuthContext";

const RoleRoute = ({ allowedRole, children }) => {
    const { user } = auth();

    if(user.role !== allowedRole)
    {
        <Navigate to="/unauthorized" replace />   
    } 

    return children;
};

export default RoleRoute;