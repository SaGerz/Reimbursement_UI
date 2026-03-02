import { Link } from "react-router-dom";

const FinanceSidebar = () => {
    return (
        <>
            <h1 className="font-bold text-lg">Finance</h1>

            <nav className="mt-4 space-y-2 flex flex-col">
                <Link to="/finance/dashboard" className="hover:underline">
                    Dashboard
                </Link>

                <Link to="/finance/payment-queue" className="hover:underline">
                    My Reimbursements
                </Link>

                <Link to="/finance/reports" className="hover:underline">
                    Submit Reimbursement
                </Link>
            </nav>
        </>
    );
}

export default FinanceSidebar;