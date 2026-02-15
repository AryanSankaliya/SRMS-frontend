import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusList, setStatusList] = useState([]);
  const [updating, setUpdating] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/request/${id}`);

        if (!response.data.error) {
          setTicket(response.data.data);
        }

        const statusRes = await api.get("/status/");
        if (!statusRes.data.error) {
          setStatusList(statusRes.data.data);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Could not fetch details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleStatusChange = async (newStatusName) => {
    console.log("Mere paas ye Statuses aaye DB se:", statusList);
    console.log("Main dhoond raha hu:", newStatusName);
    const targetStatus = statusList.find(
      (s) =>
        s.serviceRequestStatusName?.toLowerCase() ===
        newStatusName.toLowerCase() ||
        s.serviceRequestStatusSystemName?.toLowerCase() ===
        newStatusName.toLowerCase().replace(" ", "_"),
    );

    if (!targetStatus) {
      toast.error(`Error: '${newStatusName}' status Database mein nahi mila!`);
      return;
    }

    setUpdating(true);
    try {
      const payload = { serviceRequestStatusId: targetStatus._id };

      const response = await api.put(`/request/${id}`, payload);

      if (!response.data.error) {
        toast.success(`Ticket Status Updated to ${newStatusName}!`);
        window.location.reload();
      } else {
        toast.error("Update failed: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error while updating!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading Details...</div>;
  if (!ticket) return <div className="p-10 text-center">Ticket not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-6">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {ticket.serviceRequestTitle}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Request ID:{" "}
            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
              #{ticket.serviceRequestNo}
            </span>
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold
            ${(ticket.serviceRequestStatusId?.serviceRequestStatusName || "Pending").toLowerCase().includes("pending")
              ? "bg-yellow-100 text-yellow-700"
              : (ticket.serviceRequestStatusId?.serviceRequestStatusName || "").toLowerCase().includes("assigned")
                ? "bg-blue-100 text-blue-700"
                : (ticket.serviceRequestStatusId?.serviceRequestStatusName || "").toLowerCase().includes("progress")
                  ? "bg-indigo-100 text-indigo-700"
                  : (ticket.serviceRequestStatusId?.serviceRequestStatusName || "").toLowerCase().includes("resolved") || (ticket.serviceRequestStatusId?.serviceRequestStatusName || "").toLowerCase().includes("closed")
                    ? "bg-green-100 text-green-700"
                    : (ticket.serviceRequestStatusId?.serviceRequestStatusName || "").toLowerCase().includes("rejected") || (ticket.serviceRequestStatusId?.serviceRequestStatusName || "").toLowerCase().includes("cancelled")
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
            }`}
        >
          {ticket.serviceRequestStatusId?.serviceRequestStatusName || "Pending"}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-sm text-gray-400 uppercase font-semibold mb-1">
            Category
          </p>
          <p className="font-medium">
            {ticket.serviceRequestTypeId?.serviceRequestTypeName}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400 uppercase font-semibold mb-1">
            Priority
          </p>
          <p
            className={`font-medium ${ticket.priority === "High" ? "text-red-600" : "text-gray-700"}`}
          >
            {ticket.priority || "Medium"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400 uppercase font-semibold mb-1">
            Raised By
          </p>
          <p className="font-medium">
            {ticket.createdByUserId?.firstName}{" "}
            {ticket.createdByUserId?.lastName} <br />
            <span className="text-sm text-gray-500 lowercase">
              {ticket.createdByUserId?.email}
            </span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400 uppercase font-semibold mb-1">
            Assigned To
          </p>
          <p className="font-medium text-blue-600">
            {ticket.assignedToUserId?.name || "Unassigned"}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 uppercase font-semibold mb-2">
          Description
        </p>
        <div className="bg-gray-50 p-4 rounded-lg text-gray-700 leading-relaxed border">
          {ticket.serviceRequestDescription}
        </div>
      </div>

      <div className="flex gap-4 border-t pt-6 justify-end">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 transition font-medium shadow-sm"
        >
          Back
        </button>

        {/* Cancel Button (Only for User & Visible if NOT assigned/processed) */}
        {role.toLowerCase() === "user" && (
          <button
            onClick={() => handleStatusChange("Cancelled")}
            disabled={
              updating ||
              ticket.serviceRequestStatusId?.serviceRequestStatusName !== "Pending" ||
              ticket.assignedToUserId // Disable if assigned
            }
            className={`px-6 py-2 border rounded-lg transition font-medium shadow-sm ${ticket.serviceRequestStatusId?.serviceRequestStatusName !== "Pending" || ticket.assignedToUserId
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-red-500 text-white hover:bg-red-600 border-red-500"
              }`}
          >
            {updating ? "Cancelling..." : "Cancel Request"}
          </button>
        )}

        {role === "Technician" && (
          <>
            <button
              onClick={() => handleStatusChange("In Progress")}
              disabled={
                updating ||
                ticket.serviceRequestStatusId?.serviceRequestStatusName ===
                "In Progress"
              }
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {updating ? "Wait..." : "Start Work"}
            </button>
            <button
              onClick={() => handleStatusChange("Resolved")}
              disabled={
                updating ||
                ticket.serviceRequestStatusId?.serviceRequestStatusName ===
                "Resolved"
              }
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {updating ? "Wait..." : "Mark as Resolved"}
            </button>
          </>
        )}

        {role === "Hod" && (
          <button
            onClick={() => handleStatusChange("Closed")}
            disabled={
              updating ||
              ticket.serviceRequestStatusId?.serviceRequestStatusName ===
              "Closed" ||
              ticket.serviceRequestStatusId?.serviceRequestStatusName !== "Resolved" // Only allow close if Resolved
            }
            className="px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {updating ? "Wait..." : "Close Ticket"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestDetails;
