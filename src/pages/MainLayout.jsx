import { useState, useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const location = useLocation();

  const headerConfig = {
    "/hod/dashboard": {
      title: "HOD Dashboard",
      breadcrumb: ["Dashboard"],
    },
    "/user/dashboard": {
      title: "User Dashboard",
      breadcrumb: ["Dashboard"],
    },
    "/technician/dashboard": {
      title: "Technician Dashboard",
      breadcrumb: ["Dashboard"],
    },
    "/request/add": {
      title: "New Request",
      breadcrumb: ["Dashboard", "New Request"],
    },
    "/requestlist": {
      title: "All Requests",
      breadcrumb: ["Dashboard", "All Requests"],
    },
    "/profile": {
      title: "Profile",
      breadcrumb: ["Dashboard", "Profile"],
    },
  };


  const currentHeader =
    headerConfig[location.pathname] || {
      title: "Dashboard",
      breadcrumb: ["Dashboard"],
    };



  /* 
   * FIX: Usage of useState and useEffect ensures that 'user' data 
   * is retrieved ONLY after the component mounts. This prevents 
   * hydration mismatches and ensures localStorage is available.
   */
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userName = user?.firstName && user?.lastName
    ? `${user.firstName} ${user.lastName}`
    : user?.name || "User";
  const role = user?.role || "User";
  const email = user?.email || "user@example.com";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ DYNAMIC ROLE */}
      <Sidebar role={role} />

      <div className="flex flex-col flex-1">
        <Header
          title={currentHeader.title}
          breadcrumb={currentHeader.breadcrumb}
          userName={userName}
          role={role}
          email={email}
        />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
