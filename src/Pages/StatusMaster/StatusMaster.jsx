import React from "react";

function StatusMaster() {

    const statusData = [
        {
            id: 1,
            name: "Pending",
            systemName: "PENDING",
            isOpen: true,
            isAllowedForTechnician: false,
            isNoFurtherActionRequired: false,
            cssClass: "bg-yellow-100 text-yellow-700"
        },
        {
            id: 2,
            name: "In Progress",
            systemName: "IN_PROGRESS",
            isOpen: true,
            isAllowedForTechnician: true,
            isNoFurtherActionRequired: false,
            cssClass: "bg-blue-100 text-blue-700"
        },
        {
            id: 3,
            name: "Completed",
            systemName: "COMPLETED",
            isOpen: false,
            isAllowedForTechnician: true,
            isNoFurtherActionRequired: true,
            cssClass: "bg-green-100 text-green-700"
        },
        {
            id: 4,
            name: "Closed",
            systemName: "CLOSED",
            isOpen: false,
            isAllowedForTechnician: false,
            isNoFurtherActionRequired: true,
            cssClass: "bg-gray-200 text-gray-700"
        }
    ];

    return (
        <div className="bg-white rounded-3xl shadow-md p-6">

            {/* Page Title */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Service Request Status Master
                </h2>
                <p className="text-sm text-gray-500">
                    Define and manage service request statuses
                </p>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-7 text-sm font-semibold text-teal-600 border-b pb-3">
                <div>Status Name</div>
                <div>System Name</div>
                <div>Is Open</div>
                <div>Allowed For Technician</div>
                <div>No Further Action</div>
                <div>CSS Class</div>
                <div>Action</div>
            </div>

            {/* Table Rows */}
            {statusData.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-7 items-center py-4 border-b last:border-none text-sm"
                >
                    <div className="font-medium">{item.name}</div>
                    <div>{item.systemName}</div>

                    <div>
                        {item.isOpen ? "Yes" : "No"}
                    </div>

                    <div>
                        {item.isAllowedForTechnician ? "Yes" : "No"}
                    </div>

                    <div>
                        {item.isNoFurtherActionRequired ? "Yes" : "No"}
                    </div>

                    <div>
                        <span className={`px-3 py-1 rounded-full ${item.cssClass}`}>
                            {item.systemName}
                        </span>
                    </div>

                    <div>
                        <button className="text-teal-600 hover:underline">
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatusMaster;
