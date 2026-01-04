import { useState } from "react";
import {
  FaUserCircle,
  FaChevronDown,
  FaChevronRight,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({
  title = "Dashboard",
  breadcrumb = ["Dashboard"],
  userName = "User Name",
  role = "User"
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const roleColor =
    role === "Admin"
      ? "bg-purple-100 text-purple-600"
      : role === "HOD"
      ? "bg-green-100 text-green-600"
      : role === "Tech"
      ? "bg-orange-100 text-orange-600"
      : "bg-blue-100 text-blue-600";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="w-full h-20 bg-white border-b flex items-center justify-between px-8">

      {/* Left Section */}
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-gray-800">
          {title}
        </span>

        {/* Breadcrumb */}
        <span className="flex items-center text-xs text-gray-500">
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center">
              {item}
              {index !== breadcrumb.length - 1 && (
                <FaChevronRight className="mx-1 text-[10px]" />
              )}
            </span>
          ))}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">

        {/* User Info */}
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">
            {userName}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${roleColor}`}>
            {role}
          </span>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <FaUserCircle className="text-3xl text-blue-600" />
            <FaChevronDown
              className={`text-gray-500 text-sm transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white border rounded-xl shadow-lg">
              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100"
              >
                <FaUser className="text-blue-600" />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
