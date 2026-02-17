import React, { useState, useEffect } from "react";
import StatusTable from "./StatusTable";
import api from "../services/api";

function AssignToTech({ role }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper functions for styling (Same as RequestList to maintain consistency)
    const getStatusStyle = (status) => {
        const s = status?.toLowerCase() || "";
        if (s.includes("assigned")) return { bg: "bg-blue-100", text: "text-blue-600" };
        if (s.includes("pending")) return { bg: "bg-yellow-100", text: "text-yellow-600" };
        if (s.includes("resolved") || s.includes("closed") || s.includes("completed")) return { bg: "bg-green-100", text: "text-green-600" };
        if (s.includes("rejected")) return { bg: "bg-red-100", text: "text-red-600" };
        return { bg: "bg-gray-100", text: "text-gray-600" };
    };

    const getTypeStyle = (type) => {
        const t = type?.toLowerCase() || "";
        if (t.includes("hardware")) return { bg: "bg-purple-100", text: "text-purple-600" };
        if (t.includes("software")) return { bg: "bg-pink-100", text: "text-pink-600" };
        if (t.includes("network")) return { bg: "bg-indigo-100", text: "text-indigo-600" };
        return { bg: "bg-gray-100", text: "text-gray-800" };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await api.get("/request/"); // Fetch all requests

                if (!response.data.error) {
                    // Sort by Newest First
                    let allTickets = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    // Filter Logic based on Role
                    if (role === "technician") {
                        // Technicians see assigned to them? Or maybe available to pick? 
                        // Usually for 'AssignToTech' page, it implies a Manager/HOD assigning to techs.
                        // If this component is reused for Technician dashboard to see their requests:
                        allTickets = allTickets.filter(t => t.assignedToUserId?._id === user._id);
                    }
                    // If HOD, they usually see all tickets in their department or all tickets generally.
                    // Assuming HOD sees all for now as per previous RequestList logic.

                    const formattedData = allTickets.map((ticket) => {
                        const typeName = ticket.serviceRequestTypeId?.serviceRequestTypeName || "General";
                        const statusName = ticket.serviceRequestStatusId?.serviceRequestStatusName || "Pending";
                        const typeStyle = getTypeStyle(typeName);
                        const statusStyle = getStatusStyle(statusName);

                        return {
                            id: ticket.serviceRequestNo ? `#${ticket.serviceRequestNo.slice(-6)}` : `#${ticket._id.slice(-6).toUpperCase()}`,
                            title: ticket.serviceRequestTitle,
                            type: typeName,
                            typeBg: typeStyle.bg,
                            typeText: typeStyle.text,
                            status: statusName,
                            statusBg: statusStyle.bg,
                            statusText: statusStyle.text,
                            date: new Date(ticket.createdAt).toLocaleDateString("en-US", {
                                year: "numeric", month: "short", day: "numeric",
                            }),
                            fullData: ticket,
                        };
                    });

                    setData(formattedData);
                }
            } catch (error) {
                console.error("Error loading requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [role]);

    return (
        <>
            <div className="w-full flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    {role === 'technician' ? 'My Assigned Requests' : 'Assign Requests to Technicians'}
                </h2>
            </div>

            {loading ? (
                <div className="p-10 text-center text-gray-500">Loading requests...</div>
            ) : data.length === 0 ? (
                <div className="p-10 text-center text-gray-500 bg-white rounded-3xl shadow-md">
                    No requests found.
                </div>
            ) : (
                // Pass role properly so StatusTable knows whether to show "Assign" button
                <StatusTable data={data} role={role === 'hod' ? 'Hod' : role === 'technician' ? 'Technician' : 'User'} showAssign={true} />
            )}
        </>
    );
}

export default AssignToTech;
