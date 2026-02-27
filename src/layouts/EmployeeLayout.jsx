import { Outlet, Link } from "react-router-dom";
import EmployeSidebar from "../components/sidebar/EmployeSidebar";

const EmployeeLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <EmployeSidebar />
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
