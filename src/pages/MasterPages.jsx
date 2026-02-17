import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  List,
  CheckCircle,
  UserCheck
} from "lucide-react";

const masterPages = [
  { name: "Departments", path: "/hod/masterPages/service-department", icon: LayoutDashboard },
  { name: "Dept. Persons", path: "/hod/masterPages/service-department-person", icon: Users },
  { name: "Request Types", path: "/hod/masterPages/service-request-type", icon: FileText },
  { name: "Req. Type Persons", path: "/hod/masterPages/service-request-type-wise-person", icon: UserCheck },
  { name: "Service Types", path: "/hod/masterPages/service-type", icon: List },
  { name: "Statuses", path: "/hod/masterPages/status-master", icon: CheckCircle },
];

export default function MasterPages() {
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">

      {/* 🟢 Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Settings size={16} />
            Master Settings
          </h2>
        </div>

        <nav className="p-4 space-y-1">
          {masterPages.map((page) => {
            const Icon = page.icon;
            // Check if active (also handle default redirect case)
            const isActive = location.pathname === page.path ||
              (location.pathname === "/hod/masterPages" && page.path === "/hod/masterPages/service-department");

            return (
              <NavLink
                key={page.path}
                to={page.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? "bg-teal-50 text-teal-700 border border-teal-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <Icon size={18} className={isActive ? "text-teal-600" : "text-gray-400"} />
                {page.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* 🔵 Main Content Area */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
}
