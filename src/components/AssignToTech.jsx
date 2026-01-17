import React, { useState } from "react";

const techList = ["Tech A", "Tech B", "Tech C"];

function StatusTable({ role }) {
    const [assignModal, setAssignModal] = useState(false);
    const [selectedReq, setSelectedReq] = useState(null);
    const [selectedTech, setSelectedTech] = useState("");

    const data = [
        {
            id: "#REQ-1024",
            title: "Lab PC Hardware Issue",
            type: "Hardware",
            typeBg: "bg-blue-100",
            typeText: "text-blue-600",
            status: "Open",
            statusBg: "bg-green-100",
            statusText: "text-green-600",
            date: "Oct 24, 2023"
        },
        {
            id: "#REQ-1025",
            title: "Software License Renewal",
            type: "Software",
            typeBg: "bg-purple-100",
            typeText: "text-purple-600",
            status: "Pending",
            statusBg: "bg-yellow-100",
            statusText: "text-yellow-600",
            date: "Oct 22, 2023"
        },
        {
            id: "#REQ-1020",
            title: "Projector Bulb Replacement",
            type: "Hardware",
            typeBg: "bg-blue-100",
            typeText: "text-blue-600",
            status: "Open",
            statusBg: "bg-green-100",
            statusText: "text-green-600",
            date: "Oct 18, 2023"
        }

    ]

    const handleAssignClick = (req) => {
        setSelectedReq(req);
        setAssignModal(true);
    };

    const handleTechAssign = () => {
        console.log(`Request ${selectedReq.id} assigned to ${selectedTech}`);
        setAssignModal(false);
        setSelectedReq(null);
        setSelectedTech("");
    };

    return (
        <div className="bg-white rounded-3xl shadow-md p-6 w-full mt-5">
            {/* Header */}
            <div className={`grid ${role === "hod" ? "grid-cols-6" : "grid-cols-5"} text-sm text-teal-600 font-semibold pb-4 border-b`}>
                <div>REQUEST NO</div>
                <div>TITLE</div>
                <div>TYPE</div>
                <div>STATUS</div>
                <div>DATE</div>
                {role === "hod" && <div>ASSIGN</div>}
            </div>

            {/* Rows */}
            {data.map((item, index) => (
                <div key={index} className={`grid ${role === "hod" ? "grid-cols-6" : "grid-cols-5"} items-center py-4 border-b last:border-none hover:bg-gray-50 transition`}>
                    <div className="font-medium text-gray-800">{item.id}</div>
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    <div>
                        <span className={`px-3 py-1 text-sm rounded-full ${item.typeBg} ${item.typeText}`}>
                            {item.type}
                        </span>
                    </div>
                    <div>
                        <span className={`px-3 py-1 text-sm rounded-full ${item.statusBg} ${item.statusText}`}>
                            {item.status}
                        </span>
                    </div>
                    <div className="text-gray-600">{item.date}</div>
                    {role === "hod" && (
                        <div>
                            <button
                                className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600"
                                onClick={() => handleAssignClick(item)}
                            >
                                Assign
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {/* Assign Modal */}
            {assignModal && selectedReq && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-4">Assign Request {selectedReq.id}</h2>
                        <select
                            className="w-full border px-3 py-2 mb-4 rounded"
                            value={selectedTech}
                            onChange={(e) => setSelectedTech(e.target.value)}
                        >
                            <option value="">Select Tech</option>
                            {techList.map((tech) => (
                                <option key={tech} value={tech}>{tech}</option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                onClick={() => setAssignModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-600"
                                onClick={handleTechAssign}
                                disabled={!selectedTech}
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StatusTable;
