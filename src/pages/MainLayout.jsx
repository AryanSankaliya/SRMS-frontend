import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout() {
    const location = useLocation();

    
    const headerConfig = {
        "/": {
            title: "Dashboard",
            breadcrumb: ["Dashboard"]
        },
        "/user": {
            title: "My Requests",
            breadcrumb: ["Dashboard", "My Requests"]
        },
        "/request/add": {
            title: "New Request",
            breadcrumb: ["Dashboard", "New Request"]
        },
        "/requestlist": {
            title: "All Requests",
            breadcrumb: ["Dashboard", "All Requests"]
        },
        "/profile": {
            title: "Profile",
            breadcrumb: ["Dashboard", "Profile"]
        }
    };

    const currentHeader =
        headerConfig[location.pathname] || {
            title: "Dashboard",
            breadcrumb: ["Dashboard"]
        };

    
    const user = JSON.parse(localStorage.getItem("user"));

    const userName = user?.userName || "User";
    const role = user?.role || "User";

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <Header
                    title={currentHeader.title}
                    breadcrumb={currentHeader.breadcrumb}
                    userName={userName}
                    role={role}
                />

                <main className="flex-1 p-6">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}
