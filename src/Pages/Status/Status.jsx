import React, { useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import StatusTable from '../../Components/StatusTable/StatusTable';
import StatusDropdown from '../../Components/StatusDropdown/StatusDropdown';

function Status() {
    // serach bar
    const [searchTerm, setSearchTerm] = useState('');
    // status manu 
    const [statusFilter, setStatusFilter] = useState("All");


    const role = "student";

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
            date: "Oct 24, 2023",
            final_status: "Open"
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
            date: "Oct 22, 2023",
            final_status: "Close",


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
            date: "Oct 18, 2023",
            final_status: "Close"
        }

    ]

    const filteredData = data.filter(item => {
        const matchesStatus =
            statusFilter === "All" || item.status === statusFilter;

        const matchesSearch =
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
    });


    return (
        <>
            <div className='w-full bg-white rounded-3xl shadow-md flex items-center justify-between p-4'>
                {/* LEFT GROUP */}
                <div className='flex items-center gap-3'>
                    <div className="
                            flex items-center gap-2
                            border-2 border-gray-300
                            rounded-full px-4 py-2 w-64
                            transition
                            focus-within:border-teal-500
                            focus-within:ring-0
                            focus-within:outline-none
                        ">
                        <FaSearch className="text-teal-400" />

                        <input
                            type="text"
                            placeholder="Search by ID, Title"
                            className="
                            w-full bg-transparent
                            text-sm text-gray-700 placeholder-gray-400
                            outline-none border-none ring-0
                            focus:outline-none  focus:ring-0 focus:border-none
                            focus:text-teal-700 caret-teal-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>


                    {/* RIGHT: Status Dropdown */}
                    <div className="flex gap-3">
                        <StatusDropdown
                            value={statusFilter}
                            onChange={setStatusFilter}
                        />
                    </div>
                </div>

                {/* Apply Button */}
                <button className='flex items-center gap-2 bg-[#8ecae6] hover:bg-[#219ebc] text-black font-medium px-6 py-2 rounded-full transition'>
                    <FaFilter />
                    Apply Filters
                </button>
            </div>

            <StatusTable
                data={filteredData}
                role={role}
            />

        </>
    );
}

export default Status;
