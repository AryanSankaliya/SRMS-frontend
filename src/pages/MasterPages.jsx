import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const masterPages = [
  { name: "ServiceDepartmentMaster", path: "/hod/masterPages/service-department" },
  { name: "ServiceDepartmentPersonMaster", path: "/hod/masterPages/service-department-person" },
  { name: "ServiceRequestTypeMaster", path: "/hod/masterPages/service-request-type" },
  { name: "ServiceTypeMaster", path: "/hod/masterPages/service-type" },
  { name: "StatusMaster", path: "/hod/masterPages/status-master" },
];

export default function MasterPages() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Horizontal Navbar */}
      <div className="flex space-x-4 border-b border-gray-200 mb-6 overflow-x-auto">
        {masterPages.map((page) => {
          const isActive = location.pathname === page.path || 
                           (location.pathname === "/hod/masterPages" && page.path === "/hod/masterPages/service-department");

          return (
            <NavLink
              key={page.path}
              to={page.path} // Absolute path
              className={`px-4 py-2 font-semibold whitespace-nowrap rounded-t-lg ${
                isActive ? "bg-white text-teal-600 shadow" : "text-gray-600 hover:text-teal-600"
              }`}
            >
              {page.name}
            </NavLink>
          );
        })}
      </div>

      {/* Render active page */}
      <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px]">
        <Outlet />
      </div>
    </div>
  );
}
