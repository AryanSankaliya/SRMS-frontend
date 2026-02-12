import React from "react";
import { useNavigate } from "react-router-dom";

function StatusTable({ data = [], role }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 w-full mt-5">
      <div className="grid grid-cols-7 text-sm text-teal-600 font-semibold p-4 bg-teal-50 rounded-xl mb-2">
        <div>REQUEST NO</div>
        <div className="col-span-2">TITLE</div>
        <div>TYPE</div>
        <div>RAISED BY</div>
        <div>STATUS</div>
        <div className="text-right">ACTION</div>
      </div>

      {/* Rows */}
      {data.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-7 items-center px-4 py-5 border-b last:border-none hover:bg-gray-50 transition duration-200"
        >
          <div className="font-medium text-gray-800">{item.id}</div>
          <div className="font-semibold text-gray-900 truncate pr-4 col-span-2" title={item.title}>
            {item.title}
          </div>
          <div>
            <span
              className={`px-3 py-1 text-xs rounded-full ${item.typeBg} ${item.typeText}`}
            >
              {item.type}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900 truncate pr-2" title={`${item.fullData.createdByUserId?.firstName} ${item.fullData.createdByUserId?.lastName}`}>
              {item.fullData.createdByUserId?.firstName} {item.fullData.createdByUserId?.lastName}
            </div>
          </div>
          <div>
            <span
              className={`px-3 py-1 text-xs rounded-full ${item.statusBg} ${item.statusText}`}
            >
              {item.status}
            </span>
          </div>

          <div className="text-right">
            <button
              onClick={() => navigate(`/request-details/${item.fullData?._id}`)}
              className="bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white px-4 py-1.5 rounded-lg text-sm font-medium transition duration-300"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatusTable;
