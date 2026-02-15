import React, { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function StatusTable({ data = [], role, showAssign = false }) {
  const navigate = useNavigate();

  // --- States ---
  const [assignModal, setAssignModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [selectedTech, setSelectedTech] = useState("");
  const [techList, setTechList] = useState([]);
  const [loadingAssign, setLoadingAssign] = useState(false);

  // --- 1. Fetch Technicians List ---
  useEffect(() => {
    if (role === "Hod" || role === "Admin") {
      const fetchTechs = async () => {
        try {
          // Changed to /staff as all technicians are now in Staff table
          const res = await api.get("/staff/");
          if (!res.data.error) {
            // Filter: Only Active staff members
            const techs = res.data.data.filter(s => s.isActive);
            setTechList(techs);
          }
        } catch (error) {
          console.error("Error fetching techs:", error);
        }
      };
      fetchTechs();
    }
  }, [role]);

  // --- 2. Open Modal ---
  const handleAssignClick = (req) => {
    setSelectedReq(req);
    setSelectedTech(""); // Default to empty, since we don't support reassigning
    setAssignModal(true);
  };

  // --- 3. Assign Logic ---
  const handleTechAssign = async () => {
    if (!selectedTech) {
      toast.error("Please select a technician");
      return;
    }

    setLoadingAssign(true);
    try {
      const statusRes = await api.get("/status/");
      const assignedStatus = statusRes.data.data.find(s => s.serviceRequestStatusSystemName === "ASSIGNED");

      const payload = {
        assignedToUserId: selectedTech,
        serviceRequestStatusId: assignedStatus?._id
      };

      const response = await api.put(`/request/${selectedReq.fullData._id}`, payload);

      if (!response.data.error) {
        toast.success("Technician Assigned Successfully!");
        setAssignModal(false);
        window.location.reload();
      } else {
        toast.error("Failed: " + response.data.message);
      }

    } catch (error) {
      console.error("Assign Error:", error);
      toast.error("Server Error");
    } finally {
      setLoadingAssign(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 w-full mt-5">

      {/* Header (Desktop Only) */}
      <div className={`hidden md:grid ${role === "Hod" || role === "Admin" ? "grid-cols-6" : "grid-cols-6"} text-sm text-teal-600 font-semibold pb-4 border-b`}>
        <div>REQUEST NO</div>
        <div>TITLE</div>
        <div>TYPE</div>
        <div>STATUS</div>
        <div>DATE</div>
        <div>ACTION</div>
      </div>

      {/* Rows */}
      {data.map((item, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-6 items-center py-4 border-b last:border-none hover:bg-gray-50 transition gap-3 md:gap-0">

          {/* Request No */}
          <div className="flex justify-between md:block">
            <span className="md:hidden font-semibold text-gray-500 text-sm">Request No:</span>
            <div className="font-medium text-gray-800">{item.id}</div>
          </div>

          {/* Title */}
          <div className="flex justify-between md:block">
            <span className="md:hidden font-semibold text-gray-500 text-sm">Title:</span>
            <div className="font-semibold text-gray-900 truncate pr-2" title={item.title}>{item.title}</div>
          </div>

          {/* Type */}
          <div className="flex justify-between md:block">
            <span className="md:hidden font-semibold text-gray-500 text-sm">Type:</span>
            <div>
              <span className={`px-3 py-1 text-xs rounded-full ${item.typeBg} ${item.typeText}`}>
                {item.type}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex justify-between md:block">
            <span className="md:hidden font-semibold text-gray-500 text-sm">Status:</span>
            <div>
              <span className={`px-3 py-1 text-xs rounded-full ${item.statusBg} ${item.statusText}`}>
                {item.status}
              </span>
            </div>
          </div>

          {/* Date */}
          <div className="flex justify-between md:block">
            <span className="md:hidden font-semibold text-gray-500 text-sm">Date:</span>
            <div className="text-gray-600 text-sm">{item.date}</div>
          </div>

          {/* ACTION COLUMN */}
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={() => navigate(`/request-details/${item.fullData?._id}`)}
              className="text-gray-500 hover:text-teal-600 text-sm font-medium underline"
            >
              View
            </button>

            {/* Assign Button (Only for HOD/Admin AND if showAssign is true AND not already assigned) */}
            {(role === "Hod" || role === "Admin") && showAssign &&
              !item.status.toLowerCase().includes("assigned") &&
              !item.status.toLowerCase().includes("progress") && (
                <button
                  className="px-3 py-1 rounded text-sm transition shadow-sm whitespace-nowrap bg-teal-500 text-white hover:bg-teal-600"
                  onClick={() => handleAssignClick(item)}
                >
                  Assign
                </button>
              )}
          </div>
        </div>
      ))}

      {/* --- Assign Modal --- */}
      {assignModal && selectedReq && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-96 transform transition-all scale-100">
            <h2 className="text-xl font-bold mb-1 text-gray-800">Assign Technician</h2>
            <p className="text-sm text-gray-500 mb-4">Request ID: {selectedReq.id}</p>

            <label className="block text-sm font-medium text-gray-700 mb-1">Select Technician</label>
            <select
              className="w-full border border-gray-300 px-3 py-2 mb-6 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
            >
              <option value="">-- Choose a Technician --</option>
              {techList.map((tech) => (
                <option key={tech._id} value={tech._id}>
                  {tech.name} ({tech.email})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setAssignModal(false)}
                disabled={loadingAssign}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 shadow-md transition disabled:opacity-50"
                onClick={handleTechAssign}
                disabled={!selectedTech || loadingAssign}
              >
                {loadingAssign ? "Assigning..." : "Confirm Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusTable;