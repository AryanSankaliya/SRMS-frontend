import React from "react";

function ServiceRequestTypeWisePerson() {
    const mappingData = [
        {
            id: 1,
            requestType: "Computer Issue",
            staffName: "John Doe",
            fromDate: "2025-12-01",
            toDate: "2025-12-31",
            description: "Primary technician for IT issues"
        },
        {
            id: 2,
            requestType: "AC Repair",
            staffName: "Jane Smith",
            fromDate: "2025-12-01",
            toDate: "2025-12-31",
            description: "Responsible for all facility AC maintenance"
        },
        {
            id: 3,
            requestType: "ID Card Issue",
            staffName: "Alice Johnson",
            fromDate: "2025-12-01",
            toDate: "2025-12-31",
            description: "Handles all administrative ID card requests"
        }
    ];

    return (
        <div className="bg-white rounded-3xl shadow-md p-6">
            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Service Request Type–Wise Person Mapping
                </h2>
                <p className="text-sm text-gray-500">
                    Map service request types to responsible personnel
                </p>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 text-sm font-semibold text-teal-600 border-b pb-3">
                <div>Request Type</div>
                <div>Staff Name</div>
                <div>From Date</div>
                <div>To Date</div>
                <div>Description</div>
                <div>Action</div>
            </div>

            {/* Table Rows */}
            {mappingData.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-6 items-center py-4 border-b last:border-none text-sm"
                >
                    <div className="font-medium">{item.requestType}</div>
                    <div>{item.staffName}</div>
                    <div>{item.fromDate}</div>
                    <div>{item.toDate}</div>
                    <div>{item.description}</div>
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

export default ServiceRequestTypeWisePerson;
