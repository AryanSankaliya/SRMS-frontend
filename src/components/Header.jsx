import { useState, useRef, useEffect } from "react";
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
  email = "user@example.com",
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getUserNotifications();
      // data.data is the array, data.unreadCount is the count
      if (data && data.success) {
        setNotifications(data.data);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Poll for notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open === "notifications" &&
        notifRef.current &&
        !notifRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
      if (
        open === "profile" &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

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
            placeholder="Search for requests"
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm group-hover:bg-white"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const query = e.target.value;
                if (query.trim()) {
                  let path = "/user/requestlist";
                  if (role === "Hod") path = "/hod/requestlist";
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
        <div className="relative" ref={notifRef}>
          <button
            onClick={() =>
              setOpen(open === "notifications" ? false : "notifications")
            }
            className="relative p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-all"
          >
            <FaBell className="text-lg" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {open === "notifications" && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 border-b border-gray-100 mb-1 bg-gray-50/50 flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-800">
                  Notifications
                </p>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 font-medium cursor-pointer hover:underline flex items-center gap-1"
                  >
                    <FaCheckDouble /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif._id}
                      onClick={() => !notif.isRead && markAsRead(notif._id)}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors ${!notif.isRead ? "bg-blue-50/40" : ""
                        }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <p
                          className={`text-sm ${!notif.isRead ? "font-medium text-gray-900" : "text-gray-600"}`}
                        >
                          {notif.message}
                        </p>
                        {!notif.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
                        {formatTime(notif.createdAt)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-400">
                    <p className="text-sm">No notifications yet</p>
                  </div>
                )}
              </div>
              {notifications.length > 0 && (
                <div className="px-4 py-2 text-center border-t border-gray-50 bg-gray-50/30">
                  <span className="text-[10px] text-gray-400 font-medium">
                    Last 20 notifications
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-gray-200 mx-1"></div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
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
                  {email}
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
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-[10px] font-bold">
                      {unreadCount}
                    </span>
                  )}
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
