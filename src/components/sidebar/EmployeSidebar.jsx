import { Link } from "react-router-dom";

const EmployeSidebar = () => {
    return (
        <>
            <h1 className="font-bold text-lg">Employee</h1>

            <nav className="mt-4 space-y-2 flex flex-col">
                <Link to="/employee/dashboard" className="hover:underline">
                    Dashboard
                </Link>

                <Link to="/employee/reimburstment" className="hover:underline">
                    My Reimbursements
                </Link>

                <Link to="/employee/reimburstment/new" className="hover:underline">
                    Submit Reimbursement
                </Link>
            </nav>
        </>
    );
}

export default EmployeSidebar;