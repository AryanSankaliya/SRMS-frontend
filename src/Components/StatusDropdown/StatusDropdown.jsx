import { useState } from "react";

function StatusDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);

    const options = ["All", "Open", "Pending", "Closed"];

    return (
        <div className="relative">
            {/* Button */}
            <div
                onClick={() => setOpen(!open)}
                className="
                    flex items-center gap-2 
                    border rounded-full px-4 py-2 
                    text-sm text-gray-700 cursor-pointer 
                    hover:border-teal-400 transition
                    bg-white
                "
            >
                <span>{value}</span>

                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="
                    absolute left-0 mt-2 w-40 
                    bg-white border rounded-xl shadow-lg 
                    z-20 overflow-hidden
                ">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className="
                                px-4 py-2 text-sm cursor-pointer
                                hover:bg-teal-50 hover:text-teal-600
                                transition
                            "
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StatusDropdown;
