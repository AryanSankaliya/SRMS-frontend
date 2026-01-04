import React from "react";

function ServiceDepartmentMaster() {

    const departmentData = [
        {
            id: 1,
            name: "IT",
            campusId: 1,
            description: "Handles all IT related service requests",
            ccEmail: "it@srms.edu",
            isRequestTitleDisable: false
        },
        {
            id: 2,
            name: "Maintenance",
            campusId: 1,
            description: "Handles maintenance and repair requests",
            ccEmail: "maintenance@srms.edu",
            isRequestTitleDisable: false
        },
        {
            id: 3,
            name: "Housekeeping",
            campusId: 1,
            description: "Handles cleanliness and housekeeping issues",
            ccEmail: "housekeeping@srms.edu",
            isRequestTitleDisable: true
        }
    ];

    return (
        <div className="bg-white rounded-3xl shadow-md p-6">

            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Service Department Master
                </h2>
                <p className="text-sm text-gray-500">
                    Manage departments responsible for handling service requests
                </p>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 text-sm font-semibold text-teal-600 border-b pb-3">
                <div>Department Name</div>
                <div>Campus ID</div>
                <div>Description</div>
                <div>CC Email</div>
                <div>Request Title Disable</div>
                <div>Action</div>
            </div>

            {/* Table Rows */}
            {departmentData.map((dept) => (
                <div
                    key={dept.id}
                    className="grid grid-cols-6 items-center py-4 border-b last:border-none text-sm"
                >
                    <div className="font-medium">{dept.name}</div>
                    <div>{dept.campusId}</div>
                    <div>{dept.description}</div>
                    <div>{dept.ccEmail}</div>
                    <div>{dept.isRequestTitleDisable ? "Yes" : "No"}</div>
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

export default ServiceDepartmentMaster;
