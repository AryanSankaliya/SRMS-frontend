import React from "react";

function ServiceTypeMaster() {

    const serviceTypeData = [
        {
            id: 1,
            name: "Technical",
            description: "Technical related service requests",
            sequence: 1,
            isForStaff: true,
            isForStudent: true
        },
        {
            id: 2,
            name: "Facility",
            description: "Facility and maintenance services",
            sequence: 2,
            isForStaff: true,
            isForStudent: false
        },
        {
            id: 3,
            name: "Administrative",
            description: "Administrative support services",
            sequence: 3,
            isForStaff: false,
            isForStudent: true
        }
    ];

    return (
        <div className="bg-white rounded-3xl shadow-md p-6">

            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Service Type Master
                </h2>
                <p className="text-sm text-gray-500">
                    Define broad service categories
                </p>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 text-sm font-semibold text-teal-600 border-b pb-3">
                <div>Service Type Name</div>
                <div>Description</div>
                <div>Sequence</div>
                <div>Is For Staff</div>
                <div>Is For Student</div>
                <div>Action</div>
            </div>

            {/* Table Rows */}
            {serviceTypeData.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-6 items-center py-4 border-b last:border-none text-sm"
                >
                    <div className="font-medium">{item.name}</div>
                    <div>{item.description}</div>
                    <div>{item.sequence}</div>
                    <div>{item.isForStaff ? "Yes" : "No"}</div>
                    <div>{item.isForStudent ? "Yes" : "No"}</div>
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

export default ServiceTypeMaster;
