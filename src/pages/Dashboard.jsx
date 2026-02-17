import {
  ClipboardList,
  Clock,
  Wrench,
  CheckCircle,
  Bell,
  AlertTriangle,
  Info,
} from "lucide-react";

import React, { useState, useEffect } from "react";
import api from "../services/api";
import Requestlist from "../components/Requestlist";
import DashboardStats from "../components/DashboardStats";

export default function Dashboard() {
  // ✅ GET ROLE FROM LOGIN
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "User";
  // "User" | "Technician" | "Hod"

  const dashboardConfig = {
    User: {
      stats: ["pending", "closed"],
      showRequests: true,
      showNotifications: true,
    },
    Technician: {
      stats: ["total", "assigned", "completed"],
      showRequests: true,
      showNotifications: true,
    },
    Hod: {
      stats: ["total", "pending", "inProgress", "closed"],
      showRequests: true,
      showNotifications: true,
    },
  };

  // 📊 STATS
  const [statsData, setStatsData] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    closed: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const userId = user?._id || user?.id;
      console.log("Fetching stats for:", { role, userId });

      if (!userId) {
        console.error("User ID is missing!");
        return;
      }

      const res = await api.get("/request/stats", { params: { role, userId } });
      if (!res.data.error) {
        setStatsData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // 🧮 Derived Stats for Tech
  const techCompleted = (statsData.resolved || 0) + (statsData.closed || 0);
  const techPendingWork = (statsData.assigned || 0) + (statsData.inProgress || 0);

  const stats = [
    {
      id: "total",
      title: "Total Requests",
      count: statsData.total,
      icon: ClipboardList,
      color: "bg-blue-500",
    },
    {
      id: "pending", // For HOD/User
      title: "Pending",
      count: statsData.pending,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      id: "assigned", // For Tech (Pending Work)
      title: "Pending Work",
      count: techPendingWork,
      icon: AlertTriangle,
      color: "bg-orange-500",
    },
    {
      id: "inProgress", // For HOD detailed view
      title: "In Progress",
      count: statsData.inProgress,
      icon: Wrench,
      color: "bg-indigo-500",
    },
    {
      id: "completed", // For Tech (Resolved + Closed)
      title: "Completed",
      count: techCompleted,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      id: "closed", // For HOD (Strictly Closed)
      title: "Closed",
      count: statsData.closed,
      icon: CheckCircle,
      color: "bg-emerald-600",
    },
  ];

  // 🔔 NOTIFICATIONS (STATIC FOR NOW)
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
      {/* 📊 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats
          .filter((s) => dashboardConfig[role]?.stats.includes(s.id))
          .map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-xl p-6 border shadow-sm hover:-translate-y-1 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.count}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* 📊 CHARTS */}
      <DashboardStats stats={statsData} role={role} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 📋 REQUEST LIST */}
        {dashboardConfig[role]?.showRequests && (
          <div className="lg:col-span-2 bg-white rounded-xl shadow border p-4">
            <h2 className="text-lg font-semibold mb-3">
              {role === "User" ? "My Requests" : "All Requests"}
            </h2>
            <Requestlist role={role} />
          </div>
        )}

        {/* 🔔 NOTIFICATIONS */}
        {dashboardConfig[role]?.showNotifications && (
          <div className="bg-white rounded-xl shadow border p-6">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
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
                      <p className="text-xs text-gray-500">{n.time}</p>
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
