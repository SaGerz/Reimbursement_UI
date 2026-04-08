import { FileText, LayoutDashboard, Wallet } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const FinanceSidebar = () => {
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
            💼 Finance Panel
            </div>
            
            <nav className="space-y-2 flex flex-col">
                <NavLink to="/finance/dashboard" className={
                    ({isActive}) => 
                        `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                }>
                    <LayoutDashboard size={18}/>
                    Dashboard
                </NavLink>

                <NavLink to="/finance/payment-queue" className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                }>
                    <Wallet size={18} />
                    Payment Queue
                </NavLink>
                
                <NavLink to="/finance/reports" className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                }>
                    <FileText size={18} />
                    Reports
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

export default FinanceSidebar;