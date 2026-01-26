import { Outlet, Link } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
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
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
