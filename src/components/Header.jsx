import { useState } from "react";
import {
  FaUserCircle,
  FaChevronDown,
  FaChevronRight,
  FaUser,
  FaSignOutAlt,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({
  title = "Dashboard",
  breadcrumb = ["Dashboard"],
  userName = "User Name",
  role = "User",
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const roleColor =
    role === "Admin"
      ? "bg-purple-50 text-purple-600 border border-purple-200"
      : role === "HOD"
        ? "bg-green-50 text-green-600 border border-green-200"
        : role === "Technician"
          ? "bg-orange-50 text-orange-600 border border-orange-200"
          : "bg-blue-50 text-blue-600 border border-blue-200";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 w-full h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 shadow-sm transition-all duration-300">
      {/* Left Section: Context */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">
          {title}
        </h1>

        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-gray-500">
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center">
              <span
                className={`${index === breadcrumb.length - 1
                  ? "text-blue-600"
                  : "hover:text-blue-500 transition-colors"
                  }`}
              >
                {item}
              </span>
              {index !== breadcrumb.length - 1 && (
                <FaChevronRight className="mx-2 text-[10px] text-gray-300" />
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Center Section: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-lg mx-12">
        <div className="relative w-full group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search for requests, technicians..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm group-hover:bg-white"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const query = e.target.value;
                if (query.trim()) {
                  let path = "/user/requestlist";
                  if (role === "Hod" || role === "Admin") path = "/hod/requestlist";
                  navigate(`${path}?search=${encodeURIComponent(query)}`);
                }
              }
            }}
          />
        </div>
      </div>

      {/* Right Section: Controls & Profile */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === "notifications" ? false : "notifications")}
            className="relative p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-all"
          >
            <FaBell className="text-lg" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {open === "notifications" && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 border-b border-gray-100 mb-1 bg-gray-50/50 flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-800">Notifications</p>
                <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {/* Dummy Notifications */}
                {[
                  { id: 1, message: "New request assigned", time: "10m ago", read: false },
                  { id: 2, message: "System maintenance scheduled", time: "1h ago", read: true },
                  { id: 3, message: "Request #1024 updated", time: "2h ago", read: true },
                ].map((notif) => (
                  <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 ${!notif.read ? "bg-blue-50/30" : ""}`}>
                    <p className="text-sm text-gray-800">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
                <div className="px-4 py-3 text-center text-xs text-gray-500">
                  No more notifications
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-gray-200 mx-1"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === "profile" ? false : "profile")}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all">
              <span className="font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="hidden lg:flex flex-col items-start gap-0.5">
              <span className="text-sm font-semibold text-gray-700 leading-none">
                {userName}
              </span>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${roleColor}`}
              >
                {role}
              </span>
            </div>

            <FaChevronDown
              className={`text-gray-400 text-xs transition-transform duration-200 group-hover:text-gray-600 ${open === "profile" ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Dropdown Menu */}
          {open === "profile" && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 border-b border-gray-100 mb-1 bg-gray-50/50">
                <p className="text-sm font-medium text-gray-800">{userName}</p>
                <p className="text-xs text-gray-500 truncate">
                  user@example.com
                </p>
              </div>

              <div className="px-1">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FaUser className="text-blue-500" />
                  My Profile
                </button>
                <button
                  onClick={() => setOpen("notifications")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FaBell className="text-yellow-500" />
                  Notifications
                </button>
              </div>

              <div className="border-t border-gray-100 my-1 mx-2"></div>

              <div className="px-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
