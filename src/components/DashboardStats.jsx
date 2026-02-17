
import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const DashboardStats = ({ stats, role }) => {
    if (!stats) return null;

    let data = [];

    if (role === "Technician") {
        data = [
            { name: "Assigned", value: stats.assigned || 0, color: "#f97316" }, // orange-500
            { name: "In Progress", value: stats.inProgress || 0, color: "#6366f1" }, // indigo-500
            { name: "Completed", value: (stats.resolved || 0), color: "#22c55e" }, // green-500
        ];
    } else {
        data = [
            { name: "Pending", value: stats.pending || 0, color: "#f59e0b" }, // yellow-500
            { name: "Assigned", value: stats.assigned || 0, color: "#f97316" }, // orange-500
            { name: "In Progress", value: stats.inProgress || 0, color: "#6366f1" }, // indigo-500
            { name: "Completed", value: (stats.resolved || 0), color: "#22c55e" }, // green-500
            { name: "Closed", value: stats.closed || 0, color: "#15803d" }, // green-700
        ];
    }

    // Filter out zero values for cleaner charts, but keep at least one if all are zero? 
    // actually recharts handles zeros fine, just empty segments.

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 🥧 Pie Chart - Status Distribution */}
            <div className="bg-white p-6 rounded-xl shadow border flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Request Status Distribution
                </h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 📊 Bar Chart - Request Counts */}
            <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Requests Overview
                </h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: "transparent" }} />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
