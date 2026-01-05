import {
  ClipboardList,
  Clock,
  Wrench,
  CheckCircle,
  Bell,
  AlertTriangle,
  Info
} from "lucide-react";

import Requestlist from "../components/Requestlist";

export default function Dashboard() {
  // 🔐 TEMP role (later auth se aayega)
  const role = "admin";
  // "user" | "tech" | "admin"

  // 🔧 ROLE CONFIG
  const dashboardConfig = {
    user: {
      stats: ["pending", "closed"],
      showRequests: true,
      showNotifications: true,
    },
    tech: {
      stats: ["pending", "inProgress", "closed"],
      showRequests: true,
      showNotifications: true,
    },
    admin: {
      stats: ["total", "pending", "inProgress", "closed"],
      showRequests: true,
      showNotifications: true,
    },
  };

  // 📊 STATS
  const stats = [
    {
      id: "total",
      title: "Total Requests",
      count: "1,248",
      icon: ClipboardList,
      color: "bg-blue-500",
    },
    {
      id: "pending",
      title: "Pending",
      count: "142",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      id: "inProgress",
      title: "In Progress",
      count: "56",
      icon: Wrench,
      color: "bg-indigo-500",
    },
    {
      id: "closed",
      title: "Closed",
      count: "1,050",
      icon: CheckCircle,
      color: "bg-green-500",
    },
  ];

  // 🔔 NOTIFICATIONS
  const notifications = [
    {
      id: 1,
      message: "New request assigned to you",
      time: "10 min ago",
      icon: Bell,
      color: "text-blue-500",
    },
    {
      id: 2,
      message: "Request SR-1024 closed successfully",
      time: "1 hour ago",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 3,
      message: "High priority request pending",
      time: "2 hours ago",
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      id: 4,
      message: "System maintenance scheduled",
      time: "1 day ago",
      icon: Info,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats
          .filter((s) => dashboardConfig[role].stats.includes(s.id))
          .map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="
            group
            bg-white rounded-xl p-6 border
            shadow-sm
            transition-all duration-300 ease-in-out
            hover:-translate-y-1.5
            hover:shadow-xl
            hover:border-blue-500/40
          "
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.count}
                    </p>
                  </div>

                  <div
                    className={`
                p-3 rounded-lg ${stat.color}
                transition-transform duration-300
                group-hover:scale-110
                group-hover:rotate-6
              `}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* REQUEST LIST */}
        {dashboardConfig[role].showRequests && (
          <div className="lg:col-span-2 bg-white rounded-xl shadow border p-4">
            <h2 className="text-lg font-semibold mb-3">
              {role === "user"
                ? "My Requests"
                : role === "tech"
                  ? "Assigned Requests"
                  : "All Requests"}
            </h2>
            <Requestlist />
          </div>
        )}

        {/* NOTIFICATIONS */}
        {dashboardConfig[role].showNotifications && (
          <div className="bg-white rounded-xl shadow border p-6">
            <h2 className="text-lg font-semibold mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <Icon className={`w-5 h-5 ${n.color}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {n.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {n.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
