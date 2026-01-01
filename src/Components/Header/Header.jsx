import { useState } from "react";
import { FaUserCircle, FaChevronDown, FaChevronRight, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full h-20 bg-white border-b flex items-center justify-between px-8">

      {/* Left Section */}
      <div className="flex items-center gap-10">

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">
            Dashboard
          </span>
          {/* path */}
          <span className=" flex items-center text-xs text-gray-500 cursor-pointer">
            Dashboard
            <FaChevronRight className="mx-1 text-[10px]" /> login
          </span>
        </div>
        {/* Dashboard Text */}

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">

        {/* User Info */}
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">
            Amit Sharma
          </p>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
            User
          </span>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <FaUserCircle className="text-3xl text-blue-600" />
            <FaChevronDown
              className={`text-gray-500 text-sm transition-transform ${open ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white border rounded-xl shadow-lg overflow-hidden animate-fadeIn">
              <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition" onClick={()=>navigate('/profile')}>
                <FaUser className="text-blue-600" />
                 Profile
              </button>
              <button className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition" onClick={()=>navigate('/login')}>
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
