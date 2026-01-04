import React from "react";

function ServiceRequestTypeMaster() {

    const requestTypeData = [
        {
            id: 1,
            serviceType: "Technical",
            serviceDept: "IT",
            requestTypeName: "Computer Issue",
            description: "Desktop / Laptop related issues",
            defaultPriority: "High",
            isVisibleResource: true
        },
        {
            id: 2,
            serviceType: "Facility",
            serviceDept: "Maintenance",
            requestTypeName: "AC Repair",
            description: "Air conditioner repair requests",
            defaultPriority: "Medium",
            isVisibleResource: true
        },
        {
            id: 3,
            serviceType: "Administrative",
            serviceDept: "Office",
            requestTypeName: "ID Card Issue",
            description: "Student or staff ID card issues",
            defaultPriority: "Low",
            isVisibleResource: false
        }
    ];

    return (
        <div className="bg-white rounded-3xl shadow-md p-6">

            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Service Request Type Master
                </h2>
                <p className="text-sm text-gray-500">
                    Define specific service request types
                </p>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-7 text-sm font-semibold text-teal-600 border-b pb-3">
                <div>Service Type</div>
                <div>Service Department</div>
                <div>Request Type Name</div>
                <div>Description</div>
                <div>Default Priority</div>
                <div>Is Visible Resource</div>
                <div>Action</div>
            </div>

            {/* Table Rows */}
            {requestTypeData.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-7 items-center py-4 border-b last:border-none text-sm"
                >
                    <div className="font-medium">{item.serviceType}</div>
                    <div>{item.serviceDept}</div>
                    <div>{item.requestTypeName}</div>
                    <div>{item.description}</div>
                    <div>{item.defaultPriority}</div>
                    <div>{item.isVisibleResource ? "Yes" : "No"}</div>
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

export default ServiceRequestTypeMaster;
