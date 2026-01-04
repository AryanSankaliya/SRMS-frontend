import React from "react";

function ServiceDepartmentPersonMaster() {

    const personData = [
        {
            id: 1,
            department: "IT",
            staff: "Rahul Sharma",
            fromDate: "2023-01-01",
            toDate: "",
            isHOD: true
        },
        {
            id: 2,
            department: "IT",
            staff: "Amit Verma",
            fromDate: "2023-03-01",
            toDate: "",
            isHOD: false
        },
        {
            id: 3,
            department: "Maintenance",
            staff: "Suresh Kumar",
            fromDate: "2023-02-15",
            toDate: "",
            isHOD: true
        }
    ];

    return (
        <div className="bg-white rounded-3xl shadow-md p-6">

            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Service Department Person Master
                </h2>
                <p className="text-sm text-gray-500">
                    Manage staff mapped to service departments
                </p>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 text-sm font-semibold text-teal-600 border-b pb-3">
                <div>Department</div>
                <div>Staff</div>
                <div>From Date</div>
                <div>To Date</div>
                <div>Is HOD Staff</div>
                <div>Action</div>
            </div>

            {/* Table Rows */}
            {personData.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-6 items-center py-4 border-b last:border-none text-sm"
                >
                    <div className="font-medium">{item.department}</div>
                    <div>{item.staff}</div>
                    <div>{item.fromDate}</div>
                    <div>{item.toDate || "-"}</div>
                    <div>{item.isHOD ? "Yes" : "No"}</div>
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

export default ServiceDepartmentPersonMaster;
