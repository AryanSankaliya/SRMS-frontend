import { ClipboardList, Clock, Wrench, CheckCircle, AlertTriangle } from "lucide-react";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import Requestlist from "../components/Requestlist";
import DashboardStats from "../components/DashboardStats";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "User";

  const dashboardConfig = {
    User:       { stats: ["pending", "closed"],                       showRequests: true },
    Technician: { stats: ["total", "assigned", "completed"],          showRequests: true },
    Hod:        { stats: ["total", "pending", "inProgress", "closed"],showRequests: true },
  };

  const [statsData, setStatsData] = useState({ total: 0, pending: 0, inProgress: 0, closed: 0 });

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const userId = user?._id || user?.id;
      if (!userId) return;
      const res = await api.get("/request/stats", { params: { role, userId } });
      if (!res.data.error) setStatsData(res.data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const techCompleted  = (statsData.resolved || 0) + (statsData.closed || 0);
  const techPendingWork = (statsData.assigned || 0) + (statsData.inProgress || 0);

  const stats = [
    { id: "total",      title: "Total Requests", count: statsData.total,       icon: ClipboardList, color: "bg-blue-500" },
    { id: "pending",    title: "Pending",         count: statsData.pending,     icon: Clock,         color: "bg-yellow-500" },
    { id: "assigned",   title: "Pending Work",    count: techPendingWork,       icon: AlertTriangle, color: "bg-orange-500" },
    { id: "inProgress", title: "In Progress",     count: statsData.inProgress,  icon: Wrench,        color: "bg-indigo-500" },
    { id: "completed",  title: "Completed",       count: techCompleted,         icon: CheckCircle,   color: "bg-green-500" },
    { id: "closed",     title: "Closed",          count: statsData.closed,      icon: CheckCircle,   color: "bg-emerald-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats
          .filter((s) => dashboardConfig[role]?.stats.includes(s.id))
          .map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-white rounded-xl p-6 border shadow-sm hover:-translate-y-1 hover:shadow-xl transition">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Charts */}
      <DashboardStats stats={statsData} role={role} />

      {/* Request List — full width, no notifications panel */}
      {dashboardConfig[role]?.showRequests && (
        <div className="bg-white rounded-xl shadow border p-4">
          <h2 className="text-lg font-semibold mb-3">
            {role === "User" ? "My Requests" : "All Requests"}
          </h2>
          <Requestlist role={role} />
        </div>
      )}
    </div>
  );
}
