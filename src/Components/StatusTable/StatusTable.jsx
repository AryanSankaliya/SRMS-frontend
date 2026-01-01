function StatusTable({ data, role }) {

    // column control based on role
    const showFinalStatus = role !== "Technician";
    // const showStatus = role === "Technician";

    return (
        <div className='bg-white rounded-3xl shadow-md p-6 w-full mt-5'>

            {/* Header */}
            <div
                className={`grid ${
                    showFinalStatus ? "grid-cols-6" : "grid-cols-5"
                } text-sm text-teal-600 font-semibold pb-4 border-b`}
            >
                <div>REQUEST NO</div>
                <div>TITLE</div>
                <div>TYPE</div>
                <div>STATUS</div>
                <div>DATE</div>
                {showFinalStatus && <div>FINAL STATUS</div>}
            </div>

            {/* Rows */}
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`grid ${
                        showFinalStatus ? "grid-cols-6" : "grid-cols-5"
                    } items-center py-4 border-b last:border-none hover:bg-gray-50 transition`}
                >
                    <div className='font-medium text-gray-800'>{item.id}</div>

                    <div className="font-semibold text-gray-900">
                        {item.title}
                    </div>

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

                    {showFinalStatus && (
                        <div
                            className={`px-3 py-1 w-16 text-sm rounded-full ${
                                item.final_status === "Open"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {item.final_status}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default StatusTable;
