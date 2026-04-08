import { LayoutDashboard, NotebookPen, FilePlus2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const EmployeSidebar = () => {
    const linkStyle = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors";
    const activeStyle = "bg-gray-700 text-white";
    const inactiveStyle = "text-gray-300 hover:bg-gray-700 hover:text-white" 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    
    return (
        <>
            <div className="mb-8 text-xl font-bold tracking-wide">
                💼 Employee Panel
            </div>
            
            <nav className="space-y-2 flex flex-col">                
                <NavLink to="/employee/dashboard" className={
                        ({isActive}) => 
                            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                    }>
                        <LayoutDashboard size={18} />                
                        Dashboard
                </NavLink>

                <NavLink to="/employee/reimburstment" end className={
                    ({isActive}) => 
                        `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                }>
                    <NotebookPen size={18} />   
                    My Reimbursements
                </NavLink>

                <NavLink to="/employee/reimburstment/new" className={
                    ({isActive}) => 
                        `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                }>
                    <FilePlus2 size={18} /> 
                    Submit Reimbursement
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-colors w-full cursor-pointer"
                >
                    Logout
                </button>
            </nav>
        </>
    );
}

export default EmployeSidebar;