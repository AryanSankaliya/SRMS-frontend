import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  BarChart3,
  Bell,
  Settings,
  Users,
  Shield,
  Database,
  LogOut,
  ChevronDown,
  Wrench,
} from "lucide-react";

export default function Sidebar() {
  const [openSettings, setOpenSettings] = useState(false);

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
          <SidebarLink icon={LayoutDashboard} text="Dashboard" to="/" />
          <SidebarLink icon={ClipboardList} text="Service Requests" to="/user" />
          <SidebarLink icon={PlusCircle} text="New Request" to="/request/add" />
          <SidebarLink icon={BarChart3} text="All Request" to="/requestlist" />
          <SidebarLink icon={Bell} text="Notifications" to="/notifications" />

          {/* Divider */}
          <div className="my-4 border-t border-white/20" />

          {/* Settings */}
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/20 transition"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition ${openSettings ? "rotate-180" : ""}`} />
          </button>

          {openSettings && (
            <div className="ml-6 mt-2 space-y-1 text-sm">
              <SidebarLink icon={Database} text="Masters" to="/admin/service-department" />
              <SidebarLink icon={Users} text="Users" to="/admin/users" />
              <SidebarLink icon={Shield} text="Roles" to="/admin/roles" />
            </div>
          )}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-100 transition">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

// Sidebar Link Component
function SidebarLink({ icon: Icon, text, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
          isActive ? "bg-white text-blue-700 font-medium shadow" : "hover:bg-white/20"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {text}
    </NavLink>
  );
}
