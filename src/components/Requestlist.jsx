import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import StatusDropdown from "./StatusDropdown";
import StatusTable from "./StatusTable";
import api from "../../src/services/api"; 

function Requestlist({ role }) { 
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const getStatusStyle = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("assigned")) return { bg: "bg-blue-100", text: "text-blue-600" };
    if (s.includes("pending")) return { bg: "bg-yellow-100", text: "text-yellow-600" };
    if (s.includes("resolved") || s.includes("closed")) return { bg: "bg-green-100", text: "text-green-600" };
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
        const response = await api.get("/request/");

        if (!response.data.error) {
          const allTickets = response.data.data;
          let filteredTickets = [];

          if (role === "Hod" || role === "Admin") {
            filteredTickets = allTickets;
          } else if (role === "Technician") {
            filteredTickets = allTickets.filter(
              (ticket) =>
                ticket.assignedToUserId?._id === user._id ||
                ticket.assignedToUserId === user._id
            );
          } else {
            filteredTickets = allTickets.filter(
              (ticket) =>
                ticket.createdByUserId === user._id ||
                ticket.createdByUserId?._id === user._id
            );
          }

          const formattedData = filteredTickets.map((ticket) => {
            const typeName = ticket.serviceRequestTypeId?.serviceRequestTypeName || "General";
            const statusName = ticket.serviceRequestStatusId?.serviceRequestStatusName || "Pending";
            
            const typeStyle = getTypeStyle(typeName);
            const statusStyle = getStatusStyle(statusName);

            return {
              id: ticket.serviceRequestNo || `#${ticket._id.slice(-6).toUpperCase()}`,
              title: ticket.serviceRequestTitle,
              type: typeName,
              typeBg: typeStyle.bg,
              typeText: typeStyle.text,
              status: statusName,
              statusBg: statusStyle.bg,
              statusText: statusStyle.text,
              date: new Date(ticket.createdAt).toLocaleDateString("en-US", {
                 year: 'numeric', month: 'short', day: 'numeric'
              })
            };
          });

          setData(formattedData.reverse());
        }
      } catch (error) {
        console.error("Error loading tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]); 

  const filteredData = data.filter((item) => {
    const matchesStatus =
      statusFilter === "All" ||
      item.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="w-full bg-white rounded-3xl shadow-md flex items-center justify-between p-4">
        {/* LEFT GROUP: Search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border-2 border-gray-300 rounded-full px-4 py-2 w-64 transition focus-within:border-teal-500">
            <FaSearch className="text-teal-400" />
            <input
              type="text"
              placeholder="Search by ID, Title"
              className="w-full bg-transparent text-sm text-gray-700 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* RIGHT: Status Dropdown */}
          <div className="flex gap-3">
            <StatusDropdown value={statusFilter} onChange={setStatusFilter} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-500">
          Loading your tickets...
        </div>
      ) : filteredData.length === 0 ? (
        <div className="p-10 text-center text-gray-500 bg-white mt-5 rounded-3xl shadow-md">
          No requests found.
        </div>
      ) : (
        <StatusTable data={filteredData} role={role} />
      )}
    </>
  );
}

export default Requestlist;