import { FileText, LayoutDashboard, Wallet } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const ManagerSidebar = () => {
    const linkStyle = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors";
    const activeStyle = "bg-gray-700 text-white";
    const inactiveStyle = "text-gray-300 hover:bg-gray-700 hover:text-white"    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    
    return (
        <>
            <div className="mb-8 text-xl font-bold tracking-wide">
            💼 Manager Panel
            </div>
            
            <nav className="space-y-2 flex flex-col">
                <NavLink to="/manager/dashboard" className={
                    ({isActive}) => 
                        `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                }>
                    <LayoutDashboard size={18}/>
                    Dashboard
                </NavLink>

                <NavLink to="/manager/reimburstment" className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                }>
                    <Wallet size={18} />
                    Pending reimburstment
                </NavLink>
                
                <NavLink to="/manager/approval-history" className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                }>
                    <FileText size={18} />
                    Approval History
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

export default ManagerSidebar;