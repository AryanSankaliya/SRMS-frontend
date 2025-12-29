import { FaUserCircle, FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function Header() {
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
      <div className="flex items-center gap-6">

        {/* User Name */}
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">
            Amit Sharma
          </p>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
            User
          </span>
        </div>

        {/* Profile Icon */}
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-3xl text-blue-600" />
            <FaChevronDown className="text-gray-500 text-sm" />
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg hidden group-hover:block">
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Profile
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
