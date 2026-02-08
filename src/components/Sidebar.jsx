import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  BarChart3,
  LogOut,
  Wrench,
} from "lucide-react";

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  const ROLES = {
    HOD: "Hod",
    USER: "User",
    TECH: "Technician",
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-600 to-teal-600 text-white shadow-lg">
      <div className="flex flex-col h-full">

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <p className="text-lg font-semibold">SRMS</p>
            <p className="text-xs text-blue-100">Service Request</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-6 space-y-1">

          {role === ROLES.USER && (
            <>
              <SidebarLink icon={LayoutDashboard} text="Dashboard" to="/user/dashboard" />
              <SidebarLink icon={PlusCircle} text="New Request" to="/user/request/add" />
              <SidebarLink icon={BarChart3} text="All Requests" to="/user/requestlist" />
            </>
          )}

          {role === ROLES.HOD && (
            <>
              <SidebarLink icon={LayoutDashboard} text="Dashboard" to="/hod/dashboard" />
              <SidebarLink icon={ClipboardList} text="Assign to Tech" to="/hod/assign" />
              <SidebarLink icon={BarChart3} text="Master Pages" to="/hod/masterPages" />
            </>
          )}

          {role === ROLES.TECH && (
            <>
              <SidebarLink icon={LayoutDashboard} text="Dashboard" to="/technician/dashboard" />
              <SidebarLink icon={ClipboardList} text="Assigned Requests" to="/technician/requests" />
            </>
          )}

          <div className="my-4 border-t border-white/20" />
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-100 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

      </div>
    </aside>
  );
}

/* ✅ ADD THIS COMPONENT */
function SidebarLink({ icon: Icon, text, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
        ${isActive
          ? "bg-white text-blue-700 font-medium shadow"
          : "hover:bg-white/20"}`
      }
    >
      <Icon className="w-5 h-5" />
      {text}
    </NavLink>
  );
}
